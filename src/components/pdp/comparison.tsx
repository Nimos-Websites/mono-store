import { COMPETITIVES } from "@/lib/brand";

export function Comparison() {
  return (
    <section className="band" id="comparison">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <h2 className="title-m">
            We are not winning
            <span className="italic"> on a spec sheet.</span>
          </h2>
          <p className="body-lg mt-7 max-w-[34ch]">
            Put these three side by side on paper and the {COMPETITIVES[2].price} line looks like
            the worst deal in the list. That is the honest reading, and we would rather publish it
            than let you find it.
          </p>
          <p className="body-lg mt-6 max-w-[34ch]">
            What is different is not in the table. It is the case, the protocol card, the
            certification and the warranty — the four things a spec sheet has no row for.
          </p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="ledger [&_.ledger-key]:text-graphite-70" data-reveal>
            {COMPETITIVES.map((row, i) => (
              <div
                key={row.brand}
                className="ledger-row items-center"
                style={i === COMPETITIVES.length - 1 ? { borderTopWidth: 2, borderTopColor: "currentColor" } : undefined}
              >
                <span
                  className={`ledger-val font-serif text-[20px] md:text-[24px] ${
                    i === COMPETITIVES.length - 1 ? "text-signal" : ""
                  }`}
                >
                  {row.brand}
                </span>
                <span className="mono text-graphite-70">{row.item}</span>
                <span
                  className={`mono whitespace-nowrap ${
                    i === COMPETITIVES.length - 1 ? "text-signal" : "text-graphite-70"
                  }`}
                >
                  {row.price}
                </span>
              </div>
            ))}
          </div>
          <p className="form-note mt-6 text-graphite-70">
            Category prices are published listings, retrieved 8 October 2026. The category entry
            row is the spread of unbranded listings at the time of retrieval, not a single product.
          </p>
        </div>
      </div>
    </section>
  );
}
