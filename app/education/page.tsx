import PageShell from "@/components/PageShell";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";
import { ROUTE, EDU_ENTRY, EDU_CURRICULUM } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Education & careers",
  description:
    "Becoming an architect in Zimbabwe: the accredited programme at NUST in Bulawayo, entry requirements, the curriculum, supervised practice and the professional practice examination.",
  path: "/education",
});

export default function Education() {
  return (
    <PageShell
      eyebrow="Education & careers"
      title="Becoming an architect in Zimbabwe"
      lead="There is one school of architecture in Zimbabwe — the Faculty of the Built Environment at the National University of Science and Technology in Bulawayo. From there the route to registration runs through recorded practice and the professional practice examination."
      image={{
        src: "/img/concrete.jpg",
        alt: "Board-marked concrete facade in raking light",
        caption: "Fig. — studio wing, NUST",
      }}
    >
      <section className="frame">
        <span className="x tl" />
        <span className="x tr" />
        <div className="sec-head">
          <Reveal>
            <p className="eyebrow mono">The route</p>
          </Reveal>
          <SplitReveal as="h2">Four stages to the title</SplitReveal>
        </div>
        <div className="block-rows">
          {ROUTE.map((r) => (
            <div className="block-row" key={r.stage}>
              <Reveal>
                <span className="bi">{r.stage}</span>
              </Reveal>
              <div>
                <SplitReveal as="h3">{r.title}</SplitReveal>
                <Reveal i={1}>
                  <p>{r.body}</p>
                </Reveal>
                <Reveal i={2}>
                  <p className="mono" style={{ color: "var(--ink-3)", marginTop: "0.6rem" }}>
                    {r.meta}
                  </p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="frame">
        <span className="x tl" />
        <span className="x tr" />
        <div className="mem">
          <div className="who">
            <div className="sec-head" style={{ border: 0 }}>
              <Reveal>
                <p className="eyebrow mono">Entry to NUST</p>
              </Reveal>
              <SplitReveal as="h2">What you need to apply</SplitReveal>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {EDU_ENTRY.map((e, i) => (
                <li
                  key={e}
                  style={{
                    padding: "1rem var(--gutter)",
                    borderTop: "1px solid var(--line)",
                    color: "var(--ink-2)",
                  }}
                >
                  <Reveal i={i}>
                    <span>{e}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <div className="fees">
            <div className="sec-head" style={{ border: 0, paddingLeft: 0, paddingRight: 0 }}>
              <Reveal>
                <p className="eyebrow mono">The five years</p>
              </Reveal>
              <SplitReveal as="h2">What you study</SplitReveal>
            </div>
            {EDU_CURRICULUM.map((c, i) => (
              <Reveal className="frow" key={c} i={i}>
                <span>{c}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
