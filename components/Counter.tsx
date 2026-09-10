"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Counter({
  to,
  className,
  duration = 1.8,
}: {
  to: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (document.documentElement.classList.contains("no-motion")) {
        el.textContent = String(to);
        return;
      }
      const obj = { v: 0 };
      gsap.to(obj, {
        v: to,
        duration,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    },
    { scope: ref, dependencies: [to] }
  );

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
