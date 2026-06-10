import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck, Undo2 } from "lucide-react";
import { ProductCard } from "@/components/sections/ProductCard";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { products } from "@/data/products";
import { allCatalogProducts, getProductById, getRelatedProducts } from "@/lib/catalog";

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
  const galleryImages = [product.image];
  const whatsappText = `Hola JoyaPerú, quiero consultar por ${product.name}.`;

  return (
    <div className="pt-28">
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.05fr_0.95fr] md:px-8">
        <div className="grid gap-4 md:grid-cols-[96px_1fr]">
          <div className="order-2 grid grid-cols-3 gap-3 md:order-1 md:grid-cols-1">
            {galleryImages.map((image, index) => (
              <div
                className="relative aspect-square overflow-hidden rounded-[1.25rem] border border-black/10 bg-white"
                key={`${image}-${index}`}
              >
                <Image
                  alt={`${product.name} vista ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="96px"
                  src={image}
                />
              </div>
            ))}
          </div>
          <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_28px_90px_rgba(26,26,26,0.10)] md:order-2">
            <Image
              alt={product.name}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 48vw"
              src={product.image}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Link
            className="mb-6 inline-flex w-fit text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]"
            href={product.categorySlug ? `/productos?categoria=${product.categorySlug}#catalogo` : "/productos#catalogo"}
          >
            {product.category}
          </Link>
          <h1 className="font-display text-6xl leading-[0.9] text-[var(--ink)] md:text-7xl">{product.name}</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted)]">{product.description}</p>

          <div className="mt-8 flex flex-col gap-4 border-y border-black/10 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Precio</p>
              <strong className="mt-1 block font-display text-4xl text-[var(--ink)]">{product.price}</strong>
            </div>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 text-sm font-bold uppercase tracking-[0.13em] text-white transition hover:-translate-y-0.5"
              href={`https://wa.me/51921638910?text=${encodeURIComponent(whatsappText)}`}
              rel="noreferrer"
              target="_blank"
            >
              <WhatsAppIcon size={20} />
              Consultar
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, label: "Compra segura", copy: "Atencion directa por WhatsApp." },
              { icon: Truck, label: "Envios", copy: "Despacho coordinado a todo Peru." },
              { icon: Undo2, label: "Personalizacion", copy: "Grabados y detalles a consulta." },
            ].map((item) => (
              <div className="rounded-[1.25rem] border border-black/10 bg-white/70 p-4" key={item.label}>
                <item.icon className="text-[var(--gold)]" size={22} />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-[var(--ink)]">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-black/10 bg-white/70 p-5">
            <h2 className="font-display text-3xl text-[var(--ink)]">Informacion</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)]">
              <li>Categoria: {product.category}</li>
              <li>Disponibilidad y medidas sujetas a confirmacion por asesoria.</li>
              <li>Precio referencial del catalogo actual. Consulta promociones vigentes.</li>
            </ul>
          </div>
        </div>
      </section>

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
