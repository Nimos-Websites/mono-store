export type MediaKind = "hero" | "use" | "detail" | "scale" | "lifestyle" | "video" | "proof" | "packaging";

export type MediaAsset = {
  kind: MediaKind;
  src: string;
  alt: string;
  madeLabel?: string;
};

export type Department = {
  id: string;
  title: string;
  body: string;
  media?: MediaAsset[];
};

export type Product = {
  handle: string;
  displayName: string;
  category: string;
  status: "live" | "staged" | "building";
  priceUsd: string;
  priceCents: number;
  monthlyFrom?: string;
  claim: string;
  story: string;
  tone?: string;
  supplier: {
    sku: string;
    landedUsd: number;
    shipsInDays: string;
    stockRegion: string;
  };
  media: MediaAsset[];
  specs: { label: string; value: string }[];
  benefits: { title: string; body: string }[];
  departments: Department[];
  tastings: { label: string; state: "ready" | "arriving"; note?: string }[];
  comparisons: { axis: string; this: string; other: string }[];
  faqs: { q: string; a: string }[];
  reviews: { count: number; average: number; source?: string } | null;
  guarantee: { name: string; days: number; detail: string } | null;
  deals: { label: string; detail: string }[];
};
