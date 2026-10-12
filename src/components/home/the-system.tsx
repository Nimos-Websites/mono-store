import { BUNDLE } from "@/lib/brand";

export function TheSystem() {
  return (
    <section className="band-tight bg-bone">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <h2 className="title-m md:col-span-6 md:max-w-[15ch]">
            The appliance is the easy part.
          </h2>
          <p className="body-lg md:col-span-4 md:col-start-9 md:pt-2">
            Five objects, one protocol, one phone number. This is the whole list — nothing is
            hidden behind the word &ldquo;accessories&rdquo;.
          </p>
        </div>

        <div className="mt-14 flex flex-col">
          {BUNDLE.map((row, i) => (
            <div
              key={row.item}
              className="grid items-baseline gap-x-10 gap-y-2 border-t border-hair py-7 md:grid-cols-12"
              data-reveal
            >
              <h3
                className={`title-s md:col-span-4 ${
                  i % 2 === 1 ? "md:col-start-9 md:col-span-4" : "md:col-start-1"
                }`}
              >
                {row.item}
              </h3>
              <p
                className={`body md:col-span-5 ${
                  i % 2 === 1
                    ? "md:col-start-2 md:col-span-5 md:row-start-1"
                    : "md:col-start-7"
                }`}
              >
                {row.detail}
              </p>
            </div>
          ))}
          <div className="border-t border-hair" />
        </div>
      </div>
    </section>
  );
}
