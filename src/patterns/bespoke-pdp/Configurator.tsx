"use client";

import { useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const COLORWAYS = [
  {
    id: "black",
    name: "Black",
    swatch: "#14120f",
    img: "/products/the-67/the67-cutout-black.png",
    note: "Stabilized black pakkawood, octagonal bolster",
  },
  {
    id: "green",
    name: "Green",
    swatch: "#1d5c46",
    img: "/products/the-67/the67-cutout-green.png",
    note: "Stabilized green pakkawood, octagonal bolster",
  },
] as const;

const SPECS: [string, string][] = [
  ["Blade", "19.5 cm / 7.67″ edge (nominal 8″)"],
  ["Overall", "32.3 cm / 12.7″"],
  ["Spine", "2.5 mm"],
  ["Weight", "221.8 g"],
  ["Core", "Japanese VG-10"],
  ["Hardness", "60±2 HRC"],
];

export function Configurator() {
  const [active, setActive] = useState(0);
  const current = COLORWAYS[active];

  const pick = (i: number) => {
    if (i === active) return;
    setActive(i);
    gsap.fromTo(
      ".config-stage img",
      { opacity: 0.15, scale: 1.03 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
    );
  };

  return (
    <section className="act config" id="configurator">
      <div className="config-stage">
        <Image
          key={current.id}
          src={current.img}
          alt={`The 67 in the ${current.name.toLowerCase()} handle colorway, with box and sheathe`}
          fill
          sizes="(max-width: 900px) 92vw, 56vw"
          style={{ objectFit: "contain", padding: "5%" }}
          priority
        />
      </div>
      <div>
        <h2 className="display config-name">Build your 67.</h2>
        <p className="config-sku">
          CJCF1857601 · US stock · ships in 2–5 days
        </p>

        <div className="config-group">
          <div className="config-label">Handle</div>
          <div className="swatches">
            {COLORWAYS.map((c, i) => (
              <button
                key={c.id}
                className="swatch"
                aria-pressed={i === active}
                aria-label={c.name}
                onClick={() => pick(i)}
                type="button"
              >
                <i style={{ background: c.swatch }} />
              </button>
            ))}
          </div>
          <p className="config-sku" style={{ marginTop: 12 }}>{current.note}</p>
        </div>

        <div className="config-price">
          <span className="p">$89.95</span>
          <span className="m">Landed price, verified · from $7.50/mo</span>
        </div>

        <div className="config-spec">
          {SPECS.map(([k, v]) => (
            <div key={k}>
              <span>{k}</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{v}</span>
            </div>
          ))}
        </div>

        <div className="hero-cta" style={{ marginTop: 36 }}>
          <button className="btn btn-fill" type="button">
            Add to cart
          </button>
          <button className="btn btn-line" type="button">
            Buy now — express
          </button>
        </div>
      </div>
    </section>
  );
}
