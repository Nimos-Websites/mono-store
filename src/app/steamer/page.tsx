import { SteamerPdp } from "@/components/pdp/steamer-pdp";

export const metadata = {
  title: "The MONO Steamer — Fill to the line.",
  description:
    "A handheld garment steamer sold as a system: 2000 W, 25-second heat-up, 300 ml tank, ceramic soleplate, case, protocol card, three-year warranty. $89. The render is labelled a render; the supplier photograph is unretouched.",
};

/* The branded endpoint. One product, one page, one funnel. The generic
   catalogue route (/products/the-steamer) renders the same component so
   the marketplace-facing path and the owned path never diverge. */
export default function SteamerPage() {
  return <SteamerPdp />;
}
