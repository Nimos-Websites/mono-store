/* Related products — same category first, then nearest by landed cost.
 * A ledger list, not a card grid: four plain rows with a thumb, a name,
 * and a price. Nothing here claims similarity beyond what the feed says.
 */
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProducts, type Product } from "@/lib/catalog";

export function relatedProducts(product: Product, count = 4): Product[] {
  const all = getProducts().filter((p) => p.handle !== product.handle);
  const sameCategory = all.filter((p) => p.category === product.category);
  const rest = all
    .filter((p) => p.category !== product.category)
    .sort((a, b) => Math.abs(a.landed - product.landed) - Math.abs(b.landed - product.landed));
  return [...sameCategory, ...rest].slice(0, count);
}

export function ProductRelated({ product }: { product: Product }) {
  const related = relatedProducts(product);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="product-related" className="band-tight border-t border-hair">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <h2 id="product-related" className="title-m md:col-span-5">
            More from <span className="italic">the catalogue.</span>
          </h2>
          <p className="body-lg max-w-[38ch] md:col-span-4 md:col-start-9">
            Same category first. Anything after that is simply nearest by landed cost — not a claim
            that it does the same job.
          </p>
        </div>

        <ul className="mt-12 border-t border-hair md:mt-16">
          {related.map((p) => (
            <li key={p.handle} className="border-b border-hair">
              <Link
                href={`/products/${p.handle}`}
                className="tap-block group justify-start gap-5 py-4 no-underline"
              >
                <span className="relative block h-11 w-11 flex-none overflow-hidden bg-steam">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
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
  );
}
