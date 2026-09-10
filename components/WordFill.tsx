"use client";

import { useRef, ElementType } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

/**
 * heronaiapp.com's scroll-scrubbed statement: the line starts grey and each
 * word fills to full ink in turn as the block scrolls through the viewport
 * (`data-start`/`data-end` scroll-% ranges on SplitText words).
 */
export default function WordFill({
  children,
  as: Tag = "p",
  className = "",
}: {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || document.documentElement.classList.contains("no-motion")) return;

      const split = SplitText.create(el, { type: "words", wordsClass: "wf-word" });
      gsap.set(split.words, { color: "var(--grey)" });

      // keep any element explicitly marked as emphasis at full ink
      el.querySelectorAll("b .wf-word, strong .wf-word").forEach((w) =>
        gsap.set(w, { color: "var(--ink)" })
      );

      gsap.to(split.words, {
        color: "var(--ink)",
        ease: "none",
        stagger: 0.4,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          end: "top 32%",
          scrub: 0.5,
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [] }
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
