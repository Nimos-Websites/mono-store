/* ─────────────────────────────────────────────────────────────────────────
 * THE CLOSER + THE MONEY — copy and figures for the two sections that
 * close the argument. Every figure carries the file it came from; nothing
 * is rounded, averaged, blended or invented. Percentages are computed
 * from the dollar figures, not copied from anywhere.
 *
 * Sources: PRODUCT-DECISION.md §3 (unit economics, 8 Oct 2026),
 * lib/brand.ts (live CJ catalogue row, 9 Oct 2026), MARKETING.md §2/§6,
 * data/funnel.ts (batch cap, trust badges), data/failure-ledger.ts
 * (the failure modes the system answers).
 * ─────────────────────────────────────────────────────────────────────── */

/* ── The closer headline — the ICP line, verbatim ─────────────────────── */

export const CLOSER_HEADLINE = {
  lines: ["Which one", "didn't break."],
  source: "MARKETING.md §2 — the ICP line, kept verbatim",
};

export const CLOSER_LEDE = {
  body: "You have owned one of these before. It dripped, it scaled, or it stopped heating in eight months. Ours is sold against exactly that — the protocol card carries the water routine, the case stores the unit dry, and the warranty card carries three years.",
  source:
    "MARKETING.md §2 (the burnt-out steamer owner); answers from data/failure-ledger.ts FAILURE_MODES",
} as const;

/* ── The three numbers that matter ─────────────────────────────────────── */

export type CloserNumber = { value: string; caption: string; source: string };

export const CLOSER_NUMBERS: CloserNumber[] = [
  {
    value: "$89",
    caption:
      "One price — unit, case, cup, protocol card, warranty. Nothing configures away and nothing is struck through.",
    source:
      "lib/brand.ts PRODUCT.price / priceLabel; PRODUCT-DECISION.md §3 (the $89 price point); lib/brand.ts BUNDLE",
  },
  {
    value: "3 years",
    caption:
      "Warranty, registered online. Terms are published before you buy; the claim path is printed on the card in the box.",
    source:
      "PRODUCT-DECISION.md §3 (three-year warranty); data/funnel.ts WARRANTY_FLOW; lib/brand.ts SPEC",
  },
  {
    value: "250 units",
    caption:
      "The Batch 01 cap. No countdown, no fill bar, no 'only N left' — the re-order decision is weekly.",
    source:
      "MARKETING.md §6 (250 units ordered, nothing more; weekly re-order decision); data/funnel.ts BATCH; band context PRODUCT-DECISION.md §2 (start with 200–500 units)",
  },
];

/* ── The five parts, plus the sixth ────────────────────────────────────── */

export type CloserPart = { item: string; detail: string; source: string; glyph: PartGlyph };

export type PartGlyph = "unit" | "case" | "cup" | "protocol" | "warranty" | "us";

export const CLOSER_PARTS: CloserPart[] = [
  {
    glyph: "unit",
    item: "The unit",
    detail: "2000 W · 300 ml removable tank · ceramic soleplate · 25-second heat-up.",
    source: "lib/brand.ts BUNDLE; specification from PRODUCT-DECISION.md §3 supply quote",
  },
  {
    glyph: "case",
    item: "The moulded case",
    detail: "Holds the unit and the cord without a kink — and stores it dry.",
    source: "lib/brand.ts BUNDLE; data/funnel.ts SYSTEM_PARTS; data/failure-ledger.ts (dry storage)",
  },
  {
    glyph: "cup",
    item: "The measuring cup",
    detail: "Fill to the line, not over it. The tank level is a number, not a guess.",
    source: "lib/brand.ts BUNDLE; data/funnel.ts SYSTEM_PARTS",
  },
  {
    glyph: "protocol",
    item: "The protocol card",
    detail: "Four fabric settings, the water routine, the two-hand rule. The whole manual.",
    source: "lib/brand.ts BUNDLE; data/funnel.ts SYSTEM_PARTS; data/funnel.ts CARE_RITUAL",
  },
  {
    glyph: "warranty",
    item: "The warranty card",
    detail: "Three years, registered online. Repair, replacement or refund — the freight is on us.",
    source: "lib/brand.ts BUNDLE; data/funnel.ts WARRANTY_FLOW",
  },
];

export const CLOSER_SIXTH: CloserPart = {
  glyph: "us",
  item: "The sixth is us",
  detail:
    "The registration, the claim route, and the freight on a warranty return. Five parts ship in a box; this one is the service.",
  source: "MARKETING.md §1 (you own it instead of having been sold to); data/funnel.ts WARRANTY_FLOW",
};

/* ── The CTA pair and the trust strip ──────────────────────────────────── */

export const CLOSER_CTA = {
  joinLabel: "Join the list",
  joinHref: "#product-join",
  addedNote: "Added The MONO Steamer.",
  cartLinkLabel: "View cart",
  note: "The cart is real; checkout is closed by design. No countdown, no 'only N left' — the cap is the operating model, and the list is the queue.",
  source: "data/funnel.ts BATCH.note; lib/brand.ts BRAND.concept",
} as const;

export type TrustItem = { label: string; source: string };

export const CLOSER_TRUST: TrustItem[] = [
  { label: "3-year warranty", source: "data/funnel.ts TRUST_BADGES" },
  { label: "Ships from our own stock", source: "data/funnel.ts TRUST_BADGES" },
  { label: "Secure checkout", source: "data/funnel.ts TRUST_BADGES (Stripe)" },
  {
    label: "Origin Ningbo · HS 8516400000",
    source: "lib/brand.ts PRODUCT.hsCode; PRODUCT-DECISION.md §3 supply line",
  },
];

/* ── The waterfall — where the $89 goes ────────────────────────────────── */

export type WaterSegment = {
  id: string;
  label: string;
  note: string;
  value: number;
  outflow: boolean;
  source: string;
};

export const WATERFALL = {
  total: 89,
  segments: [
    {
      id: "cogs",
      label: "Unit, logo, packaging",
      note: "Private-mold unit, our logo, our carton",
      value: 16.0,
      outflow: true,
      source: "PRODUCT-DECISION.md §3 — COGS (private-mold unit + logo + packaging) −$16.00",
    },
    {
      id: "freight",
      label: "Sea freight + duty",
      note: "~0.9 kg a unit, at 1,000 units",
      value: 3.5,
      outflow: true,
      source: "PRODUCT-DECISION.md §3 — sea freight + duty −$3.50",
    },
    {
      id: "3pl",
      label: "3PL pick/pack",
      note: "Inbound to the CA warehouse",
      value: 4.0,
      outflow: true,
      source: "PRODUCT-DECISION.md §3 — inbound to CA warehouse, 3PL pick/pack −$4.00",
    },
    {
      id: "payment",
      label: "Payment processing",
      note: "~3.5% of the sale — no platform commission",
      value: 3.1,
      outflow: true,
      source: "PRODUCT-DECISION.md §3 — payment processing (~3.5%) −$3.10",
    },
    {
      id: "shipping",
      label: "Shipping to customer",
      note: "The last mile, included in the $89",
      value: 7.0,
      outflow: true,
      source: "PRODUCT-DECISION.md §3 — shipping to customer −$7.00",
    },
    {
      id: "contribution",
      label: "Contribution before acquisition",
      note: "The money that stays and pays for the warranty, the content and the next batch",
      value: 55.4,
      outflow: false,
      source: "PRODUCT-DECISION.md §3 — contribution before acquisition $55.40 (62%)",
    },
  ],
  ariaLabel:
    "Stacked bar of the $89: $16.00 unit, logo and packaging; $3.50 sea freight and duty; $4.00 3PL pick and pack; $3.10 payment processing; $7.00 shipping to customer; $55.40 contribution before acquisition.",
  sources: "PRODUCT-DECISION.md §3 — unit economics table, 8 October 2026",
} as const;

/* ── What remains after acquisition ────────────────────────────────────── */

export const MARGIN = {
  headline: "What stays after acquisition.",
  rows: [
    {
      label: "Before acquisition",
      value: 55.4,
      display: "62%",
      note: "of $89",
      outflow: false,
      source: "PRODUCT-DECISION.md §3 — $55.40 (62%), the document's own figure",
    },
    {
      label: "Blended CAC target",
      value: 18.0,
      display: null,
      note: "own content, organic-heavy — a target, not a result",
      outflow: true,
      source: "PRODUCT-DECISION.md §3 — blended CAC target −$18.00",
    },
    {
      label: "After CAC",
      value: 37.4,
      display: "42%",
      note: "of $89",
      outflow: false,
      source: "PRODUCT-DECISION.md §3 — contribution after CAC $37.40 (42%)",
    },
  ],
  headlineCaption:
    "Nothing units-sold, nothing projected. This is the model the first 250 units are funded on, dated 8 October 2026.",
  sources: "PRODUCT-DECISION.md §3 — unit economics table",
} as const;

/* ── The landed row — the live catalogue row, for reference ────────────── */

export const LANDED_ROW = {
  title: "The landed unit, from the live catalogue row",
  rows: [
    {
      label: "Unit cost",
      value: 14.41,
      source: "lib/brand.ts PRODUCT.cogsUsd — live CJ catalogue row, 9 October 2026",
    },
    {
      label: "Freight to CA, 0.85 kg",
      value: 11.65,
      source: "lib/brand.ts PRODUCT.freightUsd — same live row",
    },
    {
      label: "Landed",
      value: 26.06,
      source: "lib/brand.ts PRODUCT.landedUsd — same live row",
    },
  ],
  note: "The drop-ship unit lands at $26.06. The appliance is the cheap part; the other $62.94 of the $89 is the case, the protocol, the warranty and the freight to your door.",
  source: "lib/brand.ts PRODUCT (live CJ row); PRODUCT-DECISION.md §3 for the $89 cost stack",
} as const;

/* ── The supply chain — five stops, our cost stack ─────────────────────── */

export type SupplyStop = {
  place: string;
  title: string;
  figure: number;
  detail: string;
  source: string;
};

export const SUPPLY_STOPS: SupplyStop[] = [
  {
    place: "Ningbo, China",
    title: "The factory",
    figure: 16.0,
    detail: "Private-mold unit, our logo, our carton. MOQ 1,000, 25–30 day lead.",
    source: "PRODUCT-DECISION.md §3 — COGS; live supply quote, 8 Oct 2026",
  },
  {
    place: "Sea freight + duty",
    title: "The water",
    figure: 3.5,
    detail: "~0.9 kg a unit, 1,000 units to the coast.",
    source: "PRODUCT-DECISION.md §3 — sea freight + duty",
  },
  {
    place: "CA warehouse",
    title: "The 3PL",
    figure: 4.0,
    detail: "Pick and pack, inbound. Our own stock, not a marketplace's.",
    source: "PRODUCT-DECISION.md §3 — 3PL pick/pack; data/funnel.ts TRUST_BADGES",
  },
  {
    place: "Payment",
    title: "The till",
    figure: 3.1,
    detail: "~3.5% of the sale. No platform commission on this price.",
    source: "PRODUCT-DECISION.md §3 — payment processing",
  },
  {
    place: "Your door",
    title: "The last mile",
    figure: 7.0,
    detail: "Shipping to the customer, inside the $89 — not added at the last screen.",
    source: "PRODUCT-DECISION.md §3 — shipping to customer",
  },
];

export const SUPPLY_COPY = {
  title: "The route the unit takes.",
  body: "Five stops, and the cost of each one, disclosed. It is our cost stack — not the category's, not a promise — and the factory is named by city because supplier names live in the sourcing log, not on this page.",
  source: "PRODUCT-DECISION.md §6 (supplier names recorded in the sourcing log); §3 cost lines",
} as const;

/* ── Notes to the accounts ─────────────────────────────────────────────── */

export const TRUST_SOURCES: { figure: string; source: string }[] = [
  { figure: "$89.00 and the five cost lines", source: "PRODUCT-DECISION.md §3 — unit economics, 8 October 2026" },
  { figure: "$55.40 / 62% · $18.00 · $37.40 / 42%", source: "PRODUCT-DECISION.md §3 — contribution before and after acquisition" },
  { figure: "$14.41 · $11.65 · $26.06", source: "lib/brand.ts PRODUCT — live CJ catalogue row, 9 October 2026" },
  { figure: "250 units · weekly re-order", source: "MARKETING.md §6 — first order and the operating model" },
  { figure: "Ningbo · HS 8516400000", source: "PRODUCT-DECISION.md §3 — supply line; lib/brand.ts PRODUCT.hsCode" },
];

/* What happens next — the real sequence, in the order it actually
   happens. Every step is true today or is explicitly gated on a real
   event (the batch closing). No promises the funnel cannot keep. */
export const CLOSER_NEXT: { step: string; body: string }[] = [
  {
    step: "Join the list",
    body: "One field, one line in a file. No order, no payment, no email sent.",
  },
  {
    step: "Batch 01 closes at 250",
    body: "Two hundred and fifty reservations, then the factory order is placed. No countdown — the cap is the operating model.",
  },
  {
    step: "The box ships",
    body: "Unit, moulded case, measuring cup and the protocol card, packed without prices inside if it is a gift.",
  },
  {
    step: "The warranty starts",
    body: "Registered online on the day it arrives, on a date you can point at. The claim path is printed on the card.",
  },
];
