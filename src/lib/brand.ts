/*
  MONO — one product, one store.

  From the Greek monos: single, alone, unique. One product, its own brand,
  its own endpoint, its own funnel. The page is the store.

  Voice law: short declarative sentences. State the number, then the
  sentence. Trade vocabulary. Banned words: luxury, timeless, elevate,
  curate, bespoke, artisan, exclusive, heirloom.
*/

export const BRAND = {
  name: "MONO",
  tagline: "One product. One store.",
  story:
    "MONO is a one-product storefront system. Each product gets its own brand, its own endpoint, its own funnel, its own margin profile. The page is the store.",
  concept:
    "MONO is a concept brand demonstrating a one-product storefront. The buy path is built and works: the cart is real and money is computed server-side. Checkout is closed by design, so no order can be placed and no payment can be taken.",
  system:
    "One product, one endpoint, one funnel, one margin profile. The handheld steamer, sold as a system: unit, case, protocol, three-year warranty, $89.",
} as const;

export const PRODUCT = {
  handle: "the-steamer",
  // Verified live against the CJ catalogue row, 9 October 2026, via
  // product/query (CJ-Access-Token). pid / sku / cogs / weight are the
  // feed's own numbers — none of them invented.
  cjPid: "2609291229371636200",
  cjSku: "CJYD320992601AZ",
  cogsUsd: 14.41,
  weightG: 850.0,
  name: "The MONO Steamer",
  price: 89,
  currency: "USD",
  priceLabel: "$89",
  compareAtNote: "No compare-at price. There has never been one.",
  /* The drop-ship unit's own numbers, from the same live row. */
  landedUsd: 26.06,
  freightUsd: 11.65,
  suggestRetail: 119.9,
  /* The category reference point, from the demand evidence. */
  categoryPrice: 29.7,
  /* What the catalogue's pricing rule would produce for this landed cost. */
  rulePrice: 58,
  /* The private-mold unit we will actually ship, from the supply quotes. */
  heatUp: "25 seconds",
  tank: "300 ml",
  power: "2000 W",
  steamRate: "17–23 g/min",
  weight: "0.63 kg",
  voltage: "100–240 V",
  autoOff: true,
  hsCode: "8516400000",
} as const;

export type SpecRow = { key: string; value: string; source: string };

/* Every row sourced. The supply quote is PRODUCT-DECISION.md §3 (live
   Alibaba / made-in-china quotes, 8 Oct 2026); the row is the live CJ
   product/query response. Where the feed is silent, the row says so. */
export const SPEC: SpecRow[] = [
  { key: "Power", value: PRODUCT.power, source: "Supply quote, 2000 W corded handheld" },
  { key: "Heat-up", value: PRODUCT.heatUp, source: "Supply quote, private-mold 300 ml unit" },
  {
    key: "Steam output",
    value: `${PRODUCT.steamRate}, category band`,
    source: "Supply quote, 17–23 g/min class",
  },
  { key: "Water tank", value: `${PRODUCT.tank}, removable`, source: "Supply quote, private-mold unit" },
  { key: "Soleplate", value: "Ceramic", source: "Supply quote, ceramic or stainless" },
  { key: "Voltage", value: PRODUCT.voltage, source: "Supply quote, 100–240 V" },
  {
    key: "Weight",
    value: `${PRODUCT.weight} bare, private-mold unit`,
    source: "Supply quote, N.W. 0.63 kg; the drop-ship row is 850 g",
  },
  { key: "Auto shut-off", value: "Yes", source: "Supply quote, auto shut-off" },
  {
    key: "Certification",
    value: "cUL / ETL budgeted — not yet held",
    source: "PRODUCT-DECISION.md §4, budgeted before first order",
  },
  { key: "Warranty", value: "3 years, registered online", source: "The system, as offered" },
  { key: "Made in", value: "Ningbo, China", source: "Supply quote, Ningbo private-mold" },
  { key: "HS code", value: PRODUCT.hsCode, source: "Supply line" },
];

export type Proof = { key: string; value: string; source: string };

/* Demand evidence for the product category. Sourced, dated, reproducible. */
export const PROOF: Proof[] = [
  {
    key: "Category volume",
    value: "44,800 units",
    source: "30-day units, single handheld steamer listing, RapidTok, Aug 2026",
  },
  {
    key: "Category depth",
    value: "37,989 reviews at 4.6",
    source: "Same listing. Depth, not a spike — a multi-year asset.",
  },
  {
    key: "Our exit",
    value: "$29.70 → $89",
    source: "Category leader's price. We do not compete on a spec sheet.",
  },
];

export type Pillar = { title: string; body: string; proof: string };

export const PILLARS: Pillar[] = [
  {
    title: "25 seconds. That is the whole wait.",
    body: "Hang the garment, wait for heat-up, pass the head once. The promise is not a feature list. It is that a crumpled shirt becomes wearable in under a minute.",
    proof: "Heat-up stated by the factory quote: 25 seconds, 2000 W, 300 ml.",
  },
  {
    title: "44,800 units. That is the category.",
    body: "One listing sold 44,800 handheld steamers in thirty days at $29.70 and holds 37,989 reviews at 4.6. The demand is structural. The price is a race, and we are not in it.",
    proof: "RapidTok, single listing, Aug 2026.",
  },
  {
    title: "$89, not $29.70. The difference is the system.",
    body: "The appliance sits close to the category leader on purpose. What you buy here is the unit, the moulded case, the protocol card, the registration and three years of someone to call. Six parts in the box. One of them is us.",
    proof: "Drop-ship unit lands at $26.06. Our price is set by the product decision, not the rule.",
  },
];

export type Stage = { stage: string; title: string; body: string };

export const STAGES: Stage[] = [
  {
    stage: "Source",
    title: "Ningbo, not a marketplace",
    body: "We buy from factories we name, at quantities we choose, with our own faceplate and our own carton. No reseller layer, no arbitrage markup, no stock lot we did not specify.",
  },
  {
    stage: "Differentiate",
    title: "Where the money goes",
    body: "The appliance is deliberately close to the category leader. It is not where the margin is. The margin is the case, the ceramic plate we specify, the certification we pay for, and the three-year warranty we carry.",
  },
  {
    stage: "Content",
    title: "One product, five hundred videos",
    body: "Wrinkle removal is a visible transformation. The best listing in this category earns almost nothing from its single best video — 0.16% of revenue — and everything from volume. Volume is the part we automate.",
  },
  {
    stage: "Own",
    title: "Our endpoint, our customer",
    body: "Every product gets its own page, its own funnel and its own list. No marketplace owns the relationship, nobody else sees the price, and the customer data is the asset we keep.",
  },
];

export type Competitor = { brand: string; item: string; price: string };

export const COMPETITIVES: Competitor[] = [
  { brand: "Dr.Flash", item: "Handheld steamer, 37,989 reviews", price: "$29.70" },
  { brand: "Category entry", item: "Generic 2000W, no brand", price: "$18–27" },
  { brand: "MONO", item: "The Steamer, as a system", price: "$89" },
];

export const BUNDLE = [
  { item: "The unit", detail: `${PRODUCT.power}, ${PRODUCT.tank} removable tank, ceramic soleplate` },
  { item: "Moulded travel case", detail: "Fits the unit and the cord without a tangle" },
  { item: "Measuring cup", detail: "Fill to the line, not over it" },
  { item: "The protocol card", detail: "Four fabric settings. That is the whole manual." },
  { item: "Warranty card", detail: "3 years, registered online" },
];

export const RISKS: { risk: string; mitigation: string }[] = [
  {
    risk: "Commodity creep — we ship a white-box clone and get compared to $29.70.",
    mitigation: "Sold as a bundle and a service, never as a spec. Non-negotiable.",
  },
  {
    risk: "Returns at 8–12%, not 3%. Steamers leak, scale and fail.",
    mitigation: "Budgeted into the margin. A thin-margin version dies here.",
  },
  {
    risk: "Certification costs and delays: cUL/ETL, CE, RoHS.",
    mitigation: "Budgeted before first order, not after. Not yet held.",
  },
  {
    risk: "Trend decay — half the category leaders decelerated into month-end.",
    mitigation: "90-day window. Small inventory, weekly re-order decision.",
  },
];

export const formatMoney = (amount: number): string =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: PRODUCT.currency,
    maximumFractionDigits: 0,
  }).format(amount);

/* Real media. The supplier photograph is the ACTUAL CJ row file, kept
   deliberately: it is what a $14.41 unit looks like before art direction,
   and the gap is the argument. The three generated frames are world and
   texture references from the free Cloudflare FLUX engine — none of them
   is the product, and every one is labelled as generated. */
export const PRODUCT_MEDIA = {
  fabric: "/media/steamer/fabric.jpg",
  stillLife: "/media/steamer/still-life.jpg",
  editorial: "/media/steamer/editorial.jpg",
  supplierRaw: "/media/steamer/supplier-raw.jpg",
} as const;
