"use client";

import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";
import DrawSVG from "./DrawSVG";
import { INSTITUTE_DOES } from "@/lib/content";

const PANELS: React.ReactNode[] = [
  <svg key="1" viewBox="0 0 440 240" fill="none" stroke="var(--ink)" strokeWidth={1.1} aria-hidden="true">
    <rect className="draw" x="20" y="24" width="400" height="192" />
    <path className="draw" d="M20 62h400M126 62v154" />
    <g stroke="var(--line-2)">
      <path className="draw" d="M148 88h250M148 114h250M148 140h190M148 166h250M148 192h210" />
    </g>
    <g stroke="var(--ink-3)">
      <path className="draw" d="M42 88h64M42 114h64M42 140h64" />
    </g>
    <rect x="312" y="158" width="90" height="26" fill="var(--accent)" stroke="none" />
  </svg>,
  <svg key="2" viewBox="0 0 440 240" fill="none" stroke="var(--ink)" strokeWidth={1.1} aria-hidden="true">
    <rect className="draw" x="24" y="20" width="392" height="200" />
    <path className="draw" d="M24 52h392" />
    <g stroke="var(--line-2)">
      <rect className="draw" x="48" y="76" width="160" height="124" />
      <rect className="draw" x="232" y="76" width="160" height="56" />
      <rect className="draw" x="232" y="144" width="160" height="56" />
    </g>
    <path className="draw" d="M66 102h124M66 122h96M250 104h124M250 172h104" stroke="var(--ink-3)" />
    <rect x="48" y="76" width="160" height="10" fill="var(--accent)" stroke="none" />
  </svg>,
  <svg key="3" viewBox="0 0 440 240" fill="none" stroke="var(--ink)" strokeWidth={1.1} aria-hidden="true">
    <path className="draw" d="M40 204h360" />
    <path className="draw dash-flow" d="M72 204V92l64-32 126 42 96-22v126" stroke="var(--ink-2)" />
    <path className="draw" d="M62 156h20M62 124h20M62 92h20" stroke="var(--ink-3)" />
    <circle cx="136" cy="60" r="4" fill="var(--accent)" stroke="none" />
    <circle cx="262" cy="102" r="4" fill="var(--ink)" />
    <circle cx="358" cy="82" r="4" fill="var(--ink)" />
  </svg>,
];

export default function Institute() {
  return (
    <section className="does frame" id="institute" aria-labelledby="does-h">
      <span className="x tl" />
      <span className="x tr" />
      <span className="x bl" />
      <span className="x br" />

      <div className="sec-head">
        <Reveal>
          <p className="eyebrow mono">The Institute</p>
        </Reveal>
        <SplitReveal as="h2" id="does-h">
          What the IAZ does, in practice
        </SplitReveal>
      </div>

      <div className="does-rows">
        {INSTITUTE_DOES.map((d, i) => (
          <div className="row" key={d.index}>
            <DrawSVG className="panel" duration={1.6}>
              {PANELS[i]}
            </DrawSVG>
            <div className="meat">
              <Reveal>
                <span className="mono idx">[{d.index}]</span>
              </Reveal>
              <SplitReveal as="h3">{d.title}</SplitReveal>
              <Reveal i={1}>
                <p>{d.body}</p>
              </Reveal>
              <Reveal i={2}>
                <a className="learn" href={d.link.href} data-cursor="Open">
                  {d.link.label} <span className="ar">&rarr;</span>
                </a>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
