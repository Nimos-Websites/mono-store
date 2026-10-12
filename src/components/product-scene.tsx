"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductHandles } from "@/lib/product-model";
import { PRODUCT } from "@/lib/brand";

type Props = {
  className?: string;
  autoRotate?: boolean;
  /** Rendered only when WebGL is unavailable. The spec ledger is always the text alternative. */
  label?: string;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function ProductScene({ className, autoRotate = true, label }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let handles: ProductHandles | null = null;
    let raf = 0;
    let disposed = false;
    let visible = true;
    let dragging = false;
    let pointerId: number | null = null;
    let yaw = -0.5;
    let pitch = 0.16;
    let yawVel = 0;
    let pitchVel = 0;
    let lastX = 0;
    let lastY = 0;
    let interacted = false;
    const clock = new THREEClockShim();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 820 ? 1.75 : 2);

    const rect = host.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));

    let ready = false;

    void (async () => {
      try {
        const { buildProduct } = await import("@/lib/product-model");
        if (disposed) return;
        handles = buildProduct(canvas, w, h, dpr);
        ready = true;
        if (disposed) {
          handles.dispose();
          handles = null;
          return;
        }
        loop();
      } catch {
        if (!disposed) setFailed(true);
      }
    })();

    const radius = 0.68;

    function applyCamera() {
      if (!handles) return;
      const cp = Math.cos(pitch);
      handles.camera.position.set(
        Math.sin(yaw) * radius * cp,
        0.15 + Math.sin(pitch) * radius,
        Math.cos(yaw) * radius * cp,
      );
      handles.camera.lookAt(0, 0.15, 0);
    }

    function loop() {
      raf = requestAnimationFrame(loop);
      if (!visible || !handles) return;

      const dt = clock.tick();

      if (!dragging) {
        if (autoRotate && !interacted && !reduced) yaw += dt * 0.075;
        yaw += yawVel;
        pitch = clamp(pitch + pitchVel, -0.12, 0.52);
        yawVel *= 0.9;
        pitchVel *= 0.9;
        if (Math.abs(yawVel) < 1e-4) yawVel = 0;
        if (Math.abs(pitchVel) < 1e-4) pitchVel = 0;
      }

      applyCamera();
      handles.renderer.render(handles.scene, handles.camera);
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      dragging = true;
      interacted = true;
      pointerId = e.pointerId;
      lastX = e.clientX;
      lastY = e.clientY;
      host.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      const k = reduced ? 0.005 : 0.008;
      yaw -= dx * k;
      pitch = clamp(pitch + dy * k, -0.12, 0.52);
      if (!reduced) {
        yawVel = -dx * k * 0.32;
        pitchVel = dy * k * 0.2;
      }
    };

    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      dragging = false;
      pointerId = null;
      if (host.hasPointerCapture(e.pointerId)) host.releasePointerCapture(e.pointerId);
    };

    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerup", onUp);
    host.addEventListener("pointercancel", onUp);

    const ro = new ResizeObserver(() => {
      const r = host.getBoundingClientRect();
      const nw = Math.max(1, Math.round(r.width));
      const nh = Math.max(1, Math.round(r.height));
      if (!handles) return;
      handles.renderer.setSize(nw, nh, false);
      handles.camera.aspect = nw / nh;
      handles.camera.updateProjectionMatrix();
    });
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 },
    );
    io.observe(host);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerup", onUp);
      host.removeEventListener("pointercancel", onUp);
      handles?.dispose();
      void ready;
    };
  }, [autoRotate]);

  const spec = `${PRODUCT.name}. A handheld garment steamer: ${PRODUCT.power}, ${PRODUCT.tank} removable water tank, ${PRODUCT.heatUp} heat-up, ${PRODUCT.steamRate} steam output, 100 mm ceramic soleplate, ${PRODUCT.weight} bare. Rendered in 3D from the specification on this page — it is not a photograph.`;

  return (
    <div
      ref={hostRef}
      className={className}
      role="img"
      aria-label={label ?? spec}
      style={{ touchAction: "pan-y", cursor: failed ? "default" : "grab" }}
    >
      {failed ? null : <canvas ref={canvasRef} aria-hidden="true" />}
      {!failed && autoRotate ? (
        <p className="mono pointer-events-none absolute right-3 bottom-3 opacity-55">
          Drag to turn
        </p>
      ) : null}
    </div>
  );
}

/* Minimal frame clock so we do not pull in the whole rAF wrapper. */
class THREEClockShim {
  private last = 0;
  tick(): number {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const dt = this.last === 0 ? 0.016 : Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    return dt;
  }
}