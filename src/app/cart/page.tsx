/* Full-page cart — the ledger component plus an empty state. Client-run
 * state under a local provider (layout is owned by another agent, so the
 * provider mounts here, not at the root).
 */
"use client";

import Link from "next/link";
import { CartLedger } from "@/components/cart/cart-ledger";
import { CartProvider, useCart } from "@/components/cart/cart-provider";

function CartBody() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="wrap-narrow">
        <h1 className="title-l">Your cart is empty.</h1>
        <p className="lede mt-7 max-w-[38ch]">
          Nothing is in it, and nothing was charged to find that out.
        </p>
        <Link href="/products" className="arrow-link tap mt-9" data-magnetic>
          <span>Browse the products</span>
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-7">
        <h1 className="title-l">Your cart.</h1>
        <p className="body mt-6 max-w-[44ch]">
          Quantities save on this device only. Leaving the page keeps them; clearing the browser
          clears them.
        </p>
        <div className="mt-12">
          <CartLedger />
        </div>
      </div>
      <div className="md:col-span-4 md:col-start-9">
        <div className="md:sticky md:top-[calc(var(--head-h)+32px)]">
          <h2 className="title-s">What happens next.</h2>
          <p className="body mt-5 max-w-[36ch]">
            Checkout opens the payment page. If it is not open yet, the button says so and offers
            the list instead — it never pretends to charge.
          </p>
          <p className="form-note mt-6 max-w-[36ch]">
            No account, no saved card, no email sent. The cart is a list of handles and quantities
            in this browser&apos;s storage.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <div className="band-tight pt-[calc(var(--head-h)+48px)]">
        <CartBody />
      </div>
    </CartProvider>
  );
}
