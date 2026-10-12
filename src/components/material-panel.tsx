"use client";

import { useEffect, useRef } from "react";
import { materialCanvas, type MaterialName } from "@/lib/materials";

type Props = {
  name: MaterialName;
  /** Caption is metadata about the material — never a section heading. */
  caption: string;
  spec?: string;
  className?: string;
  zoom?: number;
};

export function MaterialPanel({
  name,
  caption,
  spec,
  className,
  zoom = 1,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const source = materialCanvas(name);
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const sw = source.width * zoom;
      const sh = source.height * zoom;
      const ox = (sw - canvas.width) / 2;
      const oy = (sh - canvas.height) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(source, -ox, -oy, sw, sh);
    };

    draw();

    const ro = new ResizeObserver(() => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      draw();
    });
    ro.observe(canvas);

    return () => ro.disconnect();
  }, [name, zoom]);

  return (
    <figure className={className}>
      <canvas
        ref={ref}
        role="img"
        aria-label={`${name === "ceramic" ? "Ceramic soleplate" : name === "shell" ? "Graphite shell" : "Studio sweep"} surface study, procedurally generated. ${spec ?? ""}`}
      />
      <figcaption className="mt-3 flex items-baseline justify-between gap-4">
        <span className="label">{caption}</span>
        {spec ? <span className="mono opacity-70">{spec}</span> : null}
      </figcaption>
    </figure>
  );
}