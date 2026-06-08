import Image from "next/image";

export function BrandStory() {
  return (
    <section className="reveal border-y border-black/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <div className="relative min-h-[480px] overflow-hidden">
          <Image
            alt="Pulseras tejidas JoyasPeru"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 92vw, 42vw"
            src="/images/pulseras/set-pulseras-tejidas-corazon-plata-950-11992.webp"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="section-kicker">Nosotros</p>
          <h2 className="section-title">Una joya debe sentirse personal antes de verse costosa.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-[var(--muted)]">
            JoyasPeru combina plata peruana, oro 18k y piezas hechas por encargo con una lectura
            contemporanea: menos ruido, mejores materiales y una experiencia clara desde el primer contacto.
          </p>
          <dl className="mt-10 grid gap-5 sm:grid-cols-3">
            {["Plata 950", "Oro 18k", "Envios Peru"].map((item) => (
              <div className="border-l border-[var(--gold)] pl-4" key={item}>
                <dt className="font-display text-3xl text-[var(--ink)]">{item}</dt>
                <dd className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Garantia y detalle
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
