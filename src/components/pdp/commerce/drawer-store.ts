"use client";

/*
  Drawer state + cart actions — the shared surface every buy button on
  the page writes to. Module-level store (same discipline as cart-store:
  no provider required, no hydration hazard, one broadcast event).

  flyToCart records WHERE the add happened so the drawer can fly a
  disc from that button to the cart. With prefers-reduced-motion the
  flight is skipped entirely — the drawer simply opens, because a
  parcel parading across the screen is decoration.
*/

import { useSyncExternalStore } from "react";
import { readCart, writeCart, type CartLine } from "@/components/cart/cart-store";
import { getProduct } from "@/lib/catalog";

export type Flight = { id: number; x: number; y: number; label: string };

type DrawerState = { open: boolean; flight: Flight | null };

const EMPTY: DrawerState = { open: false, flight: null };

let state: DrawerState = EMPTY;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());
const patch = (next: Partial<DrawerState>) => {
  state = { ...state, ...next };
  emit();
};

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

const snapshot = (): DrawerState => state;

export const useDrawer = () => useSyncExternalStore(subscribe, snapshot, snapshot);

export const openCart = () => patch({ open: true });
export const closeCart = () => patch({ open: false });
export const clearFlight = () => patch({ flight: null });

const prefersReducedFlight = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Record the origin of the add, then open the drawer. */
export const flyToCart = (from: HTMLElement | null, label: string) => {
  const rect = from?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 72;
  const y = rect ? rect.top + rect.height / 2 : 96;
  patch({ flight: { id: Date.now(), x, y, label }, open: true });
};

const labelFor = (handle: string): string => {
  const p = getProduct(handle);
  return p ? `$${p.price}` : "";
};

/** The one-tap buy: validate against the catalogue, write, fly, open. */
export const quickAdd = (handle: string, qty = 1, from?: HTMLElement | null) => {
  if (!getProduct(handle)) return;
  const lines = readCart();
  const found = lines.find((l) => l.handle === handle);
  const next: CartLine[] = found
    ? lines.map((l) => (l.handle === handle ? { ...l, qty: l.qty + qty } : l))
    : [...lines, { handle, qty }];
  writeCart(next);
  if (prefersReducedFlight()) openCart();
  else flyToCart(from ?? null, labelFor(handle));
};

/* ── Reservations: the honest upsell state, kept beside the cart ── */
const RESERVATION_KEY = "mono-reservations-v1";

export const readReservations = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RESERVATION_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
};

export const writeReservations = (ids: string[]) => {
  try {
    window.localStorage.setItem(RESERVATION_KEY, JSON.stringify(ids));
  } catch {
    /* Private mode: the reservation note still works for the visit. */
  }
};
