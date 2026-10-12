/**
 * Vell device set — the DAF V3 section primitives ported to this
 * codebase's token/class system. These exist to make the banned
 * meta-structure impossible: no eyebrow above a heading, no centered
 * hero, no 3-up cards, no equal rows. Every act opens with the brass
 * rule + index numeral; the page armature is the asymmetric ledger.
 *
 * Server components — pure layout, no client JS.
 */

import * as React from "react";

/* ─────────────────────────────────────────────────────────────────────────
 * RuleHeading — the act opener. A brass index numeral on a hairline rule,
 * then one large declarative line. The kicker sits INLINE AFTER the
 * heading, never stacked above it as a tracked-caps eyebrow.
 * ──────────────────────────────────────────────────────────────────────── */
export function RuleHeading({
  index,
  children,
  kicker,
  size = "md",
  tone = "ink",
}: {
  /** two-digit folio index, e.g. "01" — a catalogue index, not a step number */
  index: string;
  children: React.ReactNode;
  kicker?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  /** brass reads on both grounds; alabaster on ink acts */
  tone?: "ink" | "paper";
}) {
  const title =
    size === "lg" ? "title-m" : size === "sm" ? "title-s" : "title-m";
  return (
    <div>
      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className={`mono text-[13px] ${tone === "ink" ? "text-lamp" : "text-lamp"}`}
        >
          {index}
        </span>
        <span aria-hidden className="h-px flex-1 bg-lamp opacity-55" />
      </div>
      <h2 className={`${title} mt-[clamp(18px,2vw,28px)]`}>{children}</h2>
      {kicker ? (
        <p
          className={`mt-[clamp(14px,1.4vw,20px)] max-w-[62ch] text-[14px] leading-[1.6] [font-variant:tabular-nums] ${
            tone === "ink" ? "text-graphite-70" : "text-on-dark-64"
          }`}
        >
          {kicker}
        </p>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * BigNumber — numbers-as-hero. One enormous tabular figure per page
 * where the argument is numeric, left to speak.
 * ──────────────────────────────────────────────────────────────────────── */
export function BigNumber({
  value,
  unit,
  caption,
  accent = false,
  tone = "ink",
}: {
  value: React.ReactNode;
  unit?: React.ReactNode;
  caption?: React.ReactNode;
  accent?: boolean;
  tone?: "ink" | "paper";
}) {
  return (
    <div>
      <div
        className={`flex items-baseline gap-3 ${
          accent ? "text-signal" : tone === "ink" ? "" : "text-on-dark"
        }`}
      >
        <span
          className="font-serif text-[clamp(3.2rem,2rem+7vw,8rem)] leading-[0.9] tracking-[-0.03em] [font-variant:tabular-nums lining-nums]"
        >
          {value}
        </span>
        {unit ? (
          <span className="text-[clamp(1rem,0.8rem+1vw,1.6rem)] font-medium tracking-[-0.01em]">
            {unit}
          </span>
        ) : null}
      </div>
      {caption ? (
        <p
          className={`mt-4 max-w-[44ch] text-[13.5px] leading-[1.55] ${
            tone === "ink" ? "text-graphite-70" : "text-on-dark-64"
          }`}
        >
          {caption}
        </p>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Ledger — the asymmetric armature. Never centers. Subject in the wide
 * column, spec/placard in the narrow. `flip` swaps sides so sections
 * zigzag down the page. Stacks on mobile.
 * ──────────────────────────────────────────────────────────────────────── */
const RATIO: Record<string, string> = {
  "7/5": "md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]",
  "12/5": "md:grid-cols-[minmax(0,12fr)_minmax(0,5fr)]",
  "5/3": "md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)]",
};

export function Ledger({
  ratio = "7/5",
  flip = false,
  wide,
  narrow,
  className = "",
}: {
  ratio?: "7/5" | "12/5" | "5/3";
  flip?: boolean;
  wide: React.ReactNode;
  narrow: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 gap-[clamp(32px,5vw,88px)] ${RATIO[ratio]} ${className}`}>
      <div className={`min-w-0 ${flip ? "md:order-2" : ""}`}>{wide}</div>
      <div className={`min-w-0 ${flip ? "md:order-1" : ""}`}>{narrow}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Placard — museum-caption metadata for the narrow column. Hairline
 * label/value rows in tabular Poppins. Replaces bulleted feature cards.
 * ──────────────────────────────────────────────────────────────────────── */
export function Placard({
  rows,
  title,
  tone = "ink",
}: {
  rows: { label: string; value: React.ReactNode }[];
  title?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <dl className="ledger m-0">
      {title ? (
        <div
          className={`mb-[14px] text-[14px] font-semibold ${
            tone === "ink" ? "text-graphite-70" : "text-on-dark-64"
          }`}
        >
          {title}
        </div>
      ) : null}
      {rows.map((r, i) => (
        <div key={i} className="ledger-row ledger-row-stack">
          <dt className="ledger-key">{r.label}</dt>
          <dd className="ledger-val">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Seam — the block divider: hairline (default) or a single brass rule.
 * ──────────────────────────────────────────────────────────────────────── */
export function Seam({ brass = false }: { brass?: boolean }) {
  return (
    <hr
      style={{
        border: "none",
        height: 1,
        background: brass ? "var(--lamp)" : "var(--hair)",
        opacity: brass ? 0.6 : 1,
        margin: 0,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * CatalogCaption — the Mattiazzi/Vitra device: every photograph carries
 * a brass index + tracked-caps caption. Images are arguments, and
 * arguments have folios.
 * ──────────────────────────────────────────────────────────────────────── */
export function CatalogCaption({
  index,
  children,
  tone = "ink",
}: {
  index: string;
  children: React.ReactNode;
  tone?: "ink" | "paper";
}) {
  return (
    <figcaption className="mt-4 flex items-baseline gap-3">
      <span aria-hidden className="mono shrink-0 text-lamp">
        {index}
      </span>
      <span
        className={`label ${tone === "ink" ? "text-graphite-70" : "text-on-dark-64"}`}
      >
        {children}
      </span>
    </figcaption>
  );
}
