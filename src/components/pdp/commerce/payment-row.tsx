/*
  PAYMENT ROW — the trust strip every serious DTC buy box carries.
  Typographic wordmarks only: no trademark art is redrawn, no logo is
  embedded, and the line under it says the true thing — Stripe is the
  processor, and checkout opens when Batch 01 ships. Nothing here
  implies a charge can be taken today.
*/

const METHODS = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"];

export function PaymentRow({ note = true }: { note?: boolean }) {
  return (
    <div>
      <ul className="flex flex-wrap items-center gap-2" aria-label="Payment methods accepted at checkout">
        {METHODS.map((m) => (
          <li
            key={m}
            className="mono flex min-h-[32px] items-center border border-hair px-3 text-[11px] tracking-[0.12em] text-graphite-70 uppercase"
          >
            {m}
          </li>
        ))}
      </ul>
      {note ? (
        <p className="form-note mt-3 max-w-[46ch] text-graphite-70">
          Processed by Stripe when checkout opens with Batch 01. Until then no card field exists on
          this site, and nothing here can be charged.
        </p>
      ) : null}
    </div>
  );
}
