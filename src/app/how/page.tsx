import type { Metadata } from "next";
import Link from "next/link";
import { BundleManifest } from "@/components/how/bundle-manifest";
import { FabricLedger } from "@/components/how/fabric-ledger";
import { ProtocolSteps } from "@/components/how/protocol-steps";
import { StageRows } from "@/components/how/stage-rows";
import { MaterialPanel } from "@/components/material-panel";
import { COMPETITIVES, PRODUCT, STAGES } from "@/lib/brand";

export const metadata: Metadata = {
  title: "How it works",
  description: `The thirty-second protocol, the four fabric settings, and where the margin goes on ${PRODUCT.name} — the appliance, the case, the ceramic plate, the certification and three years of warranty. ${PRODUCT.priceLabel}.`,
};

const differentiate = STAGES.find((stage) => stage.stage === "Differentiate");
const own = STAGES.find((stage) => stage.stage === "Own");

const LEADER = COMPETITIVES[0].price;
const OURS = COMPETITIVES[COMPETITIVES.length - 1].price;

const MARGIN_LEDGER = [
  { key: "The appliance", value: "Close to the category leader, on purpose" },
  { key: "The case", value: "Moulded, in the box, not an upsell" },
  { key: "The plate", value: "Ceramic, ours rather than whatever ships" },
  { key: "The certification", value: "cUL / ETL, CE, RoHS, paid for first" },
  { key: "The warranty", value: "Three years, registered online" },
];

export default function HowPage() {
  return (
    <>
      <section
        aria-labelledby="how-opening"
        className="relative overflow-hidden bg-steam pt-[var(--head-h)]"
      >
        <div className="wrap grid min-h-[calc(100svh-var(--head-h))] gap-12 py-14 md:grid-cols-12 md:items-end md:gap-8 md:py-0">
          <div className="flex flex-col md:col-span-6 md:self-end md:pb-16">
            <h1 id="how-opening" className="title-l max-w-[13ch]">
              Thirty seconds is the claim. The rest of this page is the{" "}
              <span className="italic">argument.</span>
            </h1>
            <p className="lede mt-10 max-w-[34ch]">
              Four stages behind the price. Four things to do with the thing in your hand. And the
              reason the same appliance costs {OURS} here and {LEADER} on a marketplace.
            </p>
            <p className="mono mt-10 text-graphite-70">
              {PRODUCT.power} · {PRODUCT.heatUp} to heat · {PRODUCT.tank} · {PRODUCT.priceLabel}
            </p>
          </div>

          <div className="md:col-span-5 md:col-start-8 md:self-start md:pb-14">
            <MaterialPanel
              name="ceramic"
              caption="Ceramic soleplate"
              spec="100 mm · procedural render"
              zoom={2.4}
              className="[&>canvas]:aspect-[3/4] [&>canvas]:w-full [&>canvas]:bg-ceramic [&>canvas]:md:-mr-[var(--pad)]"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="how-stages" className="band">
        <div className="wrap">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <h2 id="how-stages" className="title-m max-w-[15ch] md:col-span-5">
              Four stages, in the order they happen.
            </h2>
            <p className="body-lg max-w-[32ch] md:col-span-4 md:col-start-9">
              Source, differentiate, content, own. Each one leaves a number behind, and the third
              one is the only one that compounds.
            </p>
          </div>
          <div className="mt-14 md:mt-20">
            <StageRows />
          </div>
        </div>
      </section>

      <section aria-labelledby="how-protocol" className="band band-bone">
        <div className="wrap-narrow">
          <h2 id="how-protocol" className="title-m max-w-[18ch]">
            The thirty-second <span className="italic">protocol.</span>
          </h2>
          <p className="body-lg mt-7 max-w-[44ch]">
            {PRODUCT.heatUp} of that is heat-up you cannot skip. The other four steps take as long
            as the hanger allows. This is the whole manual, and it is also the card in the box.
          </p>
          <div className="mt-12 md:mt-16">
            <ProtocolSteps />
          </div>
        </div>
      </section>

      <section aria-labelledby="how-fabrics" className="band">
        <div className="wrap">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <h2 id="how-fabrics" className="title-m max-w-[15ch] md:col-span-5">
              Three settings, and when to change them.
            </h2>
            <p className="body-lg max-w-[40ch] md:col-span-4 md:col-start-9">
              {PRODUCT.steamRate} of steam, three levels. Start on the middle one and change it when
              the fabric tells you to.
            </p>
          </div>

          <div className="mt-14 md:mt-20">
            <FabricLedger />
            <p className="form-note mt-8 max-w-[62ch]">
              These are starting points, not results. No lab has tested this appliance against a
              fabric swatch, because no appliance has been built and no money has changed hands.
              What is published here is the setting we would begin from and the failure mode to
              watch for. Adjust from there.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-margin" className="band band-ink">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-5">
            <h2 id="how-margin" className="title-m max-w-[14ch]">
              Where the margin <span className="italic">actually goes.</span>
            </h2>
            <p className="body-lg mt-8 max-w-[34ch]">{differentiate?.body}</p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="ledger">
              {MARGIN_LEDGER.map((row) => (
                <div key={row.key} className="ledger-row">
                  <span className="ledger-key">{row.key}</span>
                  <span className="ledger-val md:max-w-[30ch]">{row.value}</span>
                </div>
              ))}
            </div>
            <p className="form-note mt-7 max-w-[44ch]">
              Five lines is what the box contains. Each one is the reason this costs{" "}
              {PRODUCT.priceLabel} rather than the sum of the parts inside it.
            </p>
          </div>
        </div>

        <div className="wrap mt-16 md:mt-24">
          <div className="grid gap-10 md:grid-cols-12 md:gap-10">
            <h3 className="title-m max-w-[15ch] md:col-span-5">
              Six parts in the box. One of them is <span className="italic">us.</span>
            </h3>
            <p className="body-lg max-w-[30ch] md:col-span-4 md:col-start-9">
              The appliance is the easy part, and it is the part somebody else can build for a third
              of this.
            </p>
          </div>
          <div className="mt-14 md:mt-20">
            <BundleManifest />
          </div>
        </div>
      </section>

      <section aria-labelledby="how-marketplace" className="band">
        <div className="wrap">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <h2 id="how-marketplace" className="title-m max-w-[12ch] md:col-span-6">
              Why not a <span className="italic">marketplace.</span>
            </h2>
            <p className="body-lg max-w-[36ch] md:col-span-4 md:col-start-9">
              This is the page that has to justify why the same appliance costs {OURS} here. Here is
              the argument, without the adjectives.
            </p>
          </div>

          <hr className="rule mt-14 md:mt-20" />

          <div className="mt-12 grid gap-x-10 gap-y-8 md:mt-16 md:grid-cols-3">
            <p className="body-lg">{own?.body}</p>
            <p className="body-lg">
              A marketplace sells the same appliance for {LEADER}, keeps a commission, keeps a list
              of your customers, and keeps the price you have to accept. That is three things taken
              away to avoid running a page.
            </p>
            <p className="body-lg">
              So the trade is this: you pay {OURS}, and the endpoint, the price and the list of
              people who bought from you are ours. Every product after this one gets its own version
              of the same trade.
            </p>
          </div>

          <hr className="rule mt-14 md:mt-20" />

          <div className="mt-12 grid gap-x-10 gap-y-10 md:mt-16 md:grid-cols-3" data-reveal>
            {COMPETITIVES.map((row) => (
              <div key={row.brand} className="border-t border-hair pt-5">
                <p className="ledger-key">{row.brand}</p>
                <p className="title-s mt-5 max-w-[10ch]">{row.price}</p>
                <p className="body mt-4 max-w-[30ch]">{row.item}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:gap-10">
            <p className="body-lg max-w-[40ch] md:col-span-5">
              If you already know the category and you already know what a {OURS} steamer is worth
              to you, this page was never necessary.
            </p>
            <div className="md:col-span-4 md:col-start-9">
              <p className="form-note">
                Published prices, retrieved 8 October 2026. Nobody is converted into a common
                currency, so read this as a bracket rather than a ranking.
              </p>
              <Link href="/catalogue" className="arrow-link tap mt-5">
                <span>The queue, and what is excluded</span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-next" className="band band-ink">
        <div className="wrap grid gap-12 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <h2 id="how-next" className="title-l max-w-[12ch]">
              Read the <span className="italic">specification.</span>
            </h2>
            <p className="lede mt-8 max-w-[34ch]">
              {PRODUCT.name}. {PRODUCT.power}, {PRODUCT.heatUp} to heat, {PRODUCT.steamRate},{" "}
              {PRODUCT.tank}, ceramic soleplate. {PRODUCT.priceLabel}.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pb-3">
            <Link href="/steamer" className="button button-signal button-block" data-magnetic>
              The steamer
            </Link>
            <div className="mt-6 md:text-right">
              <p className="form-note">No order can be placed and no payment taken.</p>
              <Link href="/policies#disclosure" className="arrow-link tap mt-3">
                <span>The disclosure</span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}