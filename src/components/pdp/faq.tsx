const FAQ: { q: string; a: string }[] = [
  {
    q: "Does it work on wool?",
    a: "We are not going to tell you it is safe on every fabric, because nobody can promise that about steam and we have not tested every fibre. The protocol card in the box lists four fabric settings. Start at the lowest level, work up, and try a hidden seam first. Steam damages some wool the same way water does.",
  },
  {
    q: "What voltage does it need?",
    a: "100–240 V, so it will run on a normal wall socket in most of the world and on a hotel or airport outlet without an adapter that changes the plug shape. The plug still has to physically fit where you are.",
  },
  {
    q: "What if it leaks?",
    a: "Some of them will, and we expect a return rate of 8–12% rather than the 3% a marketplace listing implies. If yours leaks it is a warranty claim, we replace it, and it does not cost you anything. That is the point of budgeting the returns in instead of pretending they do not happen.",
  },
  {
    q: "How long does the warranty really last?",
    a: "Three years from delivery on the unit, registered online, covering the heater, the tank, the pump and the electronics. The case, the measuring cup and the printed card are not electronic parts and are not covered. Read the warranty terms before you buy; they are published in full, not summarised.",
  },
  {
    q: "Is there a compare-at price?",
    a: "No. There has never been one. A struck-through price implies a price we sold at before and stopped selling at, and we have never sold this product, so there would be nothing to strike through.",
  },
];

export function Faq() {
  return (
    <section className="band border-t border-hair">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <h2 className="title-m">
            Questions, answered
            <span className="italic"> without hedging.</span>
          </h2>
          <p className="body-lg mt-7 max-w-[34ch]">
            Where the honest answer is &ldquo;we do not know&rdquo;, it says so. Where it is
            &ldquo;no&rdquo;, it says no.
          </p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="border-b border-hair">
            {FAQ.map((row) => (
              <details key={row.q} className="group border-t border-hair">
                <summary className="tap-block cursor-pointer list-none justify-between gap-8 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="title-s">{row.q}</h3>
                  <span
                    aria-hidden="true"
                    className="mono shrink-0 text-graphite-70 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="body max-w-[64ch] pb-8">{row.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
