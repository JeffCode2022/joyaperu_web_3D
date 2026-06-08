"use client";

import dynamic from "next/dynamic";

const ScrollEffects = dynamic(() => import("@/components/animations/ScrollEffects"), { ssr: false });

export function ScrollEffectsLoader() {
  return <ScrollEffects />;
}
