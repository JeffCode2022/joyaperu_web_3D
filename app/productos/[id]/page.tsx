import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/sections/ProductCard";
import { products } from "@/data/products";
import { allCatalogProducts, getProductById, getRelatedProducts } from "@/lib/catalog";
import { ProductDetailsClient } from "@/components/sections/ProductDetailsClient";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return [...products, ...allCatalogProducts.slice(0, 80)].map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Producto no encontrado | JoyaPerú",
    };
  }

  return {
    title: `${product.name} | JoyaPerú`,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product, 4);

  return (
    <div className="pt-28">
      <ProductDetailsClient product={product} />

      {relatedProducts.length > 0 ? (
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">Tambien puedes adquirir</p>
              <h2 className="font-display text-5xl leading-none text-[var(--ink)]">Productos relacionados</h2>
            </div>
            <Link
              className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]"
              href={product.categorySlug ? `/productos?categoria=${product.categorySlug}#catalogo` : "/productos"}
            >
              Ver categoria
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
