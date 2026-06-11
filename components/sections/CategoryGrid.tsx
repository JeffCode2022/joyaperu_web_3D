"use client";

import Image from "next/image";
import Link from "next/link";

interface CategoryCard {
  name: string;
  slug: string;
  image: string;
  imagePosition?: string;
  copy: string;
}

const categoryCards: CategoryCard[] = [
  {
    name: "Anillos",
    slug: "anillos",
    image: "/images/categorias/anillos.png",
    imagePosition: "center center",
    copy: "Piezas simbólicas para promesas, compromiso y uso diario.",
  },
  {
    name: "Collares",
    slug: "collares",
    image: "/images/categorias/collares.png",
    imagePosition: "center center",
    copy: "Cadenas, dijes personalizados y siluetas sentimentales.",
  },
  {
    name: "Aretes",
    slug: "aretes",
    image: "/images/categorias/aretes.png",
    imagePosition: "center center",
    copy: "Brillos cercanos al rostro con acabados pulidos.",
  },
  {
    name: "Pulseras",
    slug: "pulseras",
    image: "/images/categorias/pulseras.png",
    imagePosition: "center center",
    copy: "Textiles, cuero y plata 950 para regalos personales.",
  },
];

export function CategoryGrid() {
  return (
    <section className="reveal mx-auto max-w-7xl px-5 py-24 md:px-8">
      {/* Section header */}
      <p className="section-kicker">Categorias</p>
      <h2 className="section-title mb-10">Compra por tipo de pieza</h2>

      {/* 4-column card grid */}
      <div className="cat-grid">
        {categoryCards.map((card) => (
          <Link
            key={card.slug}
            href={`/productos?categoria=${card.slug}#catalogo`}
            className="cat-card"
            aria-label={`Ver ${card.name} — ${card.copy}`}
          >
            {/* Background image */}
            <Image
              alt={`Joyería ${card.name} — Joyaperú`}
              src={card.image}
              fill
              sizes="(max-width: 640px) 48vw, (max-width: 1024px) 25vw, 22vw"
              className="cat-card__img"
              style={{ objectPosition: card.imagePosition ?? "center" }}
            />

            {/* Gradient overlay */}
            <div className="cat-card__overlay" aria-hidden="true" />

            {/* Text block */}
            <div className="cat-card__body">
              <div className="cat-card__content-left">
                <h3 className="cat-card__title">{card.name}</h3>
                <p className="cat-card__copy">{card.copy}</p>
              </div>
              {/* Golden arrow */}
              <span className="cat-card__arrow" aria-hidden="true">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Scoped styles */}
      <style>{`
        /* Grid */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        /* Card */
        .cat-card {
          position: relative;
          display: block;
          aspect-ratio: 3 / 4;
          border-radius: 1.375rem;
          overflow: hidden;
          background: #1a1a1a;
          text-decoration: none;
          box-shadow:
            0 2px 12px rgba(26, 22, 17, 0.08),
            0 6px 32px rgba(26, 22, 17, 0.07);
          transition:
            transform 480ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 480ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }
        .cat-card:hover {
          transform: translateY(-6px) scale(1.012);
          box-shadow:
            0 8px 32px rgba(26, 22, 17, 0.14),
            0 24px 64px rgba(26, 22, 17, 0.10);
        }
        .cat-card:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 3px;
        }

        /* Image */
        .cat-card__img {
          object-fit: cover;
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cat-card:hover .cat-card__img {
          transform: scale(1.07);
        }

        /* Dark gradient — bottom heavy */
        .cat-card__overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(12, 9, 5, 0.9) 0%,
            rgba(12, 9, 5, 0.45) 45%,
            rgba(12, 9, 5, 0.1) 70%,
            transparent 100
          );
        }

        /* Body */
        .cat-card__body {
          position: absolute;
          inset-inline: 0;
          bottom: 0;
          padding: 1.5rem 1.375rem 1.4rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .cat-card__content-left {
          flex: 1;
          max-width: 82%;
          text-align: left;
        }

        /* Title */
        .cat-card__title {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(1.65rem, 2.2vw, 2.1rem);
          font-weight: 500;
          color: #ffffff;
          margin: 0 0 0.45rem;
          line-height: 1.05;
          letter-spacing: -0.01em;
        }

        /* Descriptive copy */
        .cat-card__copy {
          font-family: "DM Sans", sans-serif;
          font-size: 0.8rem;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.76);
          margin: 0;
        }

        /* Golden arrow */
        .cat-card__arrow {
          color: var(--gold);
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 1;
          transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
          flex-shrink: 0;
          margin-bottom: 0.2rem;
        }
        .cat-card:hover .cat-card__arrow {
          transform: translateX(4px);
        }

        /* Responsive */
        @media (max-width: 1023px) {
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 479px) {
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
          .cat-card__title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
