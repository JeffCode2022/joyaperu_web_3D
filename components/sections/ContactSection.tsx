"use client";

import { FormEvent, useState } from "react";
import { Check, Mail, MapPin, Navigation, Shield, Star, Truck, User } from "lucide-react";

const googleMapsQuery =
  "JOYAPERU Psj Abelardo Quinones Mz H Lt 6 asoc. De vivienda la Granja Villa Maria del Triunfo";
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(googleMapsQuery)}`;
const googleMapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(googleMapsQuery)}&z=17&output=embed`;
const whatsappNumber = "51921638910";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, me gustaría solicitar una asesoría para una pieza de joyería.")}`;

const PIECE_TYPES = ["Anillo", "Collar", "Pulsera", "Argolla", "Aretes", "Cadena", "Dije", "Otro"];

export function ContactSection() {
  const [status, setStatus] = useState<string>("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", { method: "POST", body: form });
    setStatus(response.ok ? "¡Solicitud enviada! Te contactaremos pronto." : "No se pudo enviar. Intenta nuevamente.");
    setSending(false);
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <section className="reveal mx-auto max-w-5xl px-4 py-10 md:px-6 lg:py-14" id="contacto">
      <div className="grid items-stretch gap-5 md:grid-cols-2">

        {/* ── Columna izquierda ── */}
        <div>
          <p className="section-kicker mb-1.5">Contacto</p>
          <h2 className="section-title contact-title">Agenda una pieza a medida</h2>
          <div className="contact-divider" />

          <p className="mt-3 max-w-[36ch] text-[0.82rem] leading-6 text-[var(--muted)]">
            Cuéntanos qué pieza deseas y recibe asesoría personalizada para crear o elegir la joya perfecta.
          </p>

          {/* Info de contacto */}
          <div className="contact-info-card mt-3 bg-white">
            <a className="contact-info-row flex items-center" href={whatsappUrl} rel="noreferrer" target="_blank">
              <span className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width={11} height={11}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <span>WhatsApp: 921 638 910</span>
            </a>
            <a className="contact-info-row flex items-center" href="mailto:contacto@joyaperu.com">
              <span className="contact-info-icon"><Mail size={11} /></span>
              <span>contacto@joyaperu.com</span>
            </a>
            <div className="contact-info-row flex items-start">
              <span className="contact-info-icon mt-0.5"><MapPin size={11} /></span>
              <div>
                <span>Psj Abelardo Quiñones Mz H Lt 6,</span>
                <br />
                <span>Villa Maria del Triunfo</span>
              </div>
            </div>
          </div>

          {/* Google badge */}
          <div className="contact-google-card mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="font-display text-[1rem] font-bold leading-none text-[var(--ink)] tracking-wider">JOYAPERÚ</p>
                <div className="flex items-center gap-1">
                  <span className="text-[0.7rem] font-bold text-[var(--ink)]">5.0</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} fill="var(--gold)" color="var(--gold)" size={9} />
                    ))}
                  </div>
                </div>
              </div>
              <span className="rounded-md border border-black/10 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-[var(--muted)] bg-white">
                Joyería
              </span>
            </div>
            <div className="mt-2 flex gap-2">
              {["Retiro en tienda", "Entrega a domicilio"].map((s) => (
                <span
                  key={s}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-md border border-black/8 px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.05em] text-[var(--ink)] bg-white shadow-sm"
                >
                  <span className="text-[var(--gold)] font-bold text-[0.7rem] leading-none">✓</span>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Mapa */}
          <div className="contact-map mt-2">
            <iframe
              allowFullScreen
              className="w-full"
              style={{ height: "130px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={googleMapsEmbed}
              title="Mapa de ubicación JoyaPerú"
            />
            <div className="contact-map-footer bg-white">
              <div>
                <p className="font-display text-[1rem] font-bold leading-none text-[var(--ink)]">Lima Sur</p>
                <p className="text-[0.68rem] leading-4 text-[var(--muted)] mt-1">
                  Psj Abelardo Quiñones Mz H Lt 6, Villa María del Triunfo, Lima - Perú.
                </p>
              </div>
              <a className="contact-map-btn" href={googleMapsUrl} rel="noreferrer" target="_blank">
                <Navigation size={10} className="fill-current text-[var(--gold)]" />
                Ver ubicación
              </a>
            </div>
          </div>

          {/* Badges de confianza */}
          <div className="contact-trust-card mt-2">
            {[
              { icon: <User size={12} />, label: "Atención\npersonalizada" },
              { icon: <Shield size={12} />, label: "Plata 950\ncertificada" },
              { icon: <Truck size={12} />, label: "Envíos a\ntodo Perú" },
            ].map(({ icon, label }) => (
              <div key={label} className="contact-trust-item">
                <span className="contact-trust-icon-circle">{icon}</span>
                <span className="contact-trust-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Columna derecha: formulario ── */}
        <div className="contact-form-card flex flex-col h-full bg-white border-[rgba(26,26,26,0.08)] shadow-lg">
          <div className="contact-form-diamond text-[var(--gold)]">✧</div>
          <h3 className="contact-form-title text-[var(--ink)]">Solicita una asesoría</h3>
          <div className="contact-form-line">✦</div>

          <form className="mt-4 flex flex-col flex-1 justify-between gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3.5">
              <div className="contact-field">
                <label className="contact-label" htmlFor="cf-nombre">Nombre completo</label>
                <input className="contact-input" id="cf-nombre" name="nombre" placeholder="Ingresa tu nombre completo" required type="text" />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="cf-whatsapp">WhatsApp</label>
                <input className="contact-input" id="cf-whatsapp" name="whatsapp" placeholder="921 638 910" type="tel" />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="cf-email">Email</label>
                <input className="contact-input" id="cf-email" name="email" placeholder="tu@email.com" required type="email" />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="cf-pieza">Tipo de pieza</label>
                <div className="contact-select-wrap">
                  <select className="contact-select" id="cf-pieza" name="pieza" defaultValue="">
                    <option value="" disabled>Ej: Anillo, collar, pulsera, argolla, etc.</option>
                    {PIECE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <span className="contact-select-chevron">▾</span>
                </div>
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="cf-mensaje">Mensaje</label>
                <textarea
                  className="contact-textarea"
                  id="cf-mensaje"
                  name="mensaje"
                  placeholder="Cuéntanos los detalles de la pieza que deseas..."
                  required
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-auto grid gap-2.5 pt-2">
              <button className="contact-submit-btn" disabled={sending} type="submit">
                <span>{sending ? "Enviando…" : "Enviar consulta"}</span>
                {!sending && <span className="contact-submit-arrow">➔</span>}
              </button>

              <a className="contact-wa-btn" href={whatsappUrl} rel="noreferrer" target="_blank">
                <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Consultar por WhatsApp</span>
              </a>

              {status && (
                <p className={`rounded-lg px-3 py-2 text-center text-xs font-medium ${status.includes("enviada") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                  {status}
                </p>
              )}
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
