import * as THREE from "three";
import { buildSteamerUnit, buildUnitMaterials } from "./scenes/steamer-unit";
import { contactShadowTexture, studioEnvTexture } from "./scenes/textures";

/*
  The MONO Steamer, as rendered on the catalogue and home pages.
  The model itself now lives in ./scenes/steamer-unit.ts — one object,
  one geometry set, rendered by every scene in the library so the hero
  of this page and the hero of the home page can never diverge.

  This composes the standing shot: the unit on the alabaster ground with
  its cord trailing, studio window key, warm bounce, cool rim. Core
  three.js only — no addons, no HDRI download, no external asset.
  The DPR is capped by the scene wrapper; the renderer is destroyed
  when the canvas scrolls out of view and on unmount.
*/

export type ProductHandles = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  dispose: () => void;
};

export const buildProduct = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  dpr: number,
): ProductHandles => {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(dpr);
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const src = studioEnvTexture();
  scene.environment = pmrem.fromEquirectangular(src).texture;
  src.dispose();
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(30, width / height, 0.05, 30);
  camera.position.set(0.42, 0.34, 0.56);
  camera.lookAt(0, 0.14, 0);

  const mats = buildUnitMaterials();
  const { group: unit } = buildSteamerUnit(mats, "lie");
  scene.add(unit);

  /* Ground + contact shadow: the alabaster paper the object stands on. */
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(2.4, 64),
    new THREE.MeshStandardMaterial({ color: 0xefece5, roughness: 0.96 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const contact = new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.3),
    new THREE.MeshBasicMaterial({
      map: contactShadowTexture(),
      transparent: true,
      depthWrite: false,
    }),
  );
  contact.rotation.x = -Math.PI / 2;
  contact.position.y = 0.0012;
  scene.add(contact);

  /* Lighting: studio window key, warm bounce, cool rim. Nothing pulses. */
  const key = new THREE.DirectionalLight(0xffffff, 2.9);
  key.position.set(-1.5, 2.4, 1.6);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 0.3;
  key.shadow.camera.far = 6;
  key.shadow.camera.left = -0.8;
  key.shadow.camera.right = 0.8;
  key.shadow.camera.top = 0.8;
  key.shadow.camera.bottom = -0.8;
  key.shadow.bias = -0.0006;
  key.shadow.normalBias = 0.006;
  scene.add(key);

  const bounce = new THREE.DirectionalLight(0xffe9d8, 0.4);
  bounce.position.set(1.8, 0.5, -0.9);
  scene.add(bounce);

  const rim = new THREE.DirectionalLight(0xbcd8e6, 0.55);
  rim.position.set(0.4, 1.1, -1.8);
  scene.add(rim);

  scene.add(new THREE.HemisphereLight(0xfbfcfd, 0x9aa0a4, 0.45));

  const dispose = () => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const m = obj.material;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m.dispose();
      }
    });
    Object.values(mats).forEach((m) => m.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
  };

  return { scene, camera, renderer, dispose };
};
