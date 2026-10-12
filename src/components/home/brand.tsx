import { BRAND, PILLARS } from "@/lib/brand";

export function Brand() {
  return (
    <section aria-labelledby="brand-wordmark" className="band relative z-10 bg-ground">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <h2 id="brand-wordmark" className="display">
            {BRAND.name}
          </h2>
          <p className="mono mt-5 uppercase" style={{ letterSpacing: "0.14em" }}>
            {BRAND.tagline}
          </p>
          <p className="lede mt-8 max-w-[30ch]">{BRAND.system}</p>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <div className="flex flex-col border-t border-hair">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="grid gap-x-10 gap-y-3 border-b border-hair py-8 md:grid-cols-12"
              >
                <div className="md:col-span-7">
                  <h3 className="title-s">{pillar.title}</h3>
                  <p className="body mt-4">{pillar.body}</p>
                </div>
                <p className="mono md:col-span-4 md:col-start-9 md:pt-2 md:text-right">
                  {pillar.proof}
                </p>
              </div>
            ))}
          </div>
          <p className="micro mt-6 max-w-[56ch]">{BRAND.concept}</p>
        </div>
      </div>
    </section>
  );
}
