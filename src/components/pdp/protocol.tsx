import { PRODUCT } from "@/lib/brand";

const STEPS = [
  {
    title: `Fill to the line.`,
    body: `${PRODUCT.tank} to the mark on the tank, which is what the measuring cup in the box is for. Over the line and the excess has to go somewhere it should not.`,
  },
  {
    title: "Hang the garment.",
    body: "On a hanger, with air on both sides. Held flat against another garment the steam has nowhere to expand into and both come out damp.",
  },
  {
    title: `Wait ${PRODUCT.heatUp}.`,
    body: `Heat-up from cold, then pick a level. ${PRODUCT.steamRate} at the top, and two settings below it. Start low on anything you would rather not ruin.`,
  },
  {
    title: "One pass, hem to collar.",
    body: "Plate clear of the fabric, moving upward. Most creases take a single pass. Set-in creases take two, and a third only if the first two were rushed.",
  },
];

export function Protocol() {
  return (
    <section className="band-tight bg-bone">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <h2 className="title-m md:col-span-4">
            The whole procedure takes thirty seconds.
          </h2>
          <p className="body-lg md:col-span-4 md:col-start-7 md:pt-3">
            Four actions. This is the card that ships in the box, printed the same way, because a
            protocol nobody can follow is a feature nobody gets.
          </p>
        </div>

        <div className="mt-14 flex flex-col border-b border-hair" data-stagger>
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="grid gap-x-12 gap-y-3 border-t border-hair py-8 md:grid-cols-12 md:items-baseline"
            >
              <h3 className="title-s md:col-span-4 md:col-start-1">{step.title}</h3>
              <p className="body md:col-span-6 md:col-start-7">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
