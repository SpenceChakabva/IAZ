"use client";

import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { runCover, curtainReady } from "@/lib/transition";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  innerRef?: React.Ref<HTMLAnchorElement>;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

/** Link that plays the curtain cover, then navigates — heronaiapp.com's Barba. */
const TransLink = forwardRef<HTMLAnchorElement, Props>(function TransLink(
  { href, children, className, innerRef, onClick, onPointerEnter, onFocus, ...rest },
  _ref
) {
  const router = useRouter();

  // pull the target route's chunk down as soon as the pointer/focus lands, so a
  // click has nothing left to wait on and the curtain never holds on a blank
  const warm = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    if (e.type === "pointerenter")
      onPointerEnter?.(e as React.PointerEvent<HTMLAnchorElement>);
    else onFocus?.(e as React.FocusEvent<HTMLAnchorElement>);
    if (href.startsWith("/")) router.prefetch(href.split("#")[0]);
  };

  const handle = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    )
      return;
    if (!href.startsWith("/")) return;
    e.preventDefault();
    const [path] = href.split("#");
    if (path === window.location.pathname) {
      if (href.includes("#"))
        document
          .querySelector(href.slice(href.indexOf("#")))
          ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (curtainReady()) await runCover();
    router.push(href);
  };

  return (
    <a
      ref={innerRef ?? _ref}
      href={href}
      className={className}
      onClick={handle}
      onPointerEnter={warm}
      onFocus={warm}
      {...rest}
    >
      {children}
    </a>
  );
});

export default TransLink;
