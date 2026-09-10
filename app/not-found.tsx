import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="shell" id="pg">
        <div className="ruler" aria-hidden="true" />
        <section
          className="frame"
          style={{ padding: "clamp(64px, 14vw, 180px) var(--gutter)" }}
        >
          <span className="x tl" />
          <span className="x tr" />
          <p
            className="eyebrow mono"
            style={{ marginBottom: "1.4rem", display: "inline-flex" }}
          >
            Error 404 &mdash; sheet not on file
          </p>
          <h1 className="disp" style={{ fontSize: "var(--step-xl)", margin: 0 }}>
            This drawing isn&rsquo;t in the set
          </h1>
          <p
            style={{
              maxWidth: "48ch",
              marginTop: "1.4rem",
              color: "var(--ink-2)",
              fontSize: "var(--step-md)",
            }}
          >
            The page you asked for has moved or never existed. Head back to the
            index, or search the register.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <Button href="/" cursor="Home">
              Back to the index
            </Button>
            <Button href="/register" variant="fill" cursor="Open">
              Search the register
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
