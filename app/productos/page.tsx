import { CatalogSection } from "@/components/sections/CatalogSection";

type ProductosPageProps = {
  searchParams: Promise<{ categoria?: string; page?: string }>;
};

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
  const { categoria, page } = await searchParams;
  const initialPage = Number.parseInt(page ?? "1", 10);

  return (
    <div className="pt-24">
      <CatalogSection initialCategory={categoria ?? "todo"} initialPage={initialPage} variant="full" />
    </div>
  );
}
