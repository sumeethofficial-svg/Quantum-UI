// Builds the Quantum UI registry (shadcn registry-item JSON) into public/r/.
//   npm run registry:build
// Source of truth: src/data/components.js (what is public) + src/components/ui/** (the code).
import { readdir, readFile, writeFile, mkdir, rm, stat } from "node:fs/promises";
import { join, dirname, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { componentGroups, getSlug, getExportName } from "../src/data/components.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(await readFile(join(root, "registry.config.json"), "utf8"));
const uiDir = join(root, "src/components/ui");
const outDir = join(root, "public/r");

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

const importsOf = (src) =>
  [...src.matchAll(/^\s*import\s[^;]*?from\s+["']([^"']+)["']/gm)].map((m) => m[1]);

const files = await walk(uiDir);
const byExport = new Map(files.map((f) => [basename(f, ".tsx"), f]));

const errors = [];
const seen = new Set();
const items = [];
await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const group of componentGroups) {
  for (const c of group.items) {
    const slug = getSlug(c);
    const exportName = getExportName(c);
    if (seen.has(slug)) { errors.push(`duplicate slug "${slug}" (${c.name})`); continue; }
    seen.add(slug);

    const file = byExport.get(exportName);
    if (!file) { errors.push(`${c.name}: no file named ${exportName}.tsx under src/components/ui`); continue; }
    const content = await readFile(file, "utf8");
    if (!content.trim()) { errors.push(`${c.name}: ${relative(root, file)} is empty`); continue; }
    if (!/export\s+default\s/.test(content)) { errors.push(`${c.name}: no default export in ${relative(root, file)}`); continue; }

    const localImports = importsOf(content).filter((i) => i.startsWith(".") || i.startsWith("@/"));
    if (localImports.length) { errors.push(`${c.name}: imports project-local modules (${localImports.join(", ")}); registry files must be self-contained`); continue; }

    const dependencies = [...new Set(importsOf(content).filter((i) => i !== "react" && i !== "react-dom"))];
    const item = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: slug,
      type: "registry:ui",
      title: c.name,
      description: c.description,
      categories: [group.label.toLowerCase()],
      dependencies,
      files: [
        {
          path: `${cfg.installDir}/${exportName}.tsx`,
          type: "registry:ui",
          target: `${cfg.installDir}/${exportName}.tsx`,
          content,
        },
      ],
      meta: {
        exportName,
        category: group.label,
        demo: c.demo,
        usage:
          c.usage ??
          `import ${exportName} from "./${cfg.installDir}/${exportName}";\n\nexport default function Example() {\n  return <${exportName}>${c.demo}</${exportName}>;\n}`,
      },
    };
    await writeFile(join(outDir, `${slug}.json`), JSON.stringify(item, null, 2) + "\n");
    items.push({
      name: slug,
      type: "registry:ui",
      title: c.name,
      description: c.description,
      categories: item.categories,
      dependencies,
      files: [{ path: item.files[0].path, type: "registry:ui", target: item.files[0].target }],
      meta: item.meta,
    });
  }
}

// Empty placeholder files that are not registered are reported, never published.
const placeholders = [];
const unlisted = [];
for (const [name, f] of byExport) {
  if (seen.has(name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase())) continue;
  const inList = componentGroups.some((g) => g.items.some((c) => getExportName(c) === name));
  if (inList) continue;
  ((await stat(f)).size === 0 ? placeholders : unlisted).push(relative(root, f));
}

if (errors.length) {
  console.error("✗ registry build failed:\n  - " + errors.join("\n  - "));
  process.exit(1);
}

await writeFile(
  join(outDir, "registry.json"),
  JSON.stringify(
    { $schema: "https://ui.shadcn.com/schema/registry.json", name: cfg.name, homepage: cfg.homepage, items },
    null,
    2
  ) + "\n"
);

console.log(`✓ registry: ${items.length} components -> public/r/ (+ registry.json)`);
if (placeholders.length) console.log(`  not registered: ${placeholders.length} empty placeholder file(s) in src/components/ui`);
if (unlisted.length) console.warn(`! ${unlisted.length} non-empty ui file(s) not in components.js (not registered): ${unlisted.join(", ")}`);
