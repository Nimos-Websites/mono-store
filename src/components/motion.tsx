"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function MotionRuntime() {
  useEffect(() => {
    if (reduced()) {
      document.documentElement.classList.add("reduce-motion");
      return;
    }

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    reveals.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 22 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }),
      });
    });

    const staggers = gsap.utils.toArray<HTMLElement>("[data-stagger]");
    staggers.forEach((el) => {
      gsap.set(el.children, { opacity: 0, y: 26 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 84%",
        once: true,
        onEnter: () =>
          gsap.to(el.children, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
          }),
      });
    });

    const parallaxes = gsap.utils.toArray<HTMLElement>("[data-parallax]");
    parallaxes.forEach((el) => {
      const amount = Number(el.dataset.parallax ?? 7);
      gsap.to(el, {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });

    const magnetics = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
    const cleanups = magnetics.map((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.22,
          y: (e.clientY - (r.top + r.height / 2)) * 0.28,
          duration: 0.7,
          ease: "power3.out",
        });
      };
      const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "power3.out" });
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });

    ScrollTrigger.refresh();

    /* Failsafe: reveal everything if a trigger never fires. Content is never
       allowed to stay at opacity 0 because an observer misbehaved. */
    const failsafe = window.setTimeout(() => {
      if (reveals.length) gsap.set(reveals, { opacity: 1, y: 0, clearProps: "transform" });
      const children = staggers.flatMap((el) => Array.from(el.children));
      if (children.length) gsap.set(children, { opacity: 1, y: 0, clearProps: "transform" });
      if (staggers.length) gsap.set(staggers, { opacity: 1, y: 0, clearProps: "transform" });
    }, 4000);

    return () => {
      window.clearTimeout(failsafe);
      cleanups.forEach((fn) => fn());
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}