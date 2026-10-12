import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { PRODUCT } from "@/lib/brand";

export const metadata: Metadata = {
  title: "The list",
  description: `One address, one line in a file. No email is ever sent and nothing is sold here — ${PRODUCT.name}, ${PRODUCT.priceLabel}.`,
};

const STEPS = [
  {
    mark: "01",
    body: "Your address is appended as one line to a text file on the server running this site. That is the entire mechanism.",
  },
  {
    mark: "02",
    body: "No email is ever sent — not a confirmation, not a newsletter, not a follow-up. Nobody is contacted.",
  },
  {
    mark: "03",
    body: "If anything opens, it is announced in public, the same for everyone on the list. The list confers no priority.",
  },
];

export default function WaitlistPage() {
  return (
    <>
      <div aria-hidden="true" className="h-[var(--head-h)]" />

      <section className="band">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h1 className="title-l max-w-[11ch]">
              The list is <span className="italic">a text file.</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end md:pb-2">
            <p className="lede">
              One address, one line. {PRODUCT.name} is {PRODUCT.priceLabel}, and nothing on this
              page sells it to you.
            </p>
            <p className="mono mt-8 text-graphite-70">
              {PRODUCT.power} · {PRODUCT.heatUp} to heat · {PRODUCT.tank} · {PRODUCT.priceLabel}
            </p>
          </div>
        </div>
      </section>

      <section className="band-ink border-t border-hair">
        <div className="wrap grid gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <WaitlistForm />
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <h2 className="title-m max-w-[16ch]">What happens after you join.</h2>
            <ol className="mt-10 flex flex-col">
              {STEPS.map((step) => (
                <li
                  key={step.mark}
                  className="flex items-baseline gap-5 border-t border-hair py-6"
                  style={{ borderColor: "rgb(246 242 234 / 0.22)" }}
                >
                  <span className="mono flex-none" aria-hidden="true" style={{ color: "var(--cool)" }}>
                    {step.mark}
                  </span>
                  <p className="body max-w-[44ch]">{step.body}</p>
                </li>
              ))}
            </ol>
            <Link href="/policies#disclosure" className="arrow-link tap mt-8 text-on-dark">
              <span>Read what this site actually is</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
