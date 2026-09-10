"use client";

import { gsap } from "@/lib/gsap";

let busy = false;

/**
 * Flip light ⇄ dark. A band sweeps the viewport and the palette changes
 * behind it; guards apply the theme and clear the band even if the ticker
 * stalls. Shared by the desktop toggle and the mobile menu.
 */
export function toggleTheme() {
  if (busy) return;
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";

  const apply = () => {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("iaz-theme", next);
    } catch {}
  };

  if (root.classList.contains("no-motion")) {
    apply();
    return;
  }

  busy = true;
  const wipe = document.createElement("div");
  wipe.className = "theme-wipe";
  wipe.style.setProperty("--wipe", next === "dark" ? "#1a1a17" : "#f3f2ee");
  wipe.style.setProperty("--wipe-edge", next === "dark" ? "#ff5a2c" : "#fa3600");
  document.body.appendChild(wipe);

  let flipped = false;
  const flip = () => {
    if (flipped) return;
    flipped = true;
    apply();
  };
  let cleared = false;
  const clear = () => {
    if (cleared) return;
    cleared = true;
    wipe.remove();
    busy = false;
  };

  gsap
    .timeline({ onComplete: clear })
    .fromTo(
      wipe,
      { xPercent: -100 },
      { xPercent: 0, duration: 0.4, ease: "power3.inOut", onComplete: flip }
    )
    .to(wipe, { xPercent: 101, duration: 0.46, ease: "power3.inOut" }, ">-0.03");

  setTimeout(flip, 460);
  setTimeout(clear, 1100);
}
