"use client";

/*
  THE CART DRAWER — the commerce surface every buy button opens.
  · fly-to-cart: a disc leaves the pressed button and lands on the cart
    (skipped entirely under reduced motion — the drawer just opens)
  · upsell module: the honest one. Add-ons are RESERVATIONS at $0,
    quoted before Batch 01 ships — not discounts, not fake urgency
  · the checkout path is the real one: POST /api/checkout prices the
    basket server-side; while the gate is closed the drawer says so and
    offers the list instead of pretending to charge
*/

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartLines, writeCart } from "@/components/cart/cart-store";
import { getProduct, formatPrice } from "@/lib/catalog";
import { ADD_ONS, BATCH } from "@/data/funnel";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { PaymentRow } from "./payment-row";
import { clearFlight, closeCart, readReservations, useDrawer, writeReservations } from "./drawer-store";

function FlyDisc({ x, y, label }: { x: number; y: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const anchor = document.querySelector<HTMLElement>('header a[href="/cart"]');
    const r = anchor?.getBoundingClientRect();
    const tx = r ? r.left + r.width / 2 - x : window.innerWidth - 72 - x;
    const ty = r ? r.top + r.height / 2 - y : 96 - y;
    const anim = el.animate(
      [
        { transform: "translate3d(0,0,0) scale(1)", opacity: 1 },
        { transform: `translate3d(${tx * 0.72}px, ${ty * 0.72 - 26}px, 0) scale(0.72)`, opacity: 0.95, offset: 0.7 },
        { transform: `translate3d(${tx}px, ${ty}px, 0) scale(0.14)`, opacity: 0 },
      ],
      { duration: 620, easing: "cubic-bezier(0.5, 0, 0.2, 1)" },
    );
    const done = () => clearFlight();
    anim.onfinish = done;
    anim.oncancel = done;
    return () => {
      anim.onfinish = null;
      anim.oncancel = null;
      anim.cancel();
    };
  }, [x, y]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-lamp bg-steam"
      style={{ left: x - 24, top: y - 24 }}
    >
      <span className="mono text-[11px] text-graphite">{label}</span>
    </div>
  );
}

type CheckoutState = "idle" | "posting" | "closed";

function DrawerBody() {
  const { open, flight } = useDrawer();
  const lines = useCartLines();
  const [checkout, setCheckout] = useState<CheckoutState>("idle");
  /* The drawer only mounts once a buy button opens it — a client-only
     mount, so the lazy read is safe and never hydrates against a server
     render that does not exist. */
  const [reservations, setReservations] = useState<string[]>(readReservations);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const items = lines
    .map((l) => {
      const product = getProduct(l.handle);
      return product ? { ...l, product } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);
  const count = items.reduce((n, i) => n + i.qty, 0);

  const setQty = (handle: string, qty: number) => {
    const next =
      qty <= 0 ? lines.filter((l) => l.handle !== handle) : lines.map((l) => (l.handle === handle ? { ...l, qty } : l));
    writeCart(next);
  };

  const toggleReservation = (id: string) => {
    const next = reservations.includes(id) ? reservations.filter((r) => r !== id) : [...reservations, id];
    setReservations(next);
    writeReservations(next);
  };

  async function onCheckout() {
    if (items.length === 0) return;
    setCheckout("posting");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map((i) => ({ handle: i.handle, qty: i.qty })) }),
      });
      const data: unknown = await res.json().catch(() => null);
      const url = data && typeof data === "object" && "url" in data && typeof (data as { url: unknown }).url === "string" ? (data as { url: string }).url : null;
      if (res.ok && url) {
        window.location.assign(url);
        return;
      }
    } catch {
      /* A network failure and a closed checkout look the same from here. */
    }
    setCheckout("closed");
  }

  /* Escape closes; body locks while open; focus moves in and comes back. */
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => panelRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {flight ? <FlyDisc x={flight.x} y={flight.y} label={flight.label} /> : null}
      <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
        <button
          type="button"
          aria-label="Close cart"
          onClick={closeCart}
          className="absolute inset-0 cursor-default bg-graphite/40"
        />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Cart"
          tabIndex={-1}
          className="relative flex h-full w-full max-w-[440px] flex-col border-l-2 border-graphite bg-ground"
        >
          <div className="flex items-center justify-between border-b border-hair px-6 py-5">
            <p className="title-s">Your cart</p>
            <button
              type="button"
              onClick={closeCart}
              className="tap cursor-pointer bg-transparent text-[13px] text-graphite-70 underline underline-offset-4 hover:text-graphite"
            >
              Close
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div>
                <p className="body">Nothing in it yet, and nothing was charged to find that out.</p>
                <p className="form-note mt-4 text-graphite-70">
                  One product, one price: {formatPrice(getProduct("the-steamer")?.price ?? 89)} for the system —
                  unit, case, cup, protocol card, warranty.
                </p>
              </div>
            ) : (
              <ul className="border-t border-hair">
                {items.map((i) => (
                  <li key={i.handle} className="grid grid-cols-[56px_1fr_auto] gap-x-4 border-b border-hair py-5">
                    <div className="relative h-14 w-14 flex-none overflow-hidden bg-steam">
                      <Image src={i.product.image} alt="" fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium leading-snug">{i.product.name}</p>
                      <p className="micro mt-1">{formatPrice(i.product.price)} each</p>
                      <div className="mt-3 flex items-center gap-1" role="group" aria-label={`Quantity for ${i.product.name}`}>
                        <button
                          type="button"
                          onClick={() => setQty(i.handle, i.qty - 1)}
                          aria-label={`Decrease quantity of ${i.product.name}`}
                          className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center border border-hair bg-transparent text-[18px] leading-none"
                        >
                          <span aria-hidden="true">−</span>
                        </button>
                        <span className="mono min-w-8 text-center" aria-live="polite">{i.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(i.handle, i.qty + 1)}
                          aria-label={`Increase quantity of ${i.product.name}`}
                          className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center border border-hair bg-transparent text-[18px] leading-none"
                        >
                          <span aria-hidden="true">+</span>
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="mono font-medium">{formatPrice(i.qty * i.product.price)}</p>
                      <button
                        type="button"
                        onClick={() => setQty(i.handle, 0)}
                        className="tap mt-2 cursor-pointer bg-transparent text-[12px] text-graphite-70 underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* ── The upsell module: reservations, never invented prices ── */}
            <div className="mt-8 border-t border-hair pt-6">
              <p className="label text-graphite-70">Reserve with the order · $0 until quoted</p>
              <div className="mt-4 grid gap-3">
                {ADD_ONS.map((a) => {
                  const on = reservations.includes(a.id);
                  return (
                    <label
                      key={a.id}
                      className={`flex cursor-pointer gap-3 border p-3 transition-colors ${
                        on ? "border-lamp bg-steam" : "border-hair"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggleReservation(a.id)}
                        className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--lamp)]"
                      />
                      <span>
                        <span className="block text-[14px] font-medium">{a.item}</span>
                        <span className="form-note mt-1 block max-w-[44ch] text-graphite-70">{a.detail}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
              <p className="form-note mt-3 text-graphite-70">
                {reservations.length > 0
                  ? `${reservations.length} reservation${reservations.length > 1 ? "s" : ""} attached — quoted before ${BATCH.name} ships, never charged here.`
                  : "Reservations are notes on the order, not line items. They carry no price until we quote them."}
              </p>
            </div>

            {checkout === "closed" ? (
              <div className="mt-8 bg-steam p-6" aria-live="polite">
                <h2 className="title-s">Checkout opens when Batch 01 ships.</h2>
                <p className="body mt-3">
                  The button is wired to a real endpoint, and the endpoint is closed by design until
                  Batch 01 is ready. Nothing was charged, nothing was ordered. The list is the queue:
                </p>
                <div className="mt-5">
                  <WaitlistForm />
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t-2 border-graphite px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[15px] font-medium">Subtotal</span>
              <span className="mono text-[20px] font-medium" aria-live="polite">{formatPrice(subtotal)}</span>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              disabled={items.length === 0 || checkout === "posting"}
              className="button button-signal button-block mt-4 disabled:cursor-wait disabled:opacity-70"
            >
              {checkout === "posting" ? "Opening checkout" : count > 1 ? `Checkout · ${formatPrice(subtotal)}` : "Checkout"}
            </button>
            <p className="form-note mt-3 text-graphite-70">
              Subtotal only. {BATCH.name} caps at {BATCH.units} units — the cap is the operating model, not a countdown.
            </p>
            <div className="mt-5">
              <PaymentRow />
            </div>
            <p className="form-note mt-4 text-graphite-70">
              <Link href="/cart" onClick={closeCart} className="tap underline underline-offset-4">
                Open the full cart page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function CartDrawer() {
  const { open } = useDrawer();
  /* The scrim and panel render only while open; the fly disc lives here
     so it can animate above the panel as it slides in. */
  return open ? <DrawerBody /> : null;
}
