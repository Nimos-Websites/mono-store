"use client";

/*
  THE BUY BOX — quick-add is the whole interaction: one tap writes the
  cart, flies the disc, opens the drawer. There is no second step and no
  threshold game. One price, stated beside the button, with the batch cap
  said honestly: 250 units is the operating model, not a countdown, and
  there is no live count we cannot verify.

  Two variants, one component. `hero` is the placard over the render:
  price, quantity, the add, the list — and nothing else, because the
  hero's job is the add. `stack` is the standing one in the commerce
  stack, where the batch cap, the shipping and warranty rows and the
  payment trust row belong.
*/

import { useState } from "react";
import { BATCH } from "@/data/funnel";
import { PRODUCT } from "@/lib/brand";
import { formatPrice } from "@/lib/catalog";
import { PaymentRow } from "./payment-row";
import { quickAdd } from "./drawer-store";

const QTY = [1, 2, 3];

export function BuyBox({
  variant = "stack",
  className = "",
}: {
  variant?: "hero" | "stack";
  className?: string;
}) {
  const [qty, setQty] = useState(1);
  const total = PRODUCT.price * qty;

  const price = (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
      <p className="flex items-baseline gap-3">
        <span className="font-serif text-[clamp(46px,4.6vw,68px)] leading-none tracking-[-0.02em] [font-variant:tabular-nums]">
          {formatPrice(total)}
        </span>
        <span className="label text-graphite-70">
          USD{qty > 1 ? ` · ${qty} systems` : ""}
        </span>
      </p>
      <p className="form-note max-w-[30ch] text-graphite-70">{PRODUCT.compareAtNote}</p>
    </div>
  );

  const stepper = (
    <div className="flex items-center border border-graphite" role="group" aria-label="Quantity">
      {QTY.map((n) => (
        <button
          key={n}
          type="button"
          aria-pressed={qty === n}
          onClick={() => setQty(n)}
          className={`mono min-h-11 min-w-11 cursor-pointer px-4 py-3 text-[14px] ${
            qty === n ? "bg-graphite text-on-dark" : "bg-transparent text-graphite-70 hover:text-graphite"
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );

  const actions = (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={(e) => quickAdd(PRODUCT.handle, qty, e.currentTarget)}
        className="button button-signal"
      >
        Add to cart · {formatPrice(total)}
      </button>
      <a href="#product-join" className="button button-ghost">
        Join the list
      </a>
    </div>
  );

  if (variant === "hero") {
    return (
      <div className={className}>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <div className="min-w-0">{price}</div>
          <div className="flex flex-wrap items-center gap-4">
            {stepper}
            {actions}
          </div>
        </div>
        <p className="form-note mt-5 max-w-[64ch] text-graphite-70">
          One price, shipping inside it. Availability is confirmed when you order; the cart is real and
          checkout is closed by design until Batch 01 ships.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {price}
      <div className="mt-7 flex flex-wrap items-center gap-4">
        {stepper}
        {actions}
      </div>

      <p className="form-note mt-5 max-w-[62ch] text-graphite-70">
        One price. No bundle discount and no free-shipping threshold — two systems cost two prices, and
        shipping is inside the $89. Availability is confirmed when you order; the cart is real and
        checkout is closed by design until Batch 01 ships.
      </p>

      <dl className="ledger mt-8">
        <div className="ledger-row ledger-row-stack">
          <dt className="ledger-key">{BATCH.name}</dt>
          <dd className="ledger-val">
            {BATCH.units} units · the cap is the operating model, not a countdown
          </dd>
        </div>
        <div className="ledger-row ledger-row-stack">
          <dt className="ledger-key">Ships from</dt>
          <dd className="ledger-val">Our own stock · confirmed when you order</dd>
        </div>
        <div className="ledger-row ledger-row-stack">
          <dt className="ledger-key">Warranty</dt>
          <dd className="ledger-val">3 years, registered online · terms published</dd>
        </div>
      </dl>

      <div className="mt-8">
        <PaymentRow />
      </div>
    </div>
  );
}
