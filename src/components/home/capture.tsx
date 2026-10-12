import { JoinForm } from "@/components/forms/reserve-form";
import { PRODUCT } from "@/lib/brand";

export function Capture() {
  return (
    <section>
      <div className="bg-signal">
        <div className="wrap">
          <div className="grid gap-10 py-16 md:grid-cols-12 md:gap-10 md:py-24">
            <div className="md:col-span-6">
              <h2 className="title-l text-ground">
                Get the address.
                <br />
                <span className="italic">That is the whole ask.</span>
              </h2>
              <p className="lede mt-8 max-w-[36ch] text-ground">
                {PRODUCT.name} has not shipped. When a batch opens you will hear about it in
                public, and you can decide then with real information rather than a countdown.
              </p>
              <p className="form-note mt-9 max-w-[42ch] text-ground">
                One line in a text file. No offer, no payment, no email sent to you, and no
                contact from anyone who bought this list.
              </p>
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <div className="bg-ground p-7 md:p-10 [&_.label]:text-graphite-70 [&_.form-note]:text-graphite-70 [&_.form-note_a]:inline-flex [&_.form-note_a]:min-h-11">
                <JoinForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
