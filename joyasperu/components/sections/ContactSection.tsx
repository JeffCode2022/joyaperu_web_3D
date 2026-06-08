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
    <section className="reveal mx-auto grid max-w-7xl gap-8 px-5 py-24 md:grid-cols-[1fr_1.1fr] md:px-8" id="contacto">
      <div>
        <p className="section-kicker">Contacto</p>
        <h2 className="section-title">Agenda una pieza a medida</h2>
        <div className="mt-8 grid gap-4 text-sm text-[var(--muted)]">
          <p className="flex gap-3"><Phone size={18} /> 921 638 910</p>
          <p className="flex gap-3"><MessageCircle size={18} /> contacto@joyaperu.com</p>
          <p className="flex gap-3">
            <MapPin size={18} /> Psj Abelardo Quinones Mz H Lt 6, Villa Maria del Triunfo
          </p>
        </div>
        <div className="mt-6 rounded-[1.5rem] border border-black/10 bg-white/75 p-5 shadow-[0_16px_50px_rgba(26,26,26,0.06)]">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-display text-3xl leading-none text-[var(--ink)]">JOYAPERU</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--gold-soft)] px-3 py-1 text-xs font-bold text-[var(--ink)]">
              5.0 <Star fill="currentColor" size={13} /> (3)
            </span>
            <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
              Joyeria
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ink)]">
            {["Retiro en tienda", "Entrega a domicilio"].map((service) => (
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-2" key={service}>
                <Check className="text-[var(--gold)]" size={15} />
                {service}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-black/10 bg-[var(--porcelain-dark)]">
          <iframe
            allowFullScreen
            className="aspect-[4/3] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={googleMapsEmbed}
            title="Mapa de ubicacion JoyasPeru"
          />
          <div className="bg-white/80 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-3xl text-[var(--ink)]">Lima Sur</p>
              <a
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--gold)] hover:text-[var(--ink)]"
                href={googleMapsUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Navigation size={15} />
                Indicaciones
              </a>
            </div>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
              Psj Abelardo Quinones Mz H Lt 6 asoc. De vivienda la Granja, Villa Maria del Triunfo.
            </p>
          </div>
        </div>
      </div>
      <form className="grid gap-4 border border-black/10 bg-white p-6 md:p-8" onSubmit={handleSubmit}>
        {["nombre", "email", "telefono"].map((field) => (
          <input
            className="min-h-12 border-b border-black/15 bg-transparent text-sm outline-none focus:border-[var(--gold)]"
            key={field}
            name={field}
            placeholder={field}
            required={field !== "telefono"}
            type={field === "email" ? "email" : "text"}
          />
        ))}
        <textarea
          className="min-h-36 resize-none border-b border-black/15 bg-transparent py-3 text-sm outline-none focus:border-[var(--gold)]"
          name="mensaje"
          placeholder="mensaje"
          required
        />
        <button className="min-h-12 bg-[var(--ink)] text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--gold)] hover:text-[var(--ink)]">
          Enviar consulta
        </button>
        {status ? <p className="text-sm text-[var(--muted)]">{status}</p> : null}
      </form>
    </section>
  );
}
