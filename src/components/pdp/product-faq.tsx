/* Product FAQ — plain answers from the feed and the pricing rule.
 * Native disclosure widgets: keyboard support and focus come free, no JS
 * motion to reduce or destroy. No guarantees are invented: no warranty,
 * no shipping promise, no date.
 */
import { PRICE_RULE, formatPrice, type Product } from "@/lib/catalog";

export function ProductFaq({ product }: { product: Product }) {
  const faqs = [
    {
      q: "How is the price set?",
      a: `${PRICE_RULE} For this product that works out at ${formatPrice(product.price)}. No compare-at price — there has never been one.`,
    },
    {
      q: "When can I buy it?",
      a: "Availability is confirmed when you order, and this is a concept brand: no orders are taken and no payment is processed here. The list in the buy box is the only thing that records interest.",
    },
    {
      q: "Where does the photograph come from?",
      a: "It is the supplier's own file, loaded direct from their host. It is not our photography and it has not been retouched, which is why it looks like a listing photo — because it is one.",
    },
  ];

  return (
    <section aria-labelledby="product-faq" className="band-tight border-t border-hair">
      <div className="wrap-narrow">
        <h2 id="product-faq" className="title-m">
          Asked <span className="italic">plainly.</span>
        </h2>
        <div className="mt-10 border-b border-hair">
          {faqs.map((row) => (
            <details key={row.q} className="group border-t border-hair">
              <summary className="tap-block cursor-pointer list-none justify-between gap-8 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="title-s">{row.q}</h3>
                <span
                  aria-hidden="true"
                  className="mono shrink-0 text-graphite-70 transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="body max-w-[64ch] pb-8">{row.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
