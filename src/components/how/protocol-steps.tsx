import { PRODUCT, SPEC } from "@/lib/brand";

const specValue = (key: string): string =>
  SPEC.find((row) => row.key === key)?.value ?? "";

const STEPS = [
  {
    title: "Fill to the line.",
    spec: `${PRODUCT.tank}, removable`,
    body:
      "The tank comes out and it has a line on it. Fill to the line, not over it. The measuring cup in the box is sized for that tank, and water above the line has nowhere to go except out of the plate and down the front of the garment.",
  },
  {
    title: "Hang the garment.",
    spec: specValue("Cord"),
    body:
      "Wrinkles in a garment lying flat on a bed come straight back, because the fabric has nowhere to hang. Put it on a hanger, pull the shoulders flat, and give the steam a direction to travel. This is the step people skip, and it is the one that decides the result.",
  },
  {
    title: `Wait ${PRODUCT.heatUp} to heat.`,
    spec: PRODUCT.heatUp,
    body:
      `Heat-up is ${PRODUCT.heatUp} from a cold tank, and until the indicator shows ready the plate produces nothing. That is not the appliance being slow. It is the appliance refusing to pretend it is hot when it is not.`,
  },
  {
    title: "One pass, from the hem up.",
    spec: `${PRODUCT.steamRate}, three levels`,
    body:
      "Start at the hem and travel upward, so the fabric is pushed towards the shoulder while it is still moving. Three levels, and one pass. A second pass is for the single crease that did not move, not for the whole garment.",
  },
];

export function ProtocolSteps() {
  return (
    <ol className="flex flex-col">
      {STEPS.map((step) => (
        <li
          key={step.title}
          className="flex flex-col gap-4 border-t border-hair py-8 md:flex-row md:items-baseline md:justify-between md:gap-12 md:py-10"
          data-reveal
        >
          <div className="md:max-w-[56ch]">
            <h3 className="title-s">{step.title}</h3>
            <p className="body-lg mt-4">{step.body}</p>
          </div>
          <p className="mono text-graphite-46 md:flex-none md:text-right">{step.spec}</p>
        </li>
      ))}
    </ol>
  );
}