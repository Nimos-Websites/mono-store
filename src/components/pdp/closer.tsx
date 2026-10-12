"use client";

import Link from "next/link";
import { useState } from "react";
import { CartProvider, useCart } from "@/components/cart/cart-provider";
import { LineMaskReveal } from "@/components/motion/text/LineMaskReveal";
import { formatPrice } from "@/lib/catalog";
import { PRODUCT } from "@/lib/brand";
import {
  CLOSER_CTA,
  CLOSER_HEADLINE,
  CLOSER_LEDE,
  CLOSER_NEXT,
  CLOSER_NUMBERS,
  CLOSER_PARTS,
  CLOSER_SIXTH,
  CLOSER_TRUST,
  type PartGlyph,
} from "@/data/closer";

const FIGURE_SCALE = [
  "text-[clamp(52px,5.6vw,96px)]",
  "text-[clamp(40px,4vw,68px)]",
  "text-[clamp(34px,3.2vw,56px)]",
];

const NUMBER_COL = ["md:col-span-5", "md:col-span-4", "md:col-span-3"];

function PartGlyphMark({ glyph }: { glyph: PartGlyph }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden="true"
      focusable="false"
    >
      {glyph === "unit" ? (
        <>
          <path d="M7 4.5h7.5A1.5 1.5 0 0 1 16 6v5.5a4 4 0 0 1-4 4h-1a4 4 0 0 1-4-4V6A1.5 1.5 0 0 1 7 4.5z" />
          <path d="M16 7.5h3.2L21 9.8h-5" />
          <path d="M10 15.5v2.7a2.3 2.3 0 0 0 2.3 2.3h1.4" />
        </>
      ) : null}
      {glyph === "case" ? (
        <>
          <rect x="3.5" y="7" width="17" height="11.5" rx="2" />
          <path d="M3.5 12.75h17" />
          <path d="M19.6 10.9v3.7" />
        </>
      ) : null}
      {glyph === "cup" ? (
        <>
          <path d="M6.8 5h10.4l-1.7 14.5H8.5L6.8 5z" />
          <path d="M7.9 12h8.2" />
          <path d="M17.2 8.5h2a2 2 0 0 1 2 2v1.5a2 2 0 0 1-2 2h-2" />
        </>
      ) : null}
      {glyph === "protocol" ? (
        <>
          <rect x="4.5" y="3.5" width="15" height="17" rx="1.5" />
          <path d="M8 7.5h8M8 11h8M8 14.5h8M8 18h5" />
        </>
      ) : null}
      {glyph === "warranty" ? (
        <>
          <path d="M12 3.5 19.5 6v6c0 4.6-3.2 7.4-7.5 8.5C7.7 19.4 4.5 16.6 4.5 12V6L12 3.5z" />
          <path d="M8.8 11.9l2.3 2.3 4.1-4.6" />
        </>
      ) : null}
      {glyph === "us" ? (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.8 12h16.4" />
        </>
      ) : null}
    </svg>
  );
}

function CloserBody() {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <section aria-labelledby="closer-title" className="band band-ink">
      <div className="wrap">
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-12">
          <h2 id="closer-title" className="md:col-span-9">
            <LineMaskReveal lines={CLOSER_HEADLINE.lines} lineClassName="display" />
          </h2>
          <p className="body-lg max-w-[46ch] text-on-dark-64 md:col-span-4 md:col-start-9 md:pt-3">
            {CLOSER_LEDE.body}
          </p>
        </div>

        <div className="mt-[clamp(48px,6vw,88px)] grid gap-8 md:grid-cols-12 md:gap-x-10">
          {CLOSER_NUMBERS.map((n, i) => (
            <div key={n.value} className={`border-t border-lamp pt-5 ${NUMBER_COL[i]}`}>
              <p
                className={`font-serif leading-none tracking-[-0.03em] [font-variant:tabular-nums lining-nums] ${FIGURE_SCALE[i]}`}
              >
                {n.value}
              </p>
              <p className="mono mt-4 max-w-[36ch] leading-[1.6] text-on-dark-64">{n.caption}</p>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(48px,6vw,88px)] grid gap-x-10 gap-y-14 md:grid-cols-12">
          <ul className="flex min-w-0 flex-col md:col-span-7">
            {CLOSER_PARTS.map((p) => (
              <li
                key={p.item}
                className="grid grid-cols-12 items-baseline gap-x-5 gap-y-3 border-t border-on-dark/20 py-6"
              >
                <span className="col-span-2 text-lamp md:col-span-1">
                  <PartGlyphMark glyph={p.glyph} />
                </span>
                <h3 className="title-s col-span-10 md:col-span-4">{p.item}</h3>
                <p className="body col-span-12 max-w-[52ch] md:col-span-6 md:col-start-6 text-on-dark-64">
                  {p.detail}
                </p>
              </li>
            ))}
            <li className="grid grid-cols-12 items-baseline gap-x-5 gap-y-3 border-t border-lamp py-6">
              <span className="col-span-2 text-lamp md:col-span-1">
                <PartGlyphMark glyph={CLOSER_SIXTH.glyph} />
              </span>
              <h3 className="title-s col-span-10 text-lamp md:col-span-4">{CLOSER_SIXTH.item}</h3>
              <p className="body col-span-12 max-w-[52ch] md:col-span-6 md:col-start-6 text-on-dark-64">
                {CLOSER_SIXTH.detail}
              </p>
            </li>
          </ul>

          <div className="min-w-0 md:col-span-4 md:col-start-9">
            <div className="border-t-2 border-lamp pt-7">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    add(PRODUCT.handle, 1);
                    setAdded(true);
                  }}
                  className="button button-light"
                >
                  Add to cart · {formatPrice(PRODUCT.price)}
                </button>
                <a href={CLOSER_CTA.joinHref} className="button button-ghost border-on-dark text-on-dark">
                  {CLOSER_CTA.joinLabel}
                </a>
              </div>
              <div aria-live="polite">
                {added ? (
                  <p className="mono mt-4 text-on-dark-64">
                    <span aria-hidden="true">— </span>
                    {CLOSER_CTA.addedNote}{" "}
                    <Link href="/cart" className="tap underline underline-offset-4 text-on-dark">
                      {CLOSER_CTA.cartLinkLabel}
                    </Link>
                  </p>
                ) : null}
              </div>
              <ul className="mt-7 grid gap-3">
                {CLOSER_TRUST.map((t) => (
                  <li
                    key={t.label}
                    className="border-t border-on-dark/20 pt-3 mono text-[12px] leading-[1.6] text-on-dark-64"
                  >
                    {t.label}
                  </li>
                ))}
              </ul>
              <p className="form-note mt-6 max-w-[42ch] text-on-dark-64">{CLOSER_CTA.note}</p>
            </div>
          </div>
        </div>

        {/* What happens next — the real sequence, not a slogan. */}
        <div className="mt-[clamp(48px,6vw,88px)] border-t border-on-dark/20 pt-10">
          <p className="label text-lamp">What happens next</p>
          <ol className="mt-8 grid gap-px md:grid-cols-4">
            {CLOSER_NEXT.map((n, i) => (
              <li key={n.step} className="border-t border-on-dark/20 py-7 pr-8 md:border-t-0 md:pr-10">
                <p className="mono text-lamp">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="title-s mt-3 text-on-dark">{n.step}</h3>
                <p className="body mt-3 max-w-[36ch] text-on-dark-64">{n.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function TheCloser() {
  return (
    <CartProvider>
      <CloserBody />
    </CartProvider>
  );
}
