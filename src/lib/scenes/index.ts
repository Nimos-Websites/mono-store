import * as THREE from "three";
import {
  contactShadowTexture,
  feltTexture,
  lightFallTexture,
  linenTexture,
  oakTexture,
  plasterTexture,
  poolOfLightTexture,
  studioEnvTexture,
} from "./textures";
import { buildSteamerUnit, buildUnitMaterials, roundedBox, type UnitMaterials } from "./steamer-unit";

/*
  THE SCENE LIBRARY — three finished compositions, each one a shot a
  product photographer would actually take, built entirely in code:

    plinth — the unit standing on a plaster plinth under museum lighting,
             on a slow turntable. The hero.
    desk   — the unit on pale oak beside folded linen, window light and a
             wisp of steam. The campaign frame.
    case   — the unit beside its moulded case, open, cord in the felt
             well. The system, photographed as one object.

  House rules, enforced here so no caller can break them:
    · every scene is FRAMED, not merely pointed. frame() solves for the
      camera distance that puts a given share of the subject into a given
      part of the frame, then re-solves on resize, so a phone in portrait
      and a widescreen desktop get two different correct compositions out
      of one set.
    · the media engine is code: no network request, no HDRI download, no
      addons, no external asset of any kind.
    · the renderer is created per mount and destroyed with it.
    · the render is a render, and every surface it is labelled as such.
*/

export type SceneKind = "plinth" | "desk" | "case";

export type SceneHandles = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  /** Orbit target — the host orbits the camera around this point on drag. */
  focus: THREE.Vector3;
  update: (dt: number, elapsed: number) => void;
  resize: (width: number, height: number) => void;
  dispose: () => void;
};

type Built = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  focus: THREE.Vector3;
  update: (dt: number, elapsed: number) => void;
  resize: (w: number, h: number) => void;
  dispose: () => void;
};

const WORLD_UP = new THREE.Vector3(0, 1, 0);

/* ─────────────────────────────────────────────────────────────────────────
 * frame() — the shot.
 *
 * A camera is not a photograph until someone decides what is in it. Given
 * the subject's bounding box, how much of the frame it should fill, where
 * in the frame it should sit (NDC), and the direction the camera looks
 * from, solve for the distance and the look-at point.
 * ─────────────────────────────────────────────────────────────────────── */
type Shot = {
  /** centre of the subject's bounding box, world space */
  centre: THREE.Vector3;
  /** half-extents of that box */
  half: THREE.Vector3;
  /** direction from the subject toward the camera */
  from: THREE.Vector3;
};

type Framing = {
  /** fraction of the frame the bounding box fills, 0..1 */
  share: number;
  /** where the subject's centre lands in frame, NDC (-1..1) */
  place: { x: number; y: number };
};

type Composed = Shot & Framing;

const CORNERS: [number, number, number][] = [
  [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1],
  [1, -1, -1], [1, -1, 1], [1, 1, -1], [1, 1, 1],
];

function frame(camera: THREE.PerspectiveCamera, shot: Composed): { position: THREE.Vector3; lookAt: THREE.Vector3 } {
  const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  const aspect = camera.aspect;
  const dir = shot.from.clone().normalize();

  /* Camera basis: the camera looks along -Z, so its right is dir×up and
     its up is right×dir — which is why `up` must NOT be negated. */
  const right = new THREE.Vector3().crossVectors(dir, WORLD_UP).normalize();
  const up = new THREE.Vector3().crossVectors(right, dir).normalize();

  let ex = 0;
  let ey = 0;
  for (const [sx, sy, sz] of CORNERS) {
    const vx = sx * shot.half.x;
    const vy = sy * shot.half.y;
    const vz = sz * shot.half.z;
    ex = Math.max(ex, Math.abs(vx * right.x + vy * right.y + vz * right.z));
    ey = Math.max(ey, Math.abs(vx * up.x + vy * up.y + vz * up.z));
  }

  /* Fit the vertical axis first; the horizontal axis only pushes the
     camera back when the frame is wider than the subject is tall. */
  const distance = Math.max(ey / (shot.share * tan), ex / (shot.share * tan * aspect), 0.2);

  /* Place the subject at `place`: the look-at point moves the opposite
     way, so the object lands where the composition wants it. */
  const position = shot.centre.clone().addScaledVector(dir, distance);
  const halfH = distance * tan;
  const halfW = halfH * aspect;
  const lookAt = shot.centre
    .clone()
    .addScaledVector(right, halfW * shot.place.x)
    .addScaledVector(up, -halfH * shot.place.y);

  return { position, lookAt };
}

/* ─────────────────────────────────────────────────────────────────────────
 * Shared construction
 * ─────────────────────────────────────────────────────────────────────── */
const rendererFor = (canvas: HTMLCanvasElement, dpr: number) => {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.99;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
};

function environmentFor(scene: THREE.Scene, renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const src = studioEnvTexture();
  const env = pmrem.fromEquirectangular(src).texture;
  scene.environment = env;
  src.dispose();
  pmrem.dispose();
  return env;
}

/** A dispose tracker, so nothing on the GPU outlives the scene it belongs to. */
function tracker() {
  const items: { dispose: () => void }[] = [];
  return {
    track: <T extends { dispose: () => void }>(x: T): T => {
      items.push(x);
      return x;
    },
    items,
  };
}

function keyLight(intensity: number, colour: number, at: [number, number, number], span: [number, number, number, number]) {
  const l = new THREE.DirectionalLight(colour, intensity);
  l.position.set(...at);
  l.castShadow = true;
  l.shadow.mapSize.set(2048, 2048);
  l.shadow.camera.near = 0.3;
  l.shadow.camera.far = 9;
  l.shadow.camera.left = span[0];
  l.shadow.camera.right = span[1];
  l.shadow.camera.top = span[2];
  l.shadow.camera.bottom = span[3];
  l.shadow.bias = -0.0006;
  l.shadow.normalBias = 0.005;
  return l;
}

/* ─────────────────────────────────────────────────────────────────────────
 * SCENE 1 — THE PLINTH. Museum lighting, slow turntable, the hero asset.
 * ─────────────────────────────────────────────────────────────────────── */
const buildPlinthScene = (canvas: HTMLCanvasElement, width: number, height: number, dpr: number): Built => {
  const renderer = rendererFor(canvas, dpr);
  renderer.setSize(width, height, false);
  const scene = new THREE.Scene();
  const env = environmentFor(scene, renderer);
  const t = tracker();

  const plasterMap = t.track(plasterTexture(256, 3));
  const plaster = new THREE.MeshStandardMaterial({
    color: 0xe9e3d8,
    roughness: 0.95,
    metalness: 0,
    envMapIntensity: 0.4,
    map: plasterMap,
  });
  const plinthMat = new THREE.MeshStandardMaterial({
    color: 0xf2eee6,
    roughness: 0.86,
    metalness: 0,
    envMapIntensity: 0.55,
    map: t.track(plasterTexture(128, 2)),
  });
  const brass = new THREE.MeshStandardMaterial({
    color: 0xb89968,
    roughness: 0.28,
    metalness: 0.88,
    envMapIntensity: 1.1,
  });

  /* The gallery floor, with a pool of light where the object stands. */
  const ground = new THREE.Mesh(t.track(new THREE.CircleGeometry(6, 72)), plaster);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const pool = new THREE.Mesh(
    t.track(new THREE.PlaneGeometry(3.6, 3.6)),
    t.track(
      new THREE.MeshBasicMaterial({
        map: t.track(poolOfLightTexture()),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.8,
      }),
    ),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0.0016;
  scene.add(pool);

  /* The plinth: a plaster drum, brass at its foot, a brass rule at its cap. */
  const PLINTH_H = 0.42;
  const plinth = new THREE.Mesh(t.track(new THREE.CylinderGeometry(0.148, 0.161, PLINTH_H, 72)), plinthMat);
  plinth.position.y = PLINTH_H / 2;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  scene.add(plinth);

  const inlay = new THREE.Mesh(t.track(new THREE.TorusGeometry(0.1595, 0.0021, 12, 72)), brass);
  inlay.rotation.x = Math.PI / 2;
  inlay.position.y = 0.05;
  scene.add(inlay);

  const capRing = new THREE.Mesh(t.track(new THREE.TorusGeometry(0.1435, 0.0015, 12, 72)), brass);
  capRing.rotation.x = Math.PI / 2;
  capRing.position.y = PLINTH_H + 0.0012;
  scene.add(capRing);

  /* The unit, on the cap, on a slow turntable. */
  const turntable = new THREE.Group();
  turntable.position.y = PLINTH_H + 0.0012;
  scene.add(turntable);
  const mats: UnitMaterials = buildUnitMaterials();
  const { group: unit } = buildSteamerUnit(mats, "coil");
  turntable.add(unit);

  const floorContact = contactPlane(t, 1.3, 0.5, 0.0008);
  scene.add(floorContact);
  const capContact = contactPlane(t, 0.42, 0.62, PLINTH_H + 0.0024);
  scene.add(capContact);

  scene.add(keyLight(2.35, 0xfff8ec, [-1.45, 2.35, 1.5], [-0.9, 0.9, 1.5, -0.3]));
  const fill = new THREE.DirectionalLight(0xf3ede2, 0.4);
  fill.position.set(2.0, 0.8, 1.0);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xcfe0ea, 0.8);
  rim.position.set(0.65, 1.35, -1.9);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xfbfcfd, 0x9aa0a4, 0.32));

  const camera = new THREE.PerspectiveCamera(26, width / height, 0.05, 30);
  const base: Shot = {
    centre: new THREE.Vector3(0, 0.36, 0),
    half: new THREE.Vector3(0.18, 0.36, 0.18),
    from: new THREE.Vector3(0.55, 0.3, 1),
  };
  /* A phone in portrait and a widescreen desktop are two different
     photographs of the same object: on the phone the copy takes the
     bottom half and the plinth must sit high; on the desktop the copy
     takes the left and the plinth sits right and slightly low. */
  const shotFor = (aspect: number): Framing =>
    aspect < 1
      ? { ...base, share: 0.8, place: { x: 0, y: 0.14 } }
      : { ...base, share: 0.88, place: { x: 0.2, y: 0.04 } };

  const apply = (): THREE.Vector3 => {
    const { position, lookAt } = frame(camera, { ...base, ...shotFor(camera.aspect) });
    camera.position.copy(position);
    camera.lookAt(lookAt);
    camera.updateProjectionMatrix();
    return lookAt;
  };

  camera.aspect = width / height;
  let focus = apply();

  return {
    renderer,
    scene,
    camera,
    focus,
    update: (dt) => {
      turntable.rotation.y += dt * 0.055;
    },
    resize: (w, h) => {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      focus = apply();
    },
    dispose: () => disposeScene(scene, renderer, mats, t.items, env),
  };
};

/* A soft contact-shadow quad lying on a horizontal surface. */
function contactPlane(t: ReturnType<typeof tracker>, size: number, opacity: number, y: number) {
  const m = new THREE.Mesh(
    t.track(new THREE.PlaneGeometry(size, size)),
    t.track(
      new THREE.MeshBasicMaterial({
        map: t.track(contactShadowTexture()),
        transparent: true,
        depthWrite: false,
        opacity,
      }),
    ),
  );
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  return m;
}

/* ─────────────────────────────────────────────────────────────────────────
 * SCENE 2 — THE DESK. Pale oak, folded linen, window light, a wisp of
 * steam. The campaign photograph.
 * ─────────────────────────────────────────────────────────────────────── */
const buildDeskScene = (canvas: HTMLCanvasElement, width: number, height: number, dpr: number): Built => {
  const renderer = rendererFor(canvas, dpr);
  renderer.setSize(width, height, false);
  const scene = new THREE.Scene();
  const env = environmentFor(scene, renderer);
  const t = tracker();

  const plasterMap = t.track(plasterTexture(256, 2));
  const oakMap = t.track(oakTexture(256, 2));
  const linenMap = t.track(linenTexture(256, 3));

  const plaster = new THREE.MeshStandardMaterial({
    color: 0xe7e1d6,
    roughness: 0.96,
    envMapIntensity: 0.35,
    map: plasterMap,
  });
  const oak = new THREE.MeshStandardMaterial({
    color: 0xd9c8ac,
    roughness: 0.68,
    metalness: 0.02,
    envMapIntensity: 0.45,
    map: oakMap,
  });
  const linen = [
    new THREE.MeshStandardMaterial({ color: 0xf0ece2, roughness: 0.93, envMapIntensity: 0.3, map: linenMap }),
    new THREE.MeshStandardMaterial({ color: 0xe4ddce, roughness: 0.93, envMapIntensity: 0.3, map: linenMap }),
    new THREE.MeshStandardMaterial({ color: 0xd8d0bf, roughness: 0.93, envMapIntensity: 0.3, map: linenMap }),
  ];
  const wood = new THREE.MeshStandardMaterial({ color: 0xc9b394, roughness: 0.58, envMapIntensity: 0.45 });
  const brassRail = new THREE.MeshStandardMaterial({ color: 0xb89968, roughness: 0.28, metalness: 0.88, envMapIntensity: 1.1 });

  /* The wall behind the desk, and the floor in front of it. */
  const wall = new THREE.Mesh(t.track(new THREE.PlaneGeometry(9, 4.4)), plaster);
  wall.position.set(0, 1.5, -0.95);
  wall.receiveShadow = true;
  scene.add(wall);

  const floor = new THREE.Mesh(t.track(new THREE.PlaneGeometry(9, 6)), plaster);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.001;
  floor.receiveShadow = true;
  scene.add(floor);

  /* The desk. */
  const DESK_H = 0.735;
  const DESK_W = 2.5;
  const DESK_D = 1.15;
  const deskTop = new THREE.Mesh(t.track(roundedBox(DESK_W, 0.05, DESK_D, 0.008, 0.004)), oak);
  deskTop.position.y = DESK_H + 0.025;
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  scene.add(deskTop);

  const SURFACE = DESK_H + 0.05;

  /* A soft brush of window light across the wall. */
  const fall = new THREE.Mesh(
    t.track(new THREE.PlaneGeometry(2.6, 1.3)),
    t.track(
      new THREE.MeshBasicMaterial({
        map: t.track(lightFallTexture()),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.6,
      }),
    ),
  );
  fall.position.set(0.35, 1.62, -0.94);
  scene.add(fall);

  /* Folded linen, behind the unit — what the steamer is FOR. Three
     stacks, three heights, alternating tilt: a still life, not slabs. */
  const fold = (x: number, z: number, w: number, n: number, mat: THREE.Material) => {
    for (let i = 0; i < n; i++) {
      const f = new THREE.Mesh(t.track(roundedBox(w, 0.024, 0.3 - i * 0.006, 0.009, 0.006)), mat);
      f.position.set(x, SURFACE + 0.014 + i * 0.0265, z);
      f.rotation.y = (i % 2 === 0 ? 1 : -1) * (0.008 + i * 0.004);
      f.rotation.x = i * 0.0025;
      f.castShadow = true;
      f.receiveShadow = true;
      scene.add(f);
    }
  };
  fold(-0.26, -0.42, 0.34, 4, linen[0]);
  fold(-0.26, -0.2, 0.3, 3, linen[1]);
  fold(-0.26, 0.0, 0.26, 2, linen[2]);

  /* A shirt on a wooden hanger, on a brass rail against the wall. The
     wall would otherwise be the emptiest part of the frame, and the
     object's job is exactly this: a hanging garment, unwrinkled. */
  const RAIL_Y = 1.42;
  const rail = new THREE.Mesh(t.track(new THREE.CylinderGeometry(0.0042, 0.0042, 0.86, 14)), brassRail);
  rail.rotation.z = Math.PI / 2;
  rail.position.set(0.02, RAIL_Y, -0.9);
  scene.add(rail);
  for (const fx of [-0.42, 0.46]) {
    const finial = new THREE.Mesh(t.track(new THREE.SphereGeometry(0.011, 18, 12)), brassRail);
    finial.position.set(fx, RAIL_Y, -0.9);
    scene.add(finial);
  }

  const hanger = new THREE.Group();
  hanger.position.set(-0.02, RAIL_Y - 0.012, -0.9);
  scene.add(hanger);
  const hook = new THREE.Mesh(t.track(new THREE.TorusGeometry(0.012, 0.0024, 8, 20)), brassRail);
  hook.position.set(0, 0.028, 0);
  hook.rotation.x = Math.PI / 2;
  hanger.add(hook);
  for (const s of [-1, 1]) {
    const bar = new THREE.Mesh(t.track(new THREE.CylinderGeometry(0.0038, 0.0038, 0.13, 10)), wood);
    bar.position.set(s * 0.052, 0.012, 0);
    bar.rotation.z = s * 0.52;
    hanger.add(bar);
  }

  /* The cloth itself: an open, slightly tapered cylinder wall — a curved
     panel, not a plane, so it catches the window light on one side. */
  const clothGeo = t.track(
    new THREE.CylinderGeometry(0.072, 0.098, 0.4, 28, 1, true, Math.PI * 0.18, Math.PI * 1.64),
  );
  const cloth = new THREE.Mesh(clothGeo, t.track(new THREE.MeshStandardMaterial({
    color: 0xece6da,
    roughness: 0.9,
    metalness: 0,
    envMapIntensity: 0.35,
    map: linenMap,
    side: THREE.DoubleSide,
  })));
  cloth.scale.set(1.5, 1, 0.8);
  cloth.position.set(-0.02, RAIL_Y - 0.215, -0.9);
  cloth.castShadow = true;
  scene.add(cloth);

  /* The unit, standing on the oak in front of the linen. */
  const unitRoot = new THREE.Group();
  unitRoot.position.set(0.13, SURFACE, -0.05);
  unitRoot.rotation.y = -0.44;
  scene.add(unitRoot);
  const mats: UnitMaterials = buildUnitMaterials();
  const { group: unit, steamAnchor } = buildSteamerUnit(mats, "lie");
  unitRoot.add(unit);

  /* The carafe: the fill is part of the ritual. */
  const carafe = new THREE.Mesh(
    t.track(new THREE.CylinderGeometry(0.031, 0.038, 0.1, 32)),
    t.track(new THREE.MeshStandardMaterial({ color: 0xf2eee6, roughness: 0.28, metalness: 0.02, envMapIntensity: 0.6 })),
  );
  carafe.position.set(-0.04, SURFACE + 0.05, 0.24);
  carafe.castShadow = true;
  scene.add(carafe);
  const carafeRing = new THREE.Mesh(
    t.track(new THREE.TorusGeometry(0.0295, 0.0016, 10, 36)),
    t.track(new THREE.MeshStandardMaterial({ color: 0xb89968, roughness: 0.28, metalness: 0.88, envMapIntensity: 1.1 })),
  );
  carafeRing.rotation.x = Math.PI / 2;
  carafeRing.position.set(-0.04, SURFACE + 0.1, 0.24);
  scene.add(carafeRing);

  scene.add(contactPlane(t, 0.6, 0.4, 0.001));

  /* Window light from the right; soft ambient so the shadow side never dies. */
  scene.add(keyLight(2.9, 0xfff4e2, [2.2, 2.1, 1.2], [-1.5, 1.5, 1.8, -0.5]));
  const cool = new THREE.DirectionalLight(0xdfe9f0, 0.5);
  cool.position.set(-1.7, 1.2, 1.5);
  scene.add(cool);
  const bounce = new THREE.DirectionalLight(0xffe9d6, 0.35);
  bounce.position.set(-0.7, 0.4, -1.3);
  scene.add(bounce);
  scene.add(new THREE.HemisphereLight(0xfdfbf7, 0xa8a49a, 0.5));

  /* The steam wisp: one small Points system, born at the working face. */
  const COUNT = 56;
  const positions = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    seeds[i] = i / COUNT;
    positions[i * 3] = (Math.random() - 0.5) * 0.004;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
  }
  const wispGeo = t.track(new THREE.BufferGeometry());
  wispGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const wispMat = t.track(
    new THREE.PointsMaterial({
      color: 0xf7f4ee,
      size: 0.012,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      sizeAttenuation: true,
    }),
  );
  const wisp = new THREE.Points(wispGeo, wispMat);
  scene.add(wisp);

  const anchorWorld = new THREE.Vector3();
  steamAnchor.getWorldPosition(anchorWorld);

  let puff = 0;
  const advanceWisp = (dt: number) => {
    const attr = wispGeo.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      seeds[i] += dt * 0.44;
      if (seeds[i] > 1) seeds[i] -= 1;
      const s = seeds[i];
      arr[i * 3] = anchorWorld.x + Math.sin(s * 9 + i) * 0.006 * (0.3 + s);
      arr[i * 3 + 1] = anchorWorld.y + s * 0.17;
      arr[i * 3 + 2] = anchorWorld.z + Math.cos(s * 7 + i * 1.7) * 0.005 * (0.3 + s) - s * 0.035;
    }
    attr.needsUpdate = true;
    puff += dt;
    wispMat.opacity = 0.26 + Math.sin(puff * 0.9) * 0.05;
  };

  const camera = new THREE.PerspectiveCamera(30, width / height, 0.05, 30);
  const base: Shot = {
    centre: new THREE.Vector3(-0.1, 0.9, -0.16),
    half: new THREE.Vector3(0.32, 0.14, 0.34),
    from: new THREE.Vector3(0.6, 0.2, 1),
  };
  const shotFor = (aspect: number): Framing =>
    aspect < 1
      ? { ...base, share: 0.8, place: { x: 0, y: 0.08 } }
      : { ...base, share: 0.92, place: { x: 0.06, y: 0.04 } };

  const apply = (): THREE.Vector3 => {
    const { position, lookAt } = frame(camera, { ...base, ...shotFor(camera.aspect) });
    camera.position.copy(position);
    camera.lookAt(lookAt);
    camera.updateProjectionMatrix();
    return lookAt;
  };

  camera.aspect = width / height;
  let focus = apply();

  return {
    renderer,
    scene,
    camera,
    focus,
    update: advanceWisp,
    resize: (w, h) => {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      focus = apply();
    },
    dispose: () => disposeScene(scene, renderer, mats, t.items, env),
  };
};

/* ─────────────────────────────────────────────────────────────────────────
 * SCENE 3 — THE CASE. The moulded travel case, open, beside the unit.
 * The system, photographed as one object.
 * ─────────────────────────────────────────────────────────────────────── */
const buildCaseScene = (canvas: HTMLCanvasElement, width: number, height: number, dpr: number): Built => {
  const renderer = rendererFor(canvas, dpr);
  renderer.setSize(width, height, false);
  const scene = new THREE.Scene();
  const env = environmentFor(scene, renderer);
  const t = tracker();

  const plasterMap = t.track(plasterTexture(256, 3));
  const feltMap = t.track(feltTexture(256, 2));

  const plaster = new THREE.MeshStandardMaterial({
    color: 0xcdc0a9,
    roughness: 0.97,
    envMapIntensity: 0.24,
    map: plasterMap,
  });
  const shell = new THREE.MeshStandardMaterial({
    color: 0x5d4834,
    roughness: 0.55,
    metalness: 0.04,
    envMapIntensity: 0.55,
  });
  const shellInner = new THREE.MeshStandardMaterial({
    color: 0x6d563d,
    roughness: 0.6,
    envMapIntensity: 0.5,
  });
  const felt = new THREE.MeshStandardMaterial({
    color: 0x8d7351,
    roughness: 0.98,
    envMapIntensity: 0.3,
    map: feltMap,
  });
  const brass = new THREE.MeshStandardMaterial({
    color: 0xb89968,
    roughness: 0.28,
    metalness: 0.88,
    envMapIntensity: 1.1,
  });
  const cordMat = new THREE.MeshStandardMaterial({ color: 0x1b1722, roughness: 0.66 });

  /* Ground: the same plaster sea the plinth stands on. */
  const ground = new THREE.Mesh(t.track(new THREE.CircleGeometry(6, 72)), plaster);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const pool = new THREE.Mesh(
    t.track(new THREE.PlaneGeometry(2.4, 2.4)),
    t.track(
      new THREE.MeshBasicMaterial({
        map: t.track(poolOfLightTexture()),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.42,
      }),
    ),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0.0016;
  scene.add(pool);

  /* ── The case: clamshell, open ~112°, hinged at its back edge ── */
  const CASE_W = 0.24;
  const CASE_H = 0.088;
  const CASE_D = 0.145;
  const caseRoot = new THREE.Group();
  caseRoot.position.set(-0.12, 0, 0);
  scene.add(caseRoot);

  const bottom = new THREE.Mesh(t.track(roundedBox(CASE_W, CASE_H, CASE_D, 0.022, 0.006)), shell);
  bottom.position.y = CASE_H / 2;
  bottom.castShadow = true;
  bottom.receiveShadow = true;
  caseRoot.add(bottom);

  const well = new THREE.Mesh(
    t.track(roundedBox(CASE_W - 0.02, 0.008, CASE_D - 0.02, 0.012, 0.003)),
    felt,
  );
  well.position.y = CASE_H - 0.002;
  caseRoot.add(well);

  const lid = new THREE.Group();
  lid.position.set(0, CASE_H, -CASE_D / 2);
  lid.rotation.x = -1.95;
  caseRoot.add(lid);

  const lidShell = new THREE.Mesh(t.track(roundedBox(CASE_W, CASE_H, CASE_D, 0.022, 0.006)), shell);
  lidShell.position.set(0, CASE_H / 2, CASE_D / 2);
  lidShell.castShadow = true;
  lid.add(lidShell);

  const lidInner = new THREE.Mesh(
    t.track(roundedBox(CASE_W - 0.02, 0.006, CASE_D - 0.026, 0.012, 0.003)),
    shellInner,
  );
  lidInner.position.set(0, CASE_H - 0.004, CASE_D / 2 + 0.004);
  lid.add(lidInner);

  const strap = new THREE.Mesh(t.track(new THREE.BoxGeometry(0.014, 0.005, CASE_D * 0.68)), felt);
  strap.position.set(0, CASE_H - 0.001, CASE_D * 0.42);
  lid.add(strap);

  /* Brass hinges, brass zip line, brass pull. */
  for (const hx of [-CASE_W / 2 + 0.032, CASE_W / 2 - 0.032]) {
    const barrel = new THREE.Mesh(t.track(new THREE.CylinderGeometry(0.005, 0.005, 0.03, 16)), brass);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(hx, CASE_H - 0.002, -CASE_D / 2 + 0.002);
    caseRoot.add(barrel);
  }

  const zip = new THREE.Mesh(t.track(new THREE.BoxGeometry(CASE_W + 0.002, 0.0016, 0.0016)), brass);
  zip.position.set(0, CASE_H - 0.001, CASE_D / 2 + 0.001);
  caseRoot.add(zip);

  const pull = new THREE.Mesh(t.track(new THREE.TorusGeometry(0.008, 0.0016, 10, 28)), brass);
  pull.position.set(CASE_W / 2 + 0.004, CASE_H - 0.001, 0);
  pull.rotation.y = Math.PI / 2;
  pull.rotation.x = 0.3;
  caseRoot.add(pull);

  /* The cord, coiled in the felt well. */
  const cordPoints: THREE.Vector3[] = [];
  for (let i = 0; i <= 36; i++) {
    const a = (i / 36) * Math.PI * 2 * 1.3;
    const r = 0.03 + (i / 36) * 0.02;
    cordPoints.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
  }
  const cord = new THREE.Mesh(
    t.track(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cordPoints), 56, 0.0032, 8, false)),
    cordMat,
  );
  cord.position.set(-0.02, CASE_H + 0.006, 0.01);
  caseRoot.add(cord);

  /* ── The unit, standing beside its case ── */
  const unitRoot = new THREE.Group();
  unitRoot.position.set(0.2, 0, 0.01);
  unitRoot.rotation.y = -0.32;
  scene.add(unitRoot);
  const mats: UnitMaterials = buildUnitMaterials();
  const { group: unit } = buildSteamerUnit(mats, "none");
  unitRoot.add(unit);

  scene.add(contactPlane(t, 0.75, 0.55, 0.0008));
  const unitContact = contactPlane(t, 0.34, 0.85, 0.0009);
  unitContact.position.set(0.2, 0.0009, 0.01);
  scene.add(unitContact);

  /* Window key from the left, warm fill, cool rim from behind. */
  scene.add(keyLight(2.0, 0xfff6e8, [-1.8, 2.05, 1.35], [-1.25, 1.25, 1.3, -0.4]));
  const fill = new THREE.DirectionalLight(0xf1ebdf, 0.34);
  fill.position.set(1.9, 0.8, 0.95);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xd2e2ec, 0.46);
  rim.position.set(0.35, 1.3, -1.85);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xfdfcfa, 0x9d998f, 0.3));

  const camera = new THREE.PerspectiveCamera(28, width / height, 0.05, 30);
  const base: Shot = {
    centre: new THREE.Vector3(0.0, 0.13, -0.03),
    half: new THREE.Vector3(0.26, 0.13, 0.14),
    from: new THREE.Vector3(0.42, 0.3, 1),
  };
  const shotFor = (aspect: number): Framing =>
    aspect < 1
      ? { ...base, share: 0.82, place: { x: 0, y: 0.14 } }
      : { ...base, share: 0.92, place: { x: -0.02, y: 0.1 } };

  const apply = (): THREE.Vector3 => {
    const { position, lookAt } = frame(camera, { ...base, ...shotFor(camera.aspect) });
    camera.position.copy(position);
    camera.lookAt(lookAt);
    camera.updateProjectionMatrix();
    return lookAt;
  };

  camera.aspect = width / height;
  let focus = apply();

  return {
    renderer,
    scene,
    camera,
    focus,
    update: () => {
      /* A still life. Nothing moves — the case is proof, not a show. */
    },
    resize: (w, h) => {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      focus = apply();
    },
    dispose: () => disposeScene(scene, renderer, mats, t.items, env),
  };
};

/* ─────────────────────────────────────────────────────────────────────────
 * Shared teardown
 * ─────────────────────────────────────────────────────────────────────── */
function disposeScene(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  mats: UnitMaterials,
  items: { dispose: () => void }[],
  env: THREE.Texture,
) {
  scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
      obj.geometry.dispose();
      const m = obj.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m.dispose();
    }
  });
  Object.values(mats).forEach((m) => m.dispose());
  env.dispose();
  for (const i of items) i.dispose();
  renderer.dispose();
  renderer.forceContextLoss();
}

/* ─────────────────────────────────────────────────────────────────────────
 * The library entry — one function, three finished compositions.
 * ─────────────────────────────────────────────────────────────────────── */
export const buildScene = (
  kind: SceneKind,
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  dpr: number,
): SceneHandles => {
  if (kind === "plinth") return buildPlinthScene(canvas, width, height, dpr);
  if (kind === "desk") return buildDeskScene(canvas, width, height, dpr);
  return buildCaseScene(canvas, width, height, dpr);
};
