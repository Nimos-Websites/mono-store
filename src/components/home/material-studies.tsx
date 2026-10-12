import { MaterialPanel } from "@/components/material-panel";

export function MaterialStudies() {
  return (
    <section className="band bg-ground">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <h2 className="title-m md:col-span-4">
            Three surfaces, and only one of them is the product.
          </h2>
          <p className="micro text-graphite-70 md:col-span-3 md:col-start-7 md:pt-3">
            Rendered procedurally from the same code the 3D model uses, so what you see here is a
            description, not a photograph of a part we have photographed.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4" data-parallax="4">
            <MaterialPanel
              name="ceramic"
              caption="Ceramic soleplate"
              spec="100 mm"
              zoom={1.12}
              className="[&>canvas]:aspect-[3/4] [&>canvas]:w-full [&>canvas]:bg-bone"
            />
          </div>
          <div className="md:col-span-5 md:pb-24" data-parallax="4">
            <MaterialPanel
              name="shell"
              caption="Graphite shell"
              zoom={1.9}
              className="[&>canvas]:aspect-[4/3] [&>canvas]:w-full [&>canvas]:bg-graphite"
            />
          </div>
          <div className="md:col-span-3" data-parallax="4">
            <MaterialPanel
              name="sweep"
              caption="Studio sweep, not a part"
              zoom={1}
              className="[&>canvas]:aspect-square [&>canvas]:w-full [&>canvas]:border [&>canvas]:border-[color:var(--hair)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
