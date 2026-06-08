import { CatalogSection } from "@/components/sections/CatalogSection";

type ProductosPageProps = {
  searchParams: Promise<{ categoria?: string; page?: string }>;
};

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
  const { categoria, page } = await searchParams;
  const initialPage = Number.parseInt(page ?? "1", 10);

  return (
    <div className="pt-24">
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <p className="section-kicker">Productos</p>
        <h1 className="font-display text-5xl leading-none text-[var(--ink)] md:text-6xl">Catalogo JoyasPeru</h1>
      </section>
      <CatalogSection initialCategory={categoria ?? "todo"} initialPage={initialPage} variant="full" />
    </div>
  );
}
