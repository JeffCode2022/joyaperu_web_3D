"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Lock, 
  Truck, 
  Tag, 
  Gem, 
  PenTool, 
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import type { Product } from "@/types/product";

type ProductDetailsClientProps = {
  product: Product;
};

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  // Determine standard product details based on category
  const categoryLower = (product.categorySlug || "").toLowerCase();
  
  let materialText = "Plata 950 certificada";
  let personalizationText = "Grabados y detalles a consulta";
  
  if (categoryLower.includes("pulsera")) {
    materialText = "Plata 950 + tejido ajustable";
    personalizationText = "Inicial o detalle a consulta";
  } else if (categoryLower.includes("anillo") || categoryLower.includes("aro")) {
    materialText = "Plata 950 / Oro 18K bajo pedido";
    personalizationText = "Grabado de iniciales/fecha incluido";
  } else if (categoryLower.includes("collar") || categoryLower.includes("cadena")) {
    materialText = "Plata 950 ley certificada";
    personalizationText = "Iniciales o dijes personalizados";
  } else if (categoryLower.includes("arete")) {
    materialText = "Plata 950 antialérgica";
    personalizationText = "Personalización sujeta a diseño";
  } else if (categoryLower.includes("oro")) {
    materialText = "Oro de 18 Kilates certificado";
    personalizationText = "Grabado a pedido";
  }

  // Gallery images definition
  // We use the main product image for first 3 views (with different zooms/crops in styling)
  // and the gift packaging image as the 4th thumbnail
  const gallery = [
    { src: product.image, label: "Vista general", scale: 1.0, position: "center" },
    { src: product.image, label: "Detalle de cerca", scale: 1.25, position: "center" },
    { src: product.image, label: "Acabado de cerca", scale: 1.5, position: "center" },
    { src: "/images/otros/regalo-joyaperu-10071.webp", label: "Empaque de regalo", scale: 1.0, position: "center" }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const activeItem = gallery[activeIndex];
  const currentScale = isHovered ? activeItem.scale * 1.15 : activeItem.scale;
  const whatsappText = `Hola JoyaPerú, quiero consultar por ${product.name}.`;

  return (
    <section className="reveal mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.1fr_0.9fr] md:px-8 items-start">
      {/* LEFT COLUMN: Gallery & Main Image Card */}
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Thumbnails */}
        <div className="order-2 flex flex-row gap-3 overflow-x-auto pb-2 md:order-1 md:flex-col md:overflow-x-visible md:pb-0 md:w-24 shrink-0">
          {gallery.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${item.label}-${index}`}
                onClick={() => setActiveIndex(index)}
                className={`relative aspect-square w-20 md:w-full overflow-hidden rounded-[1.25rem] border bg-white transition-all duration-300 ${
                  isActive 
                    ? "border-[var(--gold)] ring-2 ring-[var(--gold)]/20 scale-[1.03]" 
                    : "border-black/10 hover:border-black/20"
                }`}
                aria-label={`Ver ${item.label}`}
                type="button"
              >
                <Image
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="object-contain p-1.5"
                  fill
                  sizes="96px"
                  src={item.src}
                />
              </button>
            );
          })}
        </div>

        {/* Main Image Card with Highlights Footer */}
        <div className="order-1 flex flex-col flex-1 overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_28px_90px_rgba(26,26,26,0.10)] md:order-2">
          {/* Image display */}
          <div 
            className="relative aspect-[4/5] w-full overflow-hidden bg-[#faf8f5] cursor-zoom-in"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              alt={`${product.name} - ${activeItem.label}`}
              className="object-contain transition-transform duration-500 ease-out"
              style={{
                transform: `scale(${currentScale})`,
                objectPosition: activeItem.position
              }}
              fill
              priority
              sizes="(max-width: 768px) 92vw, 48vw"
              src={activeItem.src}
            />
          </div>

          {/* Highlights Footer */}
          <div className="border-t border-black/5 bg-white/95 px-6 py-5">
            <div className="grid grid-cols-3 gap-2 divide-x divide-black/5 text-center">
              {/* Highlight 1 */}
              <div className="flex flex-col items-center justify-center px-1 sm:flex-row sm:gap-2.5 sm:text-left">
                <ShieldCheck className="text-[var(--gold)] shrink-0" size={20} />
                <div className="mt-1 sm:mt-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)] leading-none">Plata 950</p>
                  <p className="mt-0.5 text-[9px] text-[var(--muted)] leading-tight">Calidad certificada</p>
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="flex flex-col items-center justify-center px-1 sm:flex-row sm:gap-2.5 sm:text-left">
                <Award className="text-[var(--gold)] shrink-0" size={20} />
                <div className="mt-1 sm:mt-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)] leading-none">Garantía</p>
                  <p className="mt-0.5 text-[9px] text-[var(--muted)] leading-tight">Defectos de fábrica</p>
                </div>
              </div>

              {/* Highlight 3 */}
              <div className="flex flex-col items-center justify-center px-1 sm:flex-row sm:gap-2.5 sm:text-left">
                <Sparkles className="text-[var(--gold)] shrink-0" size={20} />
                <div className="mt-1 sm:mt-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)] leading-none">Acabado</p>
                  <p className="mt-0.5 text-[9px] text-[var(--muted)] leading-tight">Brillo duradero</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Product Details */}
      <div className="flex flex-col justify-center self-start">
        {/* Category kicker */}
        <Link
          className="mb-0.5 inline-flex w-fit text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gold)] transition hover:opacity-80"
          href={product.categorySlug ? `/productos?categoria=${product.categorySlug}#catalogo` : "/productos#catalogo"}
        >
          {product.category}
        </Link>

        {/* Title */}
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.15] text-[var(--ink)]">
          {product.name}
        </h1>

        {/* Decorative Separator */}
        <div className="my-3.5 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-black/10"></div>
          <span className="text-[var(--gold)] text-xs leading-none select-none">♡</span>
          <div className="h-px flex-1 bg-black/10"></div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)]">
          {product.description}
        </p>

        {/* Pricing & Call to Action Container */}
        <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-[1.1fr_0.9fr] items-center border-y border-black/10 py-3.5">
          {/* Price Box */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Precio Referencial</p>
            <strong className="mt-0.5 block font-display text-2xl sm:text-3xl lg:text-4xl text-[var(--gold)] font-medium leading-none">
              {product.price}
            </strong>
            <p className="mt-1.5 text-[9px] text-[var(--muted)] leading-tight">
              Precio referencial del catálogo actual.
            </p>
          </div>

          {/* WhatsApp Button Box */}
          <div className="flex flex-col items-center w-full">
            <a
              className="inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-md shadow-[#25D366]/10 transition duration-300 hover:bg-[#20ba5a] hover:-translate-y-0.5 active:translate-y-0"
              href={`https://wa.me/51921638910?text=${encodeURIComponent(whatsappText)}`}
              rel="noreferrer"
              target="_blank"
            >
              <WhatsAppIcon size={18} className="fill-white" />
              Consultar por WhatsApp
            </a>
            <div className="mt-1.5 flex items-center gap-1 text-[9px] text-[var(--muted)] uppercase tracking-wider font-bold">
              <Lock size={10} className="text-[var(--gold)]" />
              Atención directa y segura
            </div>
          </div>
        </div>

        {/* Grid of 3 Highlights */}
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, label: "Compra segura", copy: "Atención directa por WhatsApp." },
            { icon: Truck, label: "Envíos a todo Perú", copy: "Coordinación rápida y segura." },
            { icon: PenTool, label: "Personalización", copy: "Grabados y detalles a consulta." },
          ].map((item) => (
            <div className="rounded-[1rem] border border-black/10 bg-white/70 p-3 shadow-sm" key={item.label}>
              <item.icon className="text-[var(--gold)]" size={18} />
              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--ink)]">{item.label}</p>
              <p className="mt-1 text-[10px] leading-snug text-[var(--muted)]">{item.copy}</p>
            </div>
          ))}
        </div>

        {/* Product Information Card */}
        <div className="mt-4 rounded-[1.25rem] border border-black/10 bg-white/70 p-4 shadow-sm">
          <h2 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--gold)] mb-2.5">
            Información del Producto
          </h2>
          <div className="grid gap-y-2.5 gap-x-4 sm:grid-cols-2 text-[11px] leading-relaxed">
            {/* Left Col */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-2">
                <Tag size={14} className="text-[var(--gold)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[var(--ink)]">Categoría</p>
                  <p className="text-[var(--muted)]">{product.category}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Gem size={14} className="text-[var(--gold)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[var(--ink)]">Material</p>
                  <p className="text-[var(--muted)]">{materialText}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <PenTool size={14} className="text-[var(--gold)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[var(--ink)]">Personalización</p>
                  <p className="text-[var(--muted)]">{personalizationText}</p>
                </div>
              </div>
            </div>

            {/* Right Col */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-2">
                <CheckCircle size={14} className="text-[var(--gold)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[var(--ink)]">Disponibilidad</p>
                  <p className="text-[var(--muted)]">Sujeta a confirmación</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Truck size={14} className="text-[var(--gold)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[var(--ink)]">Envíos</p>
                  <p className="text-[var(--muted)]">Coordinados a todo Perú</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
