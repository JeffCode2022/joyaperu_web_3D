export function ArtisanVideoStory() {
  return (
    <section className="reveal mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[var(--ink)] shadow-[0_28px_90px_rgba(26,26,26,0.14)]">
          <video
            aria-label="Artesano peruano trabajando una pieza de joyeria"
            autoPlay
            className="aspect-video w-full object-cover opacity-95"
            loop
            muted
            playsInline
            poster="/videos/artisan-process-poster.webp"
            preload="metadata"
          >
            <source src="/videos/video_de_un_artesano_peruano_r.mp4" type="video/mp4" />
          </video>
        </div>

        <div>
          <p className="section-kicker">Proceso</p>
          <h2 className="font-display text-5xl leading-none text-[var(--ink)] md:text-7xl">
            Oficio, calor y precision peruana.
          </h2>
          <p className="mt-6 text-base leading-8 text-[var(--muted)]">
            Este video funciona mejor en Nosotros porque cuenta el lado humano de la joyeria: manos, fuego y control del
            material antes del acabado final.
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {["Trabajo manual", "Acabado fino", "Asesoria directa"].map((item) => (
              <div className="rounded-full border border-black/10 bg-white/70 px-5 py-4" key={item}>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">{item}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
