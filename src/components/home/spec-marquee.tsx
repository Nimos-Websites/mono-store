import { PRODUCT, SPEC } from "@/lib/brand";

const pick = (key: string) => SPEC.find((row) => row.key === key)?.value ?? "";

const TICKER = [
  PRODUCT.power,
  PRODUCT.heatUp,
  PRODUCT.tank,
  PRODUCT.steamRate,
  PRODUCT.weight,
  `${pick("Warranty")} warranty`,
];

export function SpecMarquee() {
  return (
    <section className="relative z-10 overflow-hidden border-y border-hair bg-steam py-6">
      <p className="sr-only">{TICKER.join(". ")}</p>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <p
            key={copy}
            className="mono flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap text-graphite-70"
          >
            {TICKER.map((item) => (
              <span key={item} className="flex items-center gap-8">
                <span>{item}</span>
                <span className="text-signal">·</span>
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
