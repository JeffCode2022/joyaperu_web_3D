import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { basename, extname, join } from "node:path";
import { pipeline } from "node:stream/promises";

const SITE = "https://joyaperu.com";
const ROOT = process.cwd();
const originalDir = join(ROOT, "assets", "images", "original");
const dataDir = join(ROOT, "data");

const navigation = [
  "INVERSIONISTA",
  "ORO y PLATA",
  "PULSERAS",
  "COLLARES",
  "CADENAS",
  "ARETES",
  "ANILLOS",
  "AROS DE MATRIMONIO",
  "TOBILLERAS",
  "JUEGOS",
  "JOYAS DE ORO",
  "RELOJES",
  "PERFUMES",
  "JOYAS DE ACERO",
  "OFERTAS",
  "BIENESTAR",
  "SORTEOS JOYAPERU",
  "PACKS DE REGISTROS",
  "OTROS",
  "Verificacion de joyas y lingotes",
];

const stripHtml = (html = "") =>
  html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "-")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "JoyasPeru redesign audit" },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }

  return {
    data: await response.json(),
    total: Number(response.headers.get("x-wp-total") ?? 0),
    pages: Number(response.headers.get("x-wp-totalpages") ?? 1),
  };
}

async function download(url, outputPath) {
  const response = await fetch(url, {
    headers: { "user-agent": "JoyasPeru redesign audit" },
  });

  if (!response.ok || !response.body) {
    throw new Error(`No se pudo descargar ${url}`);
  }

  await pipeline(response.body, createWriteStream(outputPath));
}

async function fetchProducts() {
  const first = await fetchJson(
    `${SITE}/wp-json/wp/v2/product?per_page=100&page=1&_embed=1`,
  );
  const products = [...first.data];

  for (let page = 2; page <= first.pages; page += 1) {
    const result = await fetchJson(
      `${SITE}/wp-json/wp/v2/product?per_page=100&page=${page}&_embed=1`,
    );
    products.push(...result.data);
  }

  return { products, total: first.total, pages: first.pages };
}

function mapProduct(product) {
  const media = product._embedded?.["wp:featuredmedia"]?.[0];
  const terms = product._embedded?.["wp:term"]?.flat() ?? [];
  const categories = terms
    .filter((term) => term?.taxonomy === "product_cat")
    .map((term) => term.name);
  const imageUrl = media?.source_url ?? "";
  const ext = imageUrl ? extname(new URL(imageUrl).pathname) || ".jpg" : ".jpg";
  const imageName = `${product.id}-${slugify(product.title.rendered)}${ext}`;

  return {
    id: product.id,
    name: stripHtml(product.title.rendered),
    slug: product.slug,
    link: product.link,
    description: stripHtml(product.excerpt.rendered || product.content.rendered),
    categories,
    imageUrl,
    imageName,
  };
}

function buildAudit({ products, categories, downloaded }) {
  const sampleProducts = products
    .slice(0, 120)
    .map(
      (product) =>
        `| ${product.id} | ${product.name.replace(/\|/g, "/")} | ${
          product.categories.join(", ") || "Sin categoria"
        } | ${product.imageName} |`,
    )
    .join("\n");

  const imageRows = downloaded
    .map(
      (item) =>
        `| ${item.file} | ${item.productName.replace(/\|/g, "/")} | ${
          item.url
        } |`,
    )
    .join("\n");

  return `# Auditoria del sitio original JoyasPeru

Fuente auditada: ${SITE}
Fecha de auditoria: ${new Date().toISOString()}

## Estructura actual del sitio

\`\`\`text
joyaperu.com
├── Inicio
│   ├── Slider hero/promocional
│   ├── Barras de plata pura 999.9
│   ├── Barras de oro puro 999.9
│   ├── Ofertas
│   ├── Nuestros catalogos
│   ├── Los mas pedidos
│   ├── Novedades
│   ├── Nuestras categorias
│   ├── Anillos
│   ├── Pack de registros
│   └── Nuestros clientes
├── Tienda JOYAPERU
├── Producto individual /producto/[slug]
├── Categoria /categoria-producto/[categoria]
├── Mi cuenta
├── Carrito
├── Finalizar compra
├── Quienes Somos
├── Contacto
├── Politicas de privacidad
└── Sorteos JOYAPERU
\`\`\`

## Navegacion detectada

${navigation.map((item) => `- ${item}`).join("\n")}

## Contacto y redes

- Telefono: 921638910
- Email: contacto@joyaperu.com
- Direccion: Psj Abelardo Quinones Mz H Lt 6 asoc. De vivienda la Granja, Villa Maria del Triunfo
- Redes: Facebook, Instagram, TikTok y YouTube

## Categorias principales

${categories.map((category) => `- ${category}`).join("\n")}

## Catalogo recolectado

- Productos expuestos por WordPress REST API: ${products.length}
- Imagenes destacadas descargadas: ${downloaded.length}
- Nota: la API publica no expone precios de todos los productos sin credenciales WooCommerce; para el rediseño se usa una seleccion editorial con precios visibles en el home original.

| ID | Producto | Categorias | Imagen |
| --- | --- | --- | --- |
${sampleProducts}

## Inventario de imagenes descargadas

| Archivo | Producto | URL original |
| --- | --- | --- |
${imageRows}

## Problemas UX/UI detectados

- Navegacion excesivamente larga con muchas categorias al mismo nivel; complica escaneo y decision.
- Home con demasiadas secciones de venta sin jerarquia clara entre joyeria, inversion, bienestar y packs.
- Productos con naming inconsistente: mayusculas, codigos internos y textos extensos mezclados.
- Densidad visual alta, poco aire y baja sensacion premium para una joyeria.
- CTA repetidos sin distincion clara entre comprar, reservar y consultar.
- Contenido de confianza/contacto queda al final y no acompana el proceso de compra.
- Algunos recursos cargan en formatos legacy y tamanos generados por WordPress sin estrategia editorial responsive.

## Oportunidades de mejora

- Convertir la navegacion en una estructura corta: Inicio, Productos, Nosotros y Contacto.
- Elevar categorias principales con tarjetas visuales: Anillos, Collares, Aretes y Pulseras.
- Crear un hero editorial con una pieza protagonista y CTA de catalogo.
- Separar narrativa de marca, prueba social y contacto para construir confianza.
- Usar tipografia serif editorial para lujo y sans limpia para lectura.
- Optimizar imagenes a WebP 800/1600 px con fallback JPG/PNG.
- Aplicar animaciones solo en transform/opacity y respetar prefers-reduced-motion.
`;
}

async function main() {
  await mkdir(originalDir, { recursive: true });
  await mkdir(dataDir, { recursive: true });

  const { products } = await fetchProducts();
  const mapped = products.map(mapProduct).filter((product) => product.imageUrl);
  const categories = [
    ...new Set(mapped.flatMap((product) => product.categories).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b, "es"));

  const downloaded = [];
  for (const product of mapped) {
    const outputPath = join(originalDir, product.imageName);
    try {
      await download(product.imageUrl, outputPath);
      downloaded.push({
        file: product.imageName,
        productName: product.name,
        url: product.imageUrl,
      });
      process.stdout.write(`Descargada ${downloaded.length}/${mapped.length}: ${basename(outputPath)}\n`);
    } catch (error) {
      process.stderr.write(`${error.message}\n`);
    }
  }

  await writeFile(join(dataDir, "source-products.json"), JSON.stringify(mapped, null, 2));
  await writeFile(
    join(ROOT, "AUDITORIA.md"),
    buildAudit({ products: mapped, categories, downloaded }),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
