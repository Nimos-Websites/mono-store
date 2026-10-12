/* Cart state — localStorage-backed. Totals are recomputed from state on
 * every render; money text is never edited in place.
 */
"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { getProduct } from "@/lib/catalog";
import {
  useCartLines,
  writeCart,
  type CartLine,
} from "@/components/cart/cart-store";

export type CartItem = CartLine & { price: number; name: string };

type CartContext = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (handle: string, qty?: number) => void;
  remove: (handle: string) => void;
  setQty: (handle: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartContext | null>(null);

/* Lines pointing at handles that no longer exist in the catalogue are
   dropped on load — never rendered, never billed. */
function resolve(lines: CartLine[]): CartItem[] {
  const out: CartItem[] = [];
  for (const l of lines) {
    const p = getProduct(l.handle);
    if (p) out.push({ handle: l.handle, qty: l.qty, price: p.price, name: p.name });
  }
  return out;
}

export function CartProvider({ children }: { children: ReactNode }) {
  /* Lines live in the shared external store; committing writes storage and
     broadcasts, and every subscriber (this provider included) re-reads. */
  const lines = useCartLines();

  const commit = useCallback((next: CartLine[]) => {
    writeCart(next.filter((l) => l.qty > 0));
  }, []);

  const add = useCallback(
    (handle: string, qty = 1) => {
      if (!getProduct(handle)) return;
      const found = lines.find((l) => l.handle === handle);
      commit(
        found
          ? lines.map((l) => (l.handle === handle ? { ...l, qty: l.qty + qty } : l))
          : [...lines, { handle, qty }],
      );
    },
    [lines, commit],
  );

  const remove = useCallback(
    (handle: string) => commit(lines.filter((l) => l.handle !== handle)),
    [lines, commit],
  );

  const setQty = useCallback(
    (handle: string, qty: number) => {
      if (!Number.isInteger(qty)) return;
      commit(
        qty <= 0
          ? lines.filter((l) => l.handle !== handle)
          : lines.map((l) => (l.handle === handle ? { ...l, qty } : l)),
      );
    },
    [lines, commit],
  );

  const clear = useCallback(() => commit([]), [commit]);

  const value = useMemo<CartContext>(() => {
    const items = resolve(lines);
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
      add,
      remove,
      setQty,
      clear,
    };
  }, [lines, add, remove, setQty, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
