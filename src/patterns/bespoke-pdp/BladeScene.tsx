"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitHeading } from "@/components/chrome/useSplitHeading";

export function BladeHero() {
  const artRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const titleRef = useSplitHeading();

  useEffect(() => {
    const art = artRef.current;
    const sheen = sheenRef.current;
    if (!art) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    // entrance: the product settles into place, slightly overscaled
    if (!reduced) {
      gsap.fromTo(
        art,
        { opacity: 0, scale: 1.06, y: 26 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.1 },
      );
    }

    if (reduced || !sheen) return;

    // pointer tilt — the object answers the cursor, one physics family with the page
    const tiltX = gsap.quickTo(art, "rotationX", { duration: 0.7, ease: "power3.out" });
    const tiltY = gsap.quickTo(art, "rotationY", { duration: 0.7, ease: "power3.out" });
    const moveX = gsap.quickTo(art, "x", { duration: 0.9, ease: "power3.out" });
    const moveY = gsap.quickTo(art, "y", { duration: 0.9, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      tiltY(nx * 7);
      tiltX(-ny * 5);
      moveX(nx * -14);
      moveY(ny * -10);
    };
    const onLeave = () => {
      tiltY(0);
      tiltX(0);
      moveX(0);
      moveY(0);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    // scroll: the product drifts against the page out-scaling toward the next
    // act (one continuous camera move), and light rakes across the blade
    const st = ScrollTrigger.create({
      trigger: art,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(art, { yPercent: p * -8, scale: 1 + p * 0.16 });
        sheen.style.backgroundPositionX = `${88 - p * 150}%`;
      },
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      st.kill();
    };
  }, []);

  return (
    <section className="act blade-hero">
      <div className="blade-stage" aria-hidden />
      <div className="blade-art-wrap">
        <div className="blade-art" ref={artRef}>
          <Image
            src="/products/the-67/the67-cutout-black.png"
            alt="The 67 — 67-layer Damascus chef knife with its saya and box"
            width={1200}
            height={1200}
            priority
            sizes="(max-width: 720px) 92vw, 54vw"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="blade-sheen" ref={sheenRef} aria-hidden />
        </div>
      </div>
      <div className="blade-scrim" aria-hidden />
      <div className="blade-overlay">
        <div className="blade-top">
          <span className="blade-brand">Superstore</span>
          <nav className="blade-nav">
            <a href="#object">Anatomy</a>
            <a href="#configurator">Configure</a>
            <a href="#proof">Compare</a>
            <a href="#offer">Buy</a>
          </nav>
        </div>
        <h1 ref={titleRef} className="display blade-title">
          Sixty-seven layers of steel.
        </h1>
        <div className="blade-foot">
          <p className="blade-sub">
            A VG-10 core, folded sixty-seven times, ground by hand to 60&plusmn;2 HRC.
            Move your cursor &mdash; the light travels with you.
          </p>
          <div className="blade-scrollcue">
            <span>Scroll to turn the light</span>
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
