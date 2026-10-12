import { BUNDLE } from "@/lib/brand";

const LIFT = ["md:mt-0", "md:mt-10", "md:mt-20", "md:mt-10", "md:mt-0"];

export function BundleManifest() {
  return (
    <ul className="flex flex-col gap-9 md:grid md:grid-cols-5 md:gap-x-7 md:gap-y-8">
      {BUNDLE.map((line, i) => (
        <li
          key={line.item}
          className={`pt-5 ${LIFT[i % LIFT.length]}`}
          style={{ borderTop: "1px solid rgb(242 244 243 / 0.24)" }}
          data-reveal
        >
          <p className="title-s max-w-[14ch]">{line.item}</p>
          <p className="body mt-4 max-w-[24ch]">{line.detail}</p>
        </li>
      ))}
    </ul>
  );
}