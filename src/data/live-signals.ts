/* ─────────────────────────────────────────────────────────────────────────
 * LIVE SIGNALS — the category, measured this week, with provenance.
 *
 * Values are read from this repository's own verified tooling, not
 * recalled: tools/trendscan.mjs pulls TikTok Creative Center's official
 * ranked hashtag data (browser-rendered, same data the ad platform uses)
 * and writes an artifact with the raw curve, so every phase below is
 * re-derivable from the artifact. Category volume is the demand evidence
 * in PRODUCT-DECISION.md. Where the tool cannot reach a surface, the gap
 * is stated instead of being papered over.
 * ─────────────────────────────────────────────────────────────────────── */

export type TrendRow = {
  hashtag: string;
  rank: string;
  posts: string;
  phase: "rising" | "holding" | "flat" | "decaying";
  score: number;
  retention: number;
};

export const TRENDS = {
  fetchedAt: "2026-10-09T21:17:03Z",
  sourceUrl:
    "https://ads.tiktok.com/business/creativecenter/hashtag/pc/en?countryCode=US&period=7",
  artifact: "data/trends/2026-10-09-us_gb_ca.json",
  tool: "tools/trendscan.mjs · TikTok Creative Center, GetHashtagList",
  rows: [
    { hashtag: "#shopwithconfidence", rank: "1", posts: "92,074", phase: "rising", score: 34, retention: 0.793 },
    { hashtag: "#october3rd", rank: "2", posts: "23,207", phase: "flat", score: -8, retention: 0.082 },
    { hashtag: "#firstofthemonth", rank: "3", posts: "11,185", phase: "decaying", score: -54, retention: 0 },
  ] as TrendRow[],
};

export const SIGNAL_GAPS = [
  "TikTok Creative Center top-products and music surfaces are login-gated — the scan records the gap rather than guessing.",
  "Amazon Movers & Shakers renders navigation only; the product grid is not served to automation. The triangulation method stays as written in PRODUCT-DECISION.md §2.",
];

export const AD_SIGNAL = {
  headline: "The ad signal we are copying is discipline, not spend.",
  body: "Ridge runs 290+ paid ads at any time — 51% still images, 40% dynamic, 9% video. It launched 500+ creatives in one fortnight and kept 78. Its longest-running winner, a split-screen demo, had been live 140+ days. The lesson for a one-product brand: buy many cheap angles, keep only what survives past ninety days, and never fall in love with the hero cut.",
  sources: [
    {
      label: "Foreplay — The Ridge ad auction analysis",
      url: "https://www.foreplay.co/post/the-ridges-ad-auction-analysis",
    },
    {
      label: "Adrio — Ridge ad library snapshot",
      url: "https://adrio.ai/facebook-ads/the-ridge/176366735873065",
    },
  ],
};
