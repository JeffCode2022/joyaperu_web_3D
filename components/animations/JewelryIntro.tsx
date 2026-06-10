"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function JewelryIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup = () => {};

    async function runIntro() {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        setIsVisible(false);
        return;
      }

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const fallback = window.setTimeout(() => {
        document.body.style.overflow = previousOverflow;
        setIsVisible(false);
      }, 3200);

      const { gsap } = await import("gsap");
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          window.clearTimeout(fallback);
          document.body.style.overflow = previousOverflow;
          setIsVisible(false);
        },
      });

      timeline
        .fromTo(
          logoRef.current,
          { opacity: 0, rotateY: -74, rotateX: 16, rotateZ: -4, scale: 0.62, z: -220 },
          { opacity: 1, rotateY: 0, rotateX: 0, rotateZ: 0, scale: 1, z: 0, duration: 0.82 },
        )
        .to(logoRef.current, { rotateY: 360, scale: 1.04, duration: 0.95, ease: "power2.inOut" })
        .to(logoRef.current, { rotateX: -7, rotateY: 10, scale: 0.98, duration: 0.32, ease: "power2.out" })
        .to(overlayRef.current, { opacity: 0, duration: 0.58, ease: "power2.inOut" }, "+=0.12");

      cleanup = () => {
        window.clearTimeout(fallback);
        document.body.style.overflow = previousOverflow;
        timeline.kill();
      };
    }

    runIntro();
    return () => cleanup();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#110d0a]"
      ref={overlayRef}
      role="presentation"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(201,168,76,0.22),transparent_28%),radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:88px_88px]" />

      <div className="relative grid place-items-center px-6 [perspective:1200px]">
        <div
          className="relative w-[min(72vw,28rem)] [transform-style:preserve-3d] will-change-transform"
          ref={logoRef}
        >
          <div className="absolute inset-x-[14%] bottom-[12%] h-8 rounded-full bg-black/40 blur-2xl" />
          <Image
            alt="Logo JoyaPerú"
            className="relative h-auto w-full object-contain drop-shadow-[0_36px_80px_rgba(0,0,0,0.58)]"
            height={1782}
            priority
            src="/logo/logo2sinbg.png"
            width={2400}
          />
        </div>
      </div>
    </div>
  );
}
