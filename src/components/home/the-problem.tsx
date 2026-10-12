import Link from "next/link";
import { PRODUCT } from "@/lib/brand";

export function TheProblem() {
  return (
    <section className="band">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <h2 className="title-l">
            There is no spec sheet that
            <span className="italic"> separates these two.</span>
          </h2>
        </div>

        <div className="md:col-span-4 md:col-start-9 md:pt-3">
          <div className="flex flex-col gap-6">
            <p className="body-lg">
              A {PRODUCT.priceLabel} listing and a $29.70 listing share nearly every component.
              Plastic shell. A heating element. A small tank. A plastic nozzle. Read both spec
              tables side by side and the only rows that differ are the ones neither brand controls.
            </p>
            <p className="body-lg">
              We are not going to pretend a wattage table settles that. It does not, and anyone
              selling you a wattage table as a reason is selling you the reason and not the
              appliance.
            </p>
            <p className="body-lg">
              So the appliance is not the product. The case is. The ceramic plate we specify is. The
              certification we pay for is. The three years of a person answering the phone is.
            </p>
          </div>
          <Link href="/steamer#comparison" className="arrow-link mt-9 min-h-11">
            <span>See the comparison anyway</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
