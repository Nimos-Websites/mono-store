"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const KEY = "the67-anno-dismissed";

export function AnnouncementStrip() {
  const [gone, setGone] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") return;
    } catch {
      /* private mode — show it */
    }
    setGone(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    const el = ref.current;
    if (!el) {
      setGone(true);
      return;
    }
    gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => setGone(true),
    });
  };

  if (gone) return null;
  return (
    <div className="anno" ref={ref} role="note">
      <p className="anno-text">
        <span className="anno-tag">US stock</span>
        Ships in 2&ndash;5 days from our US warehouse &middot; free shipping over $60 &middot;
        30-day returns &mdash; used is allowed
      </p>
      <button
        className="anno-close"
        type="button"
        aria-label="Dismiss announcement"
        onClick={dismiss}
      >
        &times;
      </button>
    </div>
  );
}
