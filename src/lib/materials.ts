const mulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const size = 512;

const makeCanvas = () => {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  return c;
};

const bake = (draw: (ctx: CanvasRenderingContext2D) => void): HTMLCanvasElement => {
  const canvas = makeCanvas();
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx);
  return canvas;
};

/* Ceramic soleplate: fine matte grain with a faint kiln mottle. */
export const ceramicCanvas = (): HTMLCanvasElement =>
  bake((ctx) => {
    const rand = mulberry32(20482);
    ctx.fillStyle = "#dedad0";
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 190; i++) {
      const y = rand() * size;
      const drift = (rand() - 0.5) * 16;
      const width = 0.5 + rand() * 2.6;
      const dark = rand();
      ctx.strokeStyle = `rgba(${dark > 0.72 ? "150,145,134" : "246,243,236"},${0.05 + rand() * 0.15})`;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(-10, y);
      for (let x = 0; x <= size + 10; x += 16) {
        ctx.lineTo(x, y + Math.sin((x / size) * Math.PI * 2 + i) * drift * 0.12 + drift * 0.3);
      }
      ctx.stroke();
    }

    for (let i = 0; i < 420; i++) {
      const x = rand() * size;
      const y = rand() * size;
      const len = 8 + rand() * 46;
      ctx.strokeStyle = `rgba(255,255,255,${0.05 + rand() * 0.13})`;
      ctx.lineWidth = 0.7 + rand() * 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + len, y + (rand() - 0.5) * 2);
      ctx.stroke();
    }

    for (let i = 0; i < 2600; i++) {
      const x = rand() * size;
      const y = rand() * size;
      ctx.fillStyle = `rgba(126,122,112,${rand() * 0.08})`;
      ctx.fillRect(x, y, 1 + rand() * 2, 1 + rand() * 2);
    }
  });

/* Brushed graphite shell: fine vertical tooling marks on a dark anodised body. */
export const shellCanvas = (): HTMLCanvasElement =>
  bake((ctx) => {
    const rand = mulberry32(71013);
    ctx.fillStyle = "#24282b";
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 5200; i++) {
      const x = rand() * size;
      const y = rand() * size;
      const r = 2 + rand() * 7;
      const lift = rand();
      const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
      g.addColorStop(0, `rgba(150,164,172,${0.1 + lift * 0.12})`);
      g.addColorStop(1, "rgba(8,10,12,0.16)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * (0.7 + rand() * 0.5), rand() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < 3400; i++) {
      const x = rand() * size;
      const y = rand() * size;
      ctx.fillStyle = `rgba(${rand() > 0.5 ? "8,10,12" : "168,180,188"},${rand() * 0.12})`;
      ctx.fillRect(x, y, 1, 1 + rand() * 2);
    }

    const sheen = ctx.createLinearGradient(0, 0, size, size);
    sheen.addColorStop(0, "rgba(214,232,240,0.09)");
    sheen.addColorStop(0.5, "rgba(0,0,0,0)");
    sheen.addColorStop(1, "rgba(6,8,10,0.14)");
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, size, size);
  });

/* Limewashed plaster: soft trowel mottle, no direction. */
export const sweepCanvas = (): HTMLCanvasElement =>
  bake((ctx) => {
    const rand = mulberry32(3391);
    ctx.fillStyle = "#eef0ef";
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 190; i++) {
      const x = rand() * size;
      const y = rand() * size;
      const r = 40 + rand() * 130;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const tone = rand() > 0.5 ? "255,255,255" : "203,207,208";
      g.addColorStop(0, `rgba(${tone},${0.1 + rand() * 0.14})`);
      g.addColorStop(1, `rgba(${tone},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }

    for (let i = 0; i < 9000; i++) {
      const x = rand() * size;
      const y = rand() * size;
      ctx.fillStyle = `rgba(110,116,120,${rand() * 0.05})`;
      ctx.fillRect(x, y, 1, 1);
    }
  });

export type MaterialName = "ceramic" | "shell" | "sweep";

export const materialCanvas = (name: MaterialName): HTMLCanvasElement => {
  if (name === "ceramic") return ceramicCanvas();
  if (name === "shell") return shellCanvas();
  return sweepCanvas();
};

export const materialDataUrl = (name: MaterialName): string =>
  materialCanvas(name).toDataURL("image/jpeg", 0.86);