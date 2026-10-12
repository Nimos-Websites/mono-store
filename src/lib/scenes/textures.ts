/*
  PROCEDURAL TEXTURES — every surface in the scene library is painted
  here, in code. No network request, no external asset, no HDRI: the
  page asks nothing of anyone's CDN. 256–512 px canvases, generated
  once per scene mount and disposed with it.

  Palette discipline: warm plaster, pale oak, washed linen, saddle
  leather, brass — the same materials the furniture house uses. Nothing
  here is a photograph of anything.
*/

import * as THREE from "three";

const canvas2d = (size: number): HTMLCanvasElement => {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  return c;
};

const toTexture = (c: HTMLCanvasElement, repeat = 1): THREE.CanvasTexture => {
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
};

/* Deterministic value noise so every mount renders the same surface. */
const rng = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

/* Warm limewash plaster: faint mottling, no repeat visible at plinth scale. */
export const plasterTexture = (size = 512, repeat = 1): THREE.CanvasTexture => {
  const c = canvas2d(size);
  const ctx = c.getContext("2d");
  if (!ctx) return toTexture(c);
  const rand = rng(7);
  ctx.fillStyle = "#efece5";
  ctx.fillRect(0, 0, size, size);
  /* Broad trowel drift */
  for (let i = 0; i < 90; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 24 + rand() * 90;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const warm = rand() > 0.5;
    g.addColorStop(0, warm ? "rgba(214,207,195,0.20)" : "rgba(246,244,239,0.24)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  /* Fine tooth */
  const img = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (rand() - 0.5) * 7;
    img.data[i] = Math.max(0, Math.min(255, img.data[i] + n));
    img.data[i + 1] = Math.max(0, Math.min(255, img.data[i + 1] + n));
    img.data[i + 2] = Math.max(0, Math.min(255, img.data[i + 2] + n));
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(c, repeat);
};

/* Pale oak: straight cathedral grain, warm sand tone. */
export const oakTexture = (size = 512, repeat = 1): THREE.CanvasTexture => {
  const c = canvas2d(size);
  const ctx = c.getContext("2d");
  if (!ctx) return toTexture(c);
  const rand = rng(23);
  ctx.fillStyle = "#d8c6a8";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 150; i++) {
    const y = rand() * size;
    const wob = 6 + rand() * 16;
    ctx.strokeStyle = `rgba(${112 + rand() * 40 | 0},${88 + rand() * 30 | 0},${58 + rand() * 24 | 0},${0.07 + rand() * 0.14})`;
    ctx.lineWidth = 0.6 + rand() * 2.2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= size; x += 16) {
      ctx.lineTo(x, y + Math.sin((x / size) * Math.PI * 2 + i) * wob * 0.35 + (rand() - 0.5) * 2);
    }
    ctx.stroke();
  }
  /* Cathedral arcs — the one feature that makes a flat plane read oak. */
  for (let i = 0; i < 9; i++) {
    ctx.strokeStyle = `rgba(120,94,62,${0.1 + rand() * 0.1})`;
    ctx.lineWidth = 1 + rand() * 2.4;
    ctx.beginPath();
    ctx.ellipse(rand() * size, rand() * size, 30 + rand() * 60, 12 + rand() * 26, rand() * Math.PI, 0, Math.PI * 2);
    ctx.stroke();
  }
  const img = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (rand() - 0.5) * 9;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(c, repeat);
};

/* Washed linen: a fine plain weave, warm white. */
export const linenTexture = (size = 256, repeat = 1): THREE.CanvasTexture => {
  const c = canvas2d(size);
  const ctx = c.getContext("2d");
  if (!ctx) return toTexture(c, repeat);
  const rand = rng(41);
  ctx.fillStyle = "#ece7dc";
  ctx.fillRect(0, 0, size, size);
  const step = 4;
  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      const warp = (Math.floor(x / step) + Math.floor(y / step)) % 2 === 0;
      ctx.fillStyle = warp ? "rgba(255,253,248,0.5)" : "rgba(196,188,172,0.28)";
      ctx.fillRect(x, y, step, step);
    }
  }
  /* Slubby irregularities */
  for (let i = 0; i < 220; i++) {
    ctx.fillStyle = `rgba(255,255,255,${0.05 + rand() * 0.12})`;
    ctx.fillRect(rand() * size, rand() * size, 2 + rand() * 10, 1);
  }
  return toTexture(c, 3);
};

/* Case felt: soft directional nap, clay tone. */
export const feltTexture = (size = 256, repeat = 1): THREE.CanvasTexture => {
  const c = canvas2d(size);
  const ctx = c.getContext("2d");
  if (!ctx) return toTexture(c, 2);
  const rand = rng(59);
  ctx.fillStyle = "#8a6f4e";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 2400; i++) {
    const x = rand() * size;
    const y = rand() * size;
    ctx.strokeStyle = rand() > 0.5 ? "rgba(255,240,214,0.10)" : "rgba(52,38,24,0.14)";
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 1.4, y + (rand() - 0.5) * 2.4);
    ctx.stroke();
  }
  return toTexture(c, repeat);
};

/* Soft radial falloff used as the contact shadow under every stand. */
export const contactShadowTexture = (size = 256): THREE.CanvasTexture => {
  const c = canvas2d(size);
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 2 - 2);
    g.addColorStop(0, "rgba(26,24,20,0.42)");
    g.addColorStop(0.55, "rgba(26,24,20,0.16)");
    g.addColorStop(1, "rgba(26,24,20,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(c);
  return tex;
};

/* The pool of light a gallery floor gets under one object: a soft warm
   wash, brightest in the middle, gone at the edge. Additive over the
   plaster so the ground never turns grey, only lit. */
export const poolOfLightTexture = (size = 512): THREE.CanvasTexture => {
  const c = canvas2d(size);
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 2 - 2);
    g.addColorStop(0, "rgba(255,252,244,0.55)");
    g.addColorStop(0.42, "rgba(255,250,240,0.26)");
    g.addColorStop(0.72, "rgba(255,248,236,0.07)");
    g.addColorStop(1, "rgba(255,248,236,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(c);
  return tex;
};

/* A soft brush of light across a surface — the window's fall on the desk.
   Drawn once, used additive, never a photograph of anything. */
export const lightFallTexture = (size = 512): THREE.CanvasTexture => {
  const c = canvas2d(size);
  c.width = size;
  c.height = size / 2;
  const ctx = c.getContext("2d");
  if (ctx) {
    const h = size / 2;
    const g = ctx.createRadialGradient(size * 0.42, h * 0.18, 4, size * 0.42, h * 0.3, size * 0.44);
    g.addColorStop(0, "rgba(255,247,232,0.5)");
    g.addColorStop(0.5, "rgba(255,244,226,0.2)");
    g.addColorStop(1, "rgba(255,244,226,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, h);
  }
  const tex = new THREE.CanvasTexture(c);
  return tex;
};

/* The studio's soft gradient environment — one window, one bounce. */
export const studioEnvTexture = (
  top = "#ffffff",
  mid = "#f1eee7",
  low = "#cfc9bd",
  horizon = "#a49c8e",
): THREE.CanvasTexture => {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, top);
    g.addColorStop(0.4, mid);
    g.addColorStop(0.62, low);
    g.addColorStop(1, horizon);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 256);
    /* The window: a bright soft rectangle, offset so reflections have a direction. */
    const win = ctx.createRadialGradient(150, 54, 4, 150, 54, 130);
    win.addColorStop(0, "rgba(255,255,255,0.95)");
    win.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = win;
    ctx.fillRect(0, 0, 512, 256);
    const bounce = ctx.createRadialGradient(400, 210, 4, 400, 210, 150);
    bounce.addColorStop(0, "rgba(255,236,214,0.5)");
    bounce.addColorStop(1, "rgba(255,236,214,0)");
    ctx.fillStyle = bounce;
    ctx.fillRect(0, 0, 512, 256);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};
