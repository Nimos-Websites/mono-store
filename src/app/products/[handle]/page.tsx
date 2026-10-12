import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductBuyBox } from "@/components/pdp/product-buy-box";
import { ProductComparison } from "@/components/pdp/product-comparison";
import { ProductDossier } from "@/components/pdp/product-dossier";
import { ProductFaq } from "@/components/pdp/product-faq";
import { ProductGallery } from "@/components/pdp/product-gallery";
import { ProductRelated } from "@/components/pdp/product-related";
import { ProductSpec } from "@/components/pdp/product-spec";
import { SteamerPdp, metadata as steamerMetadata } from "@/components/pdp/steamer-pdp";
import { getProduct, getProducts } from "@/lib/catalog";
import { PRODUCT } from "@/lib/brand";

export function generateStaticParams() {
  return getProducts().map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  /* The system product carries its own metadata, written for this page. */
  if (handle === PRODUCT.handle) return steamerMetadata;
  const product = getProduct(handle);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: `${product.name} (${product.category}). Our price $${product.price}, set by rule from a $${product.landed.toFixed(2)} landed cost. Supplier photograph, no reviews, no compare-at price. Concept brand demonstration.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;

  /* Product one has its own page, built to the DAF device set. The
     catalogue's other products keep the generic spec-document PDP. */
  if (handle === PRODUCT.handle) return <SteamerPdp />;

  const product = getProduct(handle);
  if (!product) notFound();

  return (
    <>
      <div className="band-tight pt-[calc(var(--head-h)+32px)]">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7 md:row-start-1">
            <ProductGallery product={product} />
          </div>
          <ProductBuyBox product={product} />
        </div>
      </div>

      <ProductSpec product={product} />
      <ProductComparison product={product} />
      <ProductDossier handle={handle} />
      <ProductRelated product={product} />

      <section aria-label="Reviews" className="band-tight border-t border-hair">
        <div className="wrap-narrow">
          <h2 className="title-s">There are no reviews.</h2>
          <p className="body mt-4 max-w-[62ch]">
            Not one, because this product has not shipped and nobody owns one. There is no customer
            to quote, no star rating to print and no survey to summarise. When there are, they will
            appear here unedited, including the bad ones.
          </p>
        </div>
      </section>

      <ProductFaq product={product} />
    </>
  );
}
