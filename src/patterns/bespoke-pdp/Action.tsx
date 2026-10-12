"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FAQS = [
  {
    q: "Is it dishwasher safe?",
    a: "No. Prolonged alkaline exposure in a dishwasher will stain and pit the high-carbon core. Hand wash, dry immediately. This is the one real cost of the steel, and we would rather say it plainly than let you find out.",
  },
  {
    q: "How is it different from a $12 knife?",
    a: "The steel and the grind. The $12 knife is stamped from a softer alloy at a lower hardness — it feels sharp in the store and stops cutting in weeks. This is a VG-10 core, 67 folded layers, hand-ground at 60±2 HRC. It costs more because the material and the labor cost more.",
  },
  {
    q: "What does VG-10 actually mean?",
    a: "A Japanese stainless recipe: 1% carbon for hardness, 1.5% cobalt and 0.3% vanadium for edge retention, 15% chromium for stain resistance. The sheet on this page is the maker's own.",
  },
  {
    q: "How often will it need sharpening?",
    a: "Hone it on a ceramic rod every few uses. A whetstone sharpening a few times a year keeps it for home cooking. Professional kitchens sharpen weekly — this steel can take it.",
  },
  {
    q: "What if it arrives wrong or damaged?",
    a: "We replace or refund it — 30 days, and damage claims are opened within one business day. Ships from our US warehouse in 2–5 days, so you are not waiting on a boat either way.",
  },
];

const RITUAL = [
  { n: "01", t: "Hand wash, dry immediately", s: "Never the dishwasher. Alkaline detergent pits high-carbon steel." },
  { n: "02", t: "Hone every few uses", s: "A ceramic rod realigns the edge. Thirty seconds, not a project." },
  { n: "03", t: "Whetstone two or three times a year", s: "15–17 degrees per side. Home sharpening is enough; we will show you." },
  { n: "04", t: "Wood or soft plastic only", s: "Never glass, stone, or the rim of a ceramic bowl. At 60 HRC the edge is hard and somewhat brittle." },
];

export function Action() {
  return (
    <section className="act action">
      <div className="offer">
        <div className="offer-left">
          <div className="offer-price">$89.95</div>
          <div className="offer-monthly">Or from $7.50/mo · financing quoted at checkout, subject to approval</div>
          <details className="offer-basis">
            <summary>What this price is</summary>
            <p>
              The supplier cost, freight, duty, our packaging, and one margin — itemized on
              request. It is not a fake MSRP struck through to look like a sale. If a
              marketplace lists this knife for less, they are selling a different record;
              we will show you ours line by line.
            </p>
          </details>
        </div>
        <div className="offer-right">
          <p className="offer-promise">
            Thirty days from delivery: if the knife doesn&rsquo;t cut the way this page says
            it does, <b>return it — used, sharpened, we don&rsquo;t care.</b> Proof should be
            a risk we take, not you.
          </p>
          <div className="offer-trust">
            <div><b>US stock</b> · ships in 2–5 days</div>
            <div><b>30-day returns</b> · refunds to original payment</div>
            <div><b>Damage</b> · claims opened within one business day</div>
            <div><b>Financing</b> · Affirm · Klarna</div>
          </div>
          <div className="hero-cta" style={{ marginTop: 4 }}>
            <button className="btn btn-fill" type="button">Add to cart — $89.95</button>
          </div>
        </div>
      </div>

      <div className="faq">
        {FAQS.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>

      <div>
        <StickyBar />
      </div>
    </section>
  );
}

function StickyBar() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    // shown once the hero is behind the reader, hidden again at the footer curtain
    const hero = document.querySelector(".blade-hero");
    const close = document.querySelector(".close-reveal");
    const show = () => node.setAttribute("data-shown", "true");
    const hide = () => node.setAttribute("data-shown", "false");
    gsap.registerPlugin(ScrollTrigger);
    const triggers: ScrollTrigger[] = [];
    if (hero) {
      triggers.push(
        ScrollTrigger.create({
          trigger: hero,
          start: "bottom 80%",
          onEnter: show,
          onLeaveBack: hide,
        }),
      );
    }
    if (close) {
      triggers.push(
        ScrollTrigger.create({
          trigger: close,
          start: "top 90%",
          onEnter: hide,
          onLeaveBack: show,
        }),
      );
    }
    return () => triggers.forEach((t) => t.kill());
  }, []);
  return (
    <div className="stickycta" ref={el} data-shown="false">
      <span className="n">The 67 — VG-10 Damascus, 60±2 HRC</span>
      <span className="p">$89.95</span>
      <button className="btn btn-fill" type="button">Add to cart</button>
    </div>
  );
}

export function TheStory() {
  return (
    <section className="act story">
      <div className="story-mast display">VG-10</div>
      <div className="story-grid">
        <div className="story-col">
          <h3>The steel</h3>
          <p>
            VG-10 is a specific alloy, not a mood: 1% carbon, 15% chromium, 1% molybdenum,
            1.5% cobalt, 0.3% vanadium, balanced with manganese and silicon. That recipe buys
            edge retention and stain resistance at once — the two properties cheap knives trade
            away.
          </p>
          <p>
            Sixty-seven layers are folded around that core. The pattern is the byproduct; the
            fold is the strength. And the hammered face does a job: micro air pockets so
            potatoes, onions, and cheese release instead of welding themselves to the blade.
          </p>
        </div>
        <div className="story-col">
          <h3>What owning it takes</h3>
          <ul className="ritual">
            {RITUAL.map((r) => (
              <li key={r.n}>
                <span className="n">{r.n}</span>
                <span className="t">
                  <b>{r.t}</b>
                  <span>{r.s}</span>
                </span>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 22, color: "var(--dim)" }}>
            Do that and this is a decade knife. Don&rsquo;t, and even VG-10 will disappoint you.
          </p>
        </div>
      </div>
    </section>
  );
}
