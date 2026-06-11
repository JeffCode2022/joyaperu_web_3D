"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

/* ─── Beneficios ─────────────────────────────────────────────────── */
const benefits = [
  {
    id: "cert",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-5 shrink-0 text-[var(--gold)]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
        />
      </svg>
    ),
    label: "Plata 950 certificada",
  },
  {
    id: "ship",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-5 shrink-0 text-[var(--gold)]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M8.25 18.75l.75-4.5M16.5 18.75l-.75-4.5M8.25 14.25H6m10.5 0h.375A2.625 2.625 0 0 1 19.5 16.875v1.5"
        />
      </svg>
    ),
    label: "Envíos a todo Perú",
  },
  {
    id: "wa",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-5 shrink-0 text-[var(--gold)]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        />
      </svg>
    ),
    label: "Atención por WhatsApp",
  },
  {
    id: "custom",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-5 shrink-0 text-[var(--gold)]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
        />
      </svg>
    ),
    label: "Piezas personalizadas",
  },
];

/* ─── Componente ─────────────────────────────────────────────────── */
export function HeroSection() {
  const reduced = useReducedMotion();
  const initial = reduced ? false : { opacity: 0, y: 20 };
  const animate = reduced ? {} : { opacity: 1, y: 0 };

  return (
    <section className="hero relative min-h-svh bg-[#d6d0c4] text-white">
      <div className="relative h-svh overflow-hidden pt-20">

        {/* ── VIDEO DE FONDO — a plena visibilidad, sin filtros extra ─ */}
        <div className="absolute inset-0 bg-[#d6d0c4]">
          <div className="absolute inset-0">
            <video
              aria-label="Anillo JoyaPerú en movimiento"
              autoPlay
              className="hero-image size-full object-cover object-center saturate-[1.02] contrast-[1.04]"
              loop
              muted
              playsInline
              poster="/videos/video3-hero-left-fill-poster.webp"
              preload="auto"
            >
              <source src="/videos/video3-hero-left-fill.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Gradiente original: cubre solo el lado izquierdo para legibilidad del texto */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,235,226,0.92)_0%,rgba(214,208,196,0.82)_24%,rgba(174,166,151,0.34)_43%,rgba(235,230,218,0.06)_58%,transparent_74%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_17%_25%,rgba(255,252,240,0.48),transparent_29%),radial-gradient(circle_at_43%_18%,rgba(201,168,76,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,.08)_0%,transparent_34%,transparent_74%,rgba(80,74,64,.12)_100%)]" />
        </div>

        {/* ── CONTENIDO ──────────────────────────────────────────── */}
        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-5 py-14 md:px-8">
          <motion.div
            animate={animate}
            className="relative z-10 max-w-2xl"
            initial={initial}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge dorado */}
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8d6b1f]">
              Plata 950 y oro 18k hechos en Perú
            </p>

            {/* Título — igual al original en tamaño y fuente */}
            <h1 className="mt-5 max-w-[36rem] font-display text-4xl leading-[0.98] text-[#171717] drop-shadow-[0_16px_46px_rgba(255,255,255,0.34)] sm:text-5xl md:text-6xl xl:text-7xl">
              Joyería peruana con brillo propio.
            </h1>

            {/* Descripción */}
            <p className="mt-6 max-w-lg text-base font-medium leading-7 text-[#3d3a35] md:text-lg">
              Piezas personalizadas, regalos memorables y colecciones en plata y
              oro para momentos que importan.
            </p>

            {/* Botones */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="w-full sm:w-auto" href="/productos" id="hero-cta-catalogo">
                Ver catálogo&nbsp;→
              </Button>
              <Button
                className="w-full border-[var(--gold)] bg-white/90 text-[#171717] hover:bg-[#f3ead1] hover:text-[#171717] sm:w-auto"
                href="/contacto"
                id="hero-cta-consulta"
                variant="ghost"
              >
                Agendar consulta
              </Button>
            </div>

            {/* ── Fila de beneficios ───────────────────────────── */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {benefits.map((b) => (
                <div key={b.id} className="flex items-center gap-1.5">
                  {b.icon}
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#3d3a35]">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
