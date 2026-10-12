/*
  THE PLIMSOLL STEAMER — the model, extracted from product-model.ts so
  every scene in the library renders the SAME object. Dimensions are
  the specification's: 240 mm standing, 95 mm head, 2000 W corded,
  300 ml tank, ceramic soleplate, saddle-leather grip, brass rule.

  Materials are the furniture equivalents (alabaster ceramic, brass,
  saddle leather, ink) because that is the house's point of view — a
  steamer built like a small appliance should be. Core three.js only.
*/

import * as THREE from "three";

/* Overall standing height 240 mm, head 95 mm across, handle 32 mm. */
const H = 0.24;
const HEAD_W = 0.095;
const HEAD_D = 0.058;
const HEAD_H = 0.062;
const HANDLE_W = 0.034;
const HANDLE_D = 0.026;

export type UnitMaterials = {
  ceramicShell: THREE.MeshStandardMaterial;
  plate: THREE.MeshStandardMaterial;
  brass: THREE.MeshStandardMaterial;
  leather: THREE.MeshStandardMaterial;
  ink: THREE.MeshStandardMaterial;
  slotDark: THREE.MeshStandardMaterial;
  windowMat: THREE.MeshStandardMaterial;
  cord: THREE.MeshStandardMaterial;
};

export const buildUnitMaterials = (): UnitMaterials => ({
  /* Glazed ceramic: the separation from the plaster ground is SPECULAR,
     not albedo — a lower roughness and a stronger environment read than
     the matte surfaces it stands on. */
  ceramicShell: new THREE.MeshStandardMaterial({
    color: 0xe7e0d3,
    roughness: 0.26,
    metalness: 0.02,
    envMapIntensity: 0.95,
  }),
  /* The soleplate: denser, more polished, slightly cooler than the shell. */
  plate: new THREE.MeshStandardMaterial({
    color: 0xf1ede4,
    roughness: 0.17,
    metalness: 0.04,
    envMapIntensity: 1.05,
  }),
  brass: new THREE.MeshStandardMaterial({
    color: 0xb89968,
    roughness: 0.29,
    metalness: 0.86,
    envMapIntensity: 1.15,
  }),
  leather: new THREE.MeshStandardMaterial({
    color: 0x6b4a2f,
    roughness: 0.6,
    metalness: 0.02,
    envMapIntensity: 0.5,
  }),
  ink: new THREE.MeshStandardMaterial({
    color: 0x16131c,
    roughness: 0.45,
    metalness: 0.06,
    envMapIntensity: 0.4,
  }),
  slotDark: new THREE.MeshStandardMaterial({
    color: 0x1d1922,
    roughness: 0.85,
    metalness: 0.0,
  }),
  /* The water window: a translucent panel, brighter than the ink. */
  windowMat: new THREE.MeshStandardMaterial({
    color: 0x5b5468,
    roughness: 0.16,
    metalness: 0.02,
    envMapIntensity: 0.9,
  }),
  cord: new THREE.MeshStandardMaterial({
    color: 0x1b1722,
    roughness: 0.66,
  }),
});

export const roundedBox = (w: number, h: number, d: number, r: number, bevel: number) => {
  const rr = Math.min(r, w / 2 - 0.0005, d / 2 - 0.0005);
  const shape = new THREE.Shape();
  const x = -w / 2 + rr;
  const y = -d / 2 + rr;
  const iw = w - rr * 2;
  const id = d - rr * 2;
  shape.moveTo(x, -d / 2);
  shape.lineTo(x + iw, -d / 2);
  shape.quadraticCurveTo(w / 2, -d / 2, w / 2, y);
  shape.lineTo(w / 2, y + id);
  shape.quadraticCurveTo(w / 2, d / 2, x + iw, d / 2);
  shape.lineTo(x + iw, d / 2);
  shape.lineTo(x, d / 2);
  shape.quadraticCurveTo(-w / 2, d / 2, -w / 2, y + id);
  shape.lineTo(-w / 2, y);
  shape.quadraticCurveTo(-w / 2, -d / 2, x, -d / 2);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: h - bevel * 2,
    bevelEnabled: true,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelSegments: 5,
    curveSegments: 12,
  });
  geo.center();
  geo.rotateX(-Math.PI / 2);
  return geo;
};

export type SteamerUnit = {
  group: THREE.Group;
  /** World anchor on the working face — where a photographer would see breath. */
  steamAnchor: THREE.Object3D;
};

/**
 * buildSteamerUnit — the object itself. cordStyle:
 *   "lie"  — trails along the ground to the back right (the desk scene)
 *   "coil" — a neat coil on the plinth under the unit (the turntable scene)
 *   "case" — a coil sitting inside the open case
 *   "none" — no cord drawn
 */
export const buildSteamerUnit = (
  mats: UnitMaterials,
  cordStyle: "lie" | "coil" | "case" | "none" = "lie",
): SteamerUnit => {
  const unit = new THREE.Group();

  /* ── The press head: clamp-plate block, canted forward 8 degrees ── */
  const head = new THREE.Mesh(roundedBox(HEAD_W, HEAD_H, HEAD_D, 0.012, 0.004), mats.ceramicShell);
  head.position.set(0, H - HEAD_H / 2, 0.004);
  head.rotation.x = -0.14;
  head.castShadow = true;
  unit.add(head);

  /* The clamp opening: a recessed dark slot across the head's working face,
     where the fabric passes. The one feature that makes it read as a press. */
  const slot = new THREE.Mesh(roundedBox(HEAD_W * 0.82, HEAD_H * 0.3, 0.006, 0.004, 0.0015), mats.slotDark);
  slot.position.set(0, H - HEAD_H * 0.46, HEAD_D / 2 + 0.002);
  slot.rotation.x = -0.14;
  unit.add(slot);

  /* Brass frame around the working face — the one warm metal, as a rule. */
  const frameGeo = roundedBox(HEAD_W * 0.98, 0.0055, 0.0055, 0.002, 0.001);
  const frameTop = new THREE.Mesh(frameGeo, mats.brass);
  frameTop.position.set(0, H - HEAD_H * 0.08, HEAD_D / 2 + 0.002);
  frameTop.rotation.x = -0.14;
  unit.add(frameTop);
  const frameBottom = new THREE.Mesh(frameGeo, mats.brass);
  frameBottom.position.set(0, H - HEAD_H * 0.78, HEAD_D / 2 + 0.002);
  frameBottom.rotation.x = -0.14;
  unit.add(frameBottom);

  /* The ceramic plate, visible in the slot's mouth. */
  const plateLip = new THREE.Mesh(roundedBox(HEAD_W * 0.78, 0.004, HEAD_D * 0.66, 0.005, 0.0015), mats.plate);
  plateLip.position.set(0, H - HEAD_H * 0.62, HEAD_D / 2 + 0.001);
  plateLip.rotation.x = -0.14;
  unit.add(plateLip);

  /* The outlet: a small ceramic spout canted forward off the working
     face — the one detail that makes the head read as a steam path. */
  const spout = new THREE.Mesh(roundedBox(HEAD_W * 0.46, 0.013, 0.022, 0.004, 0.0018), mats.plate);
  spout.position.set(0, H - HEAD_H * 0.5, HEAD_D / 2 + 0.013);
  spout.rotation.x = -0.42;
  spout.castShadow = true;
  unit.add(spout);

  /* ── The handle: slim column under the head, slight backward cant ── */
  const handleH = H - HEAD_H - 0.012;
  const handle = new THREE.Mesh(
    roundedBox(HANDLE_W, handleH, HANDLE_D, 0.01, 0.003),
    mats.ceramicShell,
  );
  handle.position.set(0, handleH / 2 + 0.012, 0.002);
  handle.rotation.x = 0.05;
  handle.castShadow = true;
  unit.add(handle);

  /* Leather-wrapped grip, mid-handle — where the hand actually sits. */
  const grip = new THREE.Mesh(
    roundedBox(HANDLE_W * 1.04, handleH * 0.34, HANDLE_D * 1.06, 0.009, 0.003),
    mats.leather,
  );
  grip.position.set(0, handleH * 0.44 + 0.012, 0.002);
  grip.rotation.x = 0.05;
  unit.add(grip);

  /* Stitching line on the grip: two brass hairlines. */
  for (const sx of [-1, 1]) {
    const stitch = new THREE.Mesh(new THREE.BoxGeometry(0.0012, handleH * 0.3, 0.0012), mats.brass);
    stitch.position.set(sx * HANDLE_W * 0.5, handleH * 0.44 + 0.012, HANDLE_D / 2 + 0.001);
    unit.add(stitch);
  }

  /* Trigger + three level dots, ink, on the handle's front face. */
  const trigger = new THREE.Mesh(roundedBox(0.012, 0.02, 0.006, 0.003, 0.0015), mats.ink);
  trigger.position.set(0, handleH * 0.78 + 0.012, HANDLE_D / 2 + 0.002);
  unit.add(trigger);
  for (let i = 0; i < 3; i++) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.0022, 12, 10), mats.ink);
    dot.position.set(0, handleH * 0.68 + 0.012 - i * 0.011, HANDLE_D / 2 + 0.002);
    unit.add(dot);
  }

  /* Water window: a small ink-soft panel on the handle, above the grip. */
  const window = new THREE.Mesh(roundedBox(0.012, handleH * 0.16, 0.002, 0.002, 0.0008), mats.windowMat);
  window.position.set(0, handleH * 0.68 + 0.012, HANDLE_D / 2 + 0.0015);
  unit.add(window);

  /* ── The foot: brass ring at the base of the handle ── */
  const foot = new THREE.Mesh(new THREE.TorusGeometry(HANDLE_W * 0.62, 0.0035, 12, 40), mats.brass);
  foot.rotation.x = Math.PI / 2;
  foot.position.y = 0.013;
  unit.add(foot);

  /* ── The cord ── */
  if (cordStyle === "lie") {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.006, 0.011, 0.004),
      new THREE.Vector3(0.07, 0.005, -0.03),
      new THREE.Vector3(0.17, 0.0035, -0.075),
      new THREE.Vector3(0.3, 0.0035, -0.13),
      new THREE.Vector3(0.42, 0.0035, -0.1),
    ]);
    const cord = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.0032, 8, false), mats.cord);
    cord.castShadow = true;
    unit.add(cord);
  }
  if (cordStyle === "coil") {
    /* Neat coil on the plinth under the unit — a turntable cannot drag a tail. */
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 44; i++) {
      const t = (i / 44) * Math.PI * 2 * 1.6;
      const r = 0.045 + (i / 44) * 0.03;
      pts.push(new THREE.Vector3(Math.cos(t) * r, 0.0065, Math.sin(t) * r));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const cord = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.0032, 8, false), mats.cord);
    unit.add(cord);
  }
  if (cordStyle === "case") {
    /* A coil resting inside the case's felt well. */
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 34; i++) {
      const t = (i / 34) * Math.PI * 2 * 1.25;
      const r = 0.028 + (i / 34) * 0.018;
      pts.push(new THREE.Vector3(Math.cos(t) * r, 0.004, Math.sin(t) * r));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const cord = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.0032, 8, false), mats.cord);
    cord.position.set(-0.15, 0.075, 0.0);
    unit.add(cord);
  }

  /* Invisible anchor at the working face — the steam wisp is born here. */
  const steamAnchor = new THREE.Object3D();
  steamAnchor.position.set(0, H - HEAD_H * 0.2, HEAD_D / 2 + 0.05);
  unit.add(steamAnchor);

  return { group: unit, steamAnchor };
};
