"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cardHoverVariants } from "@/lib/animations/variants";
import type { Product } from "@/types/product";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className="product-card group border border-black/10 bg-white"
      initial="rest"
      whileHover={reduced ? "rest" : "hover"}
      variants={cardHoverVariants}
    >
      <Link className="block h-full" href={`/productos/${product.id}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--porcelain-dark)]">
          <Image
            alt={product.name}
            className="object-cover transition duration-700 group-hover:scale-105"
            fill
            priority={priority}
            sizes="(max-width: 768px) 92vw, 28vw"
            src={product.image}
          />
        </div>
        <div className="grid gap-3 p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl leading-none text-[var(--ink)]">{product.name}</h3>
            <ArrowUpRight className="mt-1 shrink-0 text-[var(--gold)]" size={18} />
          </div>
          <p className="min-h-12 text-sm leading-6 text-[var(--muted)]">{product.description}</p>
          <div className="flex items-center justify-between border-t border-black/10 pt-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
              {product.category}
            </span>
            <strong className="text-sm text-[var(--ink)]">{product.price}</strong>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
