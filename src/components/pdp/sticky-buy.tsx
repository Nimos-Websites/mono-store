/* ─────────────────────────────────────────────────────────────────────────
 * THE STICKY BUY BAR — the Ridge device: the warranty is the product,
 * so the warranty never leaves the screen.
 *
 * Appears once the hero is gone. Carries the price, the three claims
 * and the real quick-add — same store, same drawer, same server-side
 * pricing. One scroll owner: a passive listener toggles visibility;
 * the reduced-motion path never animates.
 * ─────────────────────────────────────────────────────────────────────── */
"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/catalog";
import { PRODUCT } from "@/lib/brand";
import { quickAdd } from "./commerce/drawer-store";

export function StickyBuyBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-shown={shown}
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-40 border-t-2 border-graphite bg-ground transition-transform duration-300 ${
        shown ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="wrap flex items-center justify-between gap-6 py-4">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-[28px] leading-none tracking-[-0.02em] [font-variant:tabular-nums]">
            {PRODUCT.priceLabel}
          </span>
          <span className="label hidden text-graphite-70 sm:inline">
            3-year warranty · case · protocol card · no compare-at price
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => quickAdd(PRODUCT.handle, 1, e.currentTarget)}
          className="button button-signal"
          tabIndex={shown ? undefined : -1}
        >
          Add to cart · {formatPrice(PRODUCT.price)}
        </button>
      </div>
    </div>
  );
}
