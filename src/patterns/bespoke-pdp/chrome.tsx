"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/components/chrome/lenis-store";

export function Chrome() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    let cleanupLenis: (() => void) | undefined;
    let cleanupCursor: (() => void) | undefined;

    if (!reduced) {
      const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      cleanupLenis = () => {
        setLenis(null);
        lenis.destroy();
      };
    }

    const dot = document.querySelector<HTMLElement>(".cursor");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (dot && ring && !reduced && matchMedia("(hover: hover)").matches) {
      let mx = innerWidth / 2;
      let my = innerHeight / 2;
      let rx = mx;
      let ry = my;
      const onMove = (e: PointerEvent) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
        const t = e.target as HTMLElement;
        ring.classList.toggle("is-hover", !!t.closest("a,button,summary,.swatch"));
      };
      let raf = 0;
      const tick = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      addEventListener("pointermove", onMove);
      cleanupCursor = () => {
        cancelAnimationFrame(raf);
        removeEventListener("pointermove", onMove);
      };
    }

    return () => {
      cleanupLenis?.();
      cleanupCursor?.();
    };
  }, []);

  return (
    <>
      <div className="grain" aria-hidden />
      <div className="cursor" aria-hidden />
      <div className="cursor-ring" aria-hidden />
    </>
  );
}
