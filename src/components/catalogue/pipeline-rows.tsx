type PipelineStep = { step: string; title: string; body: string };

const PIPELINE: PipelineStep[] = [
  {
    step: "Source",
    title: "A live quote, not a catalogue entry.",
    body: "Supplier quotes retrieved on the day, at a quantity we choose. On the steamer that meant private-mold pricing at a thousand units, with logo and packaging as line items rather than a favour. Nothing is bought through a reseller nobody has opened.",
  },
  {
    step: "Validate",
    title: "Three signals, then a small order.",
    body: "Amazon Movers & Shakers, TikTok hashtag growth and Google Trends, all three pointing the same way before any capital moves. Then a first order of 200 to 500 units to test velocity, and a weekly re-order decision instead of a season of faith.",
  },
  {
    step: "Differentiate",
    title: "Pay for the difference, in advance.",
    body: "Decide what this product is that the category leader's product is not, and pay for it out of the margin before the first unit ships. On the steamer: the case, the plate we specify, the certification, three years of warranty. No answer to this question means no product.",
  },
  {
    step: "Ship",
    title: "One endpoint, then reuse all of it.",
    body: "One owned endpoint, one funnel, one capture path, one content engine, one fulfilment path. The second product changes a config inside that, not a page next to it. This is the whole claim of this page, and it is only true if step three was honest.",
  },
];

export function PipelineRows() {
  return (
    <div className="flex flex-col">
      {PIPELINE.map((row) => (
        <div
          key={row.step}
          className="grid gap-x-8 gap-y-4 border-t border-hair py-8 md:grid-cols-12 md:py-10"
          data-reveal
        >
          <p className="ledger-key md:col-span-3 md:pt-2">{row.step}</p>
          <h3 className="title-s md:col-span-4">{row.title}</h3>
          <p className="body-lg md:col-span-5">{row.body}</p>
        </div>
      ))}
    </div>
  );
}