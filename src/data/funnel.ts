/* ─────────────────────────────────────────────────────────────────────────
 * THE FUNNEL + OFFER DATA — everything the commerce modules render.
 *
 * Sourced from BRAND-FUNNEL-RESEARCH.md (10 Oct 2026), PRODUCT-DECISION.md
 * and MARKETING.md (8 Oct 2026). Honesty law: no invented prices, no fake
 * scarcity, no fake reviews. Every figure carries its source.
 * ─────────────────────────────────────────────────────────────────────── */

/* ── The diagnostic funnel (pattern 103: 3 taps → the answer) ─────────── */
export type FunnelStep = {
  id: string;
  question: string;
  options: { label: string; value: string }[];
};

export const FUNNEL_STEPS: FunnelStep[] = [
  {
    id: "failure",
    question: "How did the last one end?",
    options: [
      { label: "It leaked or spat", value: "leaks" },
      { label: "It scaled up and died", value: "scaled" },
      { label: "It just stopped heating", value: "died" },
      { label: "It never worked right", value: "weak" },
    ],
  },
  {
    id: "use",
    question: "Where does it live?",
    options: [
      { label: "Home wardrobe", value: "home" },
      { label: "Travel and hotels", value: "travel" },
      { label: "Work — suits and shirts", value: "work" },
      { label: "Someone else bought it for me", value: "gift" },
    ],
  },
  {
    id: "matters",
    question: "What matters most now?",
    options: [
      { label: "That it lasts", value: "lasts" },
      { label: "That it doesn't ruin fabric", value: "fabric" },
      { label: "That I can reach someone", value: "support" },
      { label: "That it packs small", value: "packs" },
    ],
  },
];

export const FUNNEL_RESULT = {
  headline: "Every path ends at the same system.",
  body: "Leaks, scale, dead elements, short cords — the category's failure modes do not differ by buyer, so neither does the answer. One system: the unit, the moulded case, the protocol card, three years of warranty, registered online.",
  route: "The page below is configured for your answers. Nothing is personalised that isn't true.",
  cta: "Add to cart · $89",
};

/* ── The bundle configurator: system parts and honest add-ons ─────────── */
export type SystemPart = { item: string; detail: string; included: true };
export type AddOn = { id: string; item: string; detail: string; price: number; state: "reserved" };

export const SYSTEM_PARTS: SystemPart[] = [
  { item: "The unit", detail: "2000 W · 300 ml removable tank · ceramic soleplate · 25 s heat-up", included: true },
  { item: "Moulded travel case", detail: "Holds the unit and the cord without a kink — the storage complaint, answered", included: true },
  { item: "Measuring cup", detail: "Fill to the line, not over it. The level is a number.", included: true },
  { item: "The protocol card", detail: "Four fabric settings, the water routine, the two-hand rule. The whole manual.", included: true },
  { item: "Warranty card", detail: "Three years, registered online. Terms published before you buy.", included: true },
];

export const ADD_ONS: AddOn[] = [
  {
    id: "spares",
    item: "Spare parts reservation",
    detail: "A parts slot held for your unit — protocol cards, measuring cup, case hardware. Quoted, not charged, before Batch 01 ships.",
    price: 0,
    state: "reserved",
  },
  {
    id: "gift",
    item: "Gift handling",
    detail: "Packed without prices inside, with a handwritten note. Free — it costs us a pen.",
    price: 0,
    state: "reserved",
  },
];

export const BATCH = {
  name: "Batch 01",
  units: 250,
  note: "Two hundred and fifty units, then the re-order decision. No countdown, no 'only 3 left' — the cap is the operating model, and the list is the queue.",
};

/* ── Trust / provenance badges near the buy box (pattern 127) ─────────── */
export const TRUST_BADGES = [
  { label: "Three-year warranty", detail: "Registered online · terms published" },
  { label: "Ships from our own stock", detail: "Batch 01 · confirmed when you order" },
  { label: "Secure checkout", detail: "Card, Apple Pay, Google Pay — Stripe" },
  { label: "Origin and code", detail: "Ningbo, China · HS 8516400000" },
];

/* ── The care ritual — the protocol card as a stepped flow (214) ──────── */
export const CARE_RITUAL = [
  {
    step: "Fill",
    body: "To the line, with the cup that ships in the box. Tap water is fine for a season; the card tells you when to switch. The line exists so the level is never a guess.",
  },
  {
    step: "Hang",
    body: "One pass from the hem up. The free hand stays behind the fabric, never in the steam path — the burn most manuals don't mention.",
  },
  {
    step: "Empty",
    body: "Every third use, before storage. A tank that sits wet grows what the category's forums are full of. The case stores it dry.",
  },
  {
    step: "Register",
    body: "Scan the card, register the unit, and the warranty starts on a date you can point at. The claim path is printed on the same card.",
  },
];

/* ── The warranty flow — service as a product feature (217) ───────────── */
export const WARRANTY_FLOW = [
  { step: "Photograph", body: "One photo of the fault, or none if it simply won't heat. No forms longer than the fault." },
  { step: "Describe", body: "Which of the four failure modes — leak, scale, element, cord. The claim routes on the answer." },
  { step: "Resolution", body: "Repair, replacement or refund inside the three years. The freight is on us, which is the part the category gets wrong." },
];

/* ── Proof stats — real, sourced numbers (46 odometer) ────────────────── */
export const CATEGORY_STATS = [
  { value: 44800, suffix: "", label: "Units in 30 days", note: "Single handheld steamer listing, RapidTok, Aug 2026" },
  { value: 37.989, suffix: "K", label: "Reviews at 4.6★", note: "Same listing — depth, not a spike" },
  { value: 9.4, suffix: "M", label: "Units recalled since 2021", note: "CPSC: hot-water expulsion defect" },
];

/* ── Before / after — the category's native format as UI (71) ─────────── */
export const BEFORE_AFTER = {
  before: "/media/steamer/fabric.jpg",
  after: "/media/steamer/editorial.jpg",
  disclosure:
    "Both frames are generated images of washed linen — not photographs of this SKU. The format is the point: wrinkle removal is a visible transformation, and it is the content this category is won on.",
};
