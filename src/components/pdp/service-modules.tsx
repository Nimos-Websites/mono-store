/* ─────────────────────────────────────────────────────────────────────────
 * SERVICE MODULES — the pattern set that makes ownership feel like a
 * product: 214 care ritual (the protocol as steps), 217 warranty flow
 * (claims in three taps), 46 odometer (real category numbers), and the
 * honest review/UGC shell — the real module, with no invented content.
 * ─────────────────────────────────────────────────────────────────────── */
"use client";

import { useEffect, useRef, useState } from "react";
import { CARE_RITUAL, CATEGORY_STATS, WARRANTY_FLOW } from "@/data/funnel";
import { useReducedMotion } from "@/components/motion/lib/useReducedMotion";

/* ── 214 · care ritual ─────────────────────────────────────────────────── */
export function CareRitual() {
  return (
    <section aria-labelledby="ritual-title" className="band-tight border-t border-hair">
      <div className="wrap">
        <h2 id="ritual-title" className="title-m max-w-[22ch]">
          The protocol card, as a ritual.
        </h2>
        <p className="body mt-6 max-w-[56ch]">
          Four steps. They are printed on the card in the box because the category&apos;s failure
          modes are maintenance failures before they are hardware failures.
        </p>
        <div className="mt-12 grid gap-px border-t border-hair md:grid-cols-4">
          {CARE_RITUAL.map((r, i) => (
            <article key={r.step} className="border-b border-hair py-8 pr-8 md:border-b-0 md:pr-10">
              <p className="mono text-lamp">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="title-s mt-4">{r.step}</h3>
              <p className="body mt-4 max-w-[38ch]">{r.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 217 · warranty flow ───────────────────────────────────────────────── */
export function WarrantyFlow() {
  return (
    <section aria-labelledby="warranty-title" className="band band-ink">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <h2 id="warranty-title" className="title-m text-on-dark">
            Claims resolve in three taps.
          </h2>
          <p className="body-lg mt-6 max-w-[40ch] text-on-dark-64">
            Service is the product. The claim path is printed on the warranty card, the freight is on
            us, and the terms are published before you buy — not after it breaks.
          </p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <div className="flex flex-col">
            {WARRANTY_FLOW.map((w, i) => (
              <article
                key={w.step}
                className="grid gap-4 border-t border-on-dark/20 py-7 md:grid-cols-12 md:gap-8"
              >
                <p className="mono text-lamp md:col-span-2">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="title-s text-on-dark md:col-span-4">{w.step}</h3>
                <p className="body text-on-dark-64 md:col-span-6">{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 46 · odometer — the real category numbers, rolling on entry ───────── */
function OdometerValue({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const DUR = 1100; /* the pattern's roll duration, kept */
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / DUR);
          setShown(value * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, reduced]);

  /* Reduced motion renders the final figure immediately — no animation,
     no download, no setState-in-effect. */
  const display = reduced ? value : shown;
  const isInt = Number.isInteger(value);
  return (
    <span ref={ref} className="[font-variant:tabular-nums lining-nums]">
      {isInt ? Math.round(display).toLocaleString() : display.toFixed(1)}
      {suffix}
    </span>
  );
}

export function CategoryStats() {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      {CATEGORY_STATS.map((s) => (
        <div key={s.label}>
          <p className="font-serif text-[clamp(2.6rem,2rem+3vw,4.2rem)] leading-none tracking-[-0.03em] text-on-dark">
            <OdometerValue value={s.value} suffix={s.suffix} />
          </p>
          <p className="title-s mt-4 text-on-dark">{s.label}</p>
          <p className="form-note mt-2 max-w-[30ch] text-on-dark-64">{s.note}</p>
        </div>
      ))}
    </div>
  );
}

/* ── The honest review / UGC shell ─────────────────────────────────────── */
export function ReviewShell() {
  return (
    <section aria-labelledby="reviews-title" className="band-tight border-t border-hair">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <h2 id="reviews-title" className="title-m">
            The reviews module, empty and labelled.
          </h2>
          <p className="body mt-6 max-w-[40ch]">
            A new brand with no units in the field has no reviews. So the module ships empty and says
            so — the summary skeleton is the real component, waiting on the first Batch 01 owner.
          </p>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <div className="border-2 border-hair p-7">
            <div className="flex items-center gap-5">
              <span className="font-serif text-[40px] leading-none text-graphite-70 [font-variant:tabular-nums]">
                0.0
              </span>
              <div>
                <div className="flex gap-1" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="text-graphite-70">
                      ☆
                    </span>
                  ))}
                </div>
                <p className="form-note mt-2 text-graphite-70">0 reviews · 0 with photos · 0 verified</p>
              </div>
            </div>
            <div className="mt-7 grid gap-3" aria-hidden>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-4">
                  <span className="mono w-4 text-graphite-70">{star}★</span>
                  <span className="h-2 flex-1 bg-hair" />
                  <span className="mono w-10 text-right text-graphite-70">0%</span>
                </div>
              ))}
            </div>
            <p className="form-note mt-7 max-w-[56ch] text-graphite-70">
              Creator content and owner photos land here unedited — including the bad ones — the week
              Batch 01 ships. Until then, the module stays visibly empty rather than filled with
              anything invented.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
