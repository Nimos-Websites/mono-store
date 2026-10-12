"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function splitChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const spans: HTMLElement[] = [];
  // word-aware split: characters animate, but line breaks stay at real spaces
  for (const word of text.split(" ")) {
    if (!word) continue;
    const w = document.createElement("span");
    w.className = "ch-w";
    w.setAttribute("aria-hidden", "true");
    for (const ch of word) {
      const s = document.createElement("span");
      s.className = "ch";
      s.textContent = ch;
      w.appendChild(s);
      spans.push(s);
    }
    el.appendChild(w);
    el.appendChild(document.createTextNode(" "));
  }
  return spans;
}

export function useSplitHeading() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    if (reduced) return;

    const chars = splitChars(el);
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    tl.fromTo(
      chars,
      { yPercent: 120, rotate: 6, opacity: 0 },
      { yPercent: 0, rotate: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.026 },
    );
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return ref;
}
