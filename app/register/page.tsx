import PageShell from "@/components/PageShell";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";
import RegisterSearch from "@/components/RegisterSearch";
import { REGISTER_NOTES } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "The register",
  description:
    "Search the roll of persons entitled to practise as architects in Zimbabwe, and read the Architects Act, exempted and non-exempted works, and foreign registration.",
  path: "/register",
});

export default function RegisterPage() {
  return (
    <PageShell
      eyebrow="The register"
      title="The roll of persons entitled to practise"
      lead="Only a person on the register may call themselves an architect or take responsibility for architectural work in Zimbabwe. Search below; the full IAZ and ACZ lists are updated on the notices page."
      image={{
        src: "/img/harare.jpg",
        alt: "Harare office towers at dusk",
        caption: "Fig. — Harare CBD",
      }}
    >
      <section className="frame" id="list">
        <span className="x tl" />
        <span className="x tr" />
        <div className="sec-head">
          <Reveal>
            <p className="eyebrow mono">Search</p>
          </Reveal>
          <SplitReveal as="h2">Find a registered architect</SplitReveal>
          <Reveal i={1}>
            <p>
              Type a name, practice, town or PRN, and filter by status. Sample
              entries shown for layout.
            </p>
          </Reveal>
        </div>
        <div className="reg-grid">
          <RegisterSearch />
        </div>
      </section>

      <section className="frame">
        <span className="x tl" />
        <span className="x tr" />
        <div className="sec-head">
          <Reveal>
            <p className="eyebrow mono">The law</p>
          </Reveal>
          <SplitReveal as="h2">What the register rests on</SplitReveal>
        </div>
        <div className="block-rows">
          {REGISTER_NOTES.map((n) => (
            <div className="block-row" id={n.id} key={n.id}>
              <Reveal>
                <span className="bi">{n.index}</span>
              </Reveal>
              <div>
                <SplitReveal as="h3">{n.title}</SplitReveal>
                <Reveal i={1}>
                  <p>{n.body}</p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
