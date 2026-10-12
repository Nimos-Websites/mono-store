/* ─────────────────────────────────────────────────────────────────────────
 * FIG. 1 — THE ANATOMY. The one interactive on the steamer story.
 *
 * A hand-authored technical drawing of the unit in side section, in the
 * register of a patent sheet: hairline ink on the paper ground, dashed
 * construction lines, bent leader lines with tabular labels, a title
 * block. No external assets, no drawing library, no motion — the state
 * change is the whole interaction, so reduced-motion costs nothing.
 *
 * Four toggle buttons mark the category's four failure modes where they
 * live: the leak path (tank → soleplate), scale in the water path, the
 * heating element and its connector, and the cord. The marked parts go
 * brass; everything else recedes. Honesty: this is a schematic of where
 * the category fails, never a claim about our internals — every number
 * and every complaint traces to lib/brand.ts or BRAND-FUNNEL-RESEARCH.md
 * §6, cited inline. The full text of every mark sits in the ledger
 * below the drawing, so the diagram is an argument, not the only record.
 * ─────────────────────────────────────────────────────────────────────── */
"use client";

import { useState } from "react";
import { Ledger } from "@/components/devices";
import { ANATOMY_CALLOUTS, type AnatomyCallout, type AnatomyPartId } from "@/data/anatomy";

const INK = "var(--graphite)";
const SOFT = "var(--cool)";
const BRASS = "var(--lamp)";
const GROUND = "var(--ground)";

type Tone = { stroke: string; opacity: number };

function tone(part: AnatomyPartId, active: AnatomyCallout | null): Tone {
  if (part === "datum") {
    return { stroke: SOFT, opacity: active ? 0.28 : 0.5 };
  }
  if (!active) return { stroke: INK, opacity: 1 };
  return active.parts.includes(part)
    ? { stroke: BRASS, opacity: 1 }
    : { stroke: SOFT, opacity: 0.3 };
}

function Part({
  part,
  active,
  children,
}: {
  part: AnatomyPartId;
  active: AnatomyCallout | null;
  children: React.ReactNode;
}) {
  const t = tone(part, active);
  return (
    <g stroke={t.stroke} opacity={t.opacity} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  );
}

function Leader({
  part,
  active,
  d,
  dx,
  dy,
  x,
  y,
  anchor,
  label,
  value,
}: {
  part: AnatomyPartId;
  active: AnatomyCallout | null;
  d: string;
  dx: number;
  dy: number;
  x: number;
  y: number;
  anchor: "start" | "end";
  label: string;
  value?: string;
}) {
  const t = tone(part, active);
  return (
    <g opacity={t.opacity}>
      <path d={d} fill="none" stroke={t.stroke} strokeWidth={1} />
      <circle cx={dx} cy={dy} r={2} fill={t.stroke} stroke="none" />
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        fill={t.stroke}
        stroke="none"
        fontFamily="var(--mono)"
        fontSize={14}
        letterSpacing="0.08em"
      >
        {label}
        {value ? (
          <tspan x={x} dy={17} fontSize={13}>
            {value}
          </tspan>
        ) : null}
      </text>
    </g>
  );
}

function Marker({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <g stroke={BRASS} fill="none" strokeWidth={1.6} opacity={on ? 1 : 0} strokeLinecap="round">
      {children}
    </g>
  );
}

export function SteamerAnatomy() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = ANATOMY_CALLOUTS.find((c) => c.id === activeId) ?? null;

  const diagram = (
    <figure className="m-0">
      <svg
        viewBox="0 0 600 520"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby="anatomy-fig-title anatomy-fig-desc"
        className="block h-auto w-full"
      >
        <title id="anatomy-fig-title">
          MONO steamer — side-section schematic with four failure modes marked
        </title>
        <desc id="anatomy-fig-desc">
          A technical drawing of a standing handheld garment steamer: the tank runs through the handle
          with a fill line, a pump at the tank floor, a water tube up into the ceramic head, a boiler
          with a heating element and a connector, a steam slot in the soleplate, and a cord exiting at
          the foot. Four marks show where the category&apos;s failures live: the leak path from tank to
          soleplate, mineral scale in the water path, the element connector, and the cord. Schematic,
          not to scale. Every mark is also written out in full in the ledger below the drawing.
        </desc>

        {/* ─── Construction: sheet frame, ground datum, centerlines ─── */}
        <Part part="datum" active={active}>
          <rect x={24} y={24} width={552} height={480} strokeWidth={1} />
          <path d="M 60 452 H 560" strokeWidth={1} strokeDasharray="8 5" />
          <path d="M 292 78 V 458" strokeWidth={1} strokeDasharray="12 4 3 4" />
          <path d="M 236 132 H 378" strokeWidth={1} strokeDasharray="12 4 3 4" />
          <path d="M 250 441 H 334" strokeWidth={1} strokeDasharray="8 3 2 3" />
        </Part>

        {/* ─── The head: ceramic soleplate, steam slot ─── */}
        <Part part="head" active={active}>
          <path
            d="M 254 96 H 358 Q 366 96 366 104 V 160 Q 366 168 358 168 H 254 Q 246 168 246 160 V 104 Q 246 96 254 96 Z"
            fill={GROUND}
            strokeWidth={1.5}
          />
          <path d="M 359 116 V 152" strokeWidth={1.3} />
          <path d="M 352 120 H 359 M 352 128 H 359 M 352 136 H 359 M 352 144 H 359" strokeWidth={1} />
        </Part>

        {/* ─── The tank: handle shell, fill line, water window, level ─── */}
        <Part part="tank" active={active}>
          <path
            d="M 262 168 V 428 Q 262 436 270 436 H 314 Q 322 436 322 428 V 168"
            fill={GROUND}
            strokeWidth={1.5}
          />
          <path d="M 270 174 H 314 V 430 H 270 Z" strokeWidth={1} strokeDasharray="5 4" />
          <ellipse cx={292} cy={441} rx={34} ry={6.5} fill={GROUND} strokeWidth={1.3} />
          <path d="M 270 219 H 316" strokeWidth={1.8} />
          <path d="M 270 214 V 224 M 316 214 V 224" strokeWidth={1} />
          <rect x={276} y={206} width={24} height={26} fill={GROUND} strokeWidth={1} />
          <path d="M 272 246 H 312 M 272 262 H 312 M 272 278 H 312 M 272 294 H 312 M 272 310 H 312" strokeWidth={1} />
        </Part>

        {/* ─── The hand: grip, trigger, level dots ─── */}
        <Part part="handle" active={active}>
          <path d="M 266 310 H 318 V 372 H 266 Z" fill={GROUND} strokeWidth={1} />
          <path d="M 271 315 V 367 M 313 315 V 367" strokeWidth={1} />
          <path d="M 306 246 H 318 V 253 H 312 V 259 H 306 Z" fill={GROUND} strokeWidth={1} />
          <circle cx={294} cy={268} r={1.6} fill={GROUND} strokeWidth={1} />
          <circle cx={294} cy={278} r={1.6} fill={GROUND} strokeWidth={1} />
          <circle cx={294} cy={288} r={1.6} fill={GROUND} strokeWidth={1} />
        </Part>

        {/* ─── The water path: boiler, tube, pump, channel to the slot ─── */}
        <Part part="path" active={active}>
          <path d="M 258 110 H 352 V 154 H 258 Z" strokeWidth={1} strokeDasharray="5 4" />
          <path d="M 304 404 V 190 L 276 154" strokeWidth={1.4} />
          <path d="M 299.5 247 L 304 239 L 308.5 247" strokeWidth={1.4} />
          <path d="M 348 134 H 359" strokeWidth={1.2} />
          <circle cx={292} cy={412} r={7} fill={GROUND} strokeWidth={1.2} />
          <circle cx={292} cy={412} r={2.4} strokeWidth={1} />
        </Part>

        {/* ─── The element: coil, connector, its two leads ─── */}
        <Part part="element" active={active}>
          <rect x={250} y={120} width={28} height={24} fill={GROUND} strokeWidth={1.4} />
          <path
            d="M 280 132 L 285.3 123 L 290.7 141 L 296 123 L 301.3 141 L 306.7 123 L 312 141 L 317.3 123 L 322.7 141 L 328 123 L 333.3 141 L 338.7 123 L 344 132"
            strokeWidth={1.3}
          />
          <path d="M 256 144 C 254 154 259 162 267 168" strokeWidth={1} />
          <path d="M 272 144 C 273 154 273 162 275 168" strokeWidth={1} />
        </Part>

        {/* ─── The cord: boot, cord along the datum, plug ─── */}
        <Part part="cord" active={active}>
          <path d="M 318 430 L 334 426 L 339 445 L 321 443 Z" fill={GROUND} strokeWidth={1.2} />
          <path d="M 330 436 C 372 449 410 452 448 452 L 532 452" strokeWidth={2.4} />
          <rect x={534} y={441} width={24} height={22} rx={2} fill={GROUND} strokeWidth={1.2} />
          <path d="M 540 441 V 435 M 552 441 V 435" strokeWidth={1.2} />
        </Part>

        {/* ─── Marks — visible only while their callout is pressed ─── */}
        <Marker on={active?.id === "leak"}>
          <path d="M 366 124 Q 398 128 393 150" />
          <circle cx={397} cy={153} r={2.2} fill={BRASS} stroke="none" />
          <circle cx={405} cy={143} r={1.7} fill={BRASS} stroke="none" />
          <path d="M 393 150 L 386 145 L 390 155 Z" fill={BRASS} stroke="none" />
        </Marker>
        <Marker on={active?.id === "scale"}>
          <path d="M 297 314 H 311 M 297 330 H 311" strokeWidth={1.4} />
          <circle cx={363} cy={120} r={1.5} fill={BRASS} stroke="none" />
          <circle cx={368} cy={129} r={1.2} fill={BRASS} stroke="none" />
          <circle cx={360} cy={141} r={1.6} fill={BRASS} stroke="none" />
          <circle cx={276} cy={150} r={1.4} fill={BRASS} stroke="none" />
          <circle cx={271} cy={157} r={1.2} fill={BRASS} stroke="none" />
        </Marker>
        <Marker on={active?.id === "element"}>
          <path d="M 278 125 L 283 129 L 278 133 L 283 137 L 278 141" strokeWidth={1.5} />
          <path d="M 287 122 L 292 117 M 288 133 L 294 133" strokeWidth={1.2} />
        </Marker>
        <Marker on={active?.id === "cord"}>
          <path d="M 344 428 q 3.5 -4.5 0 -9 q -3.5 -4.5 0 -9" strokeWidth={1.3} />
          <path d="M 353 430 q 3.5 -4.5 0 -9" strokeWidth={1.3} />
          <path d="M 362 431 q 3.5 -4.5 0 -9" strokeWidth={1.3} />
        </Marker>

        {/* ─── Leaders with tabular labels ─── */}
        <Leader
          part="element"
          active={active}
          d="M 190 100 H 222 L 254 126"
          dx={254}
          dy={126}
          x={190}
          y={100}
          anchor="end"
          label="CONNECTOR"
        />
        <Leader
          part="element"
          active={active}
          d="M 190 148 H 232 L 284 136"
          dx={284}
          dy={136}
          x={190}
          y={140}
          anchor="end"
          label="ELEMENT"
          value="2000 W"
        />
        <Leader
          part="tank"
          active={active}
          d="M 190 224 H 236 L 270 219"
          dx={270}
          dy={219}
          x={190}
          y={216}
          anchor="end"
          label="TANK"
          value="300 ML, REMOVABLE"
        />
        <Leader
          part="tank"
          active={active}
          d="M 190 272 H 216 L 282 222"
          dx={282}
          dy={222}
          x={190}
          y={272}
          anchor="end"
          label="FILL LINE"
        />
        <Leader
          part="path"
          active={active}
          d="M 190 320 H 244 L 304 312"
          dx={304}
          dy={312}
          x={190}
          y={312}
          anchor="end"
          label="WATER PATH"
          value="TANK TO SOLEPLATE"
        />
        <Leader
          part="head"
          active={active}
          d="M 428 120 H 400 L 360 124"
          dx={360}
          dy={124}
          x={428}
          y={112}
          anchor="start"
          label="SOLEPLATE"
          value="CERAMIC"
        />
        <Leader
          part="path"
          active={active}
          d="M 428 176 H 398 L 350 152"
          dx={350}
          dy={152}
          x={428}
          y={176}
          anchor="start"
          label="BOILER"
        />
        <Leader
          part="tank"
          active={active}
          d="M 428 252 H 404 L 300 230"
          dx={300}
          dy={230}
          x={428}
          y={252}
          anchor="start"
          label="WATER WINDOW"
        />
        <Leader
          part="handle"
          active={active}
          d="M 428 338 H 384 L 320 340"
          dx={320}
          dy={340}
          x={428}
          y={330}
          anchor="start"
          label="HANDLE"
          value="GRIP + TRIGGER"
        />
        <Leader
          part="cord"
          active={active}
          d="M 428 432 H 414 L 440 450"
          dx={440}
          dy={450}
          x={428}
          y={424}
          anchor="start"
          label="CORD"
          value="100–240 V"
        />
        <Leader
          part="cord"
          active={active}
          d="M 200 492 H 240 L 268 445"
          dx={268}
          dy={445}
          x={200}
          y={492}
          anchor="end"
          label="FOOT — CORD ENTRY"
        />

        {/* ─── Title block ─── */}
        <g opacity={active ? 0.55 : 0.9} stroke={SOFT} fill="none">
          <rect x={352} y={466} width={220} height={32} strokeWidth={1} />
          <path d="M 352 482 H 572" strokeWidth={1} />
          <text
            x={360}
            y={478}
            fill={SOFT}
            stroke="none"
            fontFamily="var(--mono)"
            fontSize={11}
            letterSpacing="0.1em"
          >
            PLIMSOLL — GARMENT STEAMER
          </text>
          <text
            x={360}
            y={494}
            fill={SOFT}
            stroke="none"
            fontFamily="var(--mono)"
            fontSize={10.5}
            letterSpacing="0.1em"
          >
            SIDE SECTION — SCHEMATIC
          </text>
        </g>
      </svg>

      <figcaption className="mt-4 flex items-baseline gap-3">
        <span aria-hidden className="mono shrink-0 text-lamp">
          F1
        </span>
        <span className="micro">
          Side section, schematic — not a photograph, not to scale. The four marks show where the
          category&apos;s failures live, not a claim about our internals.
        </span>
      </figcaption>
    </figure>
  );

  const controls = (
    <div className="border-t-2 border-graphite pt-7">
      <h2 id="anatomy-heading" className="title-m mt-0">
        Four places it breaks.
      </h2>
      <p className="body mt-6 max-w-[46ch]">
        A schematic of the steamer, cut open on one page. Four failure modes with real numbers behind
        them, marked where they live. Nothing is hidden behind the buttons — pick one and the drawing
        answers in brass, the evidence beside it in full.
      </p>

      <div
        className="mt-8 flex flex-wrap gap-3 border-t border-hair pt-8"
        role="group"
        aria-label="Failure modes to mark on the diagram"
      >
        {ANATOMY_CALLOUTS.map((c) => {
          const on = active?.id === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActiveId(on ? null : c.id)}
              className={`button ${on ? "button-signal" : "button-ghost"}`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-8 min-h-[15rem] border-t-2 border-graphite pt-7">
        {active ? (
          <>
            <p className="label text-lamp">{active.label}</p>
            <p className="body-lg mt-4 max-w-[52ch]">{active.caption}</p>
            <dl className="ledger mt-8">
              {active.numbers.map((n) => (
                <div key={n.key} className="ledger-row">
                  <dt className="ledger-key">{n.key}</dt>
                  <dd className="ledger-val">{n.value}</dd>
                </div>
              ))}
            </dl>
            <p className="body mt-7 max-w-[52ch]">{active.answer}</p>
            <p className="form-note mt-5 text-graphite-70">{active.source}</p>
          </>
        ) : (
          <>
            <p className="body max-w-[52ch]">
              Pick a mode. The marked path goes brass and the rest of the sheet recedes, so the
              drawing reads one failure at a time instead of all four at once.
            </p>
            <p className="form-note mt-6 text-graphite-70">
              Every figure traces to the factory quote, the live catalogue row, or the sourced
              complaint ledger — cited line by line below.
            </p>
          </>
        )}
      </div>
    </div>
  );

  const alternative = (
    <div className="mt-[clamp(40px,6vw,72px)]">
      <dl className="ledger">
        {ANATOMY_CALLOUTS.map((c) => (
          <div key={c.id} className="ledger-row ledger-row-stack">
            <dt className="ledger-key">{c.label}</dt>
            <dd className="ledger-val" style={{ textAlign: "left" }}>
              <span className="body">{c.caption}</span>
              <span className="mono mt-3 block text-graphite-70">
                {c.numbers.map((n) => `${n.key} — ${n.value}`).join(" · ")}
              </span>
              <span className="body mt-3 block">{c.answer}</span>
              <span className="form-note mt-3 block">{c.source}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    <section aria-labelledby="anatomy-heading" className="band band-bone">
      <div className="wrap">
        <Ledger ratio="12/5" wide={diagram} narrow={controls} />
        {alternative}
      </div>
    </section>
  );
}
