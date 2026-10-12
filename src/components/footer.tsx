import Link from "next/link";
import { BRAND, PRODUCT } from "@/lib/brand";

const COLUMNS = [
  {
    head: "The steamer",
    links: [
      { href: "/steamer", label: "Specification" },
      { href: "/steamer#bundle", label: "What's in the box" },
      { href: "/how", label: "How it works" },
    ],
  },
  {
    head: "The system",
    links: [
      { href: "/catalogue", label: "Next products" },
      { href: "/policies", label: "Shipping & returns" },
      { href: "/policies#warranty", label: "3-year warranty" },
      { href: "/policies#disclosure", label: "About this site" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="band-ink sticky bottom-0 z-0 border-t border-hair"
      style={{ position: "sticky", bottom: 0, zIndex: 0 }}
    >
      <div className="wrap py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="font-serif text-[clamp(46px,7vw,104px)] leading-[0.86] tracking-[-0.03em] text-on-dark">
              Wrinkles are a
              <br />
              <span className="italic">thirty-second problem.</span>
            </p>
            <p className="body mt-7 max-w-[38ch]">
              {PRODUCT.name} — {PRODUCT.priceLabel}. {PRODUCT.power}, {PRODUCT.heatUp} to heat,{" "}
              {PRODUCT.steamRate} of steam. Three-year warranty.
            </p>
            <Link href="/steamer" className="arrow-link tap mt-8 text-on-dark" data-magnetic>
              <span>Buy the steamer</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.head} aria-label={col.head} className="md:col-span-2">
              <h2 className="label">{col.head}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="body tap text-on-dark-64 no-underline transition-colors hover:text-on-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-3">
            <h2 className="label">The list</h2>
            <p className="body mt-5 max-w-[30ch] text-on-dark-64">
              One address, one line in a file. No email is ever sent, and announcements happen in
              public.
            </p>
            <Link href="/waitlist" className="arrow-link tap mt-6 text-on-dark">
              <span>Join the list</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <hr className="rule mt-16" />

        <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <p className="micro max-w-[62ch] text-on-dark-64">
            <strong className="font-semibold text-on-dark">Concept brand.</strong> {BRAND.concept}{" "}
            Nothing on this site is an offer. No orders are taken, no payment is processed, and no
            email is sent.
          </p>
          <p className="label whitespace-nowrap">Product one · {PRODUCT.currency}</p>
        </div>
      </div>
    </footer>
  );
}
