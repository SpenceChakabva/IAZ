"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * heronaiapp.com cursor: a 6px vermilion dot at rest (lagged follow via GSAP);
 * over [data-cursor] targets it becomes a vermilion "+" crosshair and shows a
 * live `X:____PX Y:____PX` HUD (or the target's label).
 * Plus a flowing vermilion tail that trails the pointer.
 */
export default function Cursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const cross = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const active = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const w = wrap.current!;
    const r = ring.current!;
    const c = cross.current!;
    const l = label.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;

    const xTo = gsap.quickTo(w, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(w, "y", { duration: 0.12, ease: "power3.out" });
    const rxTo = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3.out" });
    const ryTo = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3.out" });

    // ---- flowing tail ----
    const N = 22;
    const pts = Array.from({ length: N }, () => ({ x: -100, y: -100 }));
    let mx = -100;
    let my = -100;
    const accent = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#fa3600";

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = innerWidth * dpr;
      cv.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    let rafId = 0;
    const draw = () => {
      // ease the head toward the pointer, then chain the rest
      pts[0].x += (mx - pts[0].x) * 0.35;
      pts[0].y += (my - pts[0].y) * 0.35;
      for (let i = 1; i < N; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.4;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.4;
      }
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.strokeStyle = accent();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < N; i++) {
        const t = 1 - i / N;
        ctx.globalAlpha = t * 0.5;
        ctx.lineWidth = t * 5 + 0.4;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    // ---- pointer ----
    let raf = 0;
    let hasLabel = false;
    const move = (e: PointerEvent) => {
      // a large jump (tab focus, warp, synthetic input) collapses the tail
      // onto the new position instead of drawing a streak across the screen
      if (Math.hypot(e.clientX - mx, e.clientY - my) > 180) {
        for (let i = 0; i < N; i++) {
          pts[i].x = e.clientX;
          pts[i].y = e.clientY;
        }
      }
      mx = e.clientX;
      my = e.clientY;
      xTo(e.clientX);
      yTo(e.clientY);
      rxTo(0);
      ryTo(0);
      if (active.current && !hasLabel) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          l.textContent = `X:${Math.round(e.clientX)}PX  Y:${Math.round(
            e.clientY
          )}PX`;
        });
      }
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as
        | HTMLElement
        | null;
      const on = !!t;
      if (on === active.current) return;
      active.current = on;
      const text = t?.getAttribute("data-cursor") || "";
      hasLabel = !!text;
      gsap.to(r, { opacity: on && !text ? 1 : 0, duration: 0.3 });
      gsap.to(c, { opacity: on ? 1 : 0, scale: on ? 1 : 0.4, duration: 0.3, ease: "expo.out" });
      gsap.to(l, { opacity: on ? 1 : 0, duration: 0.25 });
      if (text) l.textContent = text;
    };

    const leaveWin = () => gsap.to(w, { opacity: 0, duration: 0.2 });
    const enterWin = () => gsap.to(w, { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("mouseleave", leaveWin);
    document.addEventListener("mouseenter", enterWin);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafId);
      removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("mouseleave", leaveWin);
      document.removeEventListener("mouseenter", enterWin);
    };
  }, []);

  return (
    <>
      <canvas className="cursor-tail" ref={canvas} aria-hidden="true" />
      <div className="cursor" ref={wrap} aria-hidden="true">
        <div className="cursor-ring" ref={ring} />
        <div className="cursor-cross" ref={cross} />
        <div className="cursor-dot" />
        <span className="cursor-label" ref={label} />
      </div>
    </>
  );
}
