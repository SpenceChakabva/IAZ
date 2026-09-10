"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * heronaiapp.com's `.btn-fill-bg` sweep, pixelated.
 *
 * A solid fill layer (`--sweep-color`, ink by default) slides in from the left
 * on a compositor-thread `transform` — so the motion itself is always smooth —
 * and its leading (right) edge carries a static Bayer-dithered alpha mask, so
 * what crosses the button is a ragged column of pixels switching on, not a hard
 * rectangle and not a soft fade.
 *
 * One running GSAP tween of `xPercent` (-101 = hidden, 0 = filled), identical
 * duration + ease both ways, `overwrite:"auto"` so a fast hover-out reverses
 * from wherever it is instead of popping.
 */

/* The dither mask is identical for every button and never changes, so it's
   painted exactly once — the first sweep to mount builds it, every other sweep
   reuses the data-URL. That single canvas decode is what used to stutter the
   first hover when each of the seven nav items built and decoded its own. */
let MASK_URL: string | null = null;

function ditherMask(): string {
  if (MASK_URL) return MASK_URL;

  // Fine grain — many tiny cells — with a wide leading feather so what crosses
  // the button is a delicate dithered edge, not a hard block. The mask is
  // stretched to each button (`mask-size: 100% 100%`), so a high column count
  // keeps the pixels small.
  const CELL = 4; // canvas resolution per cell; the mask is scaled to the button
  const COLS = 76; // ~2.7 : 1 vs ROWS so cells stay roughly square on a button
  const ROWS = 22;
  const FEATHER = 30; // leading-edge dither band, in columns
  // 4×4 ordered-dither matrix
  const bayer = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
  ];

  const cv = document.createElement("canvas");
  cv.width = COLS * CELL;
  cv.height = ROWS * CELL;
  const g = cv.getContext("2d");
  if (!g) return "";
  g.fillStyle = "#000";

  for (let x = 0; x < COLS; x++) {
    let coverage: number;
    if (x < COLS - FEATHER) coverage = 1;
    else {
      const t = (COLS - 1 - x) / (FEATHER - 1); // 1 → 0 toward the edge
      coverage = Math.pow(t, 1.4); // gentle ramp — a long, legible dither band
    }
    for (let y = 0; y < ROWS; y++) {
      // rotate the matrix per column so the fine grain never lines up into
      // visible diagonal banding across a wide feather
      const thr = (bayer[y % 4][(x + ((y / 4) | 0)) % 4] + 0.5) / 16;
      if (coverage > thr) g.fillRect(x * CELL, y * CELL, CELL, CELL);
    }
  }

  MASK_URL = `url(${cv.toDataURL()})`;
  return MASK_URL;
}

export default function PixelSweep({
  active,
  className = "btn-pixels",
  color = "ink",
}: {
  active: boolean;
  className?: string;
  /** fill colour the button switches to on hover */
  color?: "ink" | "accent";
}) {
  const ref = useRef<HTMLSpanElement>(null);

  // wire up the (shared) mask + colour, and take ownership of the transform.
  // The CSS rule ships `translateX(-101%)` for the pre-hydration frame; GSAP
  // would otherwise parse that into a pixel `x` and then stack its own
  // `xPercent` on top (-202%), so the sweep could never travel far enough to
  // become visible. Pinning `x`/`y` to 0 here makes `xPercent` the only
  // horizontal term from now on.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty(
      "--sweep-color",
      color === "accent" ? "var(--accent)" : "var(--ink)"
    );
    const url = ditherMask();
    el.style.webkitMaskImage = url;
    el.style.maskImage = url;
    gsap.set(el, { x: 0, y: 0, xPercent: -101, force3D: true });
  }, [color]);

  // slide on active change — one tween, same duration + ease both ways.
  // `x: 0` is repeated on every tween so a stray parsed value can't creep back.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.classList.contains("no-motion")) {
      gsap.set(el, { x: 0, xPercent: active ? 0 : -101 });
      return;
    }
    const tween = gsap.to(el, {
      x: 0,
      xPercent: active ? 0 : -101,
      duration: 0.5,
      ease: "power2.inOut",
      overwrite: "auto",
      force3D: true,
    });
    return () => {
      tween.kill();
    };
  }, [active]);

  return <span ref={ref} className={className} aria-hidden="true" />;
}
