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
          { opacity: 0, rotateX: -90, rotateY: 15, scale: 0.65, z: -150 },
          { opacity: 1, rotateX: 12, rotateY: -10, scale: 1.05, z: 30, duration: 1.1, ease: "power4.out" }
        )
        .to(logoRef.current, {
          rotateX: -5,
          rotateY: 180,
          scale: 0.95,
          z: 10,
          duration: 0.9,
          ease: "power2.inOut"
        })
        .to(logoRef.current, {
          rotateX: 0,
          rotateY: 360,
          scale: 1.0,
          z: 0,
          duration: 0.8,
          ease: "power3.out"
        })
        .to(overlayRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "+=0.15");

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
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#efe9df]"
      ref={overlayRef}
      role="presentation"
      style={{
        backgroundImage: "radial-gradient(circle at 50% 45%, #efe9df 0%, #e6dec8 60%, #ded6c3 100%)"
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(201,168,76,0.18),transparent_35%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.7),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(201,168,76,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,.35)_1px,transparent_1px)] [background-size:88px_88px]" />

      <div className="relative grid place-items-center px-6 [perspective:1200px]">
        <div
          className="relative w-[min(72vw,28rem)] [transform-style:preserve-3d] will-change-transform"
          ref={logoRef}
        >
          <div className="absolute inset-x-[14%] bottom-[8%] h-6 rounded-full bg-black/10 blur-xl" />
          <Image
            alt="Logo JoyaPerú"
            className="relative h-auto w-full object-contain drop-shadow-[0_28px_60px_rgba(140,118,76,0.22)] drop-shadow-[0_10px_20px_rgba(0,0,0,0.06)]"
            height={941}
            priority
            src="/logo/logo4sinbg.png"
            width={1672}
          />
        </div>
      </div>
    </div>
  );
}
