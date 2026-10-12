import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCT } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Shipping, returns, warranty and the disclosure",
  description: `How ${PRODUCT.name} would ship, how it can be returned, what the three-year warranty covers, why there is no deposit, and a plain disclosure: Vell is a concept brand and no order can be placed.`,
};

const CONTENTS = [
  { href: "#shipping", label: "Shipping" },
  { href: "#returns", label: "Returns" },
  { href: "#warranty", label: "Warranty" },
  { href: "#deposit", label: "The price" },
  { href: "#disclosure", label: "About this site" },
];

const SHIPPING_LEDGER: { key: string; value: string }[] = [
  { key: "Freight", value: "Quoted at checkout, per destination" },
  { key: "Rate table", value: "None on this site" },
  { key: "Carrier", value: "Not named here" },
  { key: "Delivery date", value: "Not published here" },
  { key: "Express", value: "Not offered" },
];

const WARRANTY_LEDGER: { key: string; value: string }[] = [
  { key: "Term", value: "3 years from delivery" },
  { key: "Covers", value: "The appliance, faults and failures" },
  { key: "Marked", value: "cUL / ETL, CE, RoHS" },
  { key: "Not covered", value: "Scale, misuse, dead cords" },
];

const PRICE_LEDGER: { key: string; value: string }[] = [
  { key: "Price", value: `${PRODUCT.priceLabel}, one figure` },
  { key: "Paid", value: "In full, at checkout" },
  { key: "Deposit", value: "None" },
  { key: "Reservation", value: "None" },
  { key: "Balance", value: "Nothing due later" },
];

const DISCLOSURE: { key: string; value: string }[] = [
  {
    key: "The brand",
    value:
      "Vell is a concept brand built to demonstrate a one-product storefront system: a positioning, a design system, a product page and this site. It is not a trading company and it was never intended to become one.",
  },
  {
    key: "Orders and payment",
    value:
      "No order can be placed and no payment can be taken. There is no checkout here, no payment processor is connected, and no card or bank details are collected anywhere on this site.",
  },
  {
    key: "The appliance",
    value:
      "Nothing has been manufactured. No order has been placed with a factory, no bulk purchase has been made, and there is no inventory of any steamer sitting in any warehouse anywhere.",
  },
  {
    key: "The 3D render",
    value:
      "The model you can turn is built from the published specification on this site. It is not a photograph of a shipped product, and it is not a promise of exactly how a shipped product will look.",
  },
  {
    key: "The market figures",
    value:
      "Every sales figure quoted across this site comes from third-party platform estimates — RapidTok, z.media, FastMoss, NetInfluencer, Kalodata and Ainfluencer — retrieved 8 October 2026. They are not audited seller financials and they shift daily. Read them as evidence of demand shape, not as a forecast.",
  },
  {
    key: "The sourcing figures",
    value:
      "Every cost, minimum order quantity, lead time and supplier specification quoted across this site comes from live Alibaba and made-in-china supplier listings retrieved 8 October 2026. They are quotes on a day, not contracts, and they are the reason the exit numbers on this site are estimates.",
  },
  {
    key: "The warranty and returns",
    value:
      "The three-year warranty and the thirty-day return window are published as the terms this system would run on if it were trading. Neither is currently being honoured, because there is nothing to honour. They are written to be terms we would keep, not terms that read well.",
  },
  {
    key: "Email",
    value:
      "No email is ever sent, to anyone, for any reason. Where an address is submitted, it writes a single line to a text file on the server running this site. That is the entire mechanism.",
  },
];

function Aside({ rows }: { rows: { key: string; value: string }[] }) {
  return (
    <div className="ledger lg:w-[34%] lg:flex-none" data-reveal>
      {rows.map((row) => (
        <div key={row.key} className="ledger-row">
          <span className="ledger-key">{row.key}</span>
          <span className="ledger-val">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function PoliciesPage() {
  return (
    <>
      <div aria-hidden="true" className="h-[var(--head-h)]" />

      <section className="band">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <h1 className="title-l max-w-[11ch]">
              The rules, <span className="italic">in plain words.</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:col-start-8 md:self-end md:pb-2">
            <p className="lede">
              Shipping, returns, warranty and the price. Then, at the bottom, an explanation of what
              this site is, because that part outranks everything above it.
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-hair">
        <div className="wrap grid gap-14 py-14 md:grid-cols-12 md:gap-12 md:py-24">
          <nav aria-label="On this page" className="md:col-span-2">
            <div className="md:sticky md:top-[calc(var(--head-h)+28px)]">
              <h2 className="label">On this page</h2>
              <ul className="mt-5 flex flex-col border-t border-hair">
                {CONTENTS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="body tap flex min-h-11 items-center justify-between gap-3 border-b border-hair py-2 text-graphite no-underline transition-opacity hover:opacity-55"
                    >
                      <span>{item.label}</span>
                      <span className="mono opacity-45" aria-hidden="true">
                        ↓
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="micro mt-10 border-t border-hair pt-5">
                Everything above the disclosure describes an appliance that has not been made.
              </p>
            </div>
          </nav>

          <div className="md:col-span-9 md:col-start-4">
            <section id="shipping" className="scroll-mt-28 border-t border-hair pt-8 md:pt-10">
              <h2 className="title-m">Shipping</h2>
              <div className="mt-7 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
                <div className="flex flex-col gap-5 lg:min-w-0 lg:max-w-[74ch] lg:flex-1">
                  <p className="body-lg">
                    {PRODUCT.name} is {PRODUCT.weight} bare and ships as a parcel, not as freight.
                    There is no pallet and nobody has to be home for a two-hour delivery window.
                  </p>
                  <p className="body-lg">
                    The freight is quoted at checkout, per destination, before any payment moves. It
                    is not a flat rate and it is not hidden until the last step.
                  </p>
                  <p className="body-lg">
                    There is no rate table on this site, no named carrier and no delivery date,
                    because none of those three can be written down honestly yet. Where a unit is
                    dispatched from is decided when the first order is fulfilled, and publishing a
                    figure today would be a promise we could not keep.
                  </p>
                  <p className="body-lg">
                    Nothing is express. Nothing is expedited. If a delivery date matters to your
                    decision, the honest answer is that we will not give you one until we can stand
                    behind it.
                  </p>
                </div>
                <Aside rows={SHIPPING_LEDGER} />
              </div>
            </section>

            <section id="returns" className="mt-20 scroll-mt-28 border-t border-hair pt-8 md:mt-28 md:pt-10">
              <h2 className="title-m">Returns</h2>
              <div className="mt-7 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
                <div className="flex flex-col gap-5 lg:min-w-0 lg:max-w-[74ch] lg:flex-1">
                  <p className="body-lg">
                    Thirty days from delivery to tell us. Thirty days from there to get it back, in
                    unused condition. Return freight is paid by you and is not refunded; we are not
                    going to quote you a number we would then have to argue about.
                  </p>
                  <p className="body-lg">
                    Now the honest part, because a steam appliance is not a neutral object. It holds
                    water, it makes heat, and the commonest faults in this category are leaking at
                    the tank seal and a tank that has not been descaled. An honest expectation for a
                    category like this is a return rate between 8% and 12%. That is the figure we
                    budgeted, and it is higher than a fashion retailer would write down.
                  </p>
                  <p className="body-lg">
                    We are not going to publish a refusal rate lower than that, because we would not
                    honour it. A policy that promises a 3% return rate on an appliance like this is a
                    policy designed to be broken quietly.
                  </p>
                  <p className="body-lg">
                    Damage on arrival is a different thing and it is ours. A tank that arrives wet
                    inside, a plate that has leaked, a cord that is not sound — photograph it, write
                    inside the same 30 days, and it gets dealt with. Mineral scale building up in a
                    tank after use is not damage. It is what happens to heated water, and it is
                    covered under the warranty below instead.
                  </p>
                  <p className="body-lg">
                    This is the whole policy. It is written to be one we would actually honour rather
                    than one that reads well.
                  </p>
                </div>
                <div className="border-t border-hair pt-6 lg:w-[34%] lg:flex-none">
                  <p className="ledger-key">Thirty days, both ways</p>
                  <p className="body mt-4">
                    Thirty days from delivery to tell us. Thirty days from there to send it back,
                    unused.
                  </p>
                  <p className="body mt-4">
                    Expected return rate in this category: 8–12%. Budgeted, not apologised for.
                  </p>
                  <p className="body mt-4">
                    Nothing is resold. A returned appliance has already been steamed, and it is
                    inspected before anything else happens to it.
                  </p>
                </div>
              </div>
            </section>

            <section id="warranty" className="mt-20 scroll-mt-28 border-t border-hair pt-8 md:mt-28 md:pt-10">
              <h2 className="title-m">Warranty</h2>
              <div className="mt-7 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
                <div className="flex flex-col gap-5 lg:min-w-0 lg:max-w-[74ch] lg:flex-1">
                  <p className="body-lg">
                    Three years from delivery, covering the appliance: the heater, the pump, the
                    steam plate, the tank seal, the switch and the cord. If a part fails in ordinary
                    use we repair or replace it. That is three years, not the life of the object,
                    because an appliance is a device and a device has a service life.
                  </p>
                  <p className="body-lg">
                    The unit is specified and marked {PRODUCT.voltage}, with cUL / ETL, CE and RoHS
                    certification budgeted before a first order rather than after. Certification is
                    not a line we trim when the money is tight.
                  </p>
                  <p className="body-lg">
                    Not covered: scale and mineral build-up, which is maintenance rather than a
                    fault; water damage from running the unit empty or over the fill line; physical
                    damage, a cut cord, or a dropped unit; and anything opened, apart from by us. The
                    auto shut-off at an empty tank is a safety cut-out, not a licence to run it dry.
                  </p>
                  <p className="body-lg">
                    Registration is online and it is free. Three years is also the reason the case and
                    the protocol card are in the box: keeping the plate and the tank in good order is
                    cheaper than replacing either.
                  </p>
                </div>
                <Aside rows={WARRANTY_LEDGER} />
              </div>
            </section>

            <section id="deposit" className="mt-20 scroll-mt-28 border-t border-hair pt-8 md:mt-28 md:pt-10">
              <h2 className="title-m">The price</h2>
              <div className="mt-7 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
                <div className="flex flex-col gap-5 lg:min-w-0 lg:max-w-[74ch] lg:flex-1">
                  <p className="body-lg">
                    There is no deposit. Not a percentage of it, not a refundable part of it, not a
                    reservation that holds a unit back. Nothing about this product is sold by
                    reserving it.
                  </p>
                  <p className="body-lg">
                    There is one price — {PRODUCT.priceLabel} — paid in full at checkout, and one
                    freight figure quoted before you pay it. There is no second payment, no balance
                    due before delivery, and no batch that has to succeed for your money to come
                    back.
                  </p>
                  <p className="body-lg">
                    The reason is not generosity. A deposit mechanic exists to ration a constrained
                    supply and to protect a maker from a queue. Neither problem exists for a
                    {PRODUCT.priceLabel} appliance shipped from inventory, so the mechanic would be
                    theatre.
                  </p>
                  <p className="body-lg">
                    The price follows one rule used for every product here: the landed cost divided
                    by 0.45, rounded up — a 55% gross-margin floor that holds everywhere in this
                    system.
                  </p>
                </div>
                <Aside rows={PRICE_LEDGER} />
              </div>
            </section>

            <div className="mt-20 border-t border-hair pt-8 md:mt-28 md:pt-10">
              <p className="body-lg max-w-[52ch]">
                One more thing, and it is the thing that matters. Everything above describes an
                appliance that has not been made.
              </p>
              <a href="#disclosure" className="arrow-link mt-6 tap">
                <span>Read what this site actually is</span>
                <span className="arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <section
        id="disclosure"
        className="band-ink scroll-mt-28 border-y py-20 md:py-28"
        style={{ borderColor: "rgb(246 242 234 / 0.22)" }}
      >
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h2 className="title-l max-w-[12ch]">
              Vell is a <span className="italic">concept.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end md:pb-2">
            <p className="body-lg">
              Stated plainly instead of in small print at the bottom of a page. If you are deciding
              whether to buy anything here, this section is the answer.
            </p>
          </div>
        </div>

        <div className="wrap mt-14 md:mt-20">
          <div
            className="flex flex-col border-t"
            style={{ borderColor: "rgb(246 242 234 / 0.24)" }}
          >
            {DISCLOSURE.map((row) => (
              <div
                key={row.key}
                className="grid gap-3 border-b py-7 md:grid-cols-12 md:gap-8"
                style={{ borderColor: "rgb(246 242 234 / 0.24)" }}
                data-reveal
              >
                <h3 className="label md:col-span-3 md:pt-1">{row.key}</h3>
                <p className="body-lg md:col-span-6 md:col-start-5 md:max-w-[66ch]">{row.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-12">
            <p className="body-lg md:col-span-6 md:col-start-5 max-w-[52ch]">
              If any part of this site has read as a real shop selling a real appliance, that is a
              failure of this page rather than of your judgement. The exercise was to see whether a
              brand and a one-product storefront could be built this carefully with nothing invented
              to fill the gaps — including the numbers.
            </p>
            <div className="flex flex-col items-start gap-4 md:col-span-3 md:col-start-10">
              <Link href="/steamer" className="arrow-link tap" data-magnetic>
                <span>The specification</span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link href="/catalogue" className="arrow-link tap">
                <span>The queue, and what is excluded</span>
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