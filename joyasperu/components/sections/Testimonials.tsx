"use client";

import { useEffect, useState } from "react";

const testimonials = [
  { name: "Cliente en Lima", text: "La pieza llego lista para regalar, con acabado delicado y asesoria rapida." },
  { name: "Compra personalizada", text: "El grabado quedo sobrio y el seguimiento por WhatsApp fue claro." },
  { name: "Regalo de aniversario", text: "El empaque y el brillo hicieron que se sintiera mucho mas especial." },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  const testimonial = testimonials[index];

  return (
    <section className="reveal bg-[var(--porcelain-dark)] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="section-kicker">Clientes</p>
        <blockquote className="mt-5 font-display text-4xl leading-tight text-[var(--ink)] md:text-6xl">
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          {testimonial.name}
        </p>
      </div>
    </section>
  );
}
