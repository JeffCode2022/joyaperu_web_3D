"use client";

import { useEffect, useState, useRef } from "react";
import { featuredProducts } from "@/data/products";
import { ProductCard } from "@/components/sections/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalProducts = featuredProducts.length;
  // Clone the first 4 products at the end for seamless looping on all screen sizes
  const clonedProducts = featuredProducts.slice(0, 4);
  const displayProducts = [...featuredProducts, ...clonedProducts];

  const nextSlide = () => {
    if (currentIndex >= totalProducts) {
      setIsTransitioning(false);
      setCurrentIndex(0);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(1);
      }, 30);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalProducts);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(totalProducts - 1);
      }, 30);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Autoplay
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isHovered]);

  // Seamless jump transition handler
  useEffect(() => {
    if (currentIndex === totalProducts && isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500); // match transition duration (500ms)
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning, totalProducts]);

  return (
    <section
      className="reveal featured-products-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        maxWidth: "80rem",
        margin: "0 auto",
        padding: "4rem clamp(1.25rem, 4vw, 3rem)",
        position: "relative",
      }}
    >
      {/* ── Encabezado ── */}
      <div className="featured-products-header">
        {/* Título izquierda */}
        <div>
          <p className="section-kicker" style={{ marginBottom: "0.4rem" }}>
            Seleccion editorial
          </p>
          <h2 className="section-title" style={{ margin: 0 }}>
            Los mas pedidos
          </h2>
        </div>

        {/* Descripción derecha */}
        <p
          style={{
            maxWidth: "22rem",
            fontSize: "0.8125rem",
            lineHeight: 1.75,
            color: "var(--muted)",
            margin: 0,
          }}
        >
          Una vitrina curada con piezas reales del catalogo actual,
          optimizadas para carga rapida.
        </p>
      </div>

      {/* ── Carrusel de productos ── */}
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(calc(-1 * var(--current-index) * (100% + var(--carousel-gap)) / var(--visible-cards)))`,
            transition: isTransitioning ? "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
            display: "flex",
            gap: "var(--carousel-gap)",
            width: "100%",
            willChange: "transform",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            "--current-index": currentIndex,
          } as React.CSSProperties}
        >
          {displayProducts.map((product, index) => (
            <div className="carousel-card" key={`${product.id}-${index}`}>
              <ProductCard priority={index < 4} product={product} />
            </div>
          ))}
        </div>

        {/* Botones de Navegación */}
        <button
          onClick={prevSlide}
          className="carousel-btn prev"
          aria-label="Producto anterior"
          type="button"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="carousel-btn next"
          aria-label="Siguiente producto"
          type="button"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <style>{`
        .featured-products-section {
          --visible-cards: 1;
          --carousel-gap: 1rem;
        }
        @media (min-width: 640px) {
          .featured-products-section {
            --visible-cards: 2;
            --carousel-gap: 1rem;
          }
        }
        @media (min-width: 1024px) {
          .featured-products-section {
            --visible-cards: 4;
            --carousel-gap: 1.25rem;
          }
        }

        .featured-products-header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-end;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .carousel-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          padding: 0.5rem 0;
        }

        .carousel-card {
          flex: 0 0 calc((100% - (var(--visible-cards) - 1) * var(--carousel-gap)) / var(--visible-cards));
          width: calc((100% - (var(--visible-cards) - 1) * var(--carousel-gap)) / var(--visible-cards));
          transition: transform 300ms ease;
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(26, 26, 26, 0.08);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 180ms ease;
        }

        .carousel-btn:hover {
          background: #fff;
          border-color: var(--gold);
          color: var(--gold);
          transform: translateY(-50%) scale(1.05);
        }

        .carousel-btn.prev {
          left: 0.5rem;
        }

        .carousel-btn.next {
          right: 0.5rem;
        }

        @media (min-width: 1280px) {
          .carousel-btn.prev {
            left: -1.5rem;
          }
          .carousel-btn.next {
            right: -1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
