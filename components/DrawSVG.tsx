"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** seconds per path */
  duration?: number;
  stagger?: number;
  start?: string;
  /**
   * If set, every `.draw` shape is restored to this stroke-dasharray once it has
   * finished drawing on (so a dashed blueprint shape ends up dashed, not solid).
   */
  settleDash?: string;
};

/**
 * Wraps an <svg>. Every path/line/rect/circle with class "draw" is measured and
 * drawn on with stroke-dashoffset as it scrolls into view — heronaiapp.com's
 * `homeProblemDraw`. When done, the wrapper gets `.is-drawn` (starts any
 * `.dash-flow` marching ants) and, with `settleDash`, the strokes go back to
 * their dashed pattern.
 */
export default function DrawSVG({
  children,
  className = "",
  duration = 1.1,
  stagger = 0.06,
  start = "top 88%",
  settleDash,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const shapes = Array.from(
        root.querySelectorAll<SVGGeometryElement>(".draw")
      );
      if (!shapes.length) return;

      const settle = () => {
        root.classList.add("is-drawn");
        shapes.forEach((s) => {
          // dashed shapes (or all, when settleDash is given) go back to a
          // small repeating dash so they read as a blueprint, not a solid line
          if (settleDash || s.classList.contains("dash-flow")) {
            s.style.strokeDasharray = settleDash || "3 3";
            s.style.strokeDashoffset = "0";
          }
        });
      };

      if (document.documentElement.classList.contains("no-motion")) {
        shapes.forEach((s) => {
          s.style.strokeDasharray = settleDash || "none";
          s.style.strokeDashoffset = "0";
        });
        root.classList.add("is-drawn");
        return;
      }

      shapes.forEach((s) => {
        const len = s.getTotalLength ? s.getTotalLength() : 1000;
        s.style.strokeDasharray = `${len}`;
        s.style.strokeDashoffset = `${len}`;
        s.style.setProperty("--len", String(len));
      });

      gsap.to(shapes, {
        strokeDashoffset: 0,
        duration,
        ease: "power2.inOut",
        stagger,
        scrollTrigger: { trigger: root, start, once: true },
        onComplete: settle,
      });

      const nodes = root.querySelectorAll(".node");
      if (nodes.length) {
        gsap.to(nodes, {
          opacity: 1,
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: { trigger: root, start, once: true },
        });
      }
    },
    { scope: ref, dependencies: [settleDash] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
