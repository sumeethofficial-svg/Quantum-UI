// Verifies the generated registry and that names/URLs agree everywhere.
//   npm run registry:verify   (run after npm run registry:build)
import { readdir, readFile, stat } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { componentGroups, getSlug, getExportName } from "../src/data/components.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFile(join(root, p), "utf8");
const cfg = JSON.parse(await read("registry.config.json"));
const problems = [];
const fail = (m) => problems.push(m);
let checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) fail(msg); };

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith(".jsx")) out.push(p);
  }
  return out;
}

// 1. registry.json vs components.js
const reg = JSON.parse(await read("public/r/registry.json"));
const listed = componentGroups.flatMap((g) => g.items);
ok(reg.items.length === listed.length, `registry.json has ${reg.items.length} items, components.js lists ${listed.length}`);
ok(new Set(reg.items.map((i) => i.name)).size === reg.items.length, "duplicate names in registry.json");

// 2. every registered component resolves to an existing, non-empty, self-contained file whose content matches source
const uiFiles = await walk(join(root, "src/components/ui"));
for (const c of listed) {
  const slug = getSlug(c), exp = getExportName(c);
  const src = uiFiles.find((f) => basename(f, ".jsx") === exp);
  ok(!!src, `${c.name}: source file ${exp}.jsx not found`);
  let item;
  try { item = JSON.parse(await read(`public/r/${slug}.json`)); } catch { fail(`${c.name}: public/r/${slug}.json missing or invalid`); continue; }
  if (!src) continue;
  const code = await readFile(src, "utf8");
  ok(code.trim().length > 0, `${c.name}: source is empty`);
  ok(item.files?.[0]?.content === code, `${c.name}: registry content is stale (run npm run registry:build)`);
  ok(/export\s+default\s/.test(code), `${c.name}: no default export`);
  ok(!/from\s+["'](\.|@\/)/.test(code), `${c.name}: imports project-local modules`);
  ok(item.type === "registry:ui" && item.files[0].target === `${cfg.installDir}/${exp}.jsx`, `${c.name}: unexpected type/target`);
  ok(reg.items.some((i) => i.name === slug), `${c.name}: missing from registry.json`);
  ok(item.meta?.usage?.includes(`import ${exp} from "./${cfg.installDir}/${exp}"`), `${c.name}: usage example does not import ${exp} from ./${cfg.installDir}/${exp}`);
  ok(!/@\/|@quantum-ui\/react/.test(`${item.meta?.usage ?? ""}${c.code ?? ""}${c.usage ?? ""}`), `${c.name}: usage/code snippet assumes an @/ alias or @quantum-ui/react`);
}

// 3. every non-empty ui file is registered (empty placeholders are intentionally skipped)
const registered = new Set(listed.map(getExportName));
for (const f of uiFiles) {
  if (!registered.has(basename(f, ".jsx")) && (await stat(f)).size > 0) console.warn(`non-empty ui file not registered: ${f.replace(root + "/", "")}`);
}

// 4. names and URLs agree across config, packages, CLI, MCP and docs
const cliPkg = JSON.parse(await read("packages/cli/package.json"));
const mcpPkg = JSON.parse(await read("packages/mcp/package.json"));
const cliSrc = await read("packages/cli/bin/quantum-ui-cli.js");
const mcpSrc = await read("packages/mcp/src/index.js");
ok(cliPkg.name === cfg.cliPackage, `cli package name ${cliPkg.name} != config ${cfg.cliPackage}`);
ok(mcpPkg.name === cfg.mcpPackage, `mcp package name ${mcpPkg.name} != config ${cfg.mcpPackage}`);
ok(cliPkg.bin?.[cfg.cliPackage] === "./bin/quantum-ui-cli.js", "cli bin entry does not match package name");
for (const [label, src] of [["cli", cliSrc], ["mcp", mcpSrc]]) {
  ok(src.includes(`"${cfg.namespace}"`) || src.includes(`NAMESPACE = "${cfg.namespace}"`), `${label}: namespace differs from config`);
  ok(src.includes(cfg.baseUrl), `${label}: default registry URL differs from registry.config.json`);
}
ok(cliSrc.includes(`MCP_PACKAGE = "${cfg.mcpPackage}"`), "cli references a different MCP package name");
ok(cliSrc.includes(`CLI_PACKAGE = "${cfg.cliPackage}"`), "cli references a different CLI package name");
for (const f of ["README.md", "src/components/navigation/Navbar.jsx"]) {
  const t = await read(f);
  for (const m of t.matchAll(/npx\s+(quantum-ui[\w-]*)/g)) ok([cfg.cliPackage].includes(m[1]), `${f}: "npx ${m[1]}" is not the CLI package (${cfg.cliPackage})`);
  ok(!/@quantum-ui\/react/.test(t), `${f}: references nonexistent @quantum-ui/react`);
}
const docs = (await read("src/components/library/ComponentDocumentation.jsx")) + (await read("src/components/library/ComponentCode.jsx"));
ok(!/@quantum-ui\/react|from "@\/components"|component\.slug/.test(docs), "docs still reference a nonexistent package / @/ alias / undefined slug");

if (problems.length) {
  console.error(`✗ registry verification failed (${problems.length}):\n  - ${problems.join("\n  - ")}`);
  process.exit(1);
}
console.log(`✓ registry verified: ${listed.length} components, ${checks} checks passed`);
