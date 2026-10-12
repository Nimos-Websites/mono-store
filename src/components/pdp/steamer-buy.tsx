/* Steamer buy actions — the real cart path. Quantity selector writes
 * real lines to the shared store; the cart page reads them back and
 * /api/checkout prices every line server-side (gated closed by
 * design). No client-side money is ever trusted.
 *
 * Honesty law: no bundle discount, no threshold game, no strike-through.
 * One price. It is the price. Two systems cost two prices.
 */
"use client";

import Link from "next/link";
import { useState } from "react";
import { CartProvider, useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/catalog";
import { PRODUCT } from "@/lib/brand";

function Actions() {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center border border-graphite" role="group" aria-label="Quantity">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={qty === n}
              onClick={() => setQty(n)}
              className={`mono px-4 py-3 text-[14px] tabular ${
                qty === n ? "bg-graphite text-on-dark" : "text-graphite-70 hover:text-graphite"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            add(PRODUCT.handle, qty);
            setAdded(true);
          }}
          className="button button-signal"
        >
          Add to cart · {formatPrice(PRODUCT.price * qty)}
        </button>
        <a href="#product-join" className="button button-ghost">
          Join the list
        </a>
      </div>
      <div aria-live="polite">
        {added ? (
          <p className="mono mt-4">
            <span aria-hidden="true">— </span> Added {qty > 1 ? `${qty} × ` : ""}
            {PRODUCT.name}.{" "}
            <Link href="/cart" className="tap underline underline-offset-4">
              View cart
            </Link>
          </p>
        ) : null}
      </div>
      <p className="form-note mt-4 text-graphite-70">
        No bundle discount and no threshold: two systems cost two prices. Availability is confirmed
        when you order. The cart is real; checkout is closed by design.
      </p>
    </div>
  );
}

export function SteamerBuyActions() {
  return (
    <CartProvider>
      <Actions />
    </CartProvider>
  );
}
