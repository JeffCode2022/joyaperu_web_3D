import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const ignoreDirs = new Set(["node_modules", ".next", ".git", ".codex-artifacts", "artifacts"]);

async function scan(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) continue;
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await scan(fullPath)));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (imageExtensions.has(ext)) {
        files.push(fullPath.replace(ROOT, ""));
      }
    }
  }
  return files;
}

scan(ROOT)
  .then((files) => {
    console.log(`Found ${files.length} images:`);
    console.log(files.filter(f => !f.includes("\\public\\images\\")).join("\n"));
    console.log("\nClientes folder contents:");
    console.log(files.filter(f => f.includes("\\public\\images\\clientes\\")).join("\n"));
  })
  .catch((err) => console.error(err));
