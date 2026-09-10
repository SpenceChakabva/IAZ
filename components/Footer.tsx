"use client";

import DrawSVG from "./DrawSVG";
import Reveal from "./Reveal";
import SubscribeForm from "./SubscribeForm";
import { INSTITUTE, COUNCIL } from "@/lib/content";

/** node cross-mark, as on a vector-editing / setting-out drawing */
function Node({ x, y }: { x: number; y: number }) {
  return (
    <g className="node" stroke="var(--ink-2)" strokeWidth={1}>
      <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
      <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
    </g>
  );
}

export default function Footer() {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="cols">
          <div>
            <h4>Institute &amp; Council</h4>
            {INSTITUTE.address.map((line) => (
              <p className="l" key={line}>
                {line}
              </p>
            ))}
            <a href={`mailto:${INSTITUTE.email}`}>{INSTITUTE.email}</a>
            <p className="l">{INSTITUTE.phone}</p>
            <SubscribeForm />
          </div>
          <div>
            <h4>Profession</h4>
            <a href="/register">Search the register</a>
            <a href="/register#act">The Architects Act</a>
            <a href="/education">Accredited programme &mdash; NUST</a>
            <a href="/news/professional-practice-examination-2026">
              Professional practice examination
            </a>
          </div>
          <div>
            <h4>Council 2026</h4>
            {COUNCIL.map((c) => (
              <p className="l" key={c.role}>
                {c.role} &mdash; {c.name}
              </p>
            ))}
          </div>
          <div>
            <h4>Since {INSTITUTE.founded}</h4>
            <p className="l">
              Founded as the {INSTITUTE.foundedAs}; the {INSTITUTE.act} protected
              the title &ldquo;Architect&rdquo;. Renamed the Institute of
              Architects of Zimbabwe in {INSTITUTE.renamed}.
            </p>
            <a href="/about" data-cursor="About">
              About &amp; council &rarr;
            </a>
          </div>
        </div>

        <DrawSVG className="letters" duration={2.4} stagger={0.015} start="top 92%">
          <svg
            viewBox="0 0 900 220"
            fill="none"
            stroke="var(--ink)"
            strokeWidth={1.2}
            aria-label="IAZ set out as a construction drawing"
          >
            {/* I */}
            <path className="draw" d="M40 30h120M40 190h120M100 30v160" />
            <Node x={40} y={30} />
            <Node x={160} y={30} />
            <Node x={100} y={190} />
            {/* A */}
            <path
              className="draw"
              d="M250 190 320 30 390 190M278 132h84"
            />
            <Node x={250} y={190} />
            <Node x={320} y={30} />
            <Node x={390} y={190} />
            <Node x={278} y={132} />
            {/* Z */}
            <path className="draw" d="M480 30h150L480 190h150" />
            <Node x={480} y={30} />
            <Node x={630} y={30} />
            <Node x={480} y={190} />
            <Node x={630} y={190} />
            {/* baseline + dimension ticks */}
            <line className="draw" x1="20" y1="205" x2="660" y2="205" stroke="var(--ink-3)" strokeWidth={0.7} />
            <g stroke="var(--ink-3)" strokeWidth={0.7}>
              <line className="draw" x1="40" y1="200" x2="40" y2="210" />
              <line className="draw" x1="340" y1="200" x2="340" y2="210" />
              <line className="draw" x1="660" y1="200" x2="660" y2="210" />
            </g>
            {/* isometric mark, mirrors Heron's cube-H */}
            <g transform="translate(720 40)" stroke="var(--ink)" strokeWidth={1.4}>
              <path className="draw" d="M70 10 130 44v70L70 148 10 114V44L70 10Z" />
              <path className="draw" d="M10 44l60 34 60-34M70 78v70" />
              <rect x="62" y="70" width="12" height="12" fill="var(--accent)" stroke="none" />
            </g>
          </svg>
        </DrawSVG>

        <Reveal>
          <div className="end">
            <span>
              &copy; {new Date().getFullYear()} Institute of Architects of Zimbabwe
            </span>
            <span>All rights reserved &middot; concept redesign</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
