import type { Metadata } from "next";
import { Arrival } from "@/components/home/arrival";
import { Brand } from "@/components/home/brand";
import { Capture } from "@/components/home/capture";
import { CommerceTeaser } from "@/components/home/commerce-teaser";
import { Proof } from "@/components/home/proof";
import { SpecMarquee } from "@/components/home/spec-marquee";
import { BRAND, PRODUCT } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: `${PRODUCT.name}, sold as a system. ${PRODUCT.priceLabel}. ${PRODUCT.power}, ${PRODUCT.heatUp} to heat, ${PRODUCT.steamRate} of steam, ${PRODUCT.weight}, three-year warranty. Full specification, the risks, and nothing borrowed from a competitor's listing.`,
};

export default function Home() {
  return (
    <>
      <Arrival />
      <SpecMarquee />
      <Brand />
      <CommerceTeaser />
      <SpecMarquee />
      <Proof />
      <div className="relative z-10 bg-signal">
        <Capture />
      </div>
    </>
  );
}
