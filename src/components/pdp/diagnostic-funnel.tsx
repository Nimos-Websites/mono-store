/* ─────────────────────────────────────────────────────────────────────────
 * THE DIAGNOSTIC FUNNEL — pattern 103 (gift finder quiz) transplanted:
 * three taps → the answer. The ICP line "which one didn't break" as a
 * working centerpiece. Physics kept: 0.4s fade-rise per step, 0.08
 * stagger between question and options (gsap constants preserved).
 *
 * Honesty law: every path ends at the same system — the page says so
 * instead of pretending to personalise. No email is asked before the
 * visitor has the answer.
 * ─────────────────────────────────────────────────────────────────────── */
"use client";

import { useCallback, useState } from "react";
import { FUNNEL_RESULT, FUNNEL_STEPS } from "@/data/funnel";
import { PRODUCT } from "@/lib/brand";

type Phase = { kind: "question"; index: number } | { kind: "result" };

export function DiagnosticFunnel() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>({ kind: "question", index: 0 });

  /* The pattern's entrance physics, preserved: opacity 0→1, y 10→0, 0.4s,
     0.08 stagger — as a CSS animation replayed by remount (key), so there
     is no setState-in-effect and the reduced-motion path is a plain
     readable static state (globals.css: .rise-in, media-query guarded). */
  const pick = useCallback((value: string) => {
    setAnswers((prev) => {
      const next = [...prev, value];
      setPhase(next.length >= FUNNEL_STEPS.length ? { kind: "result" } : { kind: "question", index: next.length });
      return next;
    });
  }, []);

  const restart = () => {
    setAnswers([]);
    setPhase({ kind: "question", index: 0 });
  };

  const progress = phase.kind === "question" ? phase.index : FUNNEL_STEPS.length;
  const phaseKey = phase.kind === "question" ? `q-${phase.index}` : "result";

  return (
    <section aria-labelledby="funnel-title" className="band band-bone">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <h2 id="funnel-title" className="title-m">
            Three taps. Then the answer.
          </h2>
          <p className="body mt-6 max-w-[40ch]">
            How the last one ended, where it lives, what matters now. The funnel exists because the
            answer is the same system in every combination — and saying so beats a quiz that pretends
            otherwise.
          </p>
          <div className="mt-8 flex items-center gap-3" aria-hidden>
            {FUNNEL_STEPS.map((s, i) => (
              <span
                key={s.id}
                className={`h-px flex-1 ${i < progress ? "bg-lamp" : "bg-hair"}`}
              />
            ))}
          </div>
          <p className="mono mt-3 text-graphite-70">
            {Math.min(progress + 1, FUNNEL_STEPS.length)} / {FUNNEL_STEPS.length}
          </p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="border-t-2 border-graphite pt-8">
            {phase.kind === "question" ? (
              <div key={phaseKey}>
                <p className="title-s rise-in">{FUNNEL_STEPS[phase.index].question}</p>
                <div className="mt-8 flex flex-wrap gap-3 rise-in rise-in-delay">
                  {FUNNEL_STEPS[phase.index].options.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => pick(o.value)}
                      className="button button-ghost"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div key={phaseKey} className="rise-in">
                <p className="label text-lamp">{FUNNEL_RESULT.headline}</p>
                <p className="body-lg mt-5 max-w-[52ch]">{FUNNEL_RESULT.body}</p>
                <p className="form-note mt-5 max-w-[52ch] text-graphite-70">{FUNNEL_RESULT.route}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href="#product-join" className="button button-signal">
                    {FUNNEL_RESULT.cta}
                  </a>
                  <button type="button" onClick={restart} className="button button-ghost">
                    Start over
                  </button>
                </div>
                <p className="form-note mt-6 text-graphite-70">
                  Your answers: {answers.join(" · ")}. Nothing was sent anywhere.
                </p>
              </div>
            )}
          </div>
          <p className="form-note mt-8 max-w-[62ch] text-graphite-70">
            The {PRODUCT.priceLabel} system answers all four failure modes. That is the product.
          </p>
        </div>
      </div>
    </section>
  );
}
