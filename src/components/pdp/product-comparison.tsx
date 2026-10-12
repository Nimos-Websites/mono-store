/* Price comparison — our price against the supplier's suggestion, with
 * the delta named in plain words. Amounts sit right-aligned in their own
 * column so the figures read as a comparison, not a sum. The supplier's
 * number is a reference, never an anchor: we have never sold at it.
 */
import { FEED_SOURCE, formatExact, formatPrice, type Product } from "@/lib/catalog";

export function ProductComparison({ product }: { product: Product }) {
  const delta = product.price - product.sugRetail;
  const direction = delta === 0 ? "matches" : delta > 0 ? "above" : "below";
  /* Magnitude formatted without currency then prefixed — never slice a
     locale string apart. */
  const magnitude = `$${Math.abs(delta).toFixed(2)}`;
  const deltaLabel =
    delta === 0
      ? "Our price matches the supplier's suggestion to the dollar."
      : `Our price sits ${magnitude} ${direction} the supplier's suggestion.`;

  return (
    <section aria-labelledby="product-compare" className="band">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7 md:row-start-1">
          <div className="ledger [&_.ledger-key]:text-graphite-70" data-reveal>
            <div className="ledger-row items-baseline">
              <span className="ledger-key">Our price</span>
              <span className="mono whitespace-nowrap text-right text-[20px] font-medium">
                {formatPrice(product.price)}
              </span>
            </div>
            <div className="ledger-row items-baseline">
              <span className="ledger-key">Supplier suggests</span>
              <span className="mono whitespace-nowrap text-right text-graphite-70">
                {formatExact(product.sugRetail)}
              </span>
            </div>
            <div
              className="ledger-row items-baseline"
              style={{ borderTopWidth: 2, borderTopColor: "currentColor" }}
            >
              <span className="ledger-key">The delta, named</span>
              <span className="mono whitespace-nowrap text-right text-signal">
                {delta === 0 ? "—" : `${delta > 0 ? "+" : "−"}${magnitude} ${direction}`}
              </span>
            </div>
          </div>
          <p className="form-note mt-6 text-graphite-70">
            The supplier&apos;s suggestion is their listed reference ({FEED_SOURCE}). It has never
            been our price, so it is not a sale, not a discount, and not struck through anywhere.
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <h2 id="product-compare" className="title-m">
            Against the <span className="italic">supplier&apos;s number.</span>
          </h2>
          <p className="body-lg mt-7 max-w-[34ch]">{deltaLabel}</p>
          <p className="body mt-6 max-w-[34ch]">
            Our price follows one rule from landed cost. The supplier&apos;s suggestion follows
            theirs. Publishing both is the point — you should see where they disagree.
          </p>
        </div>
      </div>
    </section>
  );
}
