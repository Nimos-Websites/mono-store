/* ─────────────────────────────────────────────────────────────────────────
 * THE NUMBER — the promise, stated the way the house states things: the
 * number first, then the sentence. One enormous tabular figure and the
 * spec that produces it. Nothing else in this act.
 * ─────────────────────────────────────────────────────────────────────── */
import { BigNumber, Ledger, Placard, RuleHeading } from "@/components/devices";
import { RevealOnScroll } from "@/components/motion/scroll/RevealOnScroll";
import { PRODUCT } from "@/lib/brand";

export function TheNumber() {
  return (
    <section aria-labelledby="act-number" className="band band-ink">
      <div className="wrap">
        <RuleHeading
          index="01"
          tone="paper"
          size="md"
          kicker="Heat-up, from the factory quote for the private-mold unit: 2000 W, 300 ml, 25 seconds."
        >
          <span id="act-number">25 seconds. That is the whole wait.</span>
        </RuleHeading>

        <div className="mt-[clamp(36px,5vw,64px)]">
          <Ledger
            ratio="12/5"
            wide={
              <RevealOnScroll>
                <BigNumber
                  value="25"
                  unit="seconds"
                  tone="paper"
                  caption="Hang the garment, wait, pass the head once. The promise is not a feature list. It is that a crumpled shirt becomes wearable in under a minute."
                />
              </RevealOnScroll>
            }
            narrow={
              <RevealOnScroll>
                <div>
                  <p className="body-lg text-on-dark-64">
                    The protocol card has four fabric settings. That is the whole manual. No app, no
                    pairing, no account to keep.
                  </p>
                  <div className="mt-9">
                    <Placard
                      tone="paper"
                      rows={[
                        { label: "Steam output", value: `${PRODUCT.steamRate}, category band` },
                        { label: "Tank", value: `${PRODUCT.tank}, removable` },
                        { label: "Soleplate", value: "Ceramic" },
                        { label: "Auto shut-off", value: "Yes" },
                        { label: "Voltage", value: PRODUCT.voltage },
                      ]}
                    />
                  </div>
                </div>
              </RevealOnScroll>
            }
          />
        </div>
      </div>
    </section>
  );
}
