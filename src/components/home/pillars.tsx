import { PILLARS } from "@/lib/brand";

export function Pillars() {
  return (
    <section className="band">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <h2 className="title-l md:col-span-5">
            Three things we
            <span className="italic"> hold to.</span>
          </h2>
          <p className="body-lg md:col-span-3 md:col-start-8 md:pt-4">
            None of these are claims about the appliance. They are the parts of the offer the
            appliance cannot carry on its own.
          </p>
        </div>

        <div className="mt-14 flex flex-col" data-stagger>
          {PILLARS.map((pillar, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={pillar.title}
                className="grid gap-x-10 gap-y-4 border-t border-hair py-10 md:grid-cols-12 md:items-baseline"
              >
                <h3
                  className={`title-m md:col-span-4 ${
                    flip ? "md:col-start-7" : "md:col-start-1"
                  }`}
                >
                  {pillar.title}
                </h3>
                <p
                  className={`body-lg md:col-span-5 ${
                    flip ? "md:col-start-1" : "md:col-start-6"
                  }`}
                >
                  {pillar.body}
                </p>
                <p className="mono text-graphite-70 md:col-span-2 md:col-start-11 md:text-right">
                  {pillar.proof}
                </p>
              </article>
            );
          })}
          <div className="border-t border-hair" />
        </div>
      </div>
    </section>
  );
}
