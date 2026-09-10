import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import TransLink from "@/components/TransLink";
import { NEWS, INSTITUTE } from "@/lib/content";
import { OG_IMAGE } from "@/lib/seo";

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = NEWS.find((n) => n.slug === slug);
  if (!a) return { title: "Notice not found" };
  const path = `/news/${a.slug}`;
  return {
    title: { absolute: `${a.title} · IAZ` },
    description: a.dek,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: "Institute of Architects of Zimbabwe",
      locale: "en_ZW",
      title: a.title,
      description: a.dek,
      url: path,
      images: [OG_IMAGE],
      publishedTime: new Date(a.date + "T00:00:00Z").toISOString(),
      section: a.kind,
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.dek,
      images: [OG_IMAGE.url],
    },
  };
}

const fmt = (iso: string) =>
  new Date(iso + "T00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = NEWS.findIndex((n) => n.slug === slug);
  if (idx === -1) notFound();
  const a = NEWS[idx];
  const next = NEWS[(idx + 1) % NEWS.length];

  return (
    <>
      <a className="skip" href="#article">
        Skip to content
      </a>
      <Nav />
      <main className="shell" id="article">
        <div className="ruler" aria-hidden="true" />

        <article className="frame article">
          <span className="x tl" />
          <span className="x tr" />

          <div className="article-head">
            <p className="eyebrow mono" data-enter>
              {a.kind} &mdash; {fmt(a.date)}
            </p>
            <SplitReveal as="h1">{a.title}</SplitReveal>
            <Reveal>
              <p className="article-dek">{a.dek}</p>
            </Reveal>
          </div>

          <div className="article-grid">
            <div className="article-body">
              {a.body.map((p, i) => (
                <Reveal as="p" key={i} i={Math.min(i, 3)} amount={0.1}>
                  {p}
                </Reveal>
              ))}

              <Reveal>
                <div className="article-cta">
                  <Button href="/contact" cursor="Ask">
                    Contact the Registrar
                  </Button>
                </div>
              </Reveal>
            </div>

            <aside className="article-side">
              {a.facts && a.facts.length > 0 && (
                <div className="article-facts">
                  <h2 className="mono">Key facts</h2>
                  <dl>
                    {a.facts.map((f) => (
                      <div key={f.label}>
                        <dt className="mono">{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              <div className="article-facts">
                <h2 className="mono">Architects Council</h2>
                <dl>
                  <div>
                    <dt className="mono">Post</dt>
                    <dd>{INSTITUTE.address.join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="mono">Phone</dt>
                    <dd>{INSTITUTE.phone}</dd>
                  </div>
                  <div>
                    <dt className="mono">Email</dt>
                    <dd>{INSTITUTE.registrationEmail}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>

          <nav className="article-nav">
            <TransLink href="/news" className="an-back mono" data-cursor="Back">
              <span className="ar">&larr;</span> All notices
            </TransLink>
            <TransLink href={`/news/${next.slug}`} className="an-next mono" data-cursor="Read">
              <span className="an-next-label">{next.title}</span>
              <span className="ar">&rarr;</span>
            </TransLink>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
