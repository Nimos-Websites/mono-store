"use client";

// RevealOnScroll — the workhorse entrance (Motion Menu #14), ported 1:1
// from DAF V3. DESIGN.md bans using this on *every* section: reserve it
// for the few places that need a workhorse entrance, not as the page's
// default rhythm.

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../lib/useReducedMotion";
import { EASE_ENTER } from "../lib/physics";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function RevealOnScroll({
  children,
  className,
  style,
  y = 40,
  duration = 1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  y?: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    /* "play none none none" — a reveal never reverses. Content that has
       been read stays read: hiding it again on scroll-up is a defect,
       not a rhythm (the failure the reverse toggle shipped with). */
    const tween = gsap.from(el, {
      y,
      opacity: 0,
      duration,
      delay,
      ease: EASE_ENTER,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, y, duration, delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
