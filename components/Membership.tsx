"use client";

import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";
import { MEMBERS, FEES } from "@/lib/content";

export default function Membership() {
  return (
    <section className="frame" id="membership" aria-labelledby="mem-h">
      <span className="x tl" />
      <span className="x tr" />
      <span className="x bl" />
      <span className="x br" />

      <div className="sec-head">
        <Reveal>
          <p className="eyebrow mono">Membership</p>
        </Reveal>
        <SplitReveal as="h2" id="mem-h">
          Who the IAZ is for
        </SplitReveal>
      </div>

      <div className="mem">
        <div className="who">
          <ul>
            {MEMBERS.map((m, i) => (
              <li key={m}>
                <SplitReveal as="span" delay={i * 0.03}>
                  {m}
                </SplitReveal>
              </li>
            ))}
          </ul>
        </div>
        <div className="fees">
          {FEES.map((f, i) => (
            <Reveal className="frow" key={f.label} i={i}>
              <span>{f.label}</span>
              <span>{f.value}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
