import PageShell from "@/components/PageShell";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";
import TransLink from "@/components/TransLink";
import { NEWS } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "News & public notices",
  description:
    "Vacancies, examination dates, the Institute's calls for submissions, and changes to the IAZ and ACZ registers.",
  path: "/news",
});

const fmt = (iso: string) =>
  new Date(iso + "T00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function News() {
  return (
    <PageShell
      eyebrow="News & public notices"
      title="Notices from the Institute"
      lead="Vacancies, examination dates, the Institute's calls for submissions, and changes to the register. Select a notice to read it in full."
    >
      <section className="frame">
        <span className="x tl" />
        <span className="x tr" />
        <ul className="article-list">
          {NEWS.map((n, i) => (
            <li key={n.slug}>
              <Reveal i={i} amount={0.1}>
                <TransLink
                  href={`/news/${n.slug}`}
                  className="article-link"
                  data-cursor="Read"
                >
                  <span
                    className="al-date mono"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {fmt(n.date)}
                  </span>
                  <span className="al-body">
                    <span className="al-kind mono">{n.kind}</span>
                    <span className="al-title">{n.title}</span>
                    <span className="al-dek">{n.dek}</span>
                  </span>
                  <span className="al-go mono" aria-hidden="true">
                    Read <span className="ar">&rarr;</span>
                  </span>
                </TransLink>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="article-foot">
          <SplitReveal as="h2">
            The full register of notices is circulated to members
          </SplitReveal>
          <Reveal>
            <p>
              Members receive every notice by email as it is published. The
              complete archive, including notices circulated as PDFs, is in the
              members&#39; area.
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
