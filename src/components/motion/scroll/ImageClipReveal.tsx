"use client";

// ImageClipReveal — photographs are uncovered like a curtain via
// clip-path (Motion Menu #19), ported 1:1 from DAF V3. Starts fully
// clipped from the bottom, resolves to inset(0) on scroll-into-view.

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../lib/useReducedMotion";
import { DURATION_REVEAL_CURTAIN, EASE_REVEAL_CURTAIN } from "../lib/physics";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function ImageClipReveal({
  children,
  className,
  style,
  from = "inset(0 0 100% 0)",
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  from?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { clipPath: from });
    const tween = gsap.to(el, {
      clipPath: "inset(0% 0 0 0)",
      duration: DURATION_REVEAL_CURTAIN,
      ease: EASE_REVEAL_CURTAIN,
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, from]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
