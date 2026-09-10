"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Loader() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const el = root.current!;
    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });
    tl.to(bar.current!, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, 0)
      .to(
        obj,
        {
          v: 100,
          duration: 0.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current)
              count.current.textContent = String(Math.round(obj.v)).padStart(3, "0");
          },
        },
        0
      )
      .to(el, { yPercent: -100, duration: 0.42, ease: "expo.inOut" }, ">+0.08");
    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div className="loader" ref={root}>
      <div className="loader-inner">
        <svg
          className="loader-mark"
          viewBox="0 0 32 32"
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.4}
          aria-hidden="true"
        >
          <path d="M16 3 4 9v14l12 6 12-6V9L16 3Z" />
          <path d="M4 9l12 6 12-6M16 15v14" />
        </svg>
        <div className="loader-count mono">
          <span ref={count}>000</span> — Institute of Architects of Zimbabwe
        </div>
        <div className="loader-bar">
          <span ref={bar} />
        </div>
      </div>
    </div>
  );
}
