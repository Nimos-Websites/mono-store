import { PROOF } from "@/lib/brand";

export function Evidence() {
  return (
    <section className="band band-ink">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="ledger" data-reveal>
            {PROOF.map((row) => (
              <div key={row.key} className="ledger-row">
                <span className="ledger-key">{row.key}</span>
                <span className="ledger-val">{row.value}</span>
              </div>
            ))}
          </div>
          <p className="form-note mt-6">
            Figures describe the category, not this product. Sources for each row are in the ledger
            of the specification page. Content figures: z.media, week ending 4 October 2026.
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <blockquote className="title-m">
            The category leader&rsquo;s single best video earned{" "}
            <span className="text-signal">0.16%</span> of its revenue.
          </blockquote>
          <p className="lede mt-7 max-w-[40ch]">
            Every other video it published earned more, collectively, than the one everyone is
            being pointed at. The volume is the product. We do not need a hit; we need a
            distribution, and distribution is a manufacturing problem, not a talent problem.
          </p>
          <p className="form-note mt-7">
            Same source as above. The 0.16% figure is a property of the category&rsquo;s content
            economy, not a forecast for Vell.
          </p>
        </div>
      </div>
    </section>
  );
}
