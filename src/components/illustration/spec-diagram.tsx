/* ─────────────────────────────────────────────────────────────────────────
 * SPEC SHEET — the unit in side section, statically annotated.
 *
 * The companion to Fig. 1: no interaction, no state, no client JS — it
 * renders on the PDP as the patent-register argument for the spec
 * ledger. Same hand-authored drawing language (hairline ink on the
 * paper ground, cut walls hatched at 45°, extension lines, bent
 * leaders, tabular labels, title block), annotated with the four
 * figures the spec table carries: 850 g (the live catalogue row — the
 * factory quote for the private-mold unit is 0.63 kg N.W., printed
 * beside it), 300 ml between the fill line and the tank floor, 25 s
 * heat-up, 17–23 g/min at the slot. Nothing here is a photograph and
 * nothing is to scale.
 * ─────────────────────────────────────────────────────────────────────── */

import type { ReactNode } from "react";

const INK = "var(--graphite)";
const SOFT = "var(--cool)";
const GROUND = "var(--ground)";

function Group({ children }: { children: ReactNode }) {
  return (
    <g stroke={INK} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  );
}

function Datum({ children }: { children: ReactNode }) {
  return (
    <g stroke={SOFT} fill="none" opacity={0.5}>
      {children}
    </g>
  );
}

function Label({
  x,
  y,
  anchor,
  label,
  value,
  opacity = 1,
}: {
  x: number;
  y: number;
  anchor: "start" | "end";
  label: string;
  value?: string;
  opacity?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={INK}
      stroke="none"
      opacity={opacity}
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
  );
}

function Leader({
  d,
  dx,
  dy,
  children,
}: {
  d: string;
  dx: number;
  dy: number;
  children: ReactNode;
}) {
  return (
    <g stroke={INK} fill="none">
      <path d={d} strokeWidth={1} />
      <circle cx={dx} cy={dy} r={2} fill={INK} stroke="none" />
      {children}
    </g>
  );
}

export function SteamerSpecDiagram() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 600 520"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby="spec-fig-title spec-fig-desc"
        className="block h-auto w-full"
      >
        <title id="spec-fig-title">MONO steamer — spec sheet, side section on the centreline</title>
        <desc id="spec-fig-desc">
          A technical spec sheet: the handheld steamer in side section, cut walls hatched at
          forty-five degrees. Tank volume is dimensioned between the fill line and the tank floor at
          300 ml. Mass is noted as 850 grams from the live catalogue row, with the factory
          quote&apos;s 0.63 kg net weight printed beside it. Heat-up is noted as 25 seconds at the
          heating element, steam output as 17 to 23 grams per minute at the slot in the ceramic
          soleplate, and the cord is noted at 100 to 240 volts. Schematic, not to scale, not a
          photograph.
        </desc>

        <defs>
          <pattern
            id="section-hatch"
            patternUnits="userSpaceOnUse"
            width={7}
            height={7}
            patternTransform="rotate(45)"
          >
            <line x1={0} y1={0} x2={0} y2={7} stroke={SOFT} strokeWidth={0.9} opacity={0.45} />
          </pattern>
        </defs>

        {/* ─── Construction: sheet frame, ground datum, centerlines ─── */}
        <Datum>
          <rect x={24} y={24} width={552} height={480} strokeWidth={1} />
          <path d="M 60 452 H 560" strokeWidth={1} strokeDasharray="8 5" />
          <path d="M 292 78 V 458" strokeWidth={1} strokeDasharray="12 4 3 4" />
          <path d="M 236 132 H 378" strokeWidth={1} strokeDasharray="12 4 3 4" />
          <path d="M 250 441 H 334" strokeWidth={1} strokeDasharray="8 3 2 3" />
        </Datum>

        {/* ─── The head, cut: ceramic soleplate, steam slot ─── */}
        <Group>
          <path
            d="M 254 96 H 358 Q 366 96 366 104 V 160 Q 366 168 358 168 H 254 Q 246 168 246 160 V 104 Q 246 96 254 96 Z"
            fill="url(#section-hatch)"
            strokeWidth={1.5}
          />
          <path d="M 359 116 V 152" strokeWidth={1.3} />
          <path d="M 352 120 H 359 M 352 128 H 359 M 352 136 H 359 M 352 144 H 359" strokeWidth={1} />
        </Group>

        {/* ─── The tank, cut: handle shell, fill line, window, level ─── */}
        <Group>
          <path
            d="M 262 168 V 428 Q 262 436 270 436 H 314 Q 322 436 322 428 V 168"
            fill="url(#section-hatch)"
            strokeWidth={1.5}
          />
          <path d="M 270 174 H 314 V 430 H 270 Z" strokeWidth={1} strokeDasharray="5 4" />
          <ellipse cx={292} cy={441} rx={34} ry={6.5} fill={GROUND} strokeWidth={1.3} />
          <path d="M 270 219 H 316" strokeWidth={1.8} />
          <path d="M 270 214 V 224 M 316 214 V 224" strokeWidth={1} />
          <rect x={276} y={206} width={24} height={26} fill={GROUND} strokeWidth={1} />
          <path
            d="M 272 246 H 312 M 272 262 H 312 M 272 278 H 312 M 272 294 H 312 M 272 310 H 312"
            strokeWidth={1}
          />
        </Group>

        {/* ─── The hand: grip, trigger, level dots ─── */}
        <Group>
          <path d="M 266 310 H 318 V 372 H 266 Z" fill={GROUND} strokeWidth={1} />
          <path d="M 271 315 V 367 M 313 315 V 367" strokeWidth={1} />
          <path d="M 306 246 H 318 V 253 H 312 V 259 H 306 Z" fill={GROUND} strokeWidth={1} />
          <circle cx={294} cy={268} r={1.6} fill={GROUND} strokeWidth={1} />
          <circle cx={294} cy={278} r={1.6} fill={GROUND} strokeWidth={1} />
          <circle cx={294} cy={288} r={1.6} fill={GROUND} strokeWidth={1} />
        </Group>

        {/* ─── The water path: boiler, tube, pump, channel to the slot ─── */}
        <Group>
          <path d="M 258 110 H 352 V 154 H 258 Z" strokeWidth={1} strokeDasharray="5 4" />
          <path d="M 304 404 V 190 L 276 154" strokeWidth={1.4} />
          <path d="M 299.5 247 L 304 239 L 308.5 247" strokeWidth={1.4} />
          <path d="M 348 134 H 359" strokeWidth={1.2} />
          <circle cx={292} cy={412} r={7} fill={GROUND} strokeWidth={1.2} />
          <circle cx={292} cy={412} r={2.4} strokeWidth={1} />
        </Group>

        {/* ─── The element: coil, connector, its two leads ─── */}
        <Group>
          <rect x={250} y={120} width={28} height={24} fill={GROUND} strokeWidth={1.4} />
          <path
            d="M 280 132 L 285.3 123 L 290.7 141 L 296 123 L 301.3 141 L 306.7 123 L 312 141 L 317.3 123 L 322.7 141 L 328 123 L 333.3 141 L 338.7 123 L 344 132"
            strokeWidth={1.3}
          />
          <path d="M 256 144 C 254 154 259 162 267 168" strokeWidth={1} />
          <path d="M 272 144 C 273 154 273 162 275 168" strokeWidth={1} />
        </Group>

        {/* ─── The cord: boot, cord along the datum, plug ─── */}
        <Group>
          <path d="M 318 430 L 334 426 L 339 445 L 321 443 Z" fill={GROUND} strokeWidth={1.2} />
          <path d="M 330 436 C 372 449 410 452 448 452 L 532 452" strokeWidth={2.4} />
          <rect x={534} y={441} width={24} height={22} rx={2} fill={GROUND} strokeWidth={1.2} />
          <path d="M 540 441 V 435 M 552 441 V 435" strokeWidth={1.2} />
        </Group>

        {/* ─── Dimension: tank volume between fill line and floor ─── */}
        <g stroke={INK} fill="none">
          <path d="M 266 219 H 230 M 266 430 H 230" strokeWidth={1} strokeDasharray="4 3" />
          <path d="M 236 219 V 430" strokeWidth={1} />
          <path d="M 236 219 L 231 229 H 241 Z" fill={INK} stroke="none" />
          <path d="M 236 430 L 231 420 H 241 Z" fill={INK} stroke="none" />
        </g>
        <Label x={228} y={320} anchor="end" label="300 ML" />
        <Label x={228} y={338} anchor="end" label="TANK VOLUME" />

        {/* ─── Leaders with tabular labels ─── */}
        <Leader d="M 190 110 H 240 L 284 134" dx={284} dy={134}>
          <Label x={190} y={100} anchor="end" label="ELEMENT" value="2000 W" />
        </Leader>
        <Leader d="M 190 162 H 246 L 300 130" dx={300} dy={130}>
          <Label x={190} y={152} anchor="end" label="HEAT-UP" value="25 S" />
        </Leader>
        <Leader d="M 190 478 H 226 L 264 420" dx={264} dy={420}>
          <Label x={190} y={470} anchor="end" label="MASS — 850 G" value="0.63 KG N.W. QUOTED" />
        </Leader>
        <Leader d="M 428 122 H 402 L 360 124" dx={360} dy={124}>
          <Label x={428} y={112} anchor="start" label="SOLEPLATE" value="CERAMIC" />
        </Leader>
        <Leader d="M 428 184 H 404 L 360 138" dx={360} dy={138}>
          <Label x={428} y={176} anchor="start" label="STEAM OUTPUT" value="17–23 G/MIN" />
        </Leader>
        <Leader d="M 428 252 H 404 L 300 230" dx={300} dy={230}>
          <Label x={428} y={252} anchor="start" label="WATER WINDOW" />
        </Leader>
        <Leader d="M 428 300 H 404 L 316 222" dx={316} dy={222}>
          <Label x={428} y={300} anchor="start" label="FILL LINE" />
        </Leader>
        <Leader d="M 428 432 H 414 L 440 450" dx={440} dy={450}>
          <Label x={428} y={424} anchor="start" label="CORD" value="100–240 V" />
        </Leader>

        {/* ─── Title block ─── */}
        <g stroke={SOFT} fill="none" opacity={0.9}>
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
            fontSize={10}
            letterSpacing="0.1em"
          >
            SIDE SECTION — NOT TO SCALE
          </text>
        </g>
      </svg>

      <figcaption className="mt-4 flex items-baseline gap-3">
        <span aria-hidden className="mono shrink-0 text-lamp">
          F2
        </span>
        <span className="micro">
          Side section on the centreline, schematic — not a photograph, not to scale. 850 g is the
          live catalogue row&apos;s weight; the factory quote for the private-mold unit is 0.63 kg
          net. The figures match the spec ledger above.
        </span>
      </figcaption>
    </figure>
  );
}
