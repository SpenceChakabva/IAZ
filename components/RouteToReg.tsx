"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";
import { ROUTE } from "@/lib/content";

/**
 * Pinned, scroll-scrubbed sequence — heronaiapp.com's `homeWhy` section.
 * The four stages light up in turn as the section is held in view; each
 * step's progress bar fills and its border pulses to the brand colour.
 */
export default function RouteToReg() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current!;
      const track = root.querySelector(".route-track") as HTMLElement;
      const steps = gsap.utils.toArray<HTMLElement>(".route .step");
      if (!track || document.documentElement.classList.contains("no-motion")) {
        steps.forEach((s) => {
          const bar = s.querySelector(".bar") as HTMLElement;
          if (bar) bar.style.transform = "scaleX(1)";
        });
        return;
      }

      gsap.set(steps, { opacity: 0.35, y: 14 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=" + steps.length * 320,
          pin: track,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      steps.forEach((s, i) => {
        const bar = s.querySelector(".bar");
        tl.to(s, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, i * 0.9)
          .to(bar, { scaleX: 1, duration: 0.8, ease: "none" }, i * 0.9);
        if (i > 0) {
          tl.to(steps[i - 1], { opacity: 0.5, duration: 0.4 }, i * 0.9);
        }
      });
    },
    { scope, dependencies: [] }
  );

  return (
    <section className="frame route-pin" id="route" aria-labelledby="route-h" ref={scope}>
      <span className="x tl" />
      <span className="x tr" />

      <div className="sec-head">
        <Reveal>
          <p className="eyebrow mono">Education &amp; careers</p>
        </Reveal>
        <SplitReveal as="h2" id="route-h">
          The route to registration
        </SplitReveal>
      </div>

      <div className="route route-track">
        {ROUTE.map((r) => (
          <div className="step" key={r.stage}>
            <span className="num mono">Stage {r.stage}</span>
            <h3>{r.title}</h3>
            <p>{r.body}</p>
            <span className="dur mono">{r.meta}</span>
            <span className="bar">
              <i />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
