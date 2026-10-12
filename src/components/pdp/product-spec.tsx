/* Full spec ledger — every field carried in products.json, plus the
 * pricing-rule note. Supplier figures keep their cents; our price is whole
 * dollars by rule. sugRetail is labelled as the supplier's suggestion with
 * its source — never as our anchor.
 */
import {
  FEED_SOURCE,
  PRICE_RULE,
  formatExact,
  formatPrice,
  type Product,
} from "@/lib/catalog";

export function ProductSpec({ product }: { product: Product }) {
  return (
    <section aria-labelledby="product-spec" className="band band-bone">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <h2 id="product-spec" className="title-m">
            What the feed <span className="italic">actually says.</span>
          </h2>
          <p className="body-lg mt-7 max-w-[34ch]">
            Every row below comes from the catalogue feed or from the pricing rule. Where the feed
            is silent, the row says so instead of filling the gap.
          </p>
          <p className="form-note mt-7 text-graphite-70">{PRICE_RULE}</p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="ledger [&_.ledger-key]:text-graphite-70" data-reveal>
            <div className="ledger-row">
              <span className="ledger-key">Our price</span>
              <span className="ledger-val">{formatPrice(product.price)}</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-key">Landed cost</span>
              <span className="ledger-val">{formatExact(product.landed)}</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-key">Unit cost</span>
              <span className="ledger-val">{formatExact(product.cogs)}</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-key">Freight</span>
              <span className="ledger-val">{formatExact(product.freight)}</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-key">Supplier suggests</span>
              <span className="ledger-val">
                {formatExact(product.sugRetail)}{" "}
                <span className="micro">· supplier reference, {FEED_SOURCE}</span>
              </span>
            </div>
            <div className="ledger-row">
              <span className="ledger-key">Category</span>
              <span className="ledger-val">{product.category}</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-key">Supplier</span>
              <span className="ledger-val">
                {product.supplier ?? "Not named in the source feed"}
              </span>
            </div>
            <div className="ledger-row">
              <span className="ledger-key">Ships from</span>
              <span className="ledger-val">{product.shipsTo.join(", ")}</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-key">Free shipping</span>
              <span className="ledger-val">
                {product.freeShipping ? "Yes, in the source feed" : "No, in the source feed"}
              </span>
            </div>
            <div className="ledger-row">
              <span className="ledger-key">Weight</span>
              <span className="ledger-val">{product.weightKg} kg</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-key">SKU</span>
              <span className="ledger-val">{product.sku}</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-key">Catalogue ID</span>
              <span className="ledger-val">{product.pid}</span>
            </div>
            <div className="ledger-row">
              <span className="ledger-key">Availability</span>
              <span className="ledger-val">Confirmed when you order</span>
            </div>
          </div>
          <p className="form-note mt-6 text-graphite-70">
            Supplier figures are the feed&apos;s numbers, not ours. The supplier&apos;s suggestion
            has never been our price, so there is nothing to strike through.
          </p>
        </div>
      </div>
    </section>
  );
}
