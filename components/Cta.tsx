"use client";

import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";
import Button from "./Button";

export default function Cta() {
  return (
    <section className="cta frame" id="cta" aria-labelledby="cta-h">
      <span className="x tl" />
      <span className="x tr" />
      <span className="x bl" />
      <span className="x br" />

      <Reveal>
        <p className="eyebrow mono">Membership</p>
      </Reveal>
      <SplitReveal as="h2" id="cta-h">
        Join the Institute of Architects of Zimbabwe
      </SplitReveal>
      <Reveal i={1}>
        <div>
          <Button
            href="/contact"
            variant="fill"
            cursor="Apply"
            className="btn-fill--brand"
          >
            Start an application
          </Button>
        </div>
      </Reveal>
      <Reveal i={2}>
        <p>
          Members receive the practice library, discounted CPD, the annual
          directory listing, and a vote at the general meeting. Fees are billed
          pro&#8209;rata from the month of admission.
        </p>
      </Reveal>
    </section>
  );
}
