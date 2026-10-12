/* ─────────────────────────────────────────────────────────────────────────
 * THE PLIMSOLL STEAMER — the PDP.
 *
 * A PDP is one screen: the gallery on the left, the money on the right,
 * everything else behind accordions. No scrolling essay, no twelve-act
 * magazine. The story lives on /how; the proof lives in three compact
 * rows; the render is the photography and it is labelled as a render.
 *
 * The scene switcher under the main render swaps the composition the way
 * a gallery swaps photographs. Honesty laws hold: no fake reviews, no
 * invented numbers, no email sends, the batch cap is real.
 * ─────────────────────────────────────────────────────────────────────── */
import type { Metadata } from "next";
import { ProductScene } from "@/components/product-scene";
import { LineMaskReveal } from "@/components/motion/text/LineMaskReveal";
import { SteamerBuyActions } from "@/components/pdp/steamer-buy";
import { PaymentRow } from "@/components/pdp/commerce/payment-row";
import { StickyBuyBar } from "@/components/pdp/sticky-buy";
import { PRODUCT } from "@/lib/brand";
import { SceneSwitcher } from "@/components/pdp/scene-switcher";
import { ComplaintsCompact } from "@/components/pdp/complaints-compact";

export const metadata: Metadata = {
  title: `${PRODUCT.name} — Fill to the line.`,
  description:
    "A handheld garment steamer sold as a system: 2000 W, 25-second heat-up, 300 ml tank, ceramic soleplate, case, protocol card, three-year warranty. $89. The render is labelled a render.",
};

const TRUST = [
  "Three-year warranty, registered online",
  "Ships from our own stock — Batch 01, 250 units",
  "Terms published before you buy",
];

const ACCORDIONS: { title: string; body: string; rows?: { label: string; value: string }[] }[] = [
  {
    title: "What it is",
    body: "A handheld garment steamer sold as a system: the unit, the moulded case, the measuring cup, the protocol card and three years of warranty. The appliance is deliberately close to the category leader's — the difference is what happens after you unbox it.",
    rows: [
      { label: "Power", value: PRODUCT.power },
      { label: "Heat-up", value: PRODUCT.heatUp },
      { label: "Tank", value: `${PRODUCT.tank}, removable` },
      { label: "Steam output", value: `${PRODUCT.steamRate}, category band` },
      { label: "Soleplate", value: "Ceramic" },
      { label: "Voltage", value: PRODUCT.voltage },
      { label: "Weight", value: `${PRODUCT.weight} N.W.` },
      { label: "Auto shut-off", value: "Yes" },
      { label: "Origin / code", value: `Ningbo, China · HS ${PRODUCT.hsCode}` },
    ],
  },
  {
    title: "The protocol",
    body: "Four steps, printed on the card in the box. Fill to the line with the cup that ships. Hang the garment and pass once from the hem up, free hand behind the fabric. Empty every third use, before storage — the case stores it dry. Register online the day it arrives; the claim path is on the same card.",
  },
  {
    title: "Where the $89 goes",
    body: "The landed unit is $26.06. The case, the certification we pay for, the protocol card and the three-year warranty carry the rest. The full stack is on the /how page, down to the cent — the freight is on us when something fails.",
  },
  {
    title: "Shipping, returns and the batch",
    body: "Availability is confirmed when you order. Batch 01 is 250 units, then the re-order decision — no countdown, no fake stock. The cart is real and money is computed server-side; checkout is closed by design, so no order can be placed. The list beside the price is the only thing that records interest, and it writes to a file: no order, no payment, no email sent.",
  },
  {
    title: "What is not true yet",
    body: "cUL/ETL certification is budgeted, not held. There are no reviews because nothing has shipped. The specification rows come from factory quotes and the live catalogue row — not from a shipped unit we have taken apart. The 3D views on this page are renders built from that specification, and they are labelled as renders everywhere they appear.",
  },
];

export function SteamerPdp() {
  return (
    <>
      {/* ─── THE BUY SCREEN — gallery left, money right, one viewport ── */}
      <section aria-label="The MONO Steamer" className="band-tight pt-[calc(var(--head-h)+28px)]">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-12">
          {/* ─── The gallery: the render, and the scene switcher ─────── */}
          <div className="md:col-span-7">
            <SceneSwitcher />
            <p className="mono mt-4 text-graphite-70">
              Render — built from the published specification, not a photograph. Drag to turn.
            </p>
          </div>

          {/* ─── The money ───────────────────────────────────────────── */}
          <div className="md:col-span-5">
            <p className="label text-graphite-70">MONO · the steamer</p>
            <h1 className="title-m mt-5">
              <LineMaskReveal lines={["Sold complete."]} lineClassName="title-m" />
            </h1>
            <p className="lede mt-6 max-w-[40ch]">{PRODUCT.name}. {PRODUCT.power},{" "}
              {PRODUCT.heatUp} to heat, {PRODUCT.tank} tank, ceramic soleplate — with the case, the
              protocol card and three years to call. The appliance is almost the $29.70 one. What
              happens after you unbox it isn&apos;t.
            </p>

            <p className="mt-9 flex items-baseline gap-4">
              <span className="font-serif text-[clamp(52px,5vw,68px)] leading-none tracking-[-0.02em] [font-variant:tabular-nums]">
                {PRODUCT.priceLabel}
              </span>
              <span className="label text-graphite-70">USD</span>
            </p>
            <p className="form-note mt-2 text-graphite-70">{PRODUCT.compareAtNote}</p>

            <div className="mt-8">
              <SteamerBuyActions />
            </div>

            <div className="mt-8">
              <PaymentRow />
            </div>

            <ul className="mt-7 grid gap-2 border-t border-hair pt-6">
              {TRUST.map((t) => (
                <li key={t} className="form-note text-graphite-70">
                  {t}
                </li>
              ))}
            </ul>

            {/* ─── The detail, behind accordions — not a scroll essay ── */}
            <div className="mt-10 border-t-2 border-graphite">
              {ACCORDIONS.map((a) => (
                <details key={a.title} className="group border-b border-hair">
                  <summary className="tap-block cursor-pointer list-none justify-between gap-8 py-5 [&::-webkit-details-marker]:hidden">
                    <h2 className="title-s">{a.title}</h2>
                    <span
                      aria-hidden="true"
                      className="mono shrink-0 text-graphite-70 transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="body max-w-[58ch] pb-6">{a.body}</p>
                  {a.rows ? (
                    <dl className="ledger mb-6">
                      {a.rows.map((r) => (
                        <div key={r.label} className="ledger-row ledger-row-stack">
                          <dt className="ledger-key">{r.label}</dt>
                          <dd className="ledger-val">{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE PROOF — three compact rows, then the page is done ──── */}
      <ComplaintsCompact />

      {/* ─── CHROME ─────────────────────────────────────────────────── */}
      <StickyBuyBar />
    </>
  );
}

export default SteamerPdp;
