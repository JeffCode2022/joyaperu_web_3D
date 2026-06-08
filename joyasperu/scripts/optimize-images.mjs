import { mkdir, readdir, stat, writeFile, copyFile } from "node:fs/promises";
import { extname, join, parse } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const inputDir = join(ROOT, "assets", "images", "original");
const webp800Dir = join(ROOT, "assets", "images", "webp", "800");
const webp1600Dir = join(ROOT, "assets", "images", "webp", "1600");
const fallbackDir = join(ROOT, "assets", "images", "fallback");
const publicImagesDir = join(ROOT, "public", "images");
const publicProductsDir = join(publicImagesDir, "products");
const categorizedPublicImages = new Map([
  ["1125-aretes-bola-tous.webp", "aretes/aretes-bola-tous-plata-950-1125.webp"],
  [
    "11917-aretes-perlas-de-rio-reversibles.webp",
    "aretes/aretes-perlas-rio-reversibles-plata-950-11917.webp",
  ],
  ["758-corazon-personalizado.webp", "collares/collar-corazon-personalizado-plata-950-758.webp"],
  [
    "685-collar-para-el-038-para-ella.webp",
    "collares/collares-pareja-corazon-llave-plata-950-685.webp",
  ],
  ["645-collar-lomo-cartier.webp", "collares/collar-lomo-cartier-plata-950-645.webp"],
  [
    "11990-collar-abrazo-eterno-mama-e-nino.webp",
    "collares/collar-hada-colgante-plata-950-11990.webp",
  ],
  ["10085-collar-girasol-plata-950.webp", "collares/collar-girasol-plata-950-10085.webp"],
  ["11837-anillos-promesa.webp", "anillos/anillos-promesa-plata-950-11837.webp"],
  ["3894-jpac70.webp", "anillos/anillo-compromiso-circon-plata-950-3894.webp"],
  [
    "2540-anillos-corazon-de-cristal.webp",
    "anillos/anillos-pareja-circon-plata-950-2540.webp",
  ],
  [
    "11992-set-pulseras-tejidas-corazon-plata-950.webp",
    "pulseras/set-pulseras-tejidas-corazon-plata-950-11992.webp",
  ],
  ["11276-pulsera-van-cleef-plata-950.webp", "pulseras/pulsera-van-cleef-plata-950-11276.webp"],
]);

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

async function main() {
  await Promise.all([
    mkdir(webp800Dir, { recursive: true }),
    mkdir(webp1600Dir, { recursive: true }),
    mkdir(fallbackDir, { recursive: true }),
    mkdir(publicProductsDir, { recursive: true }),
    mkdir(join(publicImagesDir, "anillos"), { recursive: true }),
    mkdir(join(publicImagesDir, "collares"), { recursive: true }),
    mkdir(join(publicImagesDir, "aretes"), { recursive: true }),
    mkdir(join(publicImagesDir, "pulseras"), { recursive: true }),
  ]);

  const files = (await readdir(inputDir)).filter((file) =>
    imageExtensions.has(extname(file).toLowerCase()),
  );

  const rows = [];

  for (const file of files) {
    const source = join(inputDir, file);
    const original = await stat(source);
    const name = parse(file).name;
    const fallback = join(fallbackDir, file);
    const webp800 = join(webp800Dir, `${name}.webp`);
    const webp1600 = join(webp1600Dir, `${name}.webp`);
    const publicFile = categorizedPublicImages.get(`${name}.webp`);
    const publicWebp = publicFile
      ? join(publicImagesDir, publicFile)
      : join(publicProductsDir, `${name}.webp`);

    await copyFile(source, fallback);

    await sharp(source)
      .rotate()
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 85, effort: 5 })
      .toFile(webp800);

    await sharp(source)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 85, effort: 5 })
      .toFile(webp1600);

    await copyFile(webp800, publicWebp);

    const optimized = await stat(webp800);
    const savings = Math.max(0, 1 - optimized.size / original.size) * 100;
    rows.push({
      file,
      original: original.size,
      optimized: optimized.size,
      savings,
    });
    process.stdout.write(`Optimizada ${rows.length}/${files.length}: ${file}\n`);
  }

  const totalOriginal = rows.reduce((sum, row) => sum + row.original, 0);
  const totalOptimized = rows.reduce((sum, row) => sum + row.optimized, 0);
  const totalSavings = Math.max(0, 1 - totalOptimized / totalOriginal) * 100;

  const report = `# Image Report

Fuente: \`assets/images/original\`
Salida WebP: \`assets/images/webp/800\` y \`assets/images/webp/1600\`
Salida publica usada por Next: \`public/images/products\`
Calidad WebP: 85

## Resumen

- Imagenes procesadas: ${rows.length}
- Peso original total: ${formatBytes(totalOriginal)}
- Peso optimizado total (@1x 800px): ${formatBytes(totalOptimized)}
- Ahorro total estimado: ${totalSavings.toFixed(1)}%

| Imagen | Original | WebP 800 | Ahorro |
| --- | ---: | ---: | ---: |
${rows
  .map(
    (row) =>
      `| ${row.file} | ${formatBytes(row.original)} | ${formatBytes(
        row.optimized,
      )} | ${row.savings.toFixed(1)}% |`,
  )
  .join("\n")}
`;

  await writeFile(join(ROOT, "IMAGE_REPORT.md"), report);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
