"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { ArrowUpRight, ShieldCheck, ShoppingCart } from "lucide-react";
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
    accent: "#c9a84c",
    panelTone: "from-[#fff4c2] via-[#e9b33e] to-[#8c5a13]",
    baseRotate: "0deg",
  },
];

const sliceCount = 6;

function SplitImage({ product }: { product: InvestmentProduct }) {
  return (
    <div className="split-image relative h-64 overflow-hidden border border-[rgba(201,168,76,0.24)] bg-white/74 shadow-[inset_0_0_70px_rgba(201,168,76,0.08)] md:h-80">
      <div className={`absolute inset-0 bg-gradient-to-br ${product.panelTone} opacity-25`} />
      <div className="relative flex h-full [transform-style:preserve-3d]">
        {Array.from({ length: sliceCount }).map((_, index) => {
          const position = (index / (sliceCount - 1)) * 100;
          const style: CardStyle = {
            backgroundImage: `url(${product.image})`,
            backgroundPosition: `${position}% center`,
            backgroundSize: `${sliceCount * 100}% 100%`,
            "--slice-index": `${index}`,
          };

          return (
            <div
              aria-hidden="true"
              className="split-slice relative h-full flex-1 bg-white bg-no-repeat will-change-transform"
              key={index}
              style={style}
            />
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,.34),transparent_24%)] opacity-0 transition duration-300 group-hover:opacity-100" />
    </div>
  );
}

function InvestmentCard({ product, index }: { product: InvestmentProduct; index: number }) {
  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 13;
    const rotateX = (0.5 - y) * 10;

    event.currentTarget.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    event.currentTarget.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
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

  return (
    <Link
      className="investment-card group relative block min-h-[36rem] border border-[rgba(201,168,76,0.24)] bg-[rgba(255,255,255,0.72)] p-5 text-[var(--ink)] shadow-[0_28px_80px_rgba(90,70,24,0.10)] outline-none backdrop-blur-sm transition duration-300 [transform:perspective(1200px)_rotateX(var(--rx))_rotateY(var(--ry))_rotateZ(var(--base-rz))] [transform-style:preserve-3d] hover:border-[rgba(201,168,76,0.46)] hover:bg-white/84 md:p-6"
      data-card-index={index}
      href={product.href}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={style}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx)_var(--my),color-mix(in_srgb,var(--accent)_28%,transparent),transparent_34%)] opacity-36 transition duration-300" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_68px,rgba(201,168,76,0.10)_68px_69px,transparent_69px_136px)]" />
      <div className="relative grid h-full gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[var(--gold)]">
              Inversion JoyaPerú
            </p>
            <h2 className="mt-3 font-display text-4xl leading-none md:text-5xl">{product.title}</h2>
            <p className="mt-5 max-w-md text-2xl font-semibold leading-tight text-[#3b3934]">{product.headline}</p>
          </div>
          <ArrowUpRight className="text-[var(--accent)]" size={24} />
        </div>

        <SplitImage product={product} />

        <div className="grid gap-5">
          <div>
            <p className="text-sm font-semibold text-[var(--muted)]">{product.subtitle}</p>
            <div className="mt-2 flex items-end gap-3">
              <strong className="font-display text-5xl leading-none text-[var(--accent)] md:text-6xl">
                {product.price}
              </strong>
              <span className="pb-2 text-sm font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{product.unit}</span>
            </div>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[var(--muted)]">{product.note}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#5b554a]">
              <ShieldCheck size={16} />
              Pureza 999.9
            </span>
            <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_16px_40px_rgba(90,70,24,0.18)]">
              <ShoppingCart size={15} />
              {product.action}
            </span>
          </div>
        </div>
      </div>
    </Link>
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

      gsap.fromTo(
        ".split-slice",
        { z: (index) => (index % 2 === 0 ? -70 : 70), rotateY: (index) => (index % 2 === 0 ? -16 : 16) },
        {
          z: 0,
          rotateY: 0,
          ease: "none",
          stagger: 0.02,
          scrollTrigger: {
            trigger: ".investment-split-section",
            start: "top bottom",
            end: "bottom 45%",
            scrub: 0.7,
          },
        },
      );
    });

    return () => context.revert();
  }, []);

  return (
    <section className="investment-split-section reveal overflow-hidden border-y border-[rgba(201,168,76,0.18)] bg-[rgba(250,248,245,0.72)] px-5 py-24 text-[var(--ink)] backdrop-blur-[1px] md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-5 md:grid-cols-[0.95fr_0.75fr] md:items-end">
          <div>
            <p className="section-kicker">Productos principales</p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl leading-none md:text-7xl">
              Invierte en oro y plata fisica con JoyaPerú.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--muted)] md:justify-self-end">
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
