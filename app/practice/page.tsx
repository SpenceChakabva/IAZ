import PageShell from "@/components/PageShell";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";
import { PRACTICE } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Working with an architect",
  description:
    "Why the register matters, how to select a registered architect, how to brief a practice, and when to hold a design competition.",
  path: "/practice",
});

export default function Practice() {
  return (
    <PageShell
      eyebrow="Practice — working with an architect"
      title="What a registered architect does for you"
      lead="Commissioning a building is a long relationship. These notes cover why the register matters, how to choose a practice, how to brief them, and when a competition is the right route."
      image={{
        src: "/img/studio.jpg",
        alt: "Interior of a naturally lit architecture studio",
        caption: "Fig. — practice, Harare",
      }}
    >
      <section className="frame">
        <span className="x tl" />
        <span className="x tr" />
        <div className="block-rows">
          {PRACTICE.map((b) => (
            <div className="block-row" id={b.id} key={b.id}>
              <Reveal>
                <span className="bi">.{b.index}</span>
              </Reveal>
              <div>
                <SplitReveal as="h3">{b.title}</SplitReveal>
                <Reveal i={1}>
                  <p>{b.body}</p>
                </Reveal>
                <Reveal i={2}>
                  <ul>
                    {b.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
