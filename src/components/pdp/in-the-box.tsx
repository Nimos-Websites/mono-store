import { BUNDLE } from "@/lib/brand";

export function InTheBox() {
  return (
    <section className="band" id="bundle">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <h2 className="title-l md:col-span-7">
            What is in the box,
            <span className="italic"> in full.</span>
          </h2>
          <p className="body-lg md:col-span-3 md:col-start-9 md:pt-4">
            {BUNDLE.length} items. The sixth one is a person, and it is the reason the other five
            are worth listing.
          </p>
        </div>

        <div className="mt-16 flex flex-col" data-stagger>
          {BUNDLE.map((row, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={row.item}
                className="grid gap-x-12 gap-y-2 border-t border-hair py-8 md:grid-cols-12 md:items-baseline"
              >
                <h3
                  className={`title-s md:col-span-4 ${
                    flip ? "md:col-start-9" : "md:col-start-1"
                  }`}
                >
                  {row.item}
                </h3>
                <p
                  className={`body md:col-span-5 ${
                    flip ? "md:col-start-3" : "md:col-start-6"
                  }`}
                >
                  {row.detail}
                </p>
              </div>
            );
          })}
          <div className="border-t border-hair" />
        </div>
      </div>
    </section>
  );
}
