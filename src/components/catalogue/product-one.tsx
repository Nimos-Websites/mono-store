import Link from "next/link";
import { ProductScene } from "@/components/product-scene";
import { PRODUCT, SPEC } from "@/lib/brand";

const SHOWN = ["Power", "Heat-up", "Steam output", "Water tank", "Soleplate", "Certification"];

const ROWS = SPEC.filter((row) => SHOWN.includes(row.key));

export function ProductOne() {
  return (
    <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
      <div className="lg:col-span-7">
        <div className="relative h-[min(80svh,780px)] w-full overflow-hidden bg-steam">
          <ProductScene className="h-full w-full" />
        </div>
        <p className="mono mt-4 text-graphite-46">
          A model built from the published specification. It is not a photograph of a shipped
          product.
        </p>
      </div>

      <div className="lg:col-span-5 lg:col-start-8 lg:pt-6">
        <p className="ledger-key">Product one, live now</p>
        <h3 className="title-m mt-5 max-w-[10ch]">{PRODUCT.name}</h3>
        <p className="lede mt-6 max-w-[26ch]">
          The template. Owned endpoint, owned funnel, owned capture, own content, own margin profile.
        </p>

        <div className="ledger mt-10">
          {ROWS.map((row) => (
            <div key={row.key} className="ledger-row">
              <span className="ledger-key">{row.key}</span>
              <span className="ledger-val">{row.value}</span>
            </div>
          ))}
          <div className="ledger-row">
            <span className="ledger-key">Price</span>
            <span className="ledger-val">{PRODUCT.priceLabel}</span>
          </div>
        </div>

        <Link href="/steamer" className="button button-signal button-block mt-10" data-magnetic>
          The steamer · {PRODUCT.priceLabel}
        </Link>
        <p className="form-note mt-6">
          The endpoint, the price and the list of people who bought from you all stay here. That is
          the part a marketplace takes.
        </p>
      </div>
    </div>
  );
}