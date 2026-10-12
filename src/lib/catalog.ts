/* Catalogue access — server-importable. No client hooks, no browser APIs.
 *
 * Every figure originates in data/catalogue/2026-10-09.json (schema cjcat/1)
 * via scripts/sync-catalog.mjs. Nothing here is invented.
 */
import data from "@/data/products.json";

export type Product = {
  handle: string;
  pid: string;
  name: string;
  category: string;
  supplier: string | null;
  shipsTo: string[];
  freeShipping: boolean;
  weightKg: number;
  cogs: number;
  freight: number;
  landed: number;
  price: number;
  stock: number | null;
  sku: string;
  sugRetail: number;
  image: string;
  /* The one product that is NOT priced by the catalogue rule. It is sold
     as a system at the product decision's price, and it is excluded from
     the rule-priced index for exactly that reason. */
  system?: boolean;
};

const PRODUCTS = data as Product[];

/* Pricing rule (law, single source — mirrored in scripts/sync-catalog.mjs):
   price(handle) = ceil(landed / 0.45), whole dollars. */
export function priceFor(landed: number): number {
  return Math.ceil(landed / 0.45);
}

export const PRICE_RULE =
  "Our price is the ceiling of landed cost divided by 0.45, in whole dollars. One rule, every product.";

/* Labels quoted from the source feed itself, not invented. Every candidate
   in the 2026-10-09 feed carries this source value and fetch date. */
export const FEED_SOURCE = "CJ product/list + product/query";
export const FEED_DATE = "9 October 2026";

export function getProducts(): Product[] {
  return PRODUCTS;
}

export function getProduct(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}

/* Site convention is "$89", not the en-CA "US$10" — en-US formats the
   same USD whole dollars the way the rest of the site writes them. */
const wholeUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const exactUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/* Our prices are whole dollars by rule. Supplier figures keep their cents —
   rounding a supplier's $0.15 suggestion to $0 would misquote the feed. */
export function formatPrice(usd: number): string {
  return wholeUsd.format(usd);
}

export function formatExact(usd: number): string {
  return exactUsd.format(usd);
}
