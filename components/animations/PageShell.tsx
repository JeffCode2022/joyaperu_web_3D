"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pageVariants } from "@/lib/animations/variants";

export function PageShell({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return <motion.div animate="enter" initial={false} variants={pageVariants}>{children}</motion.div>;
}
