/* Shared cart storage — client-safe, no React dependency.
 *
 * One localStorage key, one broadcast event. The header reads the count
 * through useCartCount without needing the provider (layout is owned by
 * another agent, so no provider can be mounted there); the provider keeps
 * its own state in sync through the same event + the storage event.
 */
"use client";

import { useSyncExternalStore } from "react";

export type CartLine = { handle: string; qty: number };

export const CART_KEY = "mono-cart-v1";
export const CART_EVENT = "mono-cart-updated";

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        typeof l === "object" &&
        l !== null &&
        typeof (l as CartLine).handle === "string" &&
        Number.isInteger((l as CartLine).qty) &&
        (l as CartLine).qty > 0,
    );
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]): void {
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  } catch {
    /* Private mode or quota: the in-memory state still works for the visit. */
  }
  window.dispatchEvent(new CustomEvent(CART_EVENT));
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.qty, 0);
}

/* Live cart lines for any component, provider or not. useSyncExternalStore
 * is the correct primitive for browser storage: server snapshot is stable
 * (empty), the client catches up after mount inside subscribe, so there is
 * no hydration mismatch and no setState-in-effect. */
let cache: CartLine[] = [];

function clientSnapshot(): CartLine[] {
  return cache;
}

/* A stable empty snapshot: getServerSnapshot must return a cached value,
   a fresh [] literal every call reads as an infinite loop to React. */
const EMPTY: CartLine[] = [];

function serverSnapshot(): CartLine[] {
  return EMPTY;
}

function subscribe(notify: () => void): () => void {
  const sync = () => {
    cache = readCart();
    notify();
  };
  window.addEventListener(CART_EVENT, sync);
  window.addEventListener("storage", sync);
  /* Catch-up: storage may hold lines from a previous visit that the empty
     initial snapshot does not include. Runs post-mount, so notifying here
     is a subscription update, not a render-phase setState. */
  const fresh = readCart();
  if (JSON.stringify(fresh) !== JSON.stringify(cache)) {
    cache = fresh;
    notify();
  }
  return () => {
    window.removeEventListener(CART_EVENT, sync);
    window.removeEventListener("storage", sync);
  };
}

export function useCartLines(): CartLine[] {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}

/* Live badge count for chrome that lives outside the provider. */
export function useCartCount(): number {
  return cartCount(useCartLines());
}
