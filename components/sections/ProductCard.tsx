"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cardHoverVariants } from "@/lib/animations/variants";
import type { Product } from "@/types/product";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className="product-card group"
      initial="rest"
      whileHover={reduced ? "rest" : "hover"}
      variants={cardHoverVariants}
      style={{
        background: "#ffffff",
        borderRadius: "1.125rem",
        overflow: "hidden",
        boxShadow: "0 1px 6px rgba(26,22,17,0.06)",
      }}
    >
      <Link className="block h-full" href={`/productos/${product.id}`}>

        {/* ── Imagen con padding interno (flotando dentro del card) ── */}
        <div style={{ padding: "0.625rem 0.625rem 0" }}>
          <div
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: "0.875rem",
              background: "#e8e4dc",
            }}
          >
            <Image
              alt={product.name}
              className="object-cover transition duration-700 group-hover:scale-105"
              fill
              priority={priority}
              sizes="(max-width: 768px) 92vw, 28vw"
              src={product.image}
            />

            {/* Badge precio – esquina sup. derecha */}
            <div
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                background: "rgba(24, 22, 19, 0.85)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: "0.35rem",
                padding: "0.28rem 0.55rem",
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  fontFamily: "DM Sans, sans-serif",
                  lineHeight: 1,
                }}
              >
                {product.price}
              </span>
            </div>
          </div>
        </div>

        {/* ── Contenido inferior ── */}
        <div
          style={{
            padding: "1rem 0.875rem 0.875rem",
            display: "grid",
            gap: "0.45rem",
          }}
        >
          {/* Nombre + flecha */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.2rem",
                fontWeight: 600,
                lineHeight: 1.25,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              {product.name}
            </h3>
            <ArrowUpRight
              style={{
                color: "var(--gold)",
                flexShrink: 0,
                marginTop: "0.15rem",
              }}
              size={16}
            />
          </div>

          {/* Descripción */}
          <p
            style={{
              fontSize: "0.8rem",
              lineHeight: 1.65,
              color: "var(--muted)",
              margin: 0,
              minHeight: "2.5rem",
            }}
          >
            {product.description}
          </p>

          {/* Separador + categoría / precio */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(26,22,17,0.13)",
              paddingTop: "0.65rem",
              marginTop: "0.2rem",
            }}
          >
            <span
              style={{
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              {product.category}
            </span>
            <strong
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--ink)",
              }}
            >
              {product.price}
            </strong>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
