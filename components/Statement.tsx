"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import WordFill from "./WordFill";
import Reveal from "./Reveal";
import { INSTITUTE } from "@/lib/content";

/**
 * Grey all-caps statement with one phrase pulled to full ink,
 * beside an "ink mask" drawing reveal — the wavy quadratic sweep
 * from heronaiapp.com (`M 0 1000 Q 500 1250 1000 1000 ...`).
 */
export default function Statement() {
  const scope = useRef<HTMLElement>(null);
  const mask = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const root = scope.current!;
      const noMotion = document.documentElement.classList.contains("no-motion");

      const paths = root.querySelectorAll<SVGGeometryElement>(".plate-draw .draw");
      paths.forEach((p) => {
        const len = p.getTotalLength ? p.getTotalLength() : 800;
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = noMotion ? "0" : String(len);
      });

      if (noMotion) {
        if (mask.current) mask.current.setAttribute("transform", "translate(0,0)");
        return;
      }

      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: "power2.inOut",
        stagger: 0.05,
        scrollTrigger: { trigger: root, start: "top 78%" },
      });

      // Attr-scrub on an SVG transform is jittery on mobile GPUs — on touch,
      // run the same mask sweep once as a plain tween instead of a scrub.
      const lite = window.matchMedia("(pointer: coarse)").matches;

      gsap.fromTo(
        mask.current,
        { attr: { transform: "translate(0,420)" } },
        lite
          ? {
              attr: { transform: "translate(0,0)" },
              duration: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: root, start: "top 75%", once: true },
            }
          : {
              attr: { transform: "translate(0,0)" },
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top 80%",
                end: "top 30%",
                scrub: 0.6,
              },
            }
      );
    },
    { scope, dependencies: [] }
  );

  return (
    <section className="statement frame" ref={scope}>
      <span className="x tl" />
      <span className="x tr" />
      <span className="x bl" />
      <span className="x br" />

      <div className="plate">
        <svg
          className="mask-target plate-draw"
          viewBox="0 0 400 380"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.1}
          aria-hidden="true"
        >
          <defs>
            <mask id="ink-mask">
              <path
                ref={mask}
                d="M0,380 Q200,430 400,380 L400,-60 L0,-60 Z"
                fill="#fff"
                transform="translate(0,420)"
              />
            </mask>
          </defs>
          <g mask="url(#ink-mask)">
            <line className="draw" x1="20" y1="352" x2="380" y2="352" />
            <path className="draw" d="M110 352V70h180v282" />
            <path className="draw" d="M110 70l28-22h180l-28 22" />
            <path className="draw" d="M290 70l28-22v282l-28 22" />
            <path className="draw" d="M110 118h180M110 166h180M110 214h180M110 262h180M110 310h180" strokeWidth={0.8} />
            <path className="draw" d="M155 70v282M200 70v282M245 70v282" strokeWidth={0.8} />
            <rect x="230" y="262" width="12" height="12" fill="var(--accent)" stroke="none" />
          </g>
        </svg>
      </div>

      <div className="say">
        <WordFill as="p">
          Since {INSTITUTE.founded} the IAZ has held the register, set the{" "}
          <b>standard of qualification</b>, and represented architects to
          government, industry and the courts.
        </WordFill>
        <Reveal i={1}>
          <a className="learn" href="#institute" data-cursor="More">
            Learn more <span className="ar">&rarr;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
