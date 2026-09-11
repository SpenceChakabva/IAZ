"use client";

import { useRef, ElementType } from "react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
};

/**
 * Line-by-line headline reveal — each line rises out of an overflow mask.
 * This is heronaiapp.com's signature `homeProblemMaskDraw`/SplitText move.
 */
export default function SplitReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (document.documentElement.classList.contains("no-motion")) return;

      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
      });

      // phones: tighten the reveal a touch so it doesn't feel heavy
      const sm = window.matchMedia("(max-width: 700px)").matches;

      gsap.set(split.lines, { yPercent: 110 });
      gsap.to(split.lines, {
        yPercent: 0,
        duration: sm ? 0.7 : 0.9,
        ease: "expo.out",
        stagger: sm ? 0.06 : 0.09,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [] }
  );

  return (
    <Tag ref={ref as never} className={`disp split-lines ${className}`} id={id}>
      {children}
    </Tag>
  );
}
