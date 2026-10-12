/* ─────────────────────────────────────────────────────────────────────────
 * THE FAILURE LEDGER — every complaint the category produces, and the
 * part of the system that answers it.
 *
 * Rows are mined from BRAND-FUNNEL-RESEARCH.md §6 (10 October 2026):
 * Reddit threads, review pages, Wirecutter-family roundups, manufacturer
 * support pages and four CPSC recall notices. Each row carries the
 * source URL it was retrieved from. Nothing here is invented; nothing
 * here claims a performance we have not shipped.
 *
 * The PDP renders these as complaint → answer pairs. That is the whole
 * commercial argument of the brand: the category sells a spec, the
 * winners never answer the complaints, and we do — by name.
 * ─────────────────────────────────────────────────────────────────────── */

export type FailureRow = {
  id: string;
  /* The complaint in the buyer's words — what they lived through. */
  complaint: string;
  /* Near-verbatim evidence of the complaint existing in the category. */
  evidence: string;
  /* Where that evidence was retrieved from. */
  sourceUrl: string;
  sourceLabel: string;
  /* The part of the $89 system that answers it — no hardware claims. */
  answer: string;
  /* Which ledger rows the answer is drawn from (research §7.2). */
  ledger: string;
};

export const CATEGORY_FINDING = {
  headline: "9.4 million recalled. 205 burned. One defect.",
  body: "Since 2021, US regulators have recalled at least 9.4 million handheld garment steamers for expelling hot water during use, with 205+ reported burn injuries across those actions. It is the only failure mode in this category with audited numbers, and it is the defect the protocol card and the warranty exist to answer.",
  sources: [
    {
      label: "CPSC — Black+Decker HGS011 expansion, Apr 2024",
      url: "https://www.cpsc.gov/Recalls/2024/Two-Million-Black-Decker-Garment-Steamers-Recalled-by-Empower-Brands-in-Major-Recall-Expansion-Due-to-Burn-Hazard-Refund-Now-Offered",
      note: "~2,000,000 units · 317 reports of hot water expelling · 82 burn injuries",
    },
    {
      label: "CPSC — Vornado / Steamfast / Sharper Image, Feb 2024",
      url: "https://www.cpsc.gov/Recalls/2024/Vornado-Recalls-Two-Million-Handheld-Garment-Steamers-Due-to-Serious-Burn-Hazard",
      note: "~2,000,000 units · 122 reports · 23 burn injuries",
    },
    {
      label: "CBS News — HSN steamers, Apr 2024",
      url: "https://www.cbsnews.com/news/black-and-decker-garment-steamers-recall-dozens-burned/",
      note: "5,400,000 units · 100+ injuries · $16M civil penalty",
    },
    {
      label: "CPSC — VEVOR FCL-H09 / ES-H10, Dec 2025",
      url: "https://www.cpsc.gov/Recalls/2026/Sanven-Technology-Recalls-VEVOR-Steamers-Due-to-Risk-of-Serious-Injury-from-Burn-Hazard",
      note: "~2,840 units · 6 spitting reports · 12 tank-cap failures · 2 injuries",
    },
  ],
};

export const FAILURE_ROWS: FailureRow[] = [
  {
    id: "death",
    complaint: "It died in three weeks.",
    evidence:
      "“Three weeks later it's stopped working. Display won't turn on when I plug it in… Steam function's gone.”",
    sourceUrl:
      "https://www.amazon.co.uk/Dr-flash-Steamer-Clothes-Handheld-Rotatable/dp/B0G28LKP1W",
    sourceLabel: "Amazon UK review of the category leader, 2026",
    answer:
      "Three years of warranty, registered online. The death is the product experience we are actually selling against.",
    ledger: "H1–H14",
  },
  {
    id: "warranty-timing",
    complaint: "The warranty ended just before it broke.",
    evidence:
      "“No longer covered by the warranty because the warranty expired 4.5 months ago. They instead offered me a 25% discount code.”",
    sourceUrl: "https://www.productreview.com.au/listings/philips-comforttouch-gc557-30",
    sourceLabel: "ProductReview.com.au, Philips ComfortTouch",
    answer:
      "Our terms are published in plain text before you buy: what is covered, what it costs, how the claim works. No discount codes instead of remedies.",
    ledger: "W1–W7",
  },
  {
    id: "scale",
    complaint: "Scale killed it — and descaling it voided the warranty.",
    evidence:
      "“A steamer dies from mineral scale far more often than from mechanical failure.” Reviewers report vinegar flushes that buy weeks and ruin the unit.",
    sourceUrl: "https://howtotechinfo.com/oghom-steamer-for-clothes-review/",
    sourceLabel: "Review synthesis, Aug 2026",
    answer:
      "The protocol card carries the water routine — what to fill with, how to empty, how often. The case stores the unit dry, so the tank never sits wet between uses.",
    ledger: "S1–S10",
  },
  {
    id: "leak",
    complaint: "It spat boiling water on the shirt.",
    evidence:
      "“Brand new steamer shooting out boiling water.” The reply under it: “lol that happened to me.”",
    sourceUrl:
      "https://www.reddit.com/r/laundry/comments/yrytki/brand_new_steamer_shooting_out_boiling_water_idk/",
    sourceLabel: "r/laundry, Nov 2022",
    answer:
      "We will not claim this hardware cannot spit — nobody in the category can prove that. We claim the outcome: if it damages a garment inside three years, the warranty answers it.",
    ledger: "L1–L14",
  },
  {
    id: "tank",
    complaint: "Two minutes of steam, then a refill.",
    evidence:
      "“80ml of water = 2min of steaming… Useless!!!” Runtime claims of “up to 10 minutes” measured at four.",
    sourceUrl:
      "https://www.productreview.com.au/listings/home-co-hand-held-garment-steamer",
    sourceLabel: "ProductReview.com.au",
    answer:
      "The tank is 300 ml and the runtime figure on this page is the factory quote's, not an advertising ceiling. The measuring cup exists so you fill to the line and know the number.",
    ledger: "O5, O6, O12",
  },
  {
    id: "cord",
    complaint: "The cord is shorter than a curling iron.",
    evidence:
      "“The cord is maybe 3-4 feet long… Who makes a steamer with a cord shorter than a curling iron?”",
    sourceUrl: "https://business.walmart.com/reviews/product/15095359289",
    sourceLabel: "Walmart review",
    answer:
      "Cord length is a factory-quote line and it will be printed in the spec ledger when the quote lands. The case stores the cord without a kink — the storage complaint most owners actually have.",
    ledger: "C1–C4",
  },
  {
    id: "heat",
    complaint: "The handle burned my hand.",
    evidence:
      "“I have quite a nasty burn to the palm of my hand from water coming through the connection of the handle.”",
    sourceUrl: "https://www.productreview.com.au/listings/kambrook-kss150",
    sourceLabel: "ProductReview.com.au, Kambrook KSS150",
    answer:
      "The protocol card states the two-hand rule and the cool-down step. The recall record above is what happens when a category leaves it out of the manual.",
    ledger: "O1, O2",
  },
];

/* The diagnostic funnel's five doors — the ICP line, made interactive.
   Each answer is the system's answer, never a performance claim. */
export const FAILURE_MODES = [
  {
    id: "leaks",
    label: "It leaks or spits",
    answer:
      "The protocol card carries the fill line and the first-burst rule. If it damages a garment inside three years, the warranty answers it. We do not claim the hardware cannot spit — nobody in this category can prove that.",
  },
  {
    id: "scaled",
    label: "It scaled up and died",
    answer:
      "Water routine is on the card: what to fill with, how to empty, how often. The case stores it dry. Scale is a maintenance failure before it is a hardware failure, and the manual is the fix.",
  },
  {
    id: "died",
    label: "It stopped heating",
    answer:
      "This is the one the category cannot answer, so we answer it with time: three years of warranty, registered online, terms published before you buy. “Which one didn't break” is the whole product.",
  },
  {
    id: "cord",
    label: "The cord is useless",
    answer:
      "Cord length is printed in the spec ledger on this page — not a range, the figure. The case stores it without a kink.",
  },
  {
    id: "tank",
    label: "The tank runs out",
    answer:
      "300 ml, and the runtime figure on this page is the factory quote's, not an advertising ceiling. Fill to the line; the number is the number.",
  },
] as const;
