"use client";

/*
  TRACK ORDER — the honest placeholder. Batch 01 has not shipped, so no
  order exists to track; this panel says exactly that and checks
  nothing. It is not a broken feature: it is a module that has not been
  given a true thing to display yet, and it declines to invent one.
  When Batch 01 ships, this is where tracking lands.
*/

import { useId, useState } from "react";
import { BATCH } from "@/data/funnel";

export function TrackOrder({ className = "" }: { className?: string }) {
  const inputId = useId();
  const [ref, setRef] = useState("");
  const [asked, setAsked] = useState(false);

  return (
    <div className={className}>
      <p className="label text-graphite-70">Track an order</p>
      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          setAsked(true);
        }}
      >
        <div className="field flex-1">
          <label htmlFor={inputId} className="label">
            Order number or email
          </label>
          <input
            id={inputId}
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="PLIMS-2026-0001"
            className="field-input"
            inputMode="text"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="button button-ghost sm:mb-0">
          Track
        </button>
      </form>
      {asked ? (
        <div className="mt-5 border-t border-hair pt-5" aria-live="polite">
          <p className="body max-w-[52ch]">
            {BATCH.name} has not shipped, so there is no order to look up — and this panel does not
            pretend to check. Nothing was searched, nothing was sent.
          </p>
          <p className="form-note mt-3 max-w-[52ch] text-graphite-70">
            When {BATCH.name} ships, this is where the tracking lands: same panel, same page, a real
            number to type.
          </p>
        </div>
      ) : (
        <p className="form-note mt-3 max-w-[52ch] text-graphite-70">
          Placeholder by design — {BATCH.name} has not shipped, so there is nothing to track yet.
        </p>
      )}
    </div>
  );
}
