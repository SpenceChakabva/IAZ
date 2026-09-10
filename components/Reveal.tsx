"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 },
  }),
};

type Props = {
  children: React.ReactNode;
  className?: string;
  i?: number;
  as?: "div" | "li" | "article" | "figure" | "p" | "span";
  amount?: number;
};

export default function Reveal({
  children,
  className,
  i = 0,
  as = "div",
  amount = 0.35,
}: Props) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <M
      className={className}
      custom={i}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </M>
  );
}
