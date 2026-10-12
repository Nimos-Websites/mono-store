/* Cart ledger — the hairline-cart-ledger behavior (597) wired to real state:
 * thumb, title, variant, unit price, quantity stepper, line total per row,
 * closed by a subtotal strip and a single full-width checkout action.
 * Every amount is recomputed from cart state on each render.
 *
 * Touch targets are 44px minimum (the catalogue pattern's 22px steppers are
 * enlarged — the design-system law overrides catalogue chrome). Amounts sit
 * right-aligned in their own column (quote-panel law).
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { formatPrice, getProduct } from "@/lib/catalog";

type CheckoutState = "idle" | "posting" | "not-open";

export function CartLedger() {
  const { items, subtotal, setQty, remove } = useCart();
  const [checkout, setCheckout] = useState<CheckoutState>("idle");

  async function onCheckout() {
    setCheckout("posting");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ handle: i.handle, qty: i.qty })),
        }),
      });
      const data: unknown = await res.json().catch(() => null);
      const url =
        data && typeof data === "object" && "url" in data && typeof data.url === "string"
          ? data.url
          : null;
      if (res.ok && url) {
        window.location.assign(url);
        return;
      }
    } catch {
      /* A network failure and a closed checkout look the same from here:
         nothing was charged, nothing was ordered. */
    }
    setCheckout("not-open");
  }

  if (items.length === 0) return null;

  return (
    <div>
      <ul className="border-t border-hair" aria-label="Cart contents">
        {items.map((item) => {
          const product = getProduct(item.handle);
          const lineTotal = item.qty * item.price;
          return (
            <li
              key={item.handle}
              className="grid grid-cols-[44px_1fr_auto] items-center gap-x-4 gap-y-2 border-b border-hair py-5 sm:grid-cols-[44px_1fr_auto_auto_auto]"
            >
              <div className="relative h-11 w-11 flex-none overflow-hidden bg-steam">
                {product ? (
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="min-w-0">
                <p className="truncate text-[15px] font-medium leading-snug">
                  <Link
                    href={`/products/${item.handle}`}
                    className="tap underline decoration-hair underline-offset-4 hover:decoration-graphite"
                  >
                    {item.name}
                  </Link>
                </p>
                {product ? (
                  <p className="micro mt-1">{product.category}</p>
                ) : null}
              </div>

              <p className="mono text-right text-graphite-70 max-sm:col-start-2">
                {formatPrice(item.price)} each
              </p>

              <div
                className="flex items-center gap-1 max-sm:col-start-2"
                role="group"
                aria-label={`Quantity for ${item.name}`}
              >
                <button
                  type="button"
                  onClick={() => setQty(item.handle, item.qty - 1)}
                  aria-label={`Decrease quantity of ${item.name}`}
                  className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center border border-hair bg-transparent text-[18px] leading-none transition-colors hover:border-graphite"
                >
                  <span aria-hidden="true">−</span>
                </button>
                <span
                  className="mono min-w-8 text-center"
                  aria-live="polite"
                  aria-label={`Quantity: ${item.qty}`}
                >
                  {item.qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(item.handle, item.qty + 1)}
                  aria-label={`Increase quantity of ${item.name}`}
                  className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center border border-hair bg-transparent text-[18px] leading-none transition-colors hover:border-graphite"
                >
                  <span aria-hidden="true">+</span>
                </button>
              </div>

              <div className="flex items-center justify-end gap-4 max-sm:col-start-3 max-sm:row-start-1 max-sm:self-start sm:justify-end">
                <p className="mono text-right font-medium">{formatPrice(lineTotal)}</p>
                <button
                  type="button"
                  onClick={() => remove(item.handle)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="tap cursor-pointer bg-transparent text-[13px] text-graphite-70 underline underline-offset-4 transition-colors hover:text-graphite"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex items-baseline justify-between gap-6 border-t-2 border-graphite py-6">
        <span className="text-[15px] font-medium">Subtotal</span>
        <span className="mono text-right text-[20px] font-medium" aria-live="polite">
          {formatPrice(subtotal)}
        </span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={checkout === "posting"}
        className="button button-signal button-block disabled:cursor-wait disabled:opacity-70"
      >
        {checkout === "posting" ? "Opening checkout" : "Checkout"}
      </button>
      <p className="form-note mt-4 text-graphite-70">
        Subtotal only. Nothing here charges a card or places an order until a checkout page opens
        and says so.
      </p>

      {checkout === "not-open" ? (
        <div className="mt-10 bg-steam p-7 sm:p-10" aria-live="polite">
          <h2 className="title-s">Checkout opens soon — join the list.</h2>
          <p className="body mt-4 max-w-[52ch]">
            There is no checkout to open yet, so this button cannot take you anywhere. Leave an
            address and you will hear about it in public, the same as everyone else on the list. No
            email is sent, nobody is contacted.
          </p>
          <div className="mt-7 max-w-[420px]">
            <WaitlistForm />
          </div>
        </div>
      ) : null}
    </div>
  );
}
