/* Vell catalogue sync — deterministic, no invented fields.
 *
 * Reads the frozen source feed at ../../data/catalogue/2026-10-09.json
 * (schema cjcat/1), dedupes by pid (first occurrence wins), derives a
 * stable handle per product, prices via the single rule, and writes
 * ../src/data/products.json.
 *
 * Pricing rule (law, single source — mirrored in src/lib/catalog.ts):
 *   price(handle) = ceil(landed / 0.45), whole dollars.
 *
 * Run: node scripts/sync-catalog.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const FEED_URL = new URL("../../data/catalogue/2026-10-09.json", import.meta.url);
const OUT_URL = new URL("../src/data/products.json", import.meta.url);

const slugify = (name) =>
  name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

const priceFor = (landed) => Math.ceil(landed / 0.45);

const raw = JSON.parse(readFileSync(FEED_URL, "utf8"));
if (raw.schema !== "cjcat/1" || !Array.isArray(raw.candidates)) {
  throw new Error(`Unexpected feed shape at ${FEED_URL.pathname}`);
}

/* Dedupe by pid, first occurrence wins. The 2026-10-09 feed lists each
   product twice; insertion order is deterministic given a frozen feed. */
const byPid = new Map();
for (const c of raw.candidates) {
  if (c && typeof c.pid === "string" && !byPid.has(c.pid)) byPid.set(c.pid, c);
}

const taken = new Set();
const products = [];
for (const c of byPid.values()) {
  const base = `${slugify(c.name)}-${c.pid.slice(-6)}`;
  /* Deterministic disambiguation: same slug + same 6-digit suffix can only
     collide across distinct pids, so extend with more pid digits. */
  let handle = base;
  for (let n = 8; taken.has(handle); n += 2) handle = `${base}-${c.pid.slice(-n, -6)}`;
  taken.add(handle);

  products.push({
    handle,
    pid: c.pid,
    name: c.name,
    category: c.category,
    supplier: c.supplier ?? null,
    shipsTo: c.shipsTo,
    freeShipping: c.freeShipping,
    weightKg: c.weightKg,
    cogs: c.cogs,
    freight: c.freight,
    landed: c.landed,
    price: priceFor(c.landed),
    stock: c.stock ?? null,
    sku: c.sku,
    sugRetail: c.sugRetail,
    image: c.image,
  });
}

writeFileSync(OUT_URL, `${JSON.stringify(products, null, 2)}\n`, "utf8");
console.log(
  JSON.stringify({ in: raw.candidates.length, unique: products.length, out: OUT_URL.pathname }),
);
