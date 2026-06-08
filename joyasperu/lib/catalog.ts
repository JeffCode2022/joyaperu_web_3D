import sourceProducts from "@/data/source-products.json";
import { navigationCategories } from "@/data/navigation-categories";
import { products } from "@/data/products";
import type { Product } from "@/types/product";

type SourceProduct = {
  id: number;
  name: string;
  description: string;
  categories: string[];
};

const categoryPriority = [
  { slug: "inversionista", match: ["INVERSIONISTA"] },
  { slug: "oro-y-plata", match: ["ORO y PLATA"] },
  { slug: "joyas-de-oro", match: ["JOYAS DE ORO", "Collares para mujer Oro", "Aretes de oro"] },
  {
    slug: "aros-de-matrimonio",
    match: ["Aros de matrimonio oro", "Aros de matrimonio plata", "Aros de Matrimonio"],
  },
  { slug: "cadenas", match: ["Cadenas"] },
  {
    slug: "pulseras",
    match: [
      "Pulseras",
      "Pulseras para Mujer",
      "Pulseras para Hombre",
      "Pulseras para BEBES Y NIÑOS",
      "pulseras para Parejas",
    ],
  },
  {
    slug: "collares",
    match: ["collares", "Collar para Mujer", "Collar para Hombre", "Collar para Niñas", "Collar para Parejas"],
  },
  { slug: "aretes", match: ["Aretes", "Aretes para Mujer", "Aretes niñas", "Aretes para Hombre", "Aretes para Bebe"] },
  { slug: "anillos", match: ["anillos", "Anillos de Compromiso", "Anillos para parejas", "Anillos para Hombre"] },
  { slug: "tobilleras", match: ["TOBILLERAS"] },
  { slug: "juegos", match: ["JUEGOS"] },
  { slug: "relojes", match: ["Reloj", "Reloj para Dama"] },
  { slug: "perfumes", match: ["PERFUMES", "Perfume para hombre", "Perfumes para dama"] },
  { slug: "joyas-de-acero", match: ["Joyas de Acero"] },
  { slug: "ofertas", match: ["Ofertas"] },
  { slug: "bienestar", match: ["BIENESTAR"] },
  { slug: "sorteos-joyaperu", match: ["SORTEOS JOYAPERÚ"] },
  { slug: "packs-de-registros", match: ["PACKS DE REGISTROS"] },
  { slug: "verificacion-joyas-y-lingotes", match: ["Verificacion de joyas y lingotes"] },
  { slug: "otros", match: ["otros", "REGALOS"] },
];

const visualNameOverrides = new Map<number, string>([
  [1125, "aretes-bola-tous-plata-950-1125"],
  [11917, "aretes-perlas-rio-reversibles-plata-950-11917"],
  [758, "collar-corazon-personalizado-plata-950-758"],
  [685, "collares-pareja-corazon-llave-plata-950-685"],
  [645, "collar-lomo-cartier-plata-950-645"],
  [11990, "collar-hada-colgante-plata-950-11990"],
  [11837, "anillos-promesa-plata-950-11837"],
  [3894, "anillo-compromiso-circon-plata-950-3894"],
  [2540, "anillos-pareja-circon-plata-950-2540"],
]);

const curatedPrices = new Map<string, string>([
  ["1125", "S/110.00"],
  ["758", "S/278.95"],
  ["685", "S/632.00"],
  ["645", "S/855.60"],
  ["11992", "S/187.53"],
  ["11990", "S/246.13"],
  ["11917", "S/105.49"],
  ["3894", "S/386.75"],
  ["11837", "S/398.50"],
  ["11276", "S/312.00"],
  ["10085", "S/215.00"],
  ["2540", "S/410.04"],
]);

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 92);

function resolveCategory(product: SourceProduct) {
  const rule = categoryPriority.find((item) => item.match.some((category) => product.categories.includes(category)));
  if (rule) return rule.slug;

  const name = product.name.toLowerCase();
  if (name.includes("barra") || name.includes("lingote")) return "oro-y-plata";
  if (name.includes("reloj")) return "relojes";
  if (name.includes("perfume")) return "perfumes";
  if (name.includes("tobillera")) return "tobilleras";
  if (name.includes("cadena")) return "cadenas";
  if (name.includes("juego")) return "juegos";
  if (name.includes("anillo") || name.includes("aro de matrimonio")) return "anillos";
  if (name.includes("arete")) return "aretes";
  if (name.includes("pulsera") || name.includes("brazalete")) return "pulseras";
  if (name.includes("collar") || name.includes("dije")) return "collares";
  return "otros";
}

const clipDescription = (value: string) => {
  if (!value) return "Producto del catalogo JoyasPeru disponible para consulta.";
  return value.length > 138 ? `${value.slice(0, 138).trim()}...` : value;
};

export const allCatalogProducts: Product[] = (sourceProducts as SourceProduct[]).map((product) => {
  const slug = resolveCategory(product);
  const category = navigationCategories.find((item) => item.slug === slug);
  const fileName = `${visualNameOverrides.get(product.id) ?? `${slugify(product.name)}-${product.id}`}.webp`;

  return {
    id: String(product.id),
    name: product.name,
    category: category?.label ?? "Otros",
    categorySlug: slug,
    price: curatedPrices.get(String(product.id)) ?? "Consultar",
    image: `/images/${slug}/${fileName}`,
    description: clipDescription(product.description),
  };
});

export function getCatalogLabel(slug: string) {
  return navigationCategories.find((category) => category.slug === slug)?.label ?? "Todo";
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id) ?? allCatalogProducts.find((product) => product.id === id);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return allCatalogProducts
    .filter(
      (item) =>
        item.id !== product.id &&
        (product.categorySlug ? item.categorySlug === product.categorySlug : item.category === product.category),
    )
    .slice(0, limit);
}
