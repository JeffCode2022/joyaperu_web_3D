const brands = [
  "JoyasPeru",
  "Plata 950",
  "Oro 18k",
  "Tous",
  "Van Cleef",
  "Cartier",
  "Pandora",
  "Swarovski",
];

export function BrandMarquee() {
  const repeatedBrands = [...brands, ...brands];

  return (
    <section className="reveal border-y border-black/10 bg-white/72 py-14">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Marcas y referencias</p>
            <h2 className="font-display text-5xl leading-none text-[var(--ink)]">Lineas solicitadas en tienda</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
            Wordmarks de referencia para piezas, estilos y materiales que los clientes consultan con frecuencia.
          </p>
        </div>
      </div>
      <div className="brand-marquee overflow-hidden">
        <div className="brand-track flex w-max gap-4">
          {repeatedBrands.map((brand, index) => (
            <div
              className="flex h-24 min-w-56 items-center justify-center rounded-full border border-black/10 bg-[var(--porcelain)] px-8 font-display text-3xl text-[var(--ink)] shadow-[0_14px_45px_rgba(26,26,26,0.06)]"
              key={`${brand}-${index}`}
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
