"use client";

/*
  SceneView — the host for the scene library. One component, three
  finished compositions. It enforces the house laws so no caller can
  break them:

  · mounts when the frame approaches the viewport (IntersectionObserver),
    and DISPOSES the renderer, geometries and textures on exit — a scene
    is never alive off-screen, and browsers never run out of contexts
  · DPR capped at 2 (1.75 on narrow screens, where pixels are already
    dense and batteries are not)
  · prefers-reduced-motion renders exactly ONE frame — the static poster
    frame — and no rAF loop ever starts
  · drag orbits the camera; with motion allowed there is inertia, without
    it the drag still works because an explicit gesture is not decoration
  · WebGL failure is a first-class state: a plaster panel with the
    specification, never a blank rectangle
*/

import { useEffect, useRef, useState } from "react";
import type { SceneKind } from "@/lib/scenes";

type Props = {
  kind: SceneKind;
  /** The honest description of what is on screen. Read by screen readers; shown as the fallback. */
  label: string;
  className?: string;
  /** Drag-to-turn. Default true. */
  interactive?: boolean;
  /** Show the "drag to turn" hint. Default: interactive only. */
  hint?: boolean;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

class FrameClock {
  last = 0;
  tick(): number {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const dt = this.last === 0 ? 0.016 : Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    return dt;
  }
}

export function SceneView({ kind, label, className, interactive = true, hint }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const el = host;

    type Handles = import("@/lib/scenes").SceneHandles;

    let handles: Handles | null = null;
    let raf = 0;
    let mounted = false;
    let visible = false;
    let disposed = false;

    let dragging = false;
    let pointerId: number | null = null;
    let lastX = 0;
    let lastY = 0;
    let yawVel = 0;
    let pitchVel = 0;
    let yaw = 0;
    let pitch = 0;
    let radius = 1;
    const focus = { x: 0, y: 0, z: 0 };
    const clock = new FrameClock();

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      window.innerWidth < 820 ? 1.75 : 2,
    );

    function applyCamera() {
      if (!handles) return;
      const cp = Math.cos(pitch);
      handles.camera.position.set(
        focus.x + Math.sin(yaw) * radius * cp,
        focus.y + Math.sin(pitch) * radius,
        focus.z + Math.cos(yaw) * radius * cp,
      );
      handles.camera.lookAt(focus.x, focus.y, focus.z);
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!handles || !visible) return;
      const dt = clock.tick();
      if (!dragging) {
        yaw += yawVel;
        pitch = clamp(pitch + pitchVel, -0.35, 0.85);
        yawVel *= 0.92;
        pitchVel *= 0.92;
        if (Math.abs(yawVel) < 1e-4) yawVel = 0;
        if (Math.abs(pitchVel) < 1e-4) pitchVel = 0;
      }
      applyCamera();
      handles.update(dt, clock.last / 1000);
      handles.renderer.render(handles.scene, handles.camera);
    }

    function renderPoster() {
      if (!handles) return;
      applyCamera();
      handles.renderer.render(handles.scene, handles.camera);
    }

    async function mount() {
      if (mounted || disposed) return;
      mounted = true;
      const rect = el.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const canvas = document.createElement("canvas");
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.setAttribute("aria-hidden", "true");
      el.appendChild(canvas);
      try {
        const { buildScene } = await import("@/lib/scenes");
        if (disposed) {
          canvas.remove();
          return;
        }
        handles = buildScene(kind, canvas, w, h, dpr);
        const home = handles.camera.position.clone();
        const dx = home.x - handles.focus.x;
        const dy = home.y - handles.focus.y;
        const dz = home.z - handles.focus.z;
        radius = Math.sqrt(dx * dx + dy * dy + dz * dz);
        yaw = Math.atan2(dx, dz);
        pitch = Math.asin(clamp(dy / radius, -1, 1));
        focus.x = handles.focus.x;
        focus.y = handles.focus.y;
        focus.z = handles.focus.z;
        setReady(true);
        if (reduced) {
          renderPoster();
        } else {
          visible = true;
          frame();
        }
      } catch {
        canvas.remove();
        mounted = false;
        setFailed(true);
      }
    }

    function unmount() {
      if (!mounted) return;
      mounted = false;
      cancelAnimationFrame(raf);
      handles?.dispose();
      handles = null;
      visible = false;
      setReady(false);
      el.querySelectorAll("canvas").forEach((c) => c.remove());
    }

    /* Mount on approach; dispose on exit. The 30% margin means a scene
       is warm by the time it enters the viewport and gone shortly after
       it leaves — memory is never held for an off-screen render. */
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) void mount();
        else unmount();
      },
      { rootMargin: "30% 0px 30% 0px", threshold: 0 },
    );
    io.observe(host);

    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      const nw = Math.max(1, Math.round(r.width));
      const nh = Math.max(1, Math.round(r.height));
      if (!handles) return;
      handles.resize(nw, nh);
      /* The scene re-frames itself for the new aspect — pull the orbit
         centre back in so a drag keeps orbiting the right point. */
      focus.x = handles.focus.x;
      focus.y = handles.focus.y;
      focus.z = handles.focus.z;
      if (reduced) renderPoster();
    });
    ro.observe(host);

    const onDown = (e: PointerEvent) => {
      if (!interactive || !handles) return;
      if (e.button !== 0 && e.pointerType === "mouse") return;
      dragging = true;
      pointerId = e.pointerId;
      lastX = e.clientX;
      lastY = e.clientY;
      host.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId || !handles) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      const k = reduced ? 0.005 : 0.008;
      yaw -= dx * k;
      pitch = clamp(pitch + dy * k, -0.35, 0.85);
      if (!reduced) {
        yawVel = -dx * k * 0.3;
        pitchVel = dy * k * 0.18;
      }
      applyCamera();
      if (reduced) renderPoster();
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      dragging = false;
      pointerId = null;
      if (host.hasPointerCapture(e.pointerId)) host.releasePointerCapture(e.pointerId);
    };

    if (interactive) {
      host.addEventListener("pointerdown", onDown);
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerup", onUp);
      host.addEventListener("pointercancel", onUp);
    }

    return () => {
      disposed = true;
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerup", onUp);
      host.removeEventListener("pointercancel", onUp);
      unmount();
    };
  }, [kind, interactive]);

  const showHint = hint ?? interactive;

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={label}
      className={className}
      style={{
        touchAction: "pan-y",
        cursor: failed ? "default" : interactive ? "grab" : "default",
        background:
          "radial-gradient(120% 90% at 50% 30%, #f4f1ea 0%, #ece8df 46%, #dcd6ca 100%)",
      }}
    >
      {failed ? (
        <div className="flex h-full w-full items-end justify-start p-6">
          <p className="mono max-w-[38ch] text-graphite-70">
            WebGL is unavailable on this device, so the render cannot start. The specification
            below is the record — every figure on it is sourced.
          </p>
        </div>
      ) : null}
      {ready && showHint && !failed ? (
        <p className="mono pointer-events-none absolute right-3 bottom-3 opacity-55">
          Drag to turn
        </p>
      ) : null}
    </div>
  );
}
