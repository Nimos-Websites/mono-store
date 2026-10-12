/* Product buy box — sticky purchase panel. Title, lib price, the honest
 * no-compare-at line, a ledger of what the feed actually says, then two
 * actions side by side with exactly one primary: Add to cart (signal).
 * The secondary action scrolls to the capture form below it.
 *
 * The generic JoinForm equivalent here is WaitlistForm: reserve-form's
 * JoinForm prints steamer-only terms, which would be false claims on any
 * other product, so it is not reused.
 */
"use client";

import Link from "next/link";
import { useState } from "react";
import { CartProvider, useCart } from "@/components/cart/cart-provider";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { formatPrice, type Product } from "@/lib/catalog";

function BuyActions({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            add(product.handle, 1);
            setAdded(true);
          }}
          className="button button-signal"
        >
          Add to cart · {formatPrice(product.price)}
        </button>
        <a href="#product-join" className="button button-ghost">
          Join the list
        </a>
      </div>
      <div aria-live="polite">
        {added ? (
          <p className="mono mt-4">
            <span aria-hidden="true">— </span>
            Added.{" "}
            <Link href="/cart" className="tap underline underline-offset-4">
              View cart
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ProductBuyBox({ product }: { product: Product }) {
  return (
    <aside
      aria-label={`Buy ${product.name}`}
      className="md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 md:sticky md:top-[calc(var(--head-h)+32px)] md:self-start"
    >
      <div className="border-t-2 border-graphite pt-7">
        <h1 className="title-m">{product.name}</h1>
        <p className="mt-5 flex items-baseline gap-4">
          <span className="font-serif text-[clamp(38px,4.4vw,56px)] leading-none tracking-[-0.02em]">
            {formatPrice(product.price)}
          </span>
          <span className="label text-graphite-70">USD</span>
        </p>
        <p className="form-note mt-4 text-graphite-70">
          No compare-at price — there has never been one.
        </p>

        <div className="ledger mt-8 [&_.ledger-key]:text-graphite-70">
          <div className="ledger-row">
            <span className="ledger-key">Category</span>
            <span className="ledger-val">{product.category}</span>
          </div>
          <div className="ledger-row">
            <span className="ledger-key">Supplier</span>
            <span className="ledger-val">
              {product.supplier ?? "Not named in the source feed"}
            </span>
          </div>
          <div className="ledger-row">
            <span className="ledger-key">Ships from</span>
            <span className="ledger-val">{product.shipsTo.join(", ")}</span>
          </div>
          <div className="ledger-row">
            <span className="ledger-key">Weight</span>
            <span className="ledger-val">{product.weightKg} kg</span>
          </div>
          <div className="ledger-row">
            <span className="ledger-key">Availability</span>
            <span className="ledger-val">Confirmed when you order</span>
          </div>
        </div>

        <hr className="rule mt-11" />

        <div className="mt-9">
          <CartProvider>
            <BuyActions product={product} />
          </CartProvider>
        </div>

        <div id="product-join" className="mt-9 scroll-mt-[calc(var(--head-h)+16px)] bg-steam p-7">
          <h2 className="title-s">Not buying yet.</h2>
          <p className="body mt-4">
            One field, one line in a file. No order, no payment, no email sent.
          </p>
          <div className="mt-6">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </aside>
  );
}
