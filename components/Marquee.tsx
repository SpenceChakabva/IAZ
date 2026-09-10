import { MARQUEE_TERMS } from "@/lib/content";

export default function Marquee() {
  const terms = [...MARQUEE_TERMS, ...MARQUEE_TERMS];
  return (
    <div className="belt" aria-label="What the Institute does">
      <div className="belt-track">
        {terms.map((t, i) => (
          <span key={t + i}>
            {t}
            <span className="d"> / </span>
          </span>
        ))}
      </div>
    </div>
  );
}
