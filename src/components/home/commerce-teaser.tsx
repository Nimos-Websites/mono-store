import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProducts } from "@/lib/catalog";

export function CommerceTeaser() {
  let items: ReturnType<typeof getProducts> = [];
  try {
    items = getProducts().slice(0, 6);
  } catch {
    items = [];
  }
  const rows = items ?? [];

  return (
    <section aria-labelledby="catalogue-teaser" className="band-tight relative z-10 bg-bone">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <h2 id="catalogue-teaser" className="title-m max-w-[14ch] md:col-span-5">
            The catalogue, <span className="italic">so far.</span>
          </h2>
          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="body max-w-[36ch]">
              The first six from the live feed. Supplier photos, the rule price, nothing staged.
            </p>
            <Link href="/products" className="arrow-link tap mt-5">
              <span>Browse all</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
        {rows.length === 0 ? (
          <p className="body mt-14 border-t border-hair pt-8">
            The catalogue feed has not landed yet. Nothing to show rather than something invented.
          </p>
        ) : (
          <ul className="mt-14 flex flex-col border-t border-hair">
            {rows.map((product) => (
              <li key={product.handle} className="border-b border-hair">
                <Link
                  href={`/products/${product.handle}`}
                  className="group tap-block grid grid-cols-[72px_1fr_auto] items-center gap-5 py-4 transition-colors hover:bg-steam"
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} — supplier photo`}
                    loading="lazy"
                    width={144}
                    height={144}
                    className="h-[72px] w-[72px] shrink-0 object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <span className="min-w-0">
                    <span className="title-s block leading-tight">{product.name}</span>
                    <span className="mono mt-2 block text-steel">{product.category}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-4 pr-1">
                    <span className="mono">{formatPrice(product.price)}</span>
                    <span
                      aria-hidden="true"
                      className="text-steel transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="label mt-8">Supplier photos · unedited feed images</p>
      </div>
    </section>
  );
}
