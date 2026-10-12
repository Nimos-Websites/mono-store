type QueueItem = {
  product: string;
  band: string;
  why: string;
  status: string;
};

const QUEUE: QueueItem[] = [
  {
    product: "Cordless rechargeable heat brush",
    band: "$74.90 AOV",
    why: "The highest average order value in the queue. Kalodata's reading is that it earns more revenue than three $15 products combined — and it uses the same visible-transformation format the steamer does.",
    status: "Queued",
  },
  {
    product: "Cordless rechargeable vacuum",
    band: "$78.00",
    why: "Trucozie T350 doubled its 30-day revenue in the last measured month. Growth rather than a spike is the thing worth queueing for; a spike is a sale.",
    status: "Queued",
  },
  {
    product: "Standing oscillating fan",
    band: "$76.98",
    why: "LEVOIT Corebreeze held steady across the same window. Steady is the property being bought here: a category that neither spikes nor collapses is easier to hold inventory against.",
    status: "Researching",
  },
  {
    product: "Mini carpet cleaner",
    band: "$99.99",
    why: "BISSELL Little Green ran a one-week spike on the August chart rather than depth, so it sits behind the other three until it shows a run rate instead of a moment.",
    status: "Researching",
  },
];

export function QueueLedger() {
  return (
    <div className="ledger" data-reveal>
      <div className="hidden gap-x-8 border-b border-hair py-3 md:grid md:grid-cols-12">
        <p className="label md:col-span-3">Product</p>
        <p className="label md:col-span-2">Price band</p>
        <p className="label md:col-span-5">Why it is in the queue</p>
        <p className="label md:col-span-2">Status</p>
      </div>

      {QUEUE.map((row) => (
        <div
          key={row.product}
          className="grid gap-x-8 gap-y-3 border-b border-hair py-7 md:grid-cols-12 md:py-8"
        >
          <h3 className="title-s md:col-span-3">{row.product}</h3>
          <p className="mono text-graphite-46 md:col-span-2 md:pt-2">{row.band}</p>
          <p className="body md:col-span-5">{row.why}</p>
          <p className="label md:col-span-2 md:pt-2">{row.status}</p>
        </div>
      ))}
    </div>
  );
}