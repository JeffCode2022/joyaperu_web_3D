"use client";

import { FormEvent, useState } from "react";
import { Check, MapPin, MessageCircle, Navigation, Phone, Star } from "lucide-react";

const googleMapsQuery =
  "JOYAPERU Psj Abelardo Quinones Mz H Lt 6 asoc. De vivienda la Granja Villa Maria del Triunfo";
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(googleMapsQuery)}`;
const googleMapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(googleMapsQuery)}&z=17&output=embed`;

export function ContactSection() {
  const [status, setStatus] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", { method: "POST", body: form });
    setStatus(response.ok ? "Solicitud enviada." : "No se pudo enviar. Intenta nuevamente.");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <section
      className="reveal mx-auto grid max-w-6xl items-start gap-7 px-5 py-16 md:grid-cols-[0.95fr_1.05fr] md:px-8 lg:py-20"
      id="contacto"
    >
      <div>
        <p className="section-kicker">Contacto</p>
        <h2 className="section-title contact-title max-w-[10ch]">Agenda una pieza a medida</h2>
        <div className="mt-6 grid gap-3 text-sm text-[var(--muted)]">
          <p className="flex items-center gap-3"><Phone size={16} /> 921 638 910</p>
          <p className="flex items-center gap-3"><MessageCircle size={16} /> contacto@joyaperu.com</p>
          <p className="flex gap-3">
            <MapPin className="mt-0.5 shrink-0" size={16} /> Psj Abelardo Quinones Mz H Lt 6, Villa Maria del Triunfo
          </p>
        </div>
        <div className="mt-5 rounded-2xl border border-black/10 bg-white/75 p-4 shadow-[0_14px_42px_rgba(26,26,26,0.055)]">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-display text-2xl leading-none text-[var(--ink)]">JOYAPERU</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--gold-soft)] px-2.5 py-1 text-[0.7rem] font-bold text-[var(--ink)]">
              5.0 <Star fill="currentColor" size={12} /> (3)
            </span>
            <span className="rounded-full border border-black/10 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
              Joyeria
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[var(--ink)]">
            {["Retiro en tienda", "Entrega a domicilio"].map((service) => (
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5" key={service}>
                <Check className="text-[var(--gold)]" size={14} />
                {service}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-[var(--porcelain-dark)]">
          <iframe
            allowFullScreen
            className="aspect-[16/10] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={googleMapsEmbed}
            title="Mapa de ubicacion JoyasPeru"
          />
          <div className="bg-white/80 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-2xl text-[var(--ink)]">Lima Sur</p>
              <a
                className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-4 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--gold)] hover:text-[var(--ink)]"
                href={googleMapsUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Navigation size={14} />
                Indicaciones
              </a>
            </div>
            <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
              Psj Abelardo Quinones Mz H Lt 6 asoc. De vivienda la Granja, Villa Maria del Triunfo.
            </p>
          </div>
        </div>
      </div>
      <form className="grid gap-5 border border-black/10 bg-white p-5 shadow-[0_16px_55px_rgba(26,26,26,0.05)] md:p-7" onSubmit={handleSubmit}>
        {["nombre", "email", "telefono"].map((field) => (
          <input
            className="min-h-11 border-b border-black/15 bg-transparent text-sm outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
            key={field}
            name={field}
            placeholder={field}
            required={field !== "telefono"}
            type={field === "email" ? "email" : "text"}
          />
        ))}
        <textarea
          className="min-h-28 resize-none border-b border-black/15 bg-transparent py-2.5 text-sm outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
          name="mensaje"
          placeholder="mensaje"
          required
        />
        <button className="mt-1 min-h-12 bg-[var(--ink)] text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--gold)] hover:text-[var(--ink)]">
          Enviar consulta
        </button>
        {status ? <p className="text-sm text-[var(--muted)]">{status}</p> : null}
      </form>
    </section>
  );
}
