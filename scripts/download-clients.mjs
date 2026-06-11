import { writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = process.cwd();
const targetDir = join(ROOT, "public", "images", "clientes");
const dlDir = join(targetDir, "downloaded");

const urls = [
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG_20241019_124445-768x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG_20241230_185815-768x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG_20250301_161902-768x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG-20220214-WA0058-593x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG-20220616-WA0003-768x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG-20240614-WA0018-768x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG-20250120-WA01061-768x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG-20250407-WA0030-768x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG-20240907-WA0005-576x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG-20240705-WA0012-771x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG-20240705-WA0008-771x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG-20220616-WA0002-768x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG-20220616-WA0001-768x1024.jpg",
  "https://joyaperu.com/wp-content/uploads/2026/04/IMG-20210805-WA0025-782x1024.jpg"
];

async function main() {
  await mkdir(dlDir, { recursive: true });
  console.log("Downloading images from joyaperu.com...");

  const downloadedFiles = [];

  for (const url of urls) {
    const filename = url.split("/").pop();
    const dest = join(dlDir, filename);

    try {
      console.log(`Fetching: ${url}`);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }
      const buffer = await res.arrayBuffer();
      await writeFile(dest, Buffer.from(buffer));
      const fileStat = await stat(dest);
      downloadedFiles.push({ filename, size: fileStat.size, path: dest });
      console.log(`Saved: ${filename} (${fileStat.size} bytes)`);
    } catch (e) {
      console.error(`Error downloading ${url}:`, e.message);
    }
  }

  // List existing files in public/images/clientes
  const existingFiles = [];
  const dirEntries = await readdir(targetDir, { withFileTypes: true });
  for (const entry of dirEntries) {
    if (entry.isFile() && entry.name.endsWith(".jpg")) {
      const fileStat = await stat(join(targetDir, entry.name));
      existingFiles.push({ name: entry.name, size: fileStat.size });
    }
  }

  console.log("\n--- Comparison Report ---");
  console.log("Local files in public/images/clientes:");
  console.table(existingFiles);

  console.log("\nDownloaded files:");
  console.table(downloadedFiles.map(f => ({ filename: f.filename, size: f.size })));

  // Try to find matches based on exact file size
  console.log("\n--- Suggested Mapping (by exact size) ---");
  for (const dl of downloadedFiles) {
    const match = existingFiles.find(ex => Math.abs(ex.size - dl.size) < 10); // allow small byte difference
    if (match) {
      console.log(`Downloaded ${dl.filename} matches Local ${match.name} (size: ${dl.size} vs ${match.size})`);
    } else {
      console.log(`Downloaded ${dl.filename} has NO local size match`);
    }
  }
}

main().catch(err => {
  console.error("Script failed:", err);
});
