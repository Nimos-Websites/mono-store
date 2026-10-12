/* Product gallery — the supplier photograph, large. No 3D, no staging:
 * this page sells catalogue products, and the honest image is the feed file.
 */
import Image from "next/image";
import { FEED_DATE, FEED_SOURCE, type Product } from "@/lib/catalog";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <figure>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-steam">
        <Image
          src={product.image}
          alt={`Supplier photograph of ${product.name}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 58vw"
          className="object-cover"
        />
      </div>
      <figcaption className="label mt-4 text-graphite-70">
        Supplier photograph, not our photography · {FEED_SOURCE} · fetched {FEED_DATE}
      </figcaption>
    </figure>
  );
}
