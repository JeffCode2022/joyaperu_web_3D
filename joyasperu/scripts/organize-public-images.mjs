import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, dirname, extname, join, parse, resolve } from "node:path";

const ROOT = process.cwd();
const publicImagesDir = resolve(ROOT, "public", "images");
const productsDir = join(publicImagesDir, "products");
const sourceProductsPath = join(ROOT, "data", "source-products.json");
const reportPath = join(ROOT, "IMAGE_CLASSIFICATION_REPORT.md");

const categoryFolders = [
  "inversionista",
  "oro-y-plata",
  "pulseras",
  "collares",
  "cadenas",
  "aretes",
  "anillos",
  "aros-de-matrimonio",
  "tobilleras",
  "juegos",
  "joyas-de-oro",
  "relojes",
  "perfumes",
  "joyas-de-acero",
  "ofertas",
  "bienestar",
  "sorteos-joyaperu",
  "packs-de-registros",
  "otros",
  "verificacion-joyas-y-lingotes",
];

const categoryPriority = [
  { folder: "inversionista", match: ["INVERSIONISTA"] },
  { folder: "oro-y-plata", match: ["ORO y PLATA"] },
  {
    folder: "joyas-de-oro",
    match: ["JOYAS DE ORO", "Collares para mujer Oro", "Aretes de oro"],
  },
  {
    folder: "aros-de-matrimonio",
    match: ["Aros de matrimonio oro", "Aros de matrimonio plata", "Aros de Matrimonio"],
  },
  { folder: "cadenas", match: ["Cadenas"] },
  {
    folder: "pulseras",
    match: [
      "Pulseras",
      "Pulseras para Mujer",
      "Pulseras para Hombre",
      "Pulseras para BEBES Y NIÑOS",
      "pulseras para Parejas",
    ],
  },
  {
    folder: "collares",
    match: ["collares", "Collar para Mujer", "Collar para Hombre", "Collar para Niñas", "Collar para Parejas"],
  },
  {
    folder: "aretes",
    match: ["Aretes", "Aretes para Mujer", "Aretes niñas", "Aretes para Hombre", "Aretes para Bebe"],
  },
  {
    folder: "anillos",
    match: ["anillos", "Anillos de Compromiso", "Anillos para parejas", "Anillos para Hombre"],
  },
  { folder: "tobilleras", match: ["TOBILLERAS"] },
  { folder: "juegos", match: ["JUEGOS"] },
  { folder: "relojes", match: ["Reloj", "Reloj para Dama"] },
  { folder: "perfumes", match: ["PERFUMES", "Perfume para hombre", "Perfumes para dama"] },
  { folder: "joyas-de-acero", match: ["Joyas de Acero"] },
  { folder: "ofertas", match: ["Ofertas"] },
  { folder: "bienestar", match: ["BIENESTAR"] },
  { folder: "sorteos-joyaperu", match: ["SORTEOS JOYAPERÚ"] },
  { folder: "packs-de-registros", match: ["PACKS DE REGISTROS"] },
  { folder: "verificacion-joyas-y-lingotes", match: ["Verificacion de joyas y lingotes"] },
  { folder: "otros", match: ["otros", "REGALOS"] },
];

const visualNameOverrides = new Map([
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

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 92);

const getWebpName = (imageName) => `${parse(imageName).name}.webp`;

function getFolder(categories = [], name = "") {
  for (const rule of categoryPriority) {
    if (rule.match.some((category) => categories.includes(category))) {
      return rule.folder;
    }
  }

  const value = name.toLowerCase();
  if (value.includes("barra") || value.includes("lingote")) return "oro-y-plata";
  if (value.includes("reloj")) return "relojes";
  if (value.includes("perfume")) return "perfumes";
  if (value.includes("tobillera")) return "tobilleras";
  if (value.includes("cadena")) return "cadenas";
  if (value.includes("juego")) return "juegos";
  if (value.includes("anillo") || value.includes("aro de matrimonio")) return "anillos";
  if (value.includes("arete")) return "aretes";
  if (value.includes("pulsera") || value.includes("brazalete")) return "pulseras";
  if (value.includes("collar") || value.includes("dije")) return "collares";

  return "otros";
}

async function listWebpFiles(dir) {
  if (!existsSync(dir)) return [];

  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listWebpFiles(fullPath)));
    } else if (extname(entry.name).toLowerCase() === ".webp") {
      files.push(fullPath);
    }
  }

  return files;
}

function createIndexedProducts(products) {
  const index = new Map();
  for (const product of products) {
    index.set(getWebpName(product.imageName), product);
  }
  return index;
}

async function safeRename(from, to) {
  const resolvedFrom = resolve(from);
  const resolvedTo = resolve(to);
  const resolvedToParent = resolve(dirname(to));

  if (!resolvedFrom.startsWith(publicImagesDir) || !resolvedToParent.startsWith(publicImagesDir)) {
    throw new Error(`Unsafe move: ${from} -> ${to}`);
  }

  await mkdir(dirname(resolvedTo), { recursive: true });

  if (resolvedFrom === resolvedTo) return false;

  if (existsSync(resolvedTo)) {
    const fromStat = await stat(resolvedFrom);
    const toStat = await stat(resolvedTo);
    if (fromStat.size === toStat.size) return false;
    throw new Error(`Target exists with different size: ${resolvedTo}`);
  }

  await rename(resolvedFrom, resolvedTo);
  return true;
}

async function main() {
  const products = JSON.parse(await readFile(sourceProductsPath, "utf8"));
  const productIndex = createIndexedProducts(products);

  for (const folder of categoryFolders) {
    await mkdir(join(publicImagesDir, folder), { recursive: true });
  }
  await mkdir(productsDir, { recursive: true });

  const files = await listWebpFiles(publicImagesDir);
  const rows = [];
  const counts = new Map(categoryFolders.map((folder) => [folder, 0]));

  for (const file of files) {
    const currentName = basename(file);
    const product =
      productIndex.get(currentName) ??
      products.find((item) => currentName.endsWith(`-${item.id}.webp`) || currentName.startsWith(`${item.id}-`));

    if (!product) {
      rows.push({ from: file, to: file, folder: "sin-clasificar", product: currentName, moved: false });
      continue;
    }

    const folder = getFolder(product.categories, product.name);
    const targetName = `${visualNameOverrides.get(product.id) ?? `${slugify(product.name)}-${product.id}`}.webp`;
    const targetPath = join(publicImagesDir, folder, targetName);
    const moved = await safeRename(file, targetPath);
    counts.set(folder, (counts.get(folder) ?? 0) + 1);
    rows.push({
      from: file.replace(`${ROOT}\\`, ""),
      to: targetPath.replace(`${ROOT}\\`, ""),
      folder,
      product: product.name,
      moved,
    });
  }

  const report = `# Image Classification Report

Imagenes WebP clasificadas desde el catalogo publico de JoyasPeru.

## Resumen por carpeta

| Carpeta | Cantidad |
| --- | ---: |
${[...counts.entries()].map(([folder, count]) => `| public/images/${folder} | ${count} |`).join("\n")}

## Inventario

| Carpeta | Producto | Ruta final |
| --- | --- | --- |
${rows
  .filter((row) => row.folder !== "sin-clasificar")
  .sort((a, b) => a.folder.localeCompare(b.folder) || a.product.localeCompare(b.product))
  .map((row) => `| ${row.folder} | ${row.product.replace(/\|/g, "/")} | ${row.to.replaceAll("\\", "/")} |`)
  .join("\n")}
`;

  await writeFile(reportPath, report);

  if (existsSync(productsDir) && (await readdir(productsDir)).length === 0) {
    await rm(productsDir, { recursive: false });
  }

  process.stdout.write(`Clasificadas: ${rows.filter((row) => row.folder !== "sin-clasificar").length}\n`);
  process.stdout.write(`Sin clasificar: ${rows.filter((row) => row.folder === "sin-clasificar").length}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
