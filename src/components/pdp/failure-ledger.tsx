/* ─────────────────────────────────────────────────────────────────────────
 * THE FAILURE LEDGER — the PDP act that carries the whole wedge.
 *
 * Each row: the complaint in the buyer's words, the evidence it is real
 * (sourced), and the part of the system that answers it. Rows are
 * complaint → answer pairs, never performance claims — we do not have a
 * shipped unit, so the answer is the service, the protocol, the case and
 * the honest spec, not a superior-sounding number.
 *
 * Design law: asymmetric ledger armature (never a centred grid), brass
 * rule + index numeral opening the act, one arrival motion only.
 * ─────────────────────────────────────────────────────────────────────── */
import { RevealOnScroll } from "@/components/motion/scroll/RevealOnScroll";
import { RuleHeading } from "@/components/devices";
import { CATEGORY_FINDING, FAILURE_ROWS } from "@/data/failure-ledger";

export function FailureLedger() {
  return (
    <section aria-labelledby="act-ledger" className="band band-bone">
      <div className="wrap">
        <RuleHeading
          index="03"
          size="md"
          kicker="Every row is a complaint a real owner wrote, with the link. The right-hand column is the part of the system that answers it."
        >
          <span id="act-ledger">The complaints, answered by name.</span>
        </RuleHeading>

        <div className="mt-[clamp(36px,5vw,64px)] max-w-[1000px] border-t-2 border-graphite">
          {FAILURE_ROWS.map((row) => (
            <RevealOnScroll key={row.id}>
              <article className="grid gap-6 border-b border-hair py-10 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <h3 className="title-s">{row.complaint}</h3>
                  <p className="mono mt-3 text-graphite-70">Ledger {row.ledger}</p>
                </div>
                <div className="md:col-span-4">
                  <p className="body">{row.evidence}</p>
                  <a
                    href={row.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="arrow-link mt-3 inline-flex"
                  >
                    {row.sourceLabel} <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="md:col-span-3">
                  <p className="label text-graphite-70">Our answer</p>
                  <p className="body mt-2">{row.answer}</p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        {/* The regulator's numbers — the only audited data in the category. */}
        <RevealOnScroll>
          <div className="mt-[clamp(48px,7vw,96px)] border-t-2 border-brass pt-10">
            <p className="label text-lamp">{CATEGORY_FINDING.headline}</p>
            <p className="body-lg mt-5 max-w-[62ch]">{CATEGORY_FINDING.body}</p>
            <ul className="mt-8 grid gap-3">
              {CATEGORY_FINDING.sources.map((s) => (
                <li key={s.url} className="body max-w-[80ch] text-graphite-70">
                  {s.note} —{" "}
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="arrow-link"
                  >
                    {s.label} <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
