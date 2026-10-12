/* Product index — the full catalogue as one ledger. Exists so every
 * product link (cart empty state included) lands somewhere real.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Every product in the catalogue, priced by one rule from landed cost. Supplier photographs, no reviews, no compare-at prices. Concept brand demonstration.",
};

export default function ProductsPage() {
  /* The system product is excluded: it is not priced by the rule, so
     listing it here would make the line above a lie. It lives on its
     own page at /products/the-steamer. */
  const products = getProducts().filter((p) => !p.system);

  return (
    <>
      <section aria-labelledby="products-opening" className="band-tight pt-[calc(var(--head-h)+48px)]">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h1 id="products-opening" className="title-l max-w-[12ch]">
              Everything, <span className="italic">priced by one rule.</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end md:pb-2">
            <p className="lede">
              {products.length} products. Each price is the ceiling of landed cost divided by 0.45.
            </p>
            <p className="body mt-7 max-w-[34ch]">
              Supplier photographs throughout. Nothing has a review because nothing has shipped.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="All products" className="band-tight border-t border-hair">
        <div className="wrap">
          <ul className="border-t border-hair">
            {products.map((p) => (
              <li key={p.handle} className="border-b border-hair">
                <Link
                  href={`/products/${p.handle}`}
                  className="tap-block group justify-start gap-5 py-4 no-underline"
                >
                  <span className="relative block h-11 w-11 flex-none overflow-hidden bg-steam">
                    <Image src={p.image} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[16px] font-medium underline decoration-hair underline-offset-4 group-hover:decoration-graphite">
                      {p.name}
                    </span>
                    <span className="micro mt-1 block">{p.category}</span>
                  </span>
                  <span className="mono flex-none">{formatPrice(p.price)}</span>
                  <span aria-hidden="true" className="flex-none text-graphite-70">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
