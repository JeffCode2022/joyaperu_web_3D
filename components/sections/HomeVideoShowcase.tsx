import { Sparkles } from "lucide-react";

export function HomeVideoShowcase() {
  return (
    <section className="reveal mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="section-kicker">Movimiento real</p>
          <h2 className="font-display text-5xl leading-none text-[var(--ink)] md:text-7xl">
            La joya debe verse viva antes de llegar a tus manos.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted)]">
            Ubico este video al inicio porque muestra brillo, volumen y detalle de la pieza en movimiento. Es el tipo de
            toma que ayuda a decidir mejor que una foto estatica.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">
            <Sparkles className="text-[var(--gold)]" size={17} />
            Video de pieza en vitrina
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_28px_90px_rgba(26,26,26,0.12)]">
          <video
            aria-label="Anillo de JoyasPeru en movimiento"
            autoPlay
            className="aspect-video w-full object-cover"
            loop
            muted
            playsInline
            poster="/videos/jewel-showcase-poster.webp"
            preload="metadata"
          >
            <source src="/videos/Give_it_movement_various_angles_202605011808.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em]">Detalle, brillo y escala</p>
          </div>
        </div>
      </div>
    </section>
  );
}
