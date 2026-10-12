/* ─────────────────────────────────────────────────────────────────────────
 * SIGNALS — the category, this week, with the gaps stated.
 *
 * Server component. Everything shown is either this repo's own tool
 * artifact (trendscan) or the demand evidence in PRODUCT-DECISION.md.
 * The known gaps are printed because a live module that hides its
 * blind spots is just decoration.
 * ─────────────────────────────────────────────────────────────────────── */
import { AD_SIGNAL, SIGNAL_GAPS, TRENDS } from "@/data/live-signals";

const PHASE_LABEL: Record<string, string> = {
  rising: "Rising",
  holding: "Holding",
  flat: "Flat",
  decaying: "Decaying",
};

export function LiveSignals() {
  return (
    <section aria-labelledby="act-signals" className="band-tight border-t border-hair">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <p className="label text-graphite-70">Signals · retrieved {TRENDS.fetchedAt.slice(0, 10)}</p>
          <h2 id="act-signals" className="title-s mt-5">
            The category, measured this week.
          </h2>
          <p className="body mt-6 max-w-[44ch]">
            TikTok Creative Center&apos;s ranked hashtag data, pulled by this repository&apos;s own
            tool and reproducible from the artifact. Every phase is computed from the returned
            popularity curve — nothing is assigned by hand.
          </p>
          <p className="form-note mt-6 text-graphite-70">
            Artifact <span className="mono">{TRENDS.artifact}</span> · source{" "}
            <a href={TRENDS.sourceUrl} target="_blank" rel="noreferrer noopener" className="arrow-link">
              Creative Center <span className="arrow" aria-hidden="true">→</span>
            </a>
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <dl className="ledger m-0">
            {TRENDS.rows.map((r) => (
              <div key={r.hashtag} className="ledger-row ledger-row-stack">
                <dt className="ledger-key">
                  {r.hashtag} <span className="text-graphite-70">· rank {r.rank}</span>
                </dt>
                <dd className="ledger-val">
                  {r.posts} posts · {PHASE_LABEL[r.phase]} · score {r.score > 0 ? `+${r.score}` : r.score}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 border-t-2 border-graphite pt-7">
            <p className="label text-lamp">{AD_SIGNAL.headline}</p>
            <p className="body mt-4 max-w-[56ch]">{AD_SIGNAL.body}</p>
            <p className="form-note mt-4 text-graphite-70">
              {AD_SIGNAL.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 ? " · " : ""}
                  <a href={s.url} target="_blank" rel="noreferrer noopener" className="arrow-link">
                    {s.label} <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </span>
              ))}
            </p>
          </div>

          <div className="mt-8">
            <p className="label text-graphite-70">Known gaps, stated</p>
            <ul className="mt-3 grid gap-2">
              {SIGNAL_GAPS.map((g) => (
                <li key={g} className="form-note max-w-[62ch] text-graphite-70">
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
