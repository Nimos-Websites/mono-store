/* ─────────────────────────────────────────────────────────────────────────
 * THE HERO — a full-bleed rendered scene with the offer composed over it
 * on a scrim, Ridge-style. Not a text column beside a picture: the render
 * IS the page's first three seconds, and the price sits on top of it.
 * The object stands right of centre, the copy takes the left, and the
 * base of the frame is where the offer lands.
 *
 * Honesty: the scene is captioned as a render here and everywhere it
 * appears, and the specification ledger is the text alternative.
 * ─────────────────────────────────────────────────────────────────────── */
"use client";

import { SceneView } from "@/components/render/scene-view";
import { LineMaskReveal } from "@/components/motion/text/LineMaskReveal";
import { BRAND, PRODUCT } from "@/lib/brand";
import { BuyBox } from "./commerce/buy-box";

export function PdpHero() {
  return (
    <section
      aria-label="The MONO Steamer"
      className="relative min-h-[100svh] overflow-hidden bg-ground pt-[var(--head-h)]"
    >
      {/* The render: the whole first viewport, framed right of centre so
          the copy keeps the left and the base. */}
      <div className="absolute inset-0">
        <SceneView
          kind="plinth"
          interactive
          className="h-full w-full"
          label={`Render — ${PRODUCT.name} standing on a plaster plinth under museum lighting, turning slowly. Built in 3D from the published specification: ${PRODUCT.power}, ${PRODUCT.tank} removable tank, ${PRODUCT.heatUp} heat-up, ${PRODUCT.steamRate} steam output, ceramic soleplate, ${PRODUCT.weight} bare. It is not a photograph.`}
        />
      </div>

      {/* The scrim: warm plaster from the base, a wash from the left, so
          the offer always reads and the object never loses its sky. The
          base wash is deliberately short — the plaster ground and the
          object's shadow must stay visible under the copy, or the hero
          turns into a white rectangle with an object floating in it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(242,240,235,0.9) 0%, rgba(242,240,235,0.86) 15%, rgba(242,240,235,0.54) 33%, rgba(242,240,235,0.12) 55%, rgba(242,240,235,0) 74%), linear-gradient(to right, rgba(242,240,235,0.44) 0%, rgba(242,240,235,0.12) 24%, rgba(242,240,235,0) 44%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end">
        <div className="wrap pb-[clamp(24px,3.4vw,52px)]">
          <p className="label text-graphite-70">
            MONO · the steamer · {PRODUCT.power} · {PRODUCT.tank} · {PRODUCT.heatUp}
          </p>

          <h1 className="title-l mt-[clamp(14px,1.8vw,22px)] max-w-[15ch]">
            <LineMaskReveal lines={["The steamer,", "sold complete."]} lineClassName="title-l" />
          </h1>

          <p className="lede mt-[clamp(16px,2vw,26px)] max-w-[44ch]">{BRAND.story}</p>

          {/* The offer, on plaster, over the render. */}
          <div className="mt-[clamp(22px,2.8vw,40px)] border-t-2 border-graphite pt-[clamp(18px,2.2vw,28px)]">
            <BuyBox variant="hero" />
          </div>

          <p className="label mt-[clamp(14px,1.6vw,20px)] text-graphite-70">
            Render — built from the specification, not a photograph · drag to turn
          </p>
        </div>
      </div>
    </section>
  );
}
