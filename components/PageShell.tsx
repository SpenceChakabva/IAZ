import Nav from "./Nav";
import Footer from "./Footer";
import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";
import InkImage from "./InkImage";
import Button from "./Button";

export default function PageShell({
  eyebrow,
  title,
  lead,
  image,
  action = { label: "Search the register", href: "/register#list" },
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: { src: string; alt: string; caption?: string };
  action?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip" href="#pg">
        Skip to content
      </a>
      <Nav />
      <main className="shell" id="pg">
        <div className="ruler" aria-hidden="true" />

        <section className="frame page-hero">
          <span className="x tl" />
          <span className="x tr" />
          <span className="x bl" />
          <span className="x br" />
          <div className={`page-hero-grid${image ? " has-img" : ""}`}>
            <div className="page-hero-text">
              <p className="eyebrow mono" data-enter>
                {eyebrow}
              </p>
              <SplitReveal as="h1">{title}</SplitReveal>
              {lead && (
                <Reveal>
                  <p className="page-hero-lead">{lead}</p>
                </Reveal>
              )}
              <Reveal i={1}>
                <div style={{ marginTop: "1.6rem" }}>
                  <Button href={action.href} cursor="Open">
                    {action.label}
                  </Button>
                </div>
              </Reveal>
            </div>
            {image && (
              <InkImage
                src={image.src}
                alt={image.alt}
                caption={image.caption}
                ratio="3 / 4"
                mode="load"
                hover
              />
            )}
          </div>
        </section>

        {children}
      </main>
      <Footer />
    </>
  );
}
