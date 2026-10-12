import type { Metadata } from "next";
import Link from "next/link";
import { PipelineRows } from "@/components/catalogue/pipeline-rows";
import { ProductOne } from "@/components/catalogue/product-one";
import { QueueLedger } from "@/components/catalogue/queue-ledger";
import { BRAND, PRODUCT, STAGES } from "@/lib/brand";

export const metadata: Metadata = {
  title: "The catalogue",
  description: `One product is a template. Product two is a config change. The queue, the exclusion that matters most, and the four-step path a product takes to get here. Currently one product: ${PRODUCT.name}, ${PRODUCT.priceLabel}.`,
};

const own = STAGES.find((stage) => stage.stage === "Own");

export default function CataloguePage() {
  return (
    <>
      <section aria-labelledby="catalogue-opening" className="band">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h1 id="catalogue-opening" className="title-l max-w-[12ch]">
              One product is a <span className="italic">template.</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end md:pb-2">
            <p className="lede">
              {BRAND.system} The second one costs a config, not a build. The third costs a form.
            </p>
            <p className="body mt-7 max-w-[34ch]">
              What follows is one product that exists as a design, and four that exist as a decision
              recorded before any money moved.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="catalogue-one" className="band band-bone">
        <div className="mb-14 md:mb-20">
          <div className="wrap grid gap-8 md:grid-cols-12 md:gap-10">
            <h2 id="catalogue-one" className="title-m max-w-[14ch] md:col-span-5">
              Product one. <span className="italic">The whole system.</span>
            </h2>
            <p className="body-lg max-w-[38ch] md:col-span-4 md:col-start-9">
              Every claim this system makes is demonstrated here or not at all. If the first product
              cannot carry it, the hundredth cannot either.
            </p>
          </div>
        </div>
        <ProductOne />
      </section>

      <section aria-labelledby="catalogue-queue" className="band">
        <div className="wrap">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <h2 id="catalogue-queue" className="title-m max-w-[14ch] md:col-span-5">
              The queue, picked on the same four criteria.
            </h2>
            <p className="body-lg max-w-[38ch] md:col-span-4 md:col-start-9">
              Generic, sourceable, demonstrable in a single shot, and carrying no regulatory risk.
              Four products cleared it. Price bands are the recorded prices on the source listings,
              not prices we have chosen.
            </p>
          </div>

          <div className="mt-14 md:mt-20">
            <QueueLedger />
            <p className="form-note mt-8 max-w-[64ch]">
              Nothing in that table exists. No supplier has been chosen for any of them, no price
              has been set by us, no order has been placed and no date is promised for any of them.
              It is a shortlist, published before it is convenient to publish it.
            </p>
            <Link href="/policies#disclosure" className="arrow-link tap mt-6">
              <span>Read what this site actually is</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="catalogue-excluded" className="band band-ink">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <h2 id="catalogue-excluded" className="title-l max-w-[11ch]">
              We are walking away from <span className="italic">52% of the money.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end md:pb-2">
            <p className="body-lg">
              The single largest exclusion in this catalogue, and the one we are least comfortable
              writing about, because it is a decision about fear rather than about product.
            </p>
          </div>
        </div>

        <div className="wrap mt-14 md:mt-20">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <p className="md:col-span-5">
              <span className="font-serif text-[clamp(52px,7vw,96px)] leading-[0.88] tracking-[-0.03em] text-on-dark">
                $23.2M
              </span>
              <span className="mono mt-5 block text-on-dark-64">
                TikTok Shop US, top 10 products by rolling 30-day GMV, 2 Sep – 1 Oct 2026
              </span>
            </p>
            <div className="md:col-span-6 md:col-start-7">
              <p className="body-lg max-w-[48ch]">
                That is what the ten best-selling products on the platform took in thirty days.
                Beauty took 52% of it. The medicube Smooth &amp; Clear Body Care Set alone took
                $4.9M, and Toplux Magnesium Complex took $2.3M on roughly $15.55 a unit with a
                lifetime count above two million.
              </p>
              <p className="body-lg mt-7 max-w-[48ch]">
                Read that again and the arithmetic is uncomfortable: the money is overwhelmingly in
                the two categories we have ruled out.
              </p>
            </div>
          </div>

          <hr className="rule mt-14 md:mt-20" />

          <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-12 md:mt-20">
            <div className="md:col-span-4">
              <h3 className="title-s max-w-[16ch]">Why we are not doing it.</h3>
              <p className="body mt-5 max-w-[34ch]">
                Not because the products are bad and not because the demand is fake. Both are
                proven, and the demand is the most proven thing on this page.
              </p>
              <p className="form-note mt-10">
                Figures above: third-party platform estimates from RapidTok, z.media, FastMoss,
                NetInfluencer, Kalodata and Ainfluencer, retrieved 8 October 2026. They are not
                audited seller financials and they move daily. Read them as evidence of demand
                shape, not as a forecast.
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="body-lg max-w-[62ch]">
                Because they are regulated, and a claim is a liability that outlives the brand that
                made it. Ingest a magnesium product and you are arguing about what a supplement
                does to a body. Sell a serum and you are arguing about what it does before that. In
                both cases somebody eventually asks for substantiation, and the answer has to exist
                or the brand does.
              </p>
              <p className="body-lg mt-7 max-w-[62ch]">
                An appliance makes no claim about your body. It heats water. There is no FDA
                registration to lose, no ingest pathway, no health language to defend, and no
                class-action tail on a ${PRODUCT.price} order.
              </p>
              <p className="body-lg mt-7 max-w-[62ch]">
                So we take the smaller half of the market and keep the half where the worst thing
                that can happen to us is that a customer is disappointed with a steam rate. A brand
                nobody can afford to defend is not a brand worth having, whatever its revenue is.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="catalogue-pipeline" className="band">
        <div className="wrap">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <h2 id="catalogue-pipeline" className="title-m max-w-[16ch] md:col-span-5">
              How a product gets added.
            </h2>
            <p className="body-lg max-w-[38ch] md:col-span-4 md:col-start-9">
              Four steps, and the third one is where products die. A candidate that cannot be
              differentiated from its category leader is not a product. It is inventory.
            </p>
          </div>

          <div className="mt-14 md:mt-20">
            <PipelineRows />
          </div>

          <div className="mt-12 md:mt-16">
            <hr className="rule" />
            <div className="grid gap-8 pt-8 md:grid-cols-12 md:gap-10">
              <p className="body-lg max-w-[44ch] md:col-span-5">{own?.body}</p>
              <div className="flex flex-col items-start gap-4 md:col-span-3 md:col-start-9">
                <Link href="/steamer" className="arrow-link tap" data-magnetic>
                  <span>Product one</span>
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link href="/how" className="arrow-link tap">
                  <span>How the margin works</span>
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}