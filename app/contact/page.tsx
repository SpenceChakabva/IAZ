import PageShell from "@/components/PageShell";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { INSTITUTE, COUNCIL } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Reach the Registrar's office of the Institute of Architects of Zimbabwe — for registration queries, practice guidance, competition advice and media enquiries.",
  path: "/contact",
});

export default function Contact() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Get in touch with the Institute"
      lead="For registration queries, practice guidance, competition advice or media enquiries. The Registrar's office replies within two working days."
    >
      <section className="frame">
        <span className="x tl" />
        <span className="x tr" />
        <div className="mem">
          <div className="who">
            <div className="sec-head" style={{ border: 0 }}>
              <Reveal>
                <p className="eyebrow mono">Write to us</p>
              </Reveal>
              <SplitReveal as="h2">Send a message</SplitReveal>
            </div>
            <ContactForm />
          </div>
          <div className="fees">
            <div className="sec-head" style={{ border: 0, paddingLeft: 0, paddingRight: 0 }}>
              <Reveal>
                <p className="eyebrow mono">Or reach us direct</p>
              </Reveal>
              <SplitReveal as="h2">The Registrar&#39;s office</SplitReveal>
            </div>
            <Reveal className="frow">
              <span>Post</span>
              <span>{INSTITUTE.address.join(", ")}</span>
            </Reveal>
            <Reveal className="frow" i={1}>
              <span>General</span>
              <span>{INSTITUTE.email}</span>
            </Reveal>
            <Reveal className="frow" i={2}>
              <span>Registration</span>
              <span>{INSTITUTE.registrationEmail}</span>
            </Reveal>
            <Reveal className="frow" i={3}>
              <span>Phone</span>
              <span>{INSTITUTE.phone}</span>
            </Reveal>
            {COUNCIL.slice(0, 3).map((c, i) => (
              <Reveal className="frow" key={c.role} i={i + 4}>
                <span>{c.role}</span>
                <span>{c.name.replace("Arch. ", "")}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
