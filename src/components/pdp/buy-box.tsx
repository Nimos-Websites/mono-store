import { JoinForm } from "@/components/forms/reserve-form";
import { PRODUCT, SPEC } from "@/lib/brand";

const BUY_ROWS = [
  "Power",
  "Heat-up",
  "Steam output",
  "Water tank",
  "Voltage",
  "Weight",
  "Auto shut-off",
  "Warranty",
];

const ROWS = BUY_ROWS.map((key) => SPEC.find((row) => row.key === key)).filter(
  (row): row is (typeof SPEC)[number] => Boolean(row),
);

export function BuyBox() {
  return (
    <aside
      aria-label="Buy"
      className="md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 md:sticky md:top-[calc(var(--head-h)+32px)] md:self-start"
    >
      <div className="border-t-2 border-graphite pt-7">
        <h1 className="title-m">{PRODUCT.name}</h1>
        <p className="mt-5 flex items-baseline gap-4">
          <span className="font-serif text-[clamp(38px,4.4vw,56px)] leading-none tracking-[-0.02em]">
            {PRODUCT.priceLabel}
          </span>
          <span className="label text-graphite-70">{PRODUCT.currency}</span>
        </p>
        <p className="form-note mt-4 text-graphite-70">{PRODUCT.compareAtNote}</p>

        <div className="ledger mt-8 [&_.ledger-key]:text-graphite-70">
          {ROWS.map((row) => (
            <div key={row.key} className="ledger-row">
              <span className="ledger-key">{row.key}</span>
              <span className="ledger-val">{row.value}</span>
            </div>
          ))}
        </div>

        <hr className="rule mt-11" />

        <div className="mt-9 [&_.label]:text-graphite-70 [&_.form-note]:text-graphite-70 [&_.form-note_a]:inline-flex [&_.form-note_a]:min-h-11">
          <JoinForm />
        </div>

        <div className="mt-9 border-t border-hair pt-7">
          <h2 className="title-s">There are no reviews.</h2>
          <p className="body mt-4 text-graphite-70">
            Not one, because this product has not shipped and nobody owns one. There is no
            customer to quote, no star rating to print and no survey to summarise. When there are,
            they will appear here unedited, including the bad ones.
          </p>
        </div>
      </div>
    </aside>
  );
}
