import { PRODUCT, SPEC } from "@/lib/brand";

const NOT_CLAIMED = [
  "Not a medical device, and it treats nothing.",
  "Not chemical-free. It is a tank of water, a heater and a plastic nozzle.",
  "Not wrinkle-proof. One pass on a set crease is not always one pass.",
];

export function Specification() {
  return (
    <section className="band border-t border-hair bg-steam" id="specification">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <h2 className="title-m">
            Every figure is
            <span className="italic"> published, not described.</span>
          </h2>
          <p className="body-lg mt-7 max-w-[34ch]">
            There is no &ldquo;fast heating&rdquo; and no &ldquo;powerful steam&rdquo; anywhere on
            this page. Each row below is a measured quantity with a unit, and you can check the
            arithmetic yourself.
          </p>
          <p className="form-note mt-7 text-graphite-70">
            {SPEC.length} rows. Nothing on this product has a figure we cannot source. HS{" "}
            {PRODUCT.hsCode} · {SPEC[SPEC.length - 1].value}.
          </p>
          <div className="mt-10 flex flex-col border-b border-hair">
            {NOT_CLAIMED.map((row) => (
              <div key={row} className="flex gap-5 border-t border-hair py-5">
                <span aria-hidden="true" className="mono text-graphite-70">
                  —
                </span>
                <span className="body">{row}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="ledger [&_.ledger-key]:text-graphite-70" data-reveal>
            {SPEC.map((row) => (
              <div key={row.key} className="ledger-row">
                <span className="ledger-key">{row.key}</span>
                <span className="ledger-val">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
