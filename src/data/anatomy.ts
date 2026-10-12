/* ─────────────────────────────────────────────────────────────────────────
 * THE ANATOMY DATA — one row per marked failure mode.
 *
 * The illustration is a schematic of WHERE the category's failures live.
 * It is not a claim about our internals: no row below asserts anything
 * about a unit we have taken apart, and every number traces to
 * src/lib/brand.ts (PRODUCT / SPEC) or to the sourced pain ledger in
 * BRAND-FUNNEL-RESEARCH.md §6. Complaint codes (L, S, H, C) are that
 * file's own row ids, kept verbatim so the chain is checkable.
 * ─────────────────────────────────────────────────────────────────────── */

export type AnatomyPartId = "tank" | "head" | "path" | "element" | "cord" | "handle" | "datum";

export type AnatomyCallout = {
  id: "leak" | "scale" | "element" | "cord";
  /* Short enough for a 44px toggle; also the ledger key. */
  label: string;
  /* Brand voice: state the number, then the sentence. No banned words. */
  caption: string;
  /* Tabular spec rows, values verbatim from SPEC / PRODUCT. */
  numbers: { key: string; value: string }[];
  /* The system's answer — outcome claims only, no hardware claims. */
  answer: string;
  /* Where every figure and every failure claim in this row comes from. */
  source: string;
  /* Which drawing groups go brass; everything else recedes. */
  parts: AnatomyPartId[];
};

export const ANATOMY_CALLOUTS: AnatomyCallout[] = [
  {
    id: "leak",
    label: "Leak path",
    caption:
      "300 ml of water is the hazard when it leaves as water instead of steam. The recall record for this one defect: 9.4 million handheld steamers, 205+ reported burns.",
    numbers: [
      { key: "Water tank", value: "300 ml, removable" },
      { key: "Warranty", value: "3 years, registered online" },
    ],
    answer:
      "We do not claim the hardware cannot spit — nobody in this category can prove that. The protocol card carries the fill line and the first-burst rule. If it damages a garment inside three years, the warranty answers it.",
    source:
      "BRAND-FUNNEL-RESEARCH.md §6.1 — CPSC recall table, Feb 2024–Dec 2025: ~9.4M units, 205+ burn injuries, hot-water expulsion. Complaint rows L1–L14; L14 is hot water at the cord entry.",
    parts: ["tank", "path", "head"],
  },
  {
    id: "scale",
    label: "Scale",
    caption:
      "17–23 g/min is the quoted steam output. Scale is what turns it to nothing — mineral buildup is the single largest cause of death in this category, and it collects in the water path.",
    numbers: [
      { key: "Steam output", value: "17–23 g/min, category band" },
      { key: "Heat-up", value: "25 seconds" },
    ],
    answer:
      "The water routine ships in the box as the protocol card: what to fill with, how to empty, how often. The case stores the unit dry. Scale is a maintenance failure before it is a hardware failure.",
    source:
      "BRAND-FUNNEL-RESEARCH.md §6 rows S1–S10 — S5: “A steamer dies from mineral scale far more often than from mechanical failure”; S7: chalky buildup at the nozzle vents.",
    parts: ["tank", "path"],
  },
  {
    id: "element",
    label: "Element",
    caption:
      "2000 W passes through one heating element and its connector. Power in, no steam out — the joint is the factory weak point in this category.",
    numbers: [
      { key: "Power", value: "2000 W" },
      { key: "Heat-up", value: "25 seconds" },
    ],
    answer:
      "This is the failure the category cannot answer, so we answer it with time: three years of warranty, registered online, with the terms published before you buy.",
    source:
      "BRAND-FUNNEL-RESEARCH.md §6 row H9 — “power was flowing into the heating element but not out of it… the connector had broken” (r/diyelectronics, May 2020); death cluster H1–H8. 2000 W: SPEC, supply quote.",
    parts: ["element"],
  },
  {
    id: "cord",
    label: "Cord",
    caption:
      "100–240 V arrives through the cord. Heat degrades the insulation over time, and the storage complaint is the kink — which is what the case is for.",
    numbers: [
      { key: "Voltage", value: "100–240 V" },
      { key: "Warranty", value: "3 years, registered online" },
    ],
    answer:
      "The case stores the cord without a kink. The three-year warranty runs on the whole system, cord included, and the voltage is printed in the spec ledger.",
    source:
      "BRAND-FUNNEL-RESEARCH.md §6 rows C1–C4 — C1: “a cord shorter than a curling iron”; C3: “a loose nine foot cable in a suitcase becomes a tangled mess”; C4: steam heat degrades insulation. 100–240 V: SPEC.",
    parts: ["cord"],
  },
];
