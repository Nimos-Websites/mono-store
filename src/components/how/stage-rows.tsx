import { STAGES } from "@/lib/brand";

const PLACEMENT = [
  { word: "md:col-span-5 md:col-start-1", body: "md:col-span-6 md:col-start-7" },
  { word: "md:col-span-5 md:col-start-8", body: "md:col-span-5 md:col-start-1" },
  { word: "md:col-span-4 md:col-start-1", body: "md:col-span-6 md:col-start-6" },
  { word: "md:col-span-4 md:col-start-9", body: "md:col-span-6 md:col-start-1" },
];

export function StageRows() {
  return (
    <div className="flex flex-col">
      {STAGES.map((stage, i) => (
        <article
          key={stage.stage}
          className="grid gap-x-10 gap-y-7 border-t border-hair py-12 md:grid-cols-12 md:py-14"
          data-reveal
        >
          <h3 className={`md:row-start-1 md:self-center ${PLACEMENT[i].word}`}>
            <span className="title-l block">{stage.stage}</span>
            <span className="title-s mt-6 block max-w-[15ch] text-graphite-70">
              {stage.title}
            </span>
          </h3>
          <p
            className={`body-lg md:row-start-1 md:max-w-[44ch] md:self-center ${PLACEMENT[i].body}`}
          >
            {stage.body}
          </p>
        </article>
      ))}
    </div>
  );
}