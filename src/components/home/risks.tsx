import { RISKS } from "@/lib/brand";

type Props = {
  heading?: string;
  lede?: string;
};

export function Risks({
  heading = "Four ways this goes wrong.",
  lede = "Every one of these is real, none of them are solved, and all four are reasons the margin is built the way it is. You would find out eventually. This is cheaper.",
}: Props) {
  return (
    <section className="band band-ink">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <h2 className="title-l md:col-span-6">{heading}</h2>
          <p className="lede md:col-span-4 md:col-start-9 md:pt-4">{lede}</p>
        </div>

        <div className="mt-16 border-b border-hair" data-stagger>
          {RISKS.map((row) => (
            <div
              key={row.risk}
              className="grid gap-x-12 gap-y-3 border-t border-hair py-9 md:grid-cols-12 md:items-baseline"
            >
              <h3 className="title-s md:col-span-6">{row.risk}</h3>
              <p className="body md:col-span-5 md:col-start-8">{row.mitigation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
