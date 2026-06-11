"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { ShieldCheck, ShoppingCart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type InvestmentProduct = {
  title: string;
  headline: string;
  subtitle: string;
  price: string;
  unit: string;
  note: string;
  image: string;
  href: string;
  action: string;
  accent: string;
  panelTone: string;
  baseRotate: string;
};

type CardStyle = CSSProperties & Record<`--${string}`, string>;

const products: InvestmentProduct[] = [
  {
    title: "Barras de plata pura 999.9",
    headline: "Compra plata certificada para proteger tu capital.",
    subtitle: "Precio referencial del dia",
    price: "S/ 400.18",
    unit: "1 Onza",
    note: "Lingotes de plata 999.9 disponibles para inversion, regalo patrimonial o ahorro en metal fisico.",
    image: "/images/oro-y-plata/barra-de-100-gramos-plata-999-9-3498.webp",
    href: "/productos?categoria=oro-y-plata#catalogo",
    action: "Comprar plata",
    accent: "#8d939b",
    panelTone: "from-white via-[#eceff1] to-[#c4c9ce]",
    baseRotate: "0deg",
  },
  {
    title: "Barras de oro puro 999.9",
    headline: "Invierte en oro puro con respaldo de JoyaPerú.",
    subtitle: "Precio referencial del dia",
    price: "S/ 6,328.14",
    unit: "10g",
    note: "Oro 999.9 para clientes que buscan conservar valor en una pieza fisica, verificable y de alta demanda.",
    image: "/images/oro-y-plata/oro-puro-10-gr-6871.webp",
    href: "/productos?categoria=oro-y-plata#catalogo",
    action: "Comprar oro",
    accent: "#b58a24",
    panelTone: "from-[#fff4c2] via-[#e9b33e] to-[#8c5a13]",
    baseRotate: "0deg",
  },
];

function ProductImage({ product }: { product: InvestmentProduct }) {
  return (
    <div className="relative h-56 w-full flex items-center justify-center mt-2 overflow-hidden">
      {/* Concentric Circles Decor (large, thin, and very soft) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg 
          className="w-full h-full max-w-[95%] max-h-[95%] text-stone-900/[0.03]" 
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>
      {/* Image with multiply blend mode to hide white background */}
      <img
        src={product.image}
        alt={product.title}
        className="relative max-h-[85%] max-w-[95%] object-contain transition duration-700 group-hover:scale-105 will-change-transform"
        style={{ mixBlendMode: "multiply" }}
      />
    </div>
  );
}

function InvestmentCard({ product, index }: { product: InvestmentProduct; index: number }) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 6;

    event.currentTarget.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    event.currentTarget.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
    event.currentTarget.style.setProperty("--mx", "50%");
    event.currentTarget.style.setProperty("--my", "50%");
  };

  const style: CardStyle = {
    "--accent": product.accent,
    "--rx": "0deg",
    "--ry": "0deg",
    "--base-rz": product.baseRotate,
    "--mx": "50%",
    "--my": "50%",
  };

  const isSilver = index === 0;

  return (
    <div
      className="investment-card group relative flex flex-col overflow-hidden rounded-[2rem] border border-stone-200/50 bg-white text-[var(--ink)] shadow-[0_15px_45px_rgba(90,70,24,0.04)] transition duration-300 [transform:perspective(1200px)_rotateX(var(--rx))_rotateY(var(--ry))_rotateZ(var(--base-rz))] [transform-style:preserve-3d]"
      data-card-index={index}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={style}
    >
      {/* Top Banner Zone */}
      <div
        className={`relative p-6 pb-6 flex flex-col rounded-t-[2rem] overflow-hidden ${
          isSilver
            ? "bg-gradient-to-b from-[#f7f8f9] to-[#eef0f2]"
            : "bg-gradient-to-b from-[#fdfbf7] to-[#f7f3e8]"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_68px,rgba(201,168,76,0.02)_68px_69px,transparent_69px_136px)]" />

        {/* Kicker, Title and Subtitle */}
        <div className="flex flex-col pr-28">
          <p
            className={`text-[0.65rem] font-bold uppercase tracking-[0.2em] ${
              isSilver ? "text-[#8d939b]" : "text-[var(--gold)]"
            }`}
          >
            Inversión JoyaPerú
          </p>
          <h2 className="mt-2 font-display text-2xl md:text-3xl leading-tight text-stone-900 hover:text-[var(--accent)] transition duration-200">
            <Link href={product.href}>{product.title}</Link>
          </h2>
          <p className="mt-1 text-xs text-stone-500 leading-snug max-w-xs">{product.headline}</p>
        </div>

        {/* Absolute Badge */}
        <div
          className={`absolute top-6 right-6 font-display text-sm font-semibold px-3.5 py-1.5 rounded-lg text-white shadow-sm ${
            isSilver ? "bg-[#8d939b]" : "bg-[var(--gold)]"
          }`}
        >
          {product.price}
        </div>

        {/* Image with circles */}
        <Link href={product.href} className="block w-full">
          <ProductImage product={product} />
        </Link>
      </div>

      {/* Bottom Detail Zone */}
      <div className="p-6 bg-white flex flex-col gap-3 flex-grow rounded-b-[2rem] justify-between">
        <div className="flex flex-col gap-3">
          {/* Price display with unit divider */}
          <div className="flex items-center gap-2">
            <span
              className={`font-display text-3xl font-semibold ${
                isSilver ? "text-stone-900" : "text-[var(--gold)]"
              }`}
            >
              {product.price}
            </span>
            <span className="text-stone-300 font-light text-xl">|</span>
            <span
              className={`text-[0.68rem] font-bold uppercase tracking-[0.15em] ${
                isSilver ? "text-[#8d939b]" : "text-[var(--gold)]"
              }`}
            >
              {product.unit}
            </span>
          </div>

          {/* Note */}
          <p className="text-xs text-stone-500 leading-relaxed">{product.note}</p>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-2">
          {/* Pureza check */}
          <span
            className={`inline-flex items-center gap-1 text-[0.68rem] font-bold uppercase tracking-wider ${
              isSilver ? "text-[#8d939b]" : "text-[var(--gold)]"
            }`}
          >
            <ShieldCheck size={14} className="stroke-[2.5]" />
            Pureza 999.9
          </span>

          {/* Stars - Themed color to match mockup (gray for silver card, gold for gold card) */}
          <div 
            className={`flex items-center gap-0.5 text-sm ${
              isSilver ? "text-stone-300" : "text-amber-500"
            }`}
          >
            {"★".repeat(5)}
          </div>

          {/* Link action button */}
          <Link
            href={product.href}
            className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-sm transition duration-300 hover:scale-[1.02] ${
              isSilver
                ? "bg-[#8d939b] hover:bg-[#787f87]"
                : "bg-[var(--gold)] hover:bg-[#9c751a]"
            }`}
          >
            <ShoppingCart size={13} />
            {product.action}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function InvestmentSplitCards() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        ".investment-card",
        { opacity: 0, filter: "blur(18px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: ".investment-split-section", start: "top 76%" },
        },
      );
    });

    return () => context.revert();
  }, []);

  return (
    <section className="investment-split-section reveal overflow-hidden border-y border-[rgba(201,168,76,0.18)] bg-[rgba(250,248,245,0.72)] px-5 py-12 md:py-16 text-[var(--ink)] backdrop-blur-[1px] md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-5 md:grid-cols-[0.95fr_0.75fr] md:items-end">
          <div>
            <p className="section-kicker">Productos principales</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-none md:text-6xl">
              Invierte en oro y plata fisica con JoyaPerú.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--muted)] md:justify-self-end">
            Compra barras y lingotes 999.9 con precio referencial del dia, atencion directa por WhatsApp
            y verificacion para respaldar tu inversion.
          </p>
        </div>

        <div className="grid gap-6 [perspective:1400px] lg:grid-cols-2">
          {products.map((product, index) => (
            <InvestmentCard index={index} key={product.title} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
