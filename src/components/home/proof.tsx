"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COMPETITIVES, PROOF, PRODUCT } from "@/lib/brand";

function parseLeadingInt(text: string): number {
  const match = text.match(/[\d,]+/);
  return match ? Number(match[0].replace(/,/g, "")) : 0;
}

function parseLeadingSuffix(text: string): string {
  const match = text.match(/[\d,]+(.*)$/);
  return match ? match[1].trim() : "";
}

function Odometer({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        setDisplay(0);
        const t0 = performance.now();
        const duration = 1400;
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          const eased = p >= 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setDisplay(p >= 1 ? value : value * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(display)}
    </span>
  );
}

const whole = (n: number): string => Math.round(n).toLocaleString("en-CA");

export function Proof() {
  const volume = PROOF[0];
  const depth = PROOF[1];
  const leader = COMPETITIVES.find((row) => row.brand === "Dr.Flash") ?? COMPETITIVES[0];
  const leaderPrice = Number(leader.price.replace(/[^0-9.]/g, ""));
  const delta = `$${(PRODUCT.price - leaderPrice).toFixed(2)}`;

  return (
    <section aria-labelledby="proof-heading" className="band band-ink relative z-10">
      <div className="wrap">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <h2 id="proof-heading" className="title-m">
              The category is the evidence.
            </h2>
            <p className="lede mt-6 max-w-[38ch]">
              Demand for this shape of appliance is measured in tens of thousands of units a month.
              That is someone else&rsquo;s ledger. It tells us the shape sells, not that ours will.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <div className="ledger">
              <div className="ledger-row !items-start">
                <span className="ledger-key">{volume.key}</span>
                <span
                  className="text-right"
                  style={{
                    fontFamily: "var(--mono)",
                    fontVariantNumeric: "tabular-nums",
                    fontSize: "clamp(30px, 3.4vw, 54px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  <Odometer value={parseLeadingInt(volume.value)} format={whole} />
                  <span className="mono ml-3">{parseLeadingSuffix(volume.value)}</span>
                </span>
              </div>
              <div className="ledger-row !items-start">
                <span className="ledger-key">{depth.key}</span>
                <span
                  className="text-right"
                  style={{
                    fontFamily: "var(--mono)",
                    fontVariantNumeric: "tabular-nums",
                    fontSize: "clamp(30px, 3.4vw, 54px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  <Odometer value={parseLeadingInt(depth.value)} format={whole} />
                  <span className="mono ml-3 block">{parseLeadingSuffix(depth.value)}</span>
                </span>
              </div>
            </div>
            <p className="form-note mt-6">{volume.source}</p>
            <p className="form-note mt-2">{depth.source}</p>
            <p className="form-note mt-2">
              Figures describe the category, not this product. No order can be placed here.
            </p>
          </div>
        </div>

        <hr className="rule mt-16 md:mt-24" />

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-10">
          <h3 className="title-s max-w-[20ch] md:col-span-3">
            The {delta} between them is the product.
          </h3>
          <div className="md:col-span-7 md:col-start-6">
            <div className="flex items-center justify-between gap-6 sm:justify-start sm:gap-14">
              <div>
                <span className="ledger-key">Category leader</span>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--mono)",
                    fontVariantNumeric: "tabular-nums",
                    fontSize: "clamp(28px, 3vw, 46px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {leader.price}
                </p>
              </div>
              <span aria-hidden="true" className="text-[22px] text-on-dark-64">
                →
              </span>
              <div>
                <span className="ledger-key">Vell system</span>
                <p
                  className="mt-2 text-ground"
                  style={{
                    fontFamily: "var(--mono)",
                    fontVariantNumeric: "tabular-nums",
                    fontSize: "clamp(28px, 3vw, 46px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {PRODUCT.priceLabel}
                </p>
              </div>
            </div>
            <p className="body-lg mt-8 max-w-[52ch]">
              The {delta} between {leader.price} and {PRODUCT.priceLabel} is the case, the ceramic
              plate we specify, the certification we pay for, and three years of someone to call.
              Not a discount — there has never been a compare-at price.
            </p>
            <p className="form-note mt-4">{PROOF[2].source}</p>
            <Link href="/steamer#comparison" className="arrow-link tap mt-7">
              <span>See the full comparison</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
