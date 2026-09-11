"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMagnetic } from "@/lib/useMagnetic";
import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";
import { INSTITUTE } from "@/lib/content";

export default function Hero() {
  const scope = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const discRef = useMagnetic<HTMLAnchorElement>(0.15);

  useGSAP(
    () => {
      const root = scope.current!;
      if (document.documentElement.classList.contains("no-motion")) {
        root.querySelectorAll<SVGElement>(".draw").forEach((p) => {
          p.style.strokeDasharray = "none";
          p.style.strokeDashoffset = "0";
        });
        gsap.set(root.querySelectorAll(".hero-deco"), { opacity: 1 });
        return;
      }

      // draw the elevation on load
      const paths = root.querySelectorAll<SVGGeometryElement>(".draw");
      paths.forEach((p) => {
        const len = p.getTotalLength ? p.getTotalLength() : 800;
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
      });
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        stagger: 0.02,
      }).from(
        root.querySelectorAll(".hero-deco"),
        { opacity: 0, scale: 0, transformOrigin: "center", duration: 0.5, stagger: 0.1 },
        "-=0.4"
      );

      // pulse the accent squares
      gsap.to(root.querySelectorAll(".hero-deco"), {
        opacity: 0.35,
        duration: 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // parallax the whole drawing to the pointer (data-control x/y)
      const svg = svgRef.current!;
      const xTo = gsap.quickTo(svg, "x", { duration: 0.9, ease: "power3.out" });
      const yTo = gsap.quickTo(svg, "y", { duration: 0.9, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        const cx = (e.clientX / window.innerWidth - 0.5) * 2;
        const cy = (e.clientY / window.innerHeight - 0.5) * 2;
        xTo(cx * 14);
        yTo(cy * 10);
      };
      window.addEventListener("pointermove", onMove);

      // scrub the drawing up a little as you scroll past
      gsap.to(svg, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope, dependencies: [] }
  );

  return (
    <section className="hero frame" id="top" ref={scope} aria-labelledby="h1">
      <span className="x tl" />
      <span className="x tr" />
      <span className="x bl" />
      <span className="x br" />

      <div className="hero-canvas">
        <svg
          ref={svgRef}
          className="elevation"
          viewBox="0 0 980 470"
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.3}
          strokeLinejoin="round"
          aria-label="Line drawing of a building elevation: a masonry civic wing with an entrance, a tall glazed tower, and a cantilevered wing, set between two bare trees"
        >
          <line className="draw" x1="40" y1="438" x2="940" y2="438" />

          {/* civic wing — masonry, flat coped parapet, recessed entrance */}
          <path className="draw" d="M200 438V252H370V438" />
          <path className="draw" d="M194 252H376" />
          <path className="draw" d="M200 260H370" />
          <path className="draw" d="M216 280h30v36h-30zM270 280h30v36h-30zM324 280h30v36h-30zM216 328h30v34h-30zM270 328h30v34h-30zM324 328h30v34h-30z" />
          <g stroke="var(--ink-3)" strokeWidth={0.6}>
            <path className="draw" d="M252 288l12-12M252 300l12-12M252 312l12-12" />
          </g>
          <path className="draw" d="M254 438V392H290V438" />
          <path className="draw" d="M240 378H304M248 378V392M296 378V392" />

          {/* glazed tower — tallest, roof plane receding for depth */}
          <path className="draw" d="M410 438V100H610V438" />
          <path className="draw" d="M410 100l30-26h200l-30 26" />
          <path className="draw" d="M610 100l30-26v338l-30 26" />
          <g strokeWidth={0.9}>
            <path className="draw" d="M410 160h200M410 220h200M410 280h200M410 340h200M410 400h200" />
            <path className="draw" d="M460 100v338M510 100v338M560 100v338" />
          </g>

          {/* dimension / level line, set in the gap ahead of the tower */}
          <g stroke="var(--ink-3)" strokeWidth={0.6}>
            <path className="draw" d="M393 100V438M387 100h12M387 438h12" />
          </g>

          {/* cantilevered wing */}
          <path className="draw" d="M660 438V234H830V438" />
          <path className="draw" d="M830 234l14-12v204l-14 12" />
          <path className="draw" d="M678 280h134v54h-134z" />
          <path className="draw" d="M760 234v-40h140v40" />
          <path className="draw" d="M830 234h70" />
          <path className="draw" d="M776 204h30v20h-30zM846 204h30v20h-30z" />
          <g stroke="var(--ink-3)" strokeWidth={0.6}>
            <path className="draw" d="M650 438v-7" />
          </g>

          {/* steps up to plaza level */}
          <path className="draw" d="M110 438v-12h20v-12h20v-12h20v-12h20" />

          {/* bare trees, flanking the composition */}
          <g strokeWidth={1}>
            <path className="draw" d="M75 438V300M75 350l-22-18M75 330l24-20M75 370l-20-16M75 310l16-14" />
          </g>
          <g stroke="var(--ink-2)" strokeWidth={0.9}>
            <path className="draw" d="M905 438V310M905 360l24-18M905 340l-20-16M905 380l22-16M905 320l-16-14" />
          </g>

          {/* surveyed-point node marks */}
          <g className="hero-deco" stroke="var(--ink-3)" strokeWidth={0.8}>
            <line x1="406" y1="438" x2="414" y2="438" />
            <line x1="410" y1="434" x2="410" y2="442" />
          </g>
          <g className="hero-deco" stroke="var(--ink-3)" strokeWidth={0.8}>
            <line x1="826" y1="438" x2="834" y2="438" />
            <line x1="830" y1="434" x2="830" y2="442" />
          </g>

          {/* accent squares */}
          <rect className="hero-deco" x="470" y="408" width="12" height="12" />
          <rect className="hero-deco" x="780" y="300" width="12" height="12" />
        </svg>
      </div>

      <div className="hero-foot">
        <div className="hero-title">
          <p className="eyebrow mono" style={{ marginBottom: "1.1rem" }}>
            Sheet A&#8209;001 &mdash; Est. {INSTITUTE.founded}
          </p>
          <SplitReveal as="h1" id="h1">
            The professional body for architects in Zimbabwe
          </SplitReveal>
        </div>
        <div className="hero-note">
          <Reveal as="p">
            The IAZ keeps the register of persons entitled to practise, upholds
            the standard of qualification, and speaks for the built environment.
            It works alongside the Architects Council of Zimbabwe.
          </Reveal>
          <Reveal i={1}>
            <a className="disc" href="#institute" ref={discRef} data-cursor="Read">
              Discover more <span aria-hidden="true">&rarr;</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
