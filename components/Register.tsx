"use client";

import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";
import { REGISTER_ROWS } from "@/lib/content";

const cls: Record<string, string> = {
  Registered: "ok",
  Candidate: "cand",
  "Non-practising": "np",
};

export default function Register() {
  return (
    <section className="frame" id="register" aria-labelledby="reg-h">
      <span className="x tl" />
      <span className="x tr" />
      <span className="x bl" />
      <span className="x br" />

      <div className="sec-head">
        <Reveal>
          <p className="eyebrow mono">The register</p>
        </Reveal>
        <SplitReveal as="h2" id="reg-h">
          Find a registered architect
        </SplitReveal>
        <Reveal i={1}>
          <p>Search by name, practice or town. Sample entries shown for layout.</p>
        </Reveal>
      </div>

      <div className="reg-grid">
        <Reveal className="reg-panel">
          <div className="reg-bar">
            <span className="f">Name, practice or town</span>
            <span className="f">Status: all</span>
            <span className="f" data-cursor="Search">
              Search &rarr;
            </span>
          </div>
          <table className="reg">
            <thead>
              <tr>
                <th>Name</th>
                <th>Practice</th>
                <th>PRN</th>
                <th>Town</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {REGISTER_ROWS.map((r) => (
                <tr key={r.prn}>
                  <td className="nm">{r.name}</td>
                  <td>{r.firm}</td>
                  <td className="prn">{r.prn}</td>
                  <td>{r.town}</td>
                  <td>
                    <span className={`pill ${cls[r.status]}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>

      <Reveal>
        <p className="reg-foot">
          Only a person on the register may call themselves an architect or take
          responsibility for architectural work in Zimbabwe. If a name does not
          appear, ask for the PRN and check again &mdash; or report misuse of the
          title to the ACZ.
        </p>
      </Reveal>
    </section>
  );
}
