"use client";

import { useState } from "react";
import { useMagnetic } from "@/lib/useMagnetic";
import PixelSweep from "./PixelSweep";
import TransLink from "./TransLink";

type Props = {
  children: string;
  href?: string;
  submit?: boolean;
  variant?: "line" | "fill";
  arrow?: boolean;
  className?: string;
  cursor?: string;
  magnetic?: number;
  pixels?: boolean;
  onClick?: () => void;
};

/**
 * Exact heronaiapp.com `.btn-fill`:
 *  · label is two stacked copies clipped by overflow:hidden — on hover the top
 *    rolls to -100%, the bottom (pre-offset +100%) rolls to 0, on
 *    `transform .48s cubic-bezier(.625,.05,0,1)`; the arrow rolls the same way.
 *  · a background layer wipes up behind, or (pixels) a canvas mosaic dithers in.
 */
export default function Button({
  children,
  href,
  submit = false,
  variant = "line",
  arrow = true,
  className = "",
  cursor = "",
  magnetic = 0.18,
  pixels = true,
  onClick,
}: Props) {
  const ref = useMagnetic<HTMLAnchorElement>(magnetic);
  const btnRef = useMagnetic<HTMLButtonElement>(magnetic);
  const [hover, setHover] = useState(false);
  const internal = !!href && href.startsWith("/");
  // the deliberate red CTA keeps its vermilion fill; every other button fills ink
  const brand = className.includes("btn-fill--brand");

  const inner = (
    <>
      {pixels ? (
        <PixelSweep active={hover} color={brand ? "accent" : "ink"} />
      ) : (
        <span className="btn-fill-bg" aria-hidden="true" />
      )}
      <span className="btn-fill-label">
        <span className="btn-roll">
          <span>{children}</span>
          <span aria-hidden="true">{children}</span>
        </span>
      </span>
      {arrow && (
        <span className="btn-fill-icon" aria-hidden="true">
          <span className="btn-roll">
            <span>&rarr;</span>
            <span>&rarr;</span>
          </span>
        </span>
      )}
    </>
  );

  const cls = `btn-fill btn-fill--${variant} ${className}`;
  const handlers = {
    onPointerEnter: () => setHover(true),
    onPointerLeave: () => setHover(false),
    onFocus: () => setHover(true),
    onBlur: () => setHover(false),
    "data-cursor": cursor || undefined,
  };

  if (submit || !href) {
    return (
      <button
        ref={btnRef}
        type={submit ? "submit" : "button"}
        className={cls}
        onClick={onClick}
        {...handlers}
      >
        {inner}
      </button>
    );
  }

  if (internal) {
    return (
      <TransLink href={href} className={cls} innerRef={ref} {...handlers}>
        {inner}
      </TransLink>
    );
  }
  return (
    <a ref={ref} href={href} className={cls} {...handlers}>
      {inner}
    </a>
  );
}
