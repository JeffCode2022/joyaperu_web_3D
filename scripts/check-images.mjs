import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const targetDir = join(process.cwd(), "public", "images", "clientes");

async function main() {
  const files = await readdir(targetDir);
  for (const file of files) {
    if (!file.endsWith(".jpg")) continue;
    const filePath = join(targetDir, file);
    try {
      const buffer = await readFile(filePath);
      const hex = buffer.slice(0, 4).toString("hex").toUpperCase();
      console.log(`File: ${file}, Size: ${buffer.length} bytes, Magic Bytes: ${hex}`);
    } catch (e) {
      console.error(`Error reading ${file}:`, e.message);
    }
  }
}

main().catch(console.error);
