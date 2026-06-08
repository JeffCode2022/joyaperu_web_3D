"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const initial = reduced ? false : { opacity: 0, y: 20 };
  const animate = reduced ? {} : { opacity: 1, y: 0 };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    section.dataset.videoScrub = "mounted";

    let animationFrame = 0;
    let retry = 0;
    let targetTime = 0.01;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const updateTarget = () => {
      const videoDuration = video.duration;

      if (!Number.isFinite(videoDuration) || videoDuration <= 0) return;

      const totalScroll = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-section.getBoundingClientRect().top / totalScroll, 0, 1);

      targetTime = clamp(progress * videoDuration, 0.01, Math.max(videoDuration - 0.08, 0.01));

      section.dataset.videoProgress = progress.toFixed(3);
    };

    const smoothFrame = () => {
      const diff = targetTime - video.currentTime;

      if (Math.abs(diff) > 0.012 && !video.seeking) {
        video.currentTime += diff * 0.18;
      }

      animationFrame = window.requestAnimationFrame(smoothFrame);
    };

    const createScrub = () => {
      const duration = video.duration;

      if (!Number.isFinite(duration) || duration <= 0) return;

      video.pause();
      video.currentTime = 0.01;
      targetTime = 0.01;
      updateTarget();
    };

    video.pause();
    if (video.readyState >= 1) createScrub();
    video.addEventListener("loadedmetadata", createScrub, { once: true });
    retry = window.setInterval(updateTarget, 120);
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    updateTarget();
    smoothFrame();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearInterval(retry);
      video.removeEventListener("loadedmetadata", createScrub);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
    };
  }, []);

  return (
    <section
      className="hero relative min-h-[285svh] bg-[#161310] text-white"
      ref={sectionRef}
    >
      <div className="sticky top-0 h-svh overflow-hidden pt-20">
        <div className="absolute inset-0">
          <video
            aria-label="Anillo JoyasPeru en movimiento"
            autoPlay={Boolean(reduced)}
            className="hero-image size-full object-cover object-[62%_center] saturate-[1.25] contrast-[1.14] md:object-[72%_center]"
            loop={Boolean(reduced)}
            muted
            playsInline
            poster="/videos/jewel-showcase-poster.webp"
            preload="auto"
            ref={videoRef}
          >
            <source src="/videos/jewel-showcase-scroll.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.72)_0%,rgba(0,0,0,.48)_34%,rgba(0,0,0,.16)_68%,rgba(0,0,0,.04)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.10)_0%,transparent_24%,transparent_64%,rgba(0,0,0,.28)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-5 py-14 md:px-8">
          <motion.div
            animate={animate}
            className="relative z-10 max-w-2xl"
            initial={initial}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f3d982]">
              Plata 950 y oro 18k hechos en Peru
            </p>
            <h1 className="mt-5 max-w-[36rem] font-display text-4xl leading-[0.98] text-white drop-shadow-[0_18px_54px_rgba(0,0,0,0.30)] sm:text-5xl md:text-6xl xl:text-7xl">
              Joyeria peruana con brillo propio.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/76 md:text-lg">
              Piezas personalizadas, regalos memorables y colecciones de plata y oro para momentos que
              importan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="w-full sm:w-auto" href="/productos" variant="light">
                Ver catalogos
              </Button>
              <Button
                className="w-full border-white/55 text-white hover:bg-white/10 hover:text-white sm:w-auto"
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
