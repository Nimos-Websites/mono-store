"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PINS = [
  { top: "55%", left: "45%", label: "67-layer Damascus", dx: 96, dy: 22, flip: false },
  { top: "43%", left: "53%", label: "Hammered tsuchime", dx: 104, dy: 26, flip: true },
  { top: "70%", left: "33%", label: "VG-10 core", dx: 100, dy: 24, flip: true },
  { top: "85%", left: "21%", label: "Hand-ground edge", dx: 92, dy: 20, flip: false },
  { top: "36%", left: "61%", label: "Double-steel bolster", dx: 110, dy: 24, flip: true },
];

export function TheObject() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    const stage = stageRef.current;
    if (!stage) return;
    const pins = stage.querySelectorAll<HTMLElement>(".pin");
    const steel = stage.querySelector<HTMLElement>(".object-steel");
    const blade = stage.querySelector<HTMLImageElement>(".object-img img");

    if (reduced) {
      pins.forEach((p) => gsap.set(p, { opacity: 1 }));
      if (steel) gsap.set(steel, { opacity: 1 });
      return;
    }

    const triggers: ScrollTrigger[] = [];

    pins.forEach((pin, i) => {
      const line = pin.querySelector("path");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: () => `top+=${(30 + i * 26) * (window.innerHeight / 100)}px top`,
          end: () => `top+=${(30 + (i + 1) * 26) * (window.innerHeight / 100)}px top`,
          scrub: true,
        },
      });
      tl.fromTo(pin, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" });
      if (line) {
        const len = line.getTotalLength();
        tl.fromTo(
          line,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1, ease: "none" },
          0,
        );
      }
      triggers.push(tl.scrollTrigger!);
    });

    const steelTl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: () => `top+=${(165 * window.innerHeight) / 100}px top`,
        end: () => `top+=${(195 * window.innerHeight) / 100}px top`,
        scrub: true,
      },
    });
    steelTl.fromTo(steel, { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: "power2.out" });
    triggers.push(steelTl.scrollTrigger!);

    const bladeTl = gsap.timeline({
      scrollTrigger: { trigger: stage, start: "top top", end: "bottom bottom", scrub: true },
    });
    bladeTl.fromTo(blade, { scale: 1 }, { scale: 1.2, ease: "none" });
    triggers.push(bladeTl.scrollTrigger!);

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section className="act object">
      <div className="object-stage" ref={stageRef}>
        <div className="object-pin">
          <h2 className="display object-heading">The anatomy of an edge.</h2>
          <div className="object-img">
            <Image
              src="/products/the-67/the67-cutout-green.png"
              alt="The 67 with green pakkawood handle, blade anatomy"
              fill
              sizes="(max-width: 900px) 88vw, 46vw"
              style={{ objectFit: "contain" }}
            />
            {PINS.map((p) => (
              <div
                className={`pin${p.flip ? " flip" : ""}`}
                key={p.label}
                style={{ top: p.top, left: p.left }}
              >
                <svg
                  width={p.dx}
                  height={p.dy + 8}
                  viewBox={`0 0 ${p.dx} ${p.dy + 8}`}
                >
                  <path d={`M0,2 Q${p.dx / 2},${p.dy + 6} ${p.dx},2`} />
                </svg>
                <i />
                <span>{p.label}</span>
              </div>
            ))}
          </div>
          <figure className="object-steel">
            <Image
              src="/products/the-67/c7fcdc59-5f7e-466c-8bfd-b9a9e36e204d.jpg"
              alt="VG-10 alloy composition"
              width={460}
              height={460}
              style={{ width: "100%", height: "auto" }}
            />
            <figcaption>
              The maker&rsquo;s own alloy sheet: carbon 1%, chromium 15%, cobalt 1.5%,
              molybdenum 1%, vanadium 0.3%.
            </figcaption>
          </figure>
          <p className="object-pin-note">
            Every claim on this page is the maker&rsquo;s record. Where the supplier is silent,
            we say so.
          </p>
          <ul className="pin-legend">
            {PINS.map((p) => (
              <li key={p.label}>{p.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const WALL = [
  { axis: "Steel", self: "VG-10 core, 67 folded layers", other: "Stamped alloy, grade unstated" },
  { axis: "Hardness", self: "60±2 HRC, hand-ground", other: "~54–56 HRC, machine-stamped" },
  { axis: "Edge life", self: "Weeks of daily prep between sharpenings", other: "Days before it pushes instead of cutting" },
  { axis: "Food release", self: "Hammered face and a straight ground edge", other: "Flat blade; food welds itself on" },
  {
    axis: "Honest trade-off",
    self: "Hand wash, hone, never the dishwasher, never bone",
    other: "Toss it in the dishwasher and don&rsquo;t think",
    concede: true,
  },
];

export function TheProof() {
  const rangeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const range = rangeRef.current;
    const after = afterRef.current;
    const handle = handleRef.current;
    if (!range || !after || !handle) return;
    const onInput = () => {
      after.style.clipPath = `inset(0 0 0 ${range.value}%)`;
      handle.style.left = `${range.value}%`;
    };
    range.addEventListener("input", onInput);
    return () => range.removeEventListener("input", onInput);
  }, []);

  return (
    <section className="act proof">
      <h2 className="display proof-title">What sharp actually means.</h2>
      <p className="proof-lede">
        Two states, same blade. One edge stamped soft at 54 HRC; one ground from VG-10 at
        60±2. Drag the divider. The cut demo from the real blade arrives when it is
        shot&mdash;not before.
      </p>

      <div className="ba">
        <div className="ba-frame">
          <Image
            src="/products/the-67/51fab3f6-b556-462a-9848-8bcbf670ef7a.jpg"
            alt=""
            fill
            sizes="80vw"
            style={{
              objectFit: "cover",
              filter: "grayscale(1) brightness(0.5) contrast(0.68) blur(0.5px)",
            }}
          />
          <div className="ba-after" ref={afterRef}>
            <Image
              src="/products/the-67/51fab3f6-b556-462a-9848-8bcbf670ef7a.jpg"
              alt=""
              fill
              sizes="80vw"
              style={{ objectFit: "cover", filter: "saturate(1.2) contrast(1.08) brightness(1.02)" }}
            />
          </div>
          <div className="ba-handle" ref={handleRef} />
        </div>
        <div className="ba-labels">
          <span>Stamped at 54 HRC</span>
          <span>Ground from VG-10, 60±2</span>
        </div>
        <input
          className="ba-range"
          ref={rangeRef}
          type="range"
          min={0}
          max={100}
          defaultValue={50}
          aria-label="Compare the two states"
        />
      </div>

      <div className="wall">
        <div className="wall-head">
          <span />
          <span className="h-this">The 67</span>
          <span className="h-other">The $12 knife</span>
        </div>
        {WALL.map((row) => (
          <div className={`wall-row${row.concede ? " concede" : ""}`} key={row.axis}>
            <div className="wall-axis">{row.axis}</div>
            <div className="wall-this">{row.self}</div>
            <div className="wall-other" dangerouslySetInnerHTML={{ __html: row.other }} />
          </div>
        ))}
      </div>
    </section>
  );
}
