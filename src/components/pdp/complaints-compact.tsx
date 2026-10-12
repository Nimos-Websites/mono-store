import { FAILURE_ROWS } from "@/data/failure-ledger";

export function ComplaintsCompact() {
  return (
    <section className="band-tight">
      <div className="wrap">
        <h2 className="title-s mb-8">What goes wrong, and what we do</h2>
        <div className="grid gap-px bg-hair md:grid-cols-2 lg:grid-cols-4">
          {FAILURE_ROWS.slice(0, 4).map((f) => (
            <div key={f.id} className="bg-ground p-6">
              <p className="mono text-xs uppercase tracking-widest text-graphite-70">
                {f.complaint}
              </p>
              <p className="body mt-3">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
