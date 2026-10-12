import { MaterialPanel } from "@/components/material-panel";
import { ProductScene } from "@/components/product-scene";

export function Gallery() {
  return (
    <>
      <div className="relative overflow-hidden bg-steam">
        <ProductScene className="aspect-[1/1] w-full" />
      </div>
      <p className="label mt-4 text-graphite-70">3D model built from the spec · not a photograph</p>
    </>
  );
}

export function DetailCrops() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 md:mt-6">
      <MaterialPanel
        name="ceramic"
        caption="Detail · ceramic soleplate"
        spec="100 mm"
        zoom={1.4}
        className="[&>canvas]:aspect-[1/1] [&>canvas]:w-full [&>canvas]:bg-bone"
      />
      <MaterialPanel
        name="shell"
        caption="Detail · graphite shell"
        zoom={2.2}
        className="[&>canvas]:aspect-[3/4] [&>canvas]:w-full [&>canvas]:bg-graphite"
      />
    </div>
  );
}
