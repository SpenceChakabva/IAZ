import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { INSTITUTE, COUNCIL } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description:
    "Founded in 1924 as the Institute of Southern Rhodesian Architects; the Architects (Private) Act protected the title and the Institute took its present name in 1980.",
  path: "/about",
});

const TIMELINE = [
  { year: "1924", text: "Founded on 5 November as the Institute of Southern Rhodesian Architects, with Capt. J. R. Hobson MC FRIBA as first president." },
  { year: "1926", text: "The Royal Institute of British Architects accepts the Institute as an allied society." },
  { year: "1929", text: "The Architects (Private) Act protects the title “Architect” and sets the minimum qualifications for registration." },
  { year: "1980", text: "Following independence, the Institute takes its present name — the Institute of Architects of Zimbabwe." },
];

export default function About() {
  return (
    <>
      <a className="skip" href="#about-main">Skip to content</a>
      <Nav />
      <main className="shell" id="about-main">
        <div className="ruler" aria-hidden="true" />

        <section className="frame" style={{ padding: "clamp(28px,5vw,72px) var(--gutter)" }}>
          <span className="x tl" />
          <span className="x tr" />
          <p className="eyebrow mono" data-enter style={{ marginBottom: "1.2rem", display: "inline-flex" }}>
            About &mdash; est. {INSTITUTE.founded}
          </p>
          <SplitReveal as="h1" className="" >
            A century of the register, the standard and the voice
          </SplitReveal>
          <Reveal>
            <p style={{ maxWidth: "60ch", marginTop: "1.4rem", color: "var(--ink-2)", fontSize: "var(--step-md)" }}>
              The IAZ exists to &ldquo;represent the views of the Architects&rsquo;
              profession and to maintain its integrity and status&rdquo;, to
              advance architectural education, and to promote &mdash; or oppose &mdash;
              legislation affecting the built environment in Parliament.
            </p>
          </Reveal>
          <Reveal i={1}>
            <div style={{ marginTop: "1.8rem" }}>
              <Button href="/" variant="line" cursor="Home">Back to the register</Button>
            </div>
          </Reveal>
        </section>

        <section className="frame" style={{ padding: "0" }}>
          <span className="x tl" />
          <span className="x tr" />
          <div className="does-rows">
            {TIMELINE.map((t) => (
              <div className="row" key={t.year} style={{ gridTemplateColumns: "160px 1fr" }}>
                <div className="meat" style={{ borderRight: "1px solid var(--line-2)" }}>
                  <SplitReveal as="h3">{t.year}</SplitReveal>
                </div>
                <div className="meat">
                  <Reveal><p style={{ maxWidth: "56ch" }}>{t.text}</p></Reveal>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="frame">
          <span className="x tl" />
          <span className="x tr" />
          <div className="sec-head">
            <p className="eyebrow mono" style={{ display: "inline-flex" }}>Council</p>
            <SplitReveal as="h2">Who holds the register in 2026</SplitReveal>
          </div>
          <div className="mem">
            <div className="who">
              <ul>
                {COUNCIL.map((c) => (
                  <li key={c.role}><SplitReveal as="span">{c.name}</SplitReveal></li>
                ))}
              </ul>
            </div>
            <div className="fees">
              {COUNCIL.map((c, i) => (
                <Reveal className="frow" key={c.role} i={i}>
                  <span>{c.role}</span>
                  <span>{c.name.replace("Arch. ", "")}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
