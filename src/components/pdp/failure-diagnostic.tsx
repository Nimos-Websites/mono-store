/* ─────────────────────────────────────────────────────────────────────────
 * WHICH ONE DIDN'T BREAK — the diagnostic funnel.
 *
 * The ICP line turned into a page mechanic: the buyer already owns a
 * dead steamer, so the page opens by asking which way it failed. Every
 * path ends in the system's answer and the one real CTA — the list.
 * There is no persona scoring, no fake result, no email harvested
 * before the visitor has something to show for it.
 *
 * The capture is the API that exists (POST /api/waitlist). No send.
 * ─────────────────────────────────────────────────────────────────────── */
"use client";

import { useState } from "react";
import { FAILURE_MODES } from "@/data/failure-ledger";

export function FailureDiagnostic() {
  const [picked, setPicked] = useState<string | null>(null);
  const active = FAILURE_MODES.find((m) => m.id === picked) ?? null;

  return (
    <section aria-labelledby="act-diagnostic" className="band-tight border-t border-hair">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <p className="label text-graphite-70">The one question</p>
          <h2 id="act-diagnostic" className="title-m mt-5">
            Which one didn&apos;t break.
          </h2>
          <p className="body mt-6 max-w-[44ch]">
            If you have owned a handheld steamer, you already know how it ends. Pick the ending you
            got. The answer is the same system, every time — that is the point of selling it as one.
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div className="flex flex-wrap gap-3" role="group" aria-label="Choose the failure you had">
            {FAILURE_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                aria-pressed={picked === mode.id}
                onClick={() => setPicked(mode.id === picked ? null : mode.id)}
                className={`button ${picked === mode.id ? "button-signal" : "button-ghost"}`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-8 min-h-[9rem] border-t-2 border-graphite pt-7">
            {active ? (
              <>
                <p className="label text-graphite-70">What the system does about it</p>
                <p className="body-lg mt-4 max-w-[52ch]">{active.answer}</p>
                <p className="form-note mt-6 text-graphite-70">
                  That is the whole answer, and it is the same $89 for whichever one you got.
                </p>
              </>
            ) : (
              <p className="body max-w-[52ch] text-graphite-70">
                Nothing is hidden behind the buttons. Pick one and the answer appears here, in full,
                with no form to fill first.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
