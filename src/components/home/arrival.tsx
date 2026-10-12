"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductScene } from "@/components/product-scene";
import { BRAND, PRODUCT } from "@/lib/brand";

const WORDS = BRAND.tagline.split(" ");
const HALF = Math.ceil(WORDS.length / 2);
const LEAD = WORDS.slice(0, HALF).join(" ");
const TAIL = WORDS.slice(HALF).join(" ");

const STORAGE_KEY = "mono-anno-dismissed-v1";

function readDismissed(): boolean {
  try {
    return typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function Arrival() {
  const [dismissed, setDismissed] = useState(readDismissed);
  const headRef = useRef<HTMLHeadingElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const fill = fillRef.current;
    const head = headRef.current;
    if (!fill || !head) return;
    const tween = gsap.fromTo(
      fill,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
        scrollTrigger: { trigger: head, start: "top 90%", end: "top 35%", scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      return;
    }
  }

  return (
    <section className="relative z-10 min-h-[100svh] w-full overflow-hidden bg-steam pt-[var(--head-h)]">
      {dismissed ? null : (
        <div role="note" aria-label="Announcement" className="relative z-20 border-b border-hair">
          <div className="wrap flex items-center gap-4">
            <p className="mono flex-1 py-2 text-graphite-70">
              Supplier photos are the product truth · worlds rendered free
            </p>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center bg-transparent text-[18px] leading-none text-graphite-70 transition-colors hover:text-ink"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      )}
      <div className="relative h-[46svh] w-full md:absolute md:inset-0 md:h-full">
        <ProductScene className="h-full w-full" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[26%] md:hidden"
          style={{
            background:
              "linear-gradient(to top, rgb(244 245 244 / 0.94) 0%, rgb(244 245 244 / 0.42) 52%, transparent 100%)",
          }}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to top, rgb(244 245 244 / 0.97) 0%, rgb(244 245 244 / 0.92) 28%, rgb(244 245 244 / 0.6) 52%, rgb(244 245 244 / 0.18) 70%, transparent 84%)",
        }}
      />
      <div className="relative z-10 flex flex-col justify-end md:absolute md:inset-0 md:min-h-[100svh]">
        <div className="wrap pb-8 md:pb-16">
          <h1 ref={headRef} className="display max-w-[12ch]">
            <span className="relative block">
              <span
                aria-hidden="true"
                className="block"
                style={{ WebkitTextStroke: "1.5px var(--graphite)", color: "transparent" }}
              >
                {LEAD}
                <br />
                <span className="italic">{TAIL}</span>
              </span>
              <span ref={fillRef} aria-hidden="true" className="absolute inset-0 block">
                {LEAD}
                <br />
                <span className="italic">{TAIL}</span>
              </span>
              <span className="sr-only">{BRAND.tagline}</span>
            </span>
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4 md:mt-8">
            <Link href="/steamer" className="button button-signal" data-magnetic>
              Buy · {PRODUCT.priceLabel}
            </Link>
            <Link href="/steamer#specification" className="arrow-link tap">
              <span>Full specification</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
          <p className="lede mt-6 max-w-[38ch]">
            {PRODUCT.power}, {PRODUCT.heatUp} to heat, {PRODUCT.steamRate}, {PRODUCT.weight}.{" "}
            {PRODUCT.priceLabel} for the appliance, the case, the protocol and three years of
            someone to call.
          </p>
        </div>
        <p className="label wrap pb-5 text-graphite-70">
          3D model built from the spec · not a photograph
        </p>
      </div>
    </section>
  );
}
