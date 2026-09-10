"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { registerCover, consumePending } from "@/lib/transition";

/**
 * heronaiapp.com's Barba transition, "melt into the footer" variant.
 *
 *  · leaving  — an ink curtain rises from the bottom, curved edge leading up,
 *               and the page sinks under it.
 *  · arriving — the curtain melts back DOWNWARD out of view (curved edge
 *               trailing at the top) while it blurs and fades, and the new
 *               page's [data-enter] elements rise up from under it — the two
 *               overlap so the page reads as dissolving out of the dark.
 */
export default function Transition() {
  const el = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    const c = el.current!;
    const noMo = document.documentElement.classList.contains("no-motion");
    gsap.set(c, { yPercent: noMo ? 240 : 118, filter: "blur(0px)", opacity: 1 });
    registerCover(async () => {
      if (noMo) return;
      // front-loaded ease so the screen is dark early; awaited so the route
      // never renders before the curtain has covered it — but capped, so a
      // stalled ticker can never leave navigation hanging
      gsap.to(c, { yPercent: 0, duration: 0.26, ease: "power2.out" });
      await new Promise((r) => setTimeout(r, 270));
    });
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const c = el.current!;
    if (document.documentElement.classList.contains("no-motion")) return;
    window.scrollTo(0, 0);
    if (!consumePending()) return;

    // keep the curtain covering until the incoming route has actually painted a
    // frame — otherwise it lifts to reveal a blank, then everything pops in.
    gsap.set(c, { yPercent: 0, filter: "blur(0px)", opacity: 1 });

    let ran = false;
    const go = () => {
      if (ran) return;
      ran = true;
      reveal();
    };
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(go);
    });
    // fallback so the curtain always lifts even if rAF is starved
    const timer = setTimeout(go, 120);

    function reveal() {
      // one continuous move — the curtain slides off while the new page is
      // already rising under it, so the two overlap instead of a hold + pop
      gsap
        .timeline()
        .to(c, { yPercent: 118, duration: 0.46, ease: "power2.inOut" }, 0)
        .to(c, { filter: "blur(3px)", duration: 0.12, ease: "sine.out" }, 0)
        .to(c, { filter: "blur(0px)", duration: 0.22, ease: "sine.in" }, 0.14)
        .set(c, { filter: "blur(0px)", opacity: 1 });

      const main = document.querySelector("main");
      if (main) {
        gsap.from(main, {
          y: 18,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "transform",
        });
      }
      const enters = document.querySelectorAll("[data-enter]");
      if (enters.length) {
        gsap.from(enters, {
          yPercent: 30,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.045,
          delay: 0.05,
        });
      }
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <div className="page-curtain" ref={el} aria-hidden="true">
      <svg preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0,0 Q50,15 100,0 L100,100 L0,100 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
