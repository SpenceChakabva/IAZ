"use client";

import { useId, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * heronaiapp.com's `.ink-mask` "ink-review" dissolve.
 *
 *   .ii-main  — the crisp, desaturated final image, always underneath.
 *   .ii-sub   — a smeared copy (feColorMatrix → feTurbulence → feDisplacementMap
 *               → blur → alpha-crush) masked by a rectangle with a wavy edge.
 *               The edge rises through the picture and the displacement resolves,
 *               then the layer is UNMOUNTED (SVG turbulence filters are costly to
 *               keep composited).
 *   .ii-hover  (opt-in) — a smeared copy masked by a <circle r=0> that grows from
 *               the pointer on enter and shrinks on leave. Mounted only while the
 *               pointer is inside.
 */
export default function InkImage({
  src,
  alt,
  ratio = "4 / 3",
  caption,
  className = "",
  start = 88,
  mode = "scroll",
  hover = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  caption?: string;
  className?: string;
  /** ScrollTrigger start, viewport-height % ("top {start}%") */
  start?: number;
  /** "scroll" plays on enter; "load" plays on mount (above-fold) */
  mode?: "scroll" | "load";
  /** add the pointer-driven dissolve-under-the-cursor layer */
  hover?: boolean;
}) {
  const scope = useRef<HTMLElement>(null);
  const maskP = useRef<SVGPathElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const hCircle = useRef<SVGCircleElement>(null);

  const [subDone, setSubDone] = useState(false);
  const [hovering, setHovering] = useState(false);

  const uid = useId().replace(/[:]/g, "");
  const fid = `ink-f-${uid}`;
  const mid = `ink-m-${uid}`;
  const hfid = `ink-hf-${uid}`;
  const hmid = `ink-hm-${uid}`;

  const W = 400;
  const H = 300;

  useGSAP(
    () => {
      const root = scope.current!;
      const noMo = document.documentElement.classList.contains("no-motion");
      if (noMo) {
        setSubDone(true);
        return;
      }

      /* ---- the wipe: only the mask edge + a gentle displacement ease-off ---- */
      const setEdge = (y: number) =>
        maskP.current?.setAttribute(
          "d",
          `M0,${y.toFixed(1)} Q${W / 2},${(y + 70).toFixed(1)} ${W},${y.toFixed(
            1
          )} L${W},${-H} L0,${-H} Z`
        );

      const s = { y: H + 50, scale: 34 };
      setEdge(s.y);
      disp.current?.setAttribute("scale", "34");
      const onUpdate = () => {
        setEdge(s.y);
        disp.current?.setAttribute("scale", s.scale.toFixed(1));
      };

      const play = () =>
        gsap.to(s, {
          y: -H - 30,
          scale: 0,
          duration: 1.15,
          ease: "power2.inOut",
          onUpdate,
          onComplete: () => setSubDone(true),
        });

      if (mode === "load") {
        gsap.delayedCall(0.55, play);
      } else {
        ScrollTrigger.create({
          trigger: root,
          start: `top ${start}%`,
          once: true,
          onEnter: play,
        });
      }
    },
    { scope, dependencies: [start, mode] }
  );

  /* ---- pointer-driven dissolve (mounted only while hovering) ---- */
  const hs = useRef({ r: 0 });
  const onEnter = (e: React.PointerEvent) => {
    if (
      !hover ||
      document.documentElement.classList.contains("no-motion") ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;
    setHovering(true);
    place(e);
    gsap.to(hs.current, {
      r: 150,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
      onUpdate: () => hCircle.current?.setAttribute("r", hs.current.r.toFixed(0)),
    });
  };
  const onLeave = () => {
    if (!hover) return;
    gsap.to(hs.current, {
      r: 0,
      duration: 0.5,
      ease: "power2.in",
      overwrite: true,
      onUpdate: () => hCircle.current?.setAttribute("r", hs.current.r.toFixed(0)),
      onComplete: () => setHovering(false),
    });
  };
  const place = (e: React.PointerEvent) => {
    const b = scope.current!.getBoundingClientRect();
    hCircle.current?.setAttribute("cx", (((e.clientX - b.left) / b.width) * W).toFixed(0));
    hCircle.current?.setAttribute("cy", (((e.clientY - b.top) / b.height) * H).toFixed(0));
  };

  return (
    <figure
      className={`ink-image ${className}`}
      ref={scope}
      style={{ aspectRatio: ratio }}
      data-cursor={hover ? "Inspect" : undefined}
      onPointerEnter={onEnter}
      onPointerMove={hovering ? place : undefined}
      onPointerLeave={onLeave}
    >
      <img className="ii-main" src={src} alt={alt} />

      {!subDone && (
        <svg
          className="ii-sub"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <filter id={fid} x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
              <feColorMatrix in="SourceGraphic" type="saturate" values="0" result="g" />
              <feTurbulence type="fractalNoise" baseFrequency="0.05 0.06" numOctaves="2" seed="5" result="n" />
              <feDisplacementMap ref={disp} in="g" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G" result="d" />
              <feGaussianBlur in="d" stdDeviation="1.2" />
            </filter>
            <mask id={mid}>
              <path ref={maskP} d="M0,350 Q200,420 400,350 L400,-300 L0,-300 Z" fill="#fff" />
            </mask>
          </defs>
          <image
            href={src}
            width="400"
            height="300"
            preserveAspectRatio="xMidYMid slice"
            filter={`url(#${fid})`}
            mask={`url(#${mid})`}
          />
        </svg>
      )}

      {hover && hovering && (
        <svg
          className="ii-hover"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <filter id={hfid} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
              <feColorMatrix in="SourceGraphic" type="saturate" values="0" result="g" />
              <feTurbulence type="fractalNoise" baseFrequency="0.03 0.05" numOctaves="2" seed="17" result="n" />
              <feDisplacementMap in="g" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G" result="d" />
              <feGaussianBlur in="d" stdDeviation="0.6" />
            </filter>
            <mask id={hmid}>
              <circle
                ref={hCircle}
                cx="200"
                cy="150"
                r="0"
                fill="#fff"
                style={{ filter: "blur(16px)" }}
              />
            </mask>
          </defs>
          <image
            href={src}
            width="400"
            height="300"
            preserveAspectRatio="xMidYMid slice"
            filter={`url(#${hfid})`}
            mask={`url(#${hmid})`}
          />
        </svg>
      )}

      {caption && <figcaption className="mono">{caption}</figcaption>}
    </figure>
  );
}
