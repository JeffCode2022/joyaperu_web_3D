"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const reduced = useReducedMotion();
  const initial = reduced ? false : { opacity: 0, y: 20 };
  const animate = reduced ? {} : { opacity: 1, y: 0 };

  return (
    <section className="hero relative min-h-svh bg-[#d6d0c4] text-white">
      <div className="relative h-svh overflow-hidden pt-20">
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
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,235,226,0.92)_0%,rgba(214,208,196,0.82)_24%,rgba(174,166,151,0.34)_43%,rgba(235,230,218,0.06)_58%,transparent_74%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_17%_25%,rgba(255,252,240,0.48),transparent_29%),radial-gradient(circle_at_43%_18%,rgba(201,168,76,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,.08)_0%,transparent_34%,transparent_74%,rgba(80,74,64,.12)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-5 py-14 md:px-8">
          <motion.div
            animate={animate}
            className="relative z-10 max-w-2xl"
            initial={initial}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8d6b1f]">
              Plata 950 y oro 18k hechos en Peru
            </p>
            <h1 className="mt-5 max-w-[36rem] font-display text-4xl leading-[0.98] text-[#171717] drop-shadow-[0_16px_46px_rgba(255,255,255,0.34)] sm:text-5xl md:text-6xl xl:text-7xl">
              Joyeria peruana con brillo propio.
            </h1>
            <p className="mt-6 max-w-lg text-base font-medium leading-7 text-[#3d3a35] md:text-lg">
              Piezas personalizadas, regalos memorables y colecciones de plata y oro para momentos que
              importan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="w-full sm:w-auto" href="/productos">
                Ver catalogos
              </Button>
              <Button
                className="w-full border-[#171717]/45 text-[#171717] hover:bg-white/28 hover:text-[#171717] sm:w-auto"
                href="/contacto"
                variant="ghost"
              >
                Agendar consulta
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
