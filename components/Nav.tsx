"use client";

import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useMagnetic } from "@/lib/useMagnetic";
import { NAV } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import TransLink from "./TransLink";
import PixelSweep from "./PixelSweep";

export default function Nav() {
  const joinRef = useMagnetic<HTMLAnchorElement>(0.2);
  const path = usePathname();

  return (
    <header className="topbar">
      <div className="topbar-in">
        <TransLink href="/" className="brand" data-cursor="Home">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            aria-hidden="true"
          >
            <path d="M16 3 4 9v14l12 6 12-6V9L16 3Z" />
            <path d="M4 9l12 6 12-6M16 15v14" />
          </svg>
          <b>
            Institute of Architects
            <br />
            of Zimbabwe
          </b>
        </TransLink>

        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => (
            <NavItem key={item.label} item={item} active={path === item.href} />
          ))}

          <div className="nav-item nav-keep">
            <ThemeToggle />
          </div>

          <NavJoin joinRef={joinRef} />
        </nav>
      </div>
    </header>
  );
}

function NavItem({
  item,
  active,
}: {
  item: (typeof NAV)[number];
  active: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`nav-item${item.sub ? " has" : ""}${active ? " is-active" : ""}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {/* the face clips the parked sweep; the dropdown lives outside it so it
          isn't clipped too */}
      <span className="nav-face">
        <PixelSweep active={active || hover} className="nav-pixels" />
        <TransLink href={item.href}>{item.label}</TransLink>
      </span>
      {item.sub && (
        <div className="nav-drop">
          {item.sub.map((s) => (
            <TransLink key={s.label} href={s.href}>
              {s.label}
            </TransLink>
          ))}
        </div>
      )}
    </div>
  );
}

function NavJoin({ joinRef }: { joinRef: React.Ref<HTMLAnchorElement> }) {
  const [hover, setHover] = useState(false);
  return (
    <TransLink
      innerRef={joinRef}
      href="/contact"
      className="nav-join nav-keep btn-fill btn-fill--brand"
      data-cursor="Apply"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <PixelSweep active={hover} color="accent" />
      <span className="btn-fill-label">
        <span className="btn-roll">
          <span>Join</span>
          <span aria-hidden="true">Join</span>
        </span>
      </span>
      <span className="btn-fill-icon" aria-hidden="true">
        <span className="btn-roll">
          <span>&rarr;</span>
          <span>&rarr;</span>
        </span>
      </span>
    </TransLink>
  );
}

function ThemeToggle() {
  const busy = useRef(false);

  const apply = (root: HTMLElement, next: string) => {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("iaz-theme", next);
    } catch {}
  };

  const toggle = () => {
    if (busy.current) return;
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";

    if (root.classList.contains("no-motion")) {
      apply(root, next);
      return;
    }

    busy.current = true;
    // a band sweeps across the viewport; the theme flips behind it at the
    // moment it covers, so you see the new palette arrive on a wipe
    const wipe = document.createElement("div");
    wipe.className = "theme-wipe";
    wipe.style.setProperty("--wipe", next === "dark" ? "#1a1a17" : "#f3f2ee");
    wipe.style.setProperty("--wipe-edge", next === "dark" ? "#ff5a2c" : "#fa3600");
    document.body.appendChild(wipe);

    // guards so a stalled ticker can't leave the theme half-applied or the
    // band stuck on screen
    let flipped = false;
    const flip = () => {
      if (flipped) return;
      flipped = true;
      apply(root, next);
    };
    let cleared = false;
    const clear = () => {
      if (cleared) return;
      cleared = true;
      wipe.remove();
      busy.current = false;
    };

    gsap
      .timeline({ onComplete: clear })
      .fromTo(
        wipe,
        { xPercent: -100 },
        { xPercent: 0, duration: 0.4, ease: "power3.inOut", onComplete: flip }
      )
      .to(wipe, { xPercent: 101, duration: 0.46, ease: "power3.inOut" }, ">-0.03");

    setTimeout(flip, 460);
    setTimeout(clear, 1100);
  };

  return (
    <button className="themebtn" type="button" onClick={toggle} aria-label="Toggle theme">
      Theme
    </button>
  );
}
