"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMagnetic } from "@/lib/useMagnetic";
import { NAV } from "@/lib/content";
import { toggleTheme } from "@/lib/theme";
import TransLink from "./TransLink";
import PixelSweep from "./PixelSweep";

export default function Nav() {
  const joinRef = useMagnetic<HTMLAnchorElement>(0.2);
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [hidden, setHidden] = useState(false);

  // close the mobile menu + bring the bar back whenever the route changes
  useEffect(() => {
    setMenu(false);
    setHidden(false);
  }, [path]);

  // never leave the bar tucked away while the menu is open (its own toggle
  // lives inside it)
  useEffect(() => {
    if (menu) setHidden(false);
  }, [menu]);

  // tuck the bar away on scroll-down, bring it straight back on scroll-up —
  // always visible near the top regardless of direction
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (menu) return;
      if (y < 72) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menu]);

  // lock scroll + allow Escape while the menu is open
  useEffect(() => {
    const root = document.documentElement;
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } })
      .__lenis;
    if (menu) {
      root.classList.add("menu-open");
      lenis?.stop();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
      };
    }
    root.classList.remove("menu-open");
    lenis?.start();
  }, [menu]);

  return (
    <>
    <header className={`topbar${hidden ? " is-hidden" : ""}`}>
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
            <button
              className="themebtn"
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle light or dark theme"
            >
              Theme
            </button>
          </div>

          <NavJoin joinRef={joinRef} />

          <button
            type="button"
            className={`nav-burger${menu ? " is-open" : ""}`}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-nav"
            onClick={() => setMenu((m) => !m)}
          >
            <span />
            <span />
          </button>
        </nav>
      </div>
    </header>

    <MobileNav open={menu} path={path} onClose={() => setMenu(false)} />
    </>
  );
}

function MobileNav({
  open,
  path,
  onClose,
}: {
  open: boolean;
  path: string;
  onClose: () => void;
}) {
  // accordion — one sub-list open at a time; collapse everything when the
  // menu closes so it always reopens in the compact state
  const [openSub, setOpenSub] = useState<string | null>(null);
  useEffect(() => {
    if (!open) setOpenSub(null);
  }, [open]);

  return (
    <div
      id="mobile-nav"
      className={`mobile-nav${open ? " is-open" : ""}`}
      aria-hidden={!open}
    >
      <nav aria-label="Primary mobile">
        {NAV.map((item, i) => {
          const expanded = openSub === item.label;
          return (
            <div
              className={`m-item${path === item.href ? " is-active" : ""}${
                expanded ? " is-expanded" : ""
              }`}
              key={item.label}
            >
              <div className="m-row">
                <TransLink href={item.href} onClick={onClose}>
                  <span className="m-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </TransLink>
                {item.sub && (
                  <button
                    type="button"
                    className="m-toggle"
                    aria-expanded={expanded}
                    aria-controls={`m-sub-${item.label}`}
                    aria-label={`${expanded ? "Collapse" : "Expand"} ${
                      item.label
                    } links`}
                    onClick={() =>
                      setOpenSub((cur) => (cur === item.label ? null : item.label))
                    }
                  >
                    <span className="m-toggle-icon" aria-hidden="true" />
                  </button>
                )}
              </div>
              {item.sub && (
                <div
                  className="m-sub"
                  id={`m-sub-${item.label}`}
                  inert={!expanded}
                >
                  <div className="m-sub-in">
                    {item.sub.map((s) => (
                      <TransLink key={s.label} href={s.href} onClick={onClose}>
                        {s.label}
                      </TransLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="m-foot">
        <button
          type="button"
          className="m-theme"
          onClick={toggleTheme}
          aria-label="Toggle light or dark theme"
        >
          Switch theme
        </button>
        <TransLink href="/contact" className="m-join" onClick={onClose}>
          Join the Institute <span aria-hidden="true">&rarr;</span>
        </TransLink>
      </div>
    </div>
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
