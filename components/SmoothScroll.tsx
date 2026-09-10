"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("no-motion");
      return;
    }

    // lerp mode — a fixed catch-up fraction each frame reads smoother and more
    // even than a duration + easing curve, and never "snaps" on a fast flick.
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      syncTouch: true,
    });
    lenisRef.current = lenis;
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // one clock: GSAP drives Lenis, Lenis drives ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // every in-page anchor goes through Lenis — never scrollIntoView
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href*="#"]') as
        | HTMLAnchorElement
        | null;
      if (!a) return;
      const raw = a.getAttribute("href") || "";
      const hash = raw.includes("#") ? raw.slice(raw.indexOf("#")) : "";
      if (hash.length < 2) return;
      // only handle same-page anchors
      const path = raw.split("#")[0];
      if (path && path !== window.location.pathname) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -70 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
