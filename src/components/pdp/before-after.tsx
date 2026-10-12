/* ─────────────────────────────────────────────────────────────────────────
 * BEFORE / AFTER — pattern 71 transplanted with its constants kept:
 * clip-path inset driven by a draggable divider, pointer capture, 0–100
 * clamp. The images are our generated frames, labelled as generated —
 * the slider demonstrates the format, it does not fake a result.
 * ─────────────────────────────────────────────────────────────────────── */
"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { BEFORE_AFTER } from "@/data/funnel";

export function BeforeAfter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);

  const setFrom = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPct(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section aria-labelledby="ba-title" className="band band-ink">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <h2 id="ba-title" className="title-m text-on-dark">
            Drag it.
          </h2>
          <p className="body-lg mt-6 max-w-[40ch] text-on-dark-64">
            The category is won on one content format: a visible transformation in seconds. Here it is
            as a working slider instead of a video you have to sit through.
          </p>
          <p className="form-note mt-6 max-w-[44ch] text-on-dark-64">{BEFORE_AFTER.disclosure}</p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div
            ref={wrapRef}
            role="slider"
            tabIndex={0}
            aria-label="Before and after comparison"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPct((p) => Math.max(0, p - 4));
              if (e.key === "ArrowRight") setPct((p) => Math.min(100, p + 4));
            }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDragging(true);
              setFrom(e.clientX);
            }}
            onPointerMove={(e) => {
              if (dragging) setFrom(e.clientX);
            }}
            onPointerUp={() => setDragging(false)}
            className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden border border-on-dark/20 touch-none"
          >
            <Image
              src={BEFORE_AFTER.before}
              alt="Generated frame: washed heavyweight linen in warm light"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pct}%)` }}>
              <Image
                src={BEFORE_AFTER.after}
                alt="Generated frame: a linen shirt on a hanger against a limewashed wall"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="absolute top-0 bottom-0 w-[2px] bg-ground" style={{ left: `${pct}%` }}>
              <span className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ground text-[13px] text-graphite">
                ⇔
              </span>
            </div>
            <span className="mono absolute bottom-3 left-3 bg-graphite/70 px-2 py-1 text-[11px] text-on-dark">
              BEFORE
            </span>
            <span className="mono absolute bottom-3 right-3 bg-graphite/70 px-2 py-1 text-[11px] text-on-dark">
              AFTER
            </span>
          </div>
          <p className="form-note mt-4 text-on-dark-64">
            Generated frames, both of them. The product render is above; this is the format the
            category is won on, not a result we are claiming.
          </p>
        </div>
      </div>
    </section>
  );
}
