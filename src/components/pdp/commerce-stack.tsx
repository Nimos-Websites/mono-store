/* ─────────────────────────────────────────────────────────────────────────
 * THE COMMERCE STACK — every surface a top DTC brand runs everywhere, and
 * each one doing exactly what it says:
 *
 *   · the standing buy box — quick-add, fly-to-cart, the same server-side
 *     pricing the drawer charges
 *   · the batch cap, honest: 250 units is the operating model, and there
 *     is no live count, so no bar is filled and nothing counts down
 *   · back-in-stock capture — one field, one line in a file, no email
 *   · the referral module — access, never money
 *   · the track-order placeholder — it says Batch 01 has not shipped, and
 *     then it declines to pretend to look anything up
 *
 * Nothing here can charge a card, and every module says so at the point
 * where a customer would expect to be charged.
 * ─────────────────────────────────────────────────────────────────────── */
import { Ledger, RuleHeading } from "@/components/devices";
import { RevealOnScroll } from "@/components/motion/scroll/RevealOnScroll";
import { BuyBox } from "./commerce/buy-box";
import { ReferralModule } from "./commerce/referral";
import { TrackOrder } from "./commerce/track-order";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { BATCH } from "@/data/funnel";
import { PRODUCT } from "@/lib/brand";

export function CommerceStack() {
  return (
    <section aria-labelledby="act-buypath" className="band-tight border-t border-hair">
      <div className="wrap">
        <RuleHeading
          index="02"
          size="md"
          kicker="Every commerce surface on this page does exactly what it says and nothing more. Nothing here can charge a card today, and nothing here says otherwise."
        >
          <span id="act-buypath">The buy path, stated plainly.</span>
        </RuleHeading>

        {/* ── The offer, and the cap beside it ─────────────────────── */}
        <div className="mt-[clamp(36px,5vw,64px)]">
          <Ledger
            ratio="7/5"
            wide={
              <RevealOnScroll>
                <BuyBox />
              </RevealOnScroll>
            }
            narrow={
              <RevealOnScroll>
                <div className="border-t-2 border-graphite pt-7">
                  <p className="label text-graphite-70">{BATCH.name} · the cap</p>
                  <p className="mt-6 font-serif text-[clamp(56px,4.6vw,84px)] leading-none tracking-[-0.03em] [font-variant:tabular-nums]">
                    {BATCH.units}
                  </p>
                  <p className="mono mt-3 text-graphite-70">units, then the re-order decision</p>
                  <p className="body mt-7 max-w-[40ch]">{BATCH.note}</p>
                  <p className="form-note mt-6 max-w-[40ch] text-graphite-70">
                    There is no live unit count on this page, because there is nothing to count yet. When
                    Batch 01 exists the number is real, and until then it stays blank rather than
                    invented.
                  </p>
                </div>
              </RevealOnScroll>
            }
          />
        </div>

        {/* ── The list, and the referral beside it ──────────────────── */}
        <div className="mt-[clamp(56px,7vw,104px)]">
          <Ledger
            ratio="5/3"
            flip
            wide={
              <RevealOnScroll>
                <div id="product-join" className="scroll-mt-[calc(var(--head-h)+16px)] bg-steam p-[clamp(24px,3vw,44px)]">
                  <h3 className="title-s">Batch 01 has not shipped. The list is the queue.</h3>
                  <p className="body mt-4 max-w-[54ch]">
                    One field, one line in a file. No order, no payment, no email sent, nobody is
                    contacted. If Batch 02 opens, you hear about it in public, the same as everyone else
                    on the list.
                  </p>
                  <div className="mt-6 max-w-[460px]">
                    <WaitlistForm />
                  </div>
                </div>
              </RevealOnScroll>
            }
            narrow={
              <RevealOnScroll>
                <div className="border-t-2 border-lamp pt-7">
                  <h3 className="title-s">Give one, keep one.</h3>
                  <ReferralModule className="mt-7" />
                  <p className="form-note mt-8 max-w-[44ch] text-graphite-70">
                    No discount codes exist on this site. The only thing a referral buys is a place in the
                    Batch 02 queue, for both of you.
                  </p>
                </div>
              </RevealOnScroll>
            }
          />
        </div>

        {/* ── Track order, and what it refuses to do ───────────────── */}
        <div className="mt-[clamp(48px,6vw,88px)]">
          <Ledger
            ratio="12/5"
            wide={
              <RevealOnScroll>
                <TrackOrder />
              </RevealOnScroll>
            }
            narrow={
              <RevealOnScroll>
                <div className="border-t-2 border-graphite pt-7">
                  <p className="label text-graphite-70">The order of operations</p>
                  <p className="body mt-5 max-w-[40ch]">
                    {PRODUCT.priceLabel} covers the unit, the moulded case, the measuring cup, the protocol
                    card and the warranty. Nothing on this page adds a fee, a threshold or a countdown to
                    that number.
                  </p>
                </div>
              </RevealOnScroll>
            }
          />
        </div>
      </div>
    </section>
  );
}
