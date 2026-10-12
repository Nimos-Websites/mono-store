/* ─────────────────────────────────────────────────────────────────────────
 * THE GALLERY — the campaign photography, rendered as full-bleed
 * editorial bands with parallax. Every band is a full-viewport
 * composition a product photographer would have shot, every band is
 * captioned as a render (honesty law), and every band carries one
 * sentence of copy — these are photographs, not sections. The two bands
 * mirror each other: caption right, then caption left, so the page
 * zigzags as it falls.
 *
 * Motion: the band's media is uncovered by a clip-path curtain
 * (ImageClipReveal) and drifts on the scroll (data-parallax, the single
 * Lenis/ScrollTrigger owner in motion.tsx). Reduced motion gets the
 * still frame and nothing moves.
 * ─────────────────────────────────────────────────────────────────────── */
"use client";

import { SceneView } from "@/components/render/scene-view";
import { ImageClipReveal } from "@/components/motion/scroll/ImageClipReveal";
import { CatalogCaption } from "@/components/devices";
import { PRODUCT } from "@/lib/brand";

const DESK_LABEL = `Render — ${PRODUCT.name} standing on pale oak beside folded linen, window light from the right, a gentle wisp of steam rising from the head. Built in 3D from the published specification. The steam is simulated; it is not a photograph.`;

const CASE_LABEL = `Render — ${PRODUCT.name} beside its moulded travel case, open, the cord coiled in the felt well, on the same plaster ground as the hero. Built in 3D from the published specification. It is not a photograph.`;

type BandProps = {
  kind: "desk" | "case";
  label: string;
  folio: string;
  caption: string;
  /** Which end of the band the caption sits at. */
  side: "left" | "right";
  drift: number;
  children?: React.ReactNode;
};

function Band({ kind, label, folio, caption, side, drift, children }: BandProps) {
  return (
    <section aria-label={caption} className="relative overflow-hidden bg-ground">
      <figure className="relative m-0 h-[clamp(520px,86svh,940px)] w-full">
        <ImageClipReveal className="absolute inset-x-0 inset-y-[-14%]">
          <div className="h-full w-full" data-parallax={drift}>
            <SceneView kind={kind} label={label} className="h-full w-full" />
          </div>
        </ImageClipReveal>

        {/* Legibility wash at the caption end only — the render stays
            legible everywhere else in the frame. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              side === "left"
                ? "linear-gradient(to right, rgba(242,240,235,0.94) 0%, rgba(242,240,235,0.6) 26%, rgba(242,240,235,0.08) 54%, rgba(242,240,235,0) 76%)"
                : "linear-gradient(to left, rgba(242,240,235,0.94) 0%, rgba(242,240,235,0.6) 26%, rgba(242,240,235,0.08) 54%, rgba(242,240,235,0) 76%)",
          }}
        />

        <figcaption
          className={`absolute inset-x-0 bottom-0 p-[clamp(20px,3vw,56px)] ${
            side === "left" ? "text-left" : "text-right"
          }`}
        >
          <div className={`wrap ${side === "right" ? "flex justify-end" : ""}`}>
            <div className="max-w-[42ch]">
              {children}
              <CatalogCaption index={folio}>Render — {caption}</CatalogCaption>
            </div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}

export function GalleryDesk() {
  return (
    <Band
      kind="desk"
      label={DESK_LABEL}
      folio="01"
      side="left"
      drift={7}
      caption="the unit on pale oak beside folded linen, window light. The steam is simulated in the render."
    >
      <p className="body max-w-[36ch]">
        The photograph a category leader would shoot. Ours is code: the oak grain, the linen weave and the
        light are painted by the page at load.
      </p>
    </Band>
  );
}

export function GalleryCase() {
  return (
    <Band
      kind="case"
      label={CASE_LABEL}
      folio="02"
      side="right"
      drift={-6}
      caption="the unit beside the moulded case, open, the cord coiled in the felt well."
    >
      <p className="body max-w-[36ch]">
        Six parts in the box, one of them us. The case is the storage complaint answered — it holds the
        unit and the cord without a tangle.
      </p>
    </Band>
  );
}
