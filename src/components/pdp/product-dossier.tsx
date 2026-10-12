import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

type Dossier = {
  status: string;
  pas: { problem: string; agitate: string; solution: string; sources: string[] };
  features: { title: string; body: string; source: string }[];
  psychology: {
    audiences: { name: string; why: string }[];
    triggers: string[];
    objections: { objection: string; answer: string }[];
  };
  data: { proof: { key: string; value: string; source: string }[] };
  history: { category: string; lineage: string; body: string };
  painPoints: { pain: string; agitation: string; answer: string; evidence: string }[];
};

const load = (handle: string): Dossier | null => {
  try {
    /* Dossiers live inside the app so they ship with the deployment:
       the pipeline (tools/market/run.mjs) writes app/data/marketing.
       The repo-root path is a fallback for older checkouts. */
    const candidates = [
      path.join(process.cwd(), "data", "marketing", `${handle}.json`),
      path.join(process.cwd(), "..", "data", "marketing", `${handle}.json`),
    ];
    const f = candidates.find((c) => existsSync(c));
    if (!f) return null;
    const d = JSON.parse(readFileSync(f, "utf8"));
    if (d.status !== "reviewed" && d.status !== "live") return null;
    return d as Dossier;
  } catch {
    return null;
  }
};

const has = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

/**
 * ProductDossier — the marketing team's output, rendered.
 * Renders ONLY sourced, non-empty fields. Anything draft stays invisible:
 * a missing section is a missing section, never a placeholder.
 */
export function ProductDossier({ handle }: { handle: string }) {
  const d = load(handle);
  if (!d) return null;

  const showPas = has(d.pas.problem) || has(d.pas.agitate) || has(d.pas.solution);
  const showFeatures = d.features.length > 0;
  const showPsych =
    d.psychology.audiences.length > 0 || d.psychology.objections.length > 0;
  const showPain = d.painPoints.length > 0;
  const showHistory = has(d.history.body);
  if (!showPas && !showFeatures && !showPsych && !showPain && !showHistory) return null;

  return (
    <>
      {showPas && (
        <section aria-label="The problem, plainly" className="band band-bone">
          <div className="wrap grid gap-10 md:grid-cols-12">
            <h2 className="title-m md:col-span-5">The problem, plainly.</h2>
            <div className="md:col-span-6 md:col-start-7">
              {[d.pas.problem, d.pas.agitate, d.pas.solution].filter(has).map((t, i) => (
                <p key={i} className={i === 0 ? "title-s" : "body-lg mt-5 max-w-[44ch]"}>
                  {t}
                </p>
              ))}
              {d.pas.sources.length > 0 && (
                <p className="form-note mt-7">Sources: {d.pas.sources.join(" ")}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {showFeatures && (
        <section aria-label="What it is" className="band-tight">
          <div className="wrap grid gap-10 md:grid-cols-12">
            <h2 className="title-m md:col-span-4">What it is.</h2>
            <div className="md:col-span-7 md:col-start-6">
              <div className="ledger">
                {d.features.map((f) => (
                  <div key={f.title} className="ledger-row ledger-row-stack">
                    <span className="ledger-key">{f.title}</span>
                    <span className="ledger-val">{f.body}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {showPsych && (
        <section aria-label="Who it is for" className="band-tight border-t border-hair">
          <div className="wrap">
            <h2 className="title-m max-w-[14ch]">Who it is for, and what stops them.</h2>
            <div className="mt-12 flex flex-col">
              {d.psychology.audiences.map((a, i) => (
                <article
                  key={a.name}
                  className="grid gap-4 border-t border-hair py-8 md:grid-cols-12 md:gap-8"
                >
                  <h3 className={`title-s md:col-span-5 ${i % 2 === 1 ? "md:col-start-8" : ""}`}>
                    {a.name}
                  </h3>
                  <p className={`body-lg md:col-span-5 ${i % 2 === 1 ? "md:col-start-1 md:row-start-1" : "md:col-start-7"}`}>
                    {a.why}
                  </p>
                </article>
              ))}
            </div>
            {d.psychology.objections.length > 0 && (
              <div className="mt-12 grid gap-10 md:grid-cols-12">
                <h3 className="title-s md:col-span-4">Asked honestly.</h3>
                <div className="md:col-span-7 md:col-start-6">
                  <div className="ledger">
                    {d.psychology.objections.map((o) => (
                      <div key={o.objection} className="ledger-row ledger-row-stack">
                        <span className="ledger-key">{o.objection}</span>
                        <span className="ledger-val">{o.answer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {showPain && (
        <section aria-label="Every pain, answered" className="band band-ink">
          <div className="wrap grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="title-m">Every pain, answered here.</h2>
              <p className="body mt-6 max-w-[32ch]">
                Nothing on this list links elsewhere. If it mattered enough to ask, it mattered
                enough to answer on this page.
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="ledger">
                {d.painPoints.map((p) => (
                  <div key={p.pain} className="ledger-row ledger-row-stack">
                    <span className="ledger-key">{p.pain}</span>
                    <span className="ledger-val">{p.answer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {showHistory && (
        <section aria-label="Where this object comes from" className="band-tight">
          <div className="wrap-narrow">
            <h2 className="title-s">Where this object comes from.</h2>
            <p className="body-lg mt-6">{d.history.body}</p>
            {has(d.history.lineage) && <p className="mono mt-5 opacity-60">{d.history.lineage}</p>}
          </div>
        </section>
      )}
    </>
  );
}
