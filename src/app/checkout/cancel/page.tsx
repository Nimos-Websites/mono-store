import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout cancelled",
  description:
    "You left checkout before paying. Nothing was charged and no order was placed.",
};

export default function CancelPage() {
  return (
    <div className="band-tight pt-[calc(var(--head-h)+32px)]">
      <div className="wrap-narrow">
        <p className="label">Checkout</p>
        <h1 className="title-m mt-4">Nothing was charged.</h1>
        <p className="lede mt-5">
          You left checkout before paying, so no order was placed and no money
          moved.
        </p>
        <p className="body mt-4">
          Your cart is untouched. Come back whenever you are ready — the
          steamer will still be thirty seconds away from wrinkle-free.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/cart" className="button button-signal">
            Return to your cart
          </Link>
          <Link href="/products" className="button button-ghost">
            Browse products
          </Link>
        </div>
      </div>
    </div>
  );
}
