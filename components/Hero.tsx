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
          aria-label="Line drawing of a civic building elevation with bare trees"
        >
          <line className="draw" x1="40" y1="438" x2="940" y2="438" />
          {/* left block */}
          <path className="draw" d="M170 438V236h160v202" />
          <path className="draw" d="M170 236l26-22h160l-26 22" />
          <path className="draw" d="M330 236l26-22v202l-26 22" />
          <path className="draw" d="M192 262h54v36h-54zM266 262h48v36h-48zM192 324h54v42h-54zM266 324h48v42h-48z" />
          <g stroke="var(--ink-3)" strokeWidth={0.7}>
            <path className="draw" d="M170 236l10 8M192 236l10 8M214 236l10 8M236 236l10 8M258 236l10 8M280 236l10 8M302 236l10 8M324 236l10 8" />
          </g>
          {/* central glazed volume */}
          <path className="draw" d="M400 438V120h180v318" />
          <path className="draw" d="M400 120l32-28h180l-32 28" />
          <path className="draw" d="M580 120l32-28v318l-32 28" />
          <g strokeWidth={0.9}>
            <path className="draw" d="M400 180h180M400 240h180M400 300h180M400 360h180M400 414h180" />
            <path className="draw" d="M445 120v318M490 120v318M535 120v318" />
          </g>
          {/* right block + cantilever */}
          <path className="draw" d="M640 438V214h160v224" />
          <path className="draw" d="M640 214l26-22h160l-26 22" />
          <path className="draw" d="M800 214l26-22v224l-26 22" />
          <path className="draw" d="M770 214v-36h130v36" />
          <path className="draw" d="M662 244h48v32h-48zM726 244h54v32h-54zM662 304h48v50h-48zM726 304h54v50h-54z" />
          {/* steps */}
          <path className="draw" d="M62 438v-12h28v-12h28v-12h28v-12h28" />
          {/* bare trees */}
          <g strokeWidth={1}>
            <path className="draw" d="M118 438V300M118 342l-24-28M118 358l26-30M118 320l-18-22M118 376l20-22" />
            <path className="draw" d="M868 438V314M868 350l22-26M868 362l-20-24M868 332l16-18M868 380l-18-20" stroke="var(--ink-2)" strokeWidth={0.9} />
          </g>
          {/* accent squares */}
          <rect className="hero-deco" x="342" y="296" width="12" height="12" />
          <rect className="hero-deco" x="712" y="304" width="12" height="12" />
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
