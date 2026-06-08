import type { Variants } from "framer-motion";

const luxuryEase = [0.22, 1, 0.36, 1] as const;

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 18 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: luxuryEase },
  },
};

export const cardHoverVariants: Variants = {
  rest: { scale: 1, boxShadow: "0 2px 12px rgba(26,26,26,0.08)" },
  hover: {
    scale: 1.018,
    boxShadow: "0 24px 70px rgba(26,26,26,0.16)",
    transition: { type: "spring", stiffness: 380, damping: 18 },
  },
};

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
