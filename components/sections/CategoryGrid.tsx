import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";

export function CategoryGrid() {
  return (
    <section className="reveal mx-auto max-w-7xl px-5 py-24 md:px-8">
      <p className="section-kicker">Categorias</p>
      <h2 className="section-title mb-10">Compra por tipo de pieza</h2>
      <div className="grid gap-5 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            className="group relative aspect-[3/4] overflow-hidden bg-[var(--ink)]"
            href={`/productos?categoria=${category.name}`}
            key={category.name}
          >
            <Image
              alt={category.name}
              className="object-cover opacity-85 transition duration-700 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 92vw, 24vw"
              src={category.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <h3 className="font-display text-4xl">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">{category.copy}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
