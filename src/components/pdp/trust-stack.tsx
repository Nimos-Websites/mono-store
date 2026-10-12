import { Seam } from "@/components/devices";
import { formatExact } from "@/lib/catalog";
import {
  LANDED_ROW,
  MARGIN,
  SUPPLY_COPY,
  SUPPLY_STOPS,
  TRUST_SOURCES,
  WATERFALL,
} from "@/data/closer";

const TINTS = ["100%", "88%", "76%", "64%", "52%"];
const share = (value: number) => `${((value / WATERFALL.total) * 100).toFixed(1)}%`;

export function TrustStack() {
  return (
    <section aria-labelledby="trust-title" className="band band-bone">
      <div className="wrap">
        <Seam brass />
        <div className="pt-[clamp(48px,7vw,96px)]">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <h2 id="trust-title" className="title-m md:col-span-7">
              Where the $89 goes.
            </h2>
            <p className="body-lg md:col-span-4 md:col-start-9 md:pt-2">
              Every figure is the product decision&apos;s, dated 8 October 2026. It is our cost
              stack, disclosed down to the cent — not the category&apos;s, and not a forecast.
            </p>
          </div>

          <figure className="m-0 mt-[clamp(40px,5vw,72px)]">
            <div
              role="img"
              aria-label={WATERFALL.ariaLabel}
              className="flex h-[clamp(64px,6vw,92px)] w-full border border-hair"
            >
              {WATERFALL.segments.map((s, i) => (
                <div
                  key={s.id}
                  className="flex min-w-[8px] items-center justify-end overflow-hidden px-3 md:px-4"
                  style={{
                    width: `${(s.value / WATERFALL.total) * 100}%`,
                    background: s.outflow
                      ? `color-mix(in oklab, var(--graphite) ${TINTS[i]}, transparent)`
                      : "var(--lamp)",
                    borderLeft:
                      i === 0
                        ? undefined
                        : "1px solid color-mix(in oklab, var(--lamp) 65%, transparent)",
                  }}
                >
                  {s.id === "cogs" || s.id === "contribution" ? (
                    <span
                      className={`mono text-[12px] [font-variant:tabular-nums] md:text-[13px] ${
                        s.outflow ? "text-on-dark" : "text-graphite"
                      }`}
                    >
                      {formatExact(s.value)}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between">
              <span className="mono text-graphite-70">$0.00</span>
              <span className="mono text-graphite-70">$89.00, accounted for</span>
            </figcaption>
          </figure>

          <div className="mt-[clamp(36px,4vw,64px)] grid gap-[clamp(32px,5vw,88px)] md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="min-w-0">
              <dl className="ledger m-0">
                {WATERFALL.segments.map((s) => (
                  <div
                    key={s.id}
                    className={`grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-b border-hair py-5 ${
                      s.id === "contribution" ? "border-t-2 border-graphite" : ""
                    }`}
                  >
                    <dt className="ledger-key col-span-12 md:col-span-5">{s.label}</dt>
                    <dd className="col-span-12 md:col-span-7">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <span className="form-note max-w-[38ch] text-graphite-70">{s.note}</span>
                        <span
                          className={`mono text-[15px] whitespace-nowrap [font-variant:tabular-nums] ${
                            s.outflow ? "text-graphite" : "text-lamp"
                          }`}
                        >
                          {s.outflow ? `−${formatExact(s.value)}` : formatExact(s.value)}
                          <span className="text-graphite-46"> · {share(s.value)}</span>
                        </span>
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-12">
                <p className="label text-graphite-70">{LANDED_ROW.title}</p>
                <dl className="ledger m-0 mt-4">
                  {LANDED_ROW.rows.map((r) => (
                    <div key={r.label} className="ledger-row ledger-row-stack">
                      <dt className="ledger-key">{r.label}</dt>
                      <dd className="ledger-val [font-variant:tabular-nums]">
                        {formatExact(r.value)}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="form-note mt-4 max-w-[60ch] text-graphite-70">{LANDED_ROW.note}</p>
              </div>
            </div>

            <div className="min-w-0">
              <div className="border-t-2 border-graphite pt-7">
                <h3 className="title-s">{MARGIN.headline}</h3>
                <p className="mt-6 font-serif text-[clamp(56px,4.6vw,84px)] leading-none tracking-[-0.03em] [font-variant:tabular-nums lining-nums]">
                  {formatExact(37.4)}
                </p>
                <p className="mono mt-3 text-graphite-70">
                  after a $18.00 CAC target · 42% of $89
                </p>
                <dl className="ledger m-0 mt-8">
                  {MARGIN.rows.map((r) => (
                    <div key={r.label} className="ledger-row ledger-row-stack">
                      <dt className="ledger-key">{r.label}</dt>
                      <dd className="ledger-val [font-variant:tabular-nums]">
                        {r.outflow ? "−" : ""}
                        {formatExact(r.value)}
                        {r.display ? ` · ${r.display}` : ""}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="form-note mt-5 max-w-[42ch] text-graphite-70">
                  {MARGIN.headlineCaption}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[clamp(64px,8vw,120px)]">
            <div className="grid gap-8 md:grid-cols-12 md:gap-10">
              <h3 className="title-s md:col-span-6">{SUPPLY_COPY.title}</h3>
              <p className="body md:col-span-4 md:col-start-9 md:pt-2">{SUPPLY_COPY.body}</p>
            </div>
            <ol className="relative mt-[clamp(40px,5vw,72px)] grid gap-10 md:grid-cols-5 md:gap-6">
              <span aria-hidden className="absolute left-0 right-0 top-0 hidden h-px bg-lamp opacity-60 md:block" />
              {SUPPLY_STOPS.map((s, i) => (
                <li key={s.place} className="relative border-t border-hair pt-6 md:border-t-0 md:pt-7">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-2 w-2 -translate-y-1/2 bg-lamp"
                  />
                  <div className={i % 2 === 1 ? "md:mt-10" : undefined}>
                    <p className="mono text-lamp">{s.place}</p>
                    <p className="title-s mt-3">{s.title}</p>
                    <p className="mt-4 font-serif text-[clamp(30px,2.4vw,42px)] leading-none tracking-[-0.02em] [font-variant:tabular-nums]">
                      {formatExact(s.figure)}
                    </p>
                    <p className="form-note mt-3 max-w-[30ch] text-graphite-70">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-[clamp(56px,7vw,96px)] border-t border-hair pt-8">
            <h3 className="title-s">Notes to the accounts.</h3>
            <dl className="ledger m-0 mt-6">
              {TRUST_SOURCES.map((r) => (
                <div key={r.figure} className="ledger-row ledger-row-stack">
                  <dt className="ledger-key">{r.figure}</dt>
                  <dd className="ledger-val text-graphite-70">{r.source}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
