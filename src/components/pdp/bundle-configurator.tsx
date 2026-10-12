/* ─────────────────────────────────────────────────────────────────────────
 * THE CONFIGURATOR — the offer as a working centerpiece. Pattern 118's
 * fabric-picker logic (swatches change what you get) and 134's volume
 * honesty, in our own DOM: every system part is included, add-ons are
 * reservations rather than upsells, and the total is the total.
 *
 * Honesty law: no invented prices. Add-ons are reserved at $0 with the
 * quote stated as coming before Batch 01 ships. The batch cap is real
 * (250 units, PRODUCT-DECISION.md) and there is no live count we cannot
 * verify — so the bar shows the cap, not a fake fill.
 * ─────────────────────────────────────────────────────────────────────── */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CartProvider, useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/catalog";
import { ADD_ONS, BATCH, SYSTEM_PARTS, TRUST_BADGES } from "@/data/funnel";
import { PRODUCT } from "@/lib/brand";

function Configurator() {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [picked, setPicked] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  const toggle = (id: string) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));

  const total = useMemo(() => PRODUCT.price * qty, [qty]);
  const reservationCount = picked.length;

  return (
    <section aria-labelledby="config-title" className="band-tight">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <h2 id="config-title" className="title-m">
            Build the system.
          </h2>
          <p className="body mt-6 max-w-[42ch]">
            Five parts, one price, nothing to configure away. The add-ons exist because service is the
            product — they are reservations, not upsells, and they are quoted before Batch 01 ships.
          </p>

          <dl className="ledger mt-9">
            {SYSTEM_PARTS.map((p) => (
              <div key={p.item} className="ledger-row ledger-row-stack">
                <dt className="ledger-key">{p.item}</dt>
                <dd className="ledger-val">
                  {p.detail} <span className="text-lamp">· included</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div className="border-2 border-graphite p-7">
            <p className="label text-graphite-70">The add-ons — reservations, quoted before Batch 01</p>
            <div className="mt-5 grid gap-4">
              {ADD_ONS.map((a) => {
                const on = picked.includes(a.id);
                return (
                  <label
                    key={a.id}
                    className={`flex cursor-pointer gap-4 border p-4 transition-colors ${
                      on ? "border-lamp bg-steam" : "border-hair"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggle(a.id)}
                      className="mt-1 h-5 w-5 shrink-0 accent-[var(--lamp)]"
                    />
                    <span>
                      <span className="title-s block">{a.item}</span>
                      <span className="body mt-2 block max-w-[48ch] text-graphite-70">{a.detail}</span>
                      <span className="mono mt-2 block text-lamp">
                        {formatPrice(0)} · reserved, not charged
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="mt-8 flex items-end justify-between border-t-2 border-graphite pt-6">
              <div>
                <p className="label text-graphite-70">Total</p>
                <p className="font-serif text-[clamp(40px,4vw,56px)] leading-none tracking-[-0.02em] [font-variant:tabular-nums]">
                  {formatPrice(total)}
                </p>
                <p className="form-note mt-2 text-graphite-70">
                  {reservationCount > 0
                    ? `${reservationCount} reservation${reservationCount > 1 ? "s" : ""} attached · $0 until quoted`
                    : "No add-ons selected · the system is complete as it is"}
                </p>
              </div>
              <div className="flex items-center border border-graphite" role="group" aria-label="Quantity">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={qty === n}
                    onClick={() => setQty(n)}
                    className={`mono px-4 py-3 text-[14px] tabular ${
                      qty === n ? "bg-graphite text-on-dark" : "text-graphite-70"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  add(PRODUCT.handle, qty);
                  setAdded(true);
                }}
                className="button button-signal"
              >
                Add to cart · {formatPrice(total)}
              </button>
              <Link href="/cart" className="button button-ghost">
                {added ? "View cart" : "Open cart"}
              </Link>
            </div>

            {/* The honest batch cap — the number is real, the queue is the list. */}
            <div className="mt-8 border-t border-hair pt-6">
              <div className="flex items-baseline justify-between">
                <p className="label text-graphite-70">
                  {BATCH.name} · {BATCH.units} units
                </p>
                <span className="mono text-graphite-70">cap</span>
              </div>
              <div className="mt-3 h-2 w-full bg-hair" aria-hidden>
                <span className="block h-full w-0 bg-lamp" />
              </div>
              <p className="form-note mt-3 max-w-[56ch] text-graphite-70">{BATCH.note}</p>
            </div>
          </div>

          {/* Provenance / trust near the money (pattern 127). */}
          <dl className="ledger mt-8">
            {TRUST_BADGES.map((b) => (
              <div key={b.label} className="ledger-row ledger-row-stack">
                <dt className="ledger-key">{b.label}</dt>
                <dd className="ledger-val text-graphite-70">{b.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function BundleConfigurator() {
  return (
    <CartProvider>
      <Configurator />
    </CartProvider>
  );
}
