"use client";

// LineMaskReveal — the ONE arrival moment on the page. Each line sits
// inside an overflow:hidden mask; the inner span slides up from 115% on
// scroll-into-view. Editorial register, quieter than a char cascade.
// Ported 1:1 from DAF V3 (Motion Menu #08). Used exactly once per page.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "../lib/useReducedMotion";
import { DURATION_REVEAL, EASE_REVEAL } from "../lib/physics";

export function LineMaskReveal({
  lines,
  className,
  lineClassName,
  style,
  stagger = 0.12,
  delay = 0,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  style?: React.CSSProperties;
  stagger?: number;
  delay?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const inners = wrap.querySelectorAll<HTMLElement>("[data-line-inner]");
    gsap.set(inners, { yPercent: 115 });

    let played = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !played) {
            played = true;
            gsap.to(inners, { yPercent: 0, duration: DURATION_REVEAL, ease: EASE_REVEAL, stagger, delay });
            io.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(wrap);
    return () => {
      io.disconnect();
      gsap.killTweensOf(inners);
    };
  }, [lines.length, reduced, stagger, delay]);

  return (
    <div ref={wrapRef} className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden" }}>
          <span
            data-line-inner
            className={lineClassName}
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}
