import { featuredProducts } from "@/data/products";
import { ProductCard } from "@/components/sections/ProductCard";

export function FeaturedProducts() {
  return (
    <section className="reveal mx-auto max-w-7xl px-5 py-16 md:px-8">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="section-kicker">Seleccion editorial</p>
          <h2 className="section-title">Los mas pedidos</h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
          Una vitrina curada con piezas reales del catalogo actual, optimizadas para carga rapida.
        </p>
      </div>
      <div className="products-grid grid gap-5 md:grid-cols-4">
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} priority={index < 2} product={product} />
        ))}
      </div>
    </section>
  );
}
