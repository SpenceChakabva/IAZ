"use client";

import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";
import DrawSVG from "./DrawSVG";
import { STAKES } from "@/lib/content";

const SHAPES: Record<string, React.ReactNode> = {
  cube: (
    <>
      <path className="draw" d="M60 20 100 42v40L60 104 20 82V42L60 20Z" />
      <path className="draw dash-flow" d="M20 42l40 22 40-22M60 64v40" />
      <path className="draw" d="M60 44v-24" />
    </>
  ),
  sphere: (
    <>
      <circle className="draw" cx="60" cy="46" r="16" />
      <path className="draw dash-flow" d="M60 62v22M28 102l32-16 32 16" />
      <path className="draw" d="M28 102v-6M92 102v-6" />
    </>
  ),
  slab: (
    <>
      <path className="draw" d="M30 42h60v46H30zM30 42l10-12h60l-10 12M90 42l10-12v46l-10 12" />
      <path className="draw dash-flow" d="M44 60h32M44 74h20" />
    </>
  ),
  prism: (
    <>
      <path className="draw" d="M60 22 96 42v18L60 80 24 60V42L60 22Z" />
      <path className="draw dash-flow" d="M60 80v22M24 60v20l36 20 36-20V60" />
    </>
  ),
};

export default function Stakes() {
  return (
    <section className="frame" id="stakes" aria-labelledby="stakes-h">
      <span className="x tl" />
      <span className="x tr" />
      <span className="x bl" />
      <span className="x br" />

      <div className="sec-head">
        <Reveal>
          <p className="eyebrow mono">What&#39;s at stake</p>
        </Reveal>
        <SplitReveal as="h2" id="stakes-h">
          Anyone can use the title until someone checks
        </SplitReveal>
        <Reveal i={1}>
          <p>
            The register is the only reliable way to know a person is qualified,
            insured and accountable. Without it, four things go wrong.
          </p>
        </Reveal>
      </div>

      <div className="stakes">
        {STAKES.map((s, i) => (
          <Reveal
            as="article"
            className="cell"
            key={s.index}
            i={i}
            amount={0.15}
          >
            <DrawSVG
              className="iso"
              settleDash="3 3"
              duration={0.8}
              stagger={0.05}
              start="top 90%"
            >
              <svg
                viewBox="0 0 120 120"
                fill="none"
                stroke="var(--ink-2)"
                strokeWidth={1.4}
                aria-hidden="true"
              >
                {SHAPES[s.shape]}
              </svg>
            </DrawSVG>
            <div className="body">
              <div className="kv mono">
                <span>{s.kicker}</span>
                <span>[{s.index}]</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
