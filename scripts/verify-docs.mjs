// Verifies the usage snippets and prop tables in src/data/componentDocs.ts against the real components.
//   npm run verify:docs
//
// 1. Prop names and defaults in the docs match each component's actual signature.
// 2. Every usage snippet type-checks (strict) against the real component and renders without throwing.
// 3. Every documented prop either changes what the component renders, or is listed below as
//    behavioural (only visible over time or on interaction).
import { readdir, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { join, dirname, basename, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import ts from "typescript";
import { createServer } from "vite";
import { allComponents, getExportName, getSlug } from "../src/data/components.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const uiDir = join(root, "src/components/ui");
const workDir = join(root, ".verify-docs");
const errors = [];
const fail = (name, msg) => errors.push(`${name}: ${msg}`);

/* Props that only matter over time or on interaction, so they cannot show up in a one-shot render. */
const BEHAVIOURAL = {
  "Magnetic Link": ["strength"],
  "Signal Toggle": ["onChange"],
  "Flip Text": ["interval"],
  "Flip Fade Text": ["interval"],
  "Photon Button": ["onClick"],
  "Liquid Button": ["onClick"],
  "Iso Button": ["onClick"],
  "Ring Gallery": ["speed", "pauseOnHover", "onActiveChange", "radius", "cardSize"], // radius/cardSize: checked via layoutRing below
  "Book Shelf": ["interval", "autoPlay", "trigger"],
  "Stack Orbit": ["interval", "autoPlay"],
  "Orbit Gallery": ["interval", "autoPlay"],
  "Spotlight Navbar": ["onChange"],
};

const el = (text) => createElement("span", null, text);
const ringCard = (id) => ({ id, content: el(`ring-${id}`), background: "#123456" });
/* A changed value for every prop that is visible in a render. */
const SAMPLES = {
  "Photon Button": { children: "Sample label", className: "sample-class" },
  "Magnetic Link": { children: "Sample label" },
  "Signal Toggle": { defaultChecked: false, orientation: "vertical", disabled: true, label: "SAMPLE" },
  "Liquid Button": { children: "Sample label" },
  "Iso Button": { icon: el("sample-icon"), children: "Sample caption", label: "Sample label", size: 200, className: "sample-class" },
  "Flip Text": { words: ["sampleone", "sampletwo"] },
  "Flip Fade Text": { words: ["SAMPLEONE", "SAMPLETWO"] },
  "Liquid Text": { children: "Sample text" },
  "Kinetic Typography": { lines: ["SAMPLE", "LINES"] },
  "3D Text Reveal": { text: "SAMPLE", subtitle: "Sample subtitle" },
  Cursor: { children: "Sample body", label: "Sample label" },
  Tooltip: { label: "Sample label", items: ["Sample one", "Sample two"] },
  "Ring Gallery": { items: ["a", "b", "c", "d", "e", "f"].map(ringCard), label: "Sample label", radius: 0.3, cardSize: 0.3, className: "sample-class" },
  "Book Shelf": { items: [{ title: "Sample A", color: "#111111" }, { title: "Sample B", color: "#222222" }], heading: "Sample heading", className: "sample-class" },
  "Stack Orbit": { items: ["a", "b", "c", "d"].map((n) => ({ name: `sample-${n}`, logo: el(n) })), className: "sample-class" },
  "Avatar Group": { avatars: [{ name: "Sample", image: "https://example.com/a.png" }, { name: "Other", image: "https://example.com/b.png" }], size: 80, overlap: 30 },
  "Orbit Gallery": { items: [{ name: "Sample Person", years: "1 — 2" }, { name: "Other Person" }, { name: "Third Person" }], className: "sample-class" },
  "Spotlight Navbar": { items: ["Sample one", "Sample two"], defaultActive: 1 },
  "Wave Grid": { columns: 5, rows: 3 },
  "Stars Background": { count: 12 },
};
/* Items with their own prop table keys in SAMPLES must also appear in BEHAVIOURAL or SAMPLES. */

/* ---------- helpers ---------- */
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith(".tsx")) out.push(p);
  }
  return out;
}
const norm = (s) => s.replace(/\s+/g, "").replace(/,([\]}])/g, "$1").replace(/,$/, "");

/** Destructured props of the default-exported component, with their default initializer text. */
function sourceProps(file, text) {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX);
  const fns = new Map();
  let defaultName = null;
  let defaultFn = null;
  for (const st of sf.statements) {
    if (ts.isFunctionDeclaration(st) && st.name) {
      fns.set(st.name.text, st);
      if (st.modifiers?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword)) defaultFn = st;
    }
    if (ts.isExportAssignment(st) && ts.isIdentifier(st.expression)) defaultName = st.expression.text;
  }
  const fn = defaultFn ?? fns.get(defaultName);
  if (!fn) return null;
  const param = fn.parameters[0];
  if (!param) return [];
  if (!ts.isObjectBindingPattern(param.name)) return null;
  return param.name.elements.map((e) => ({
    name: (e.propertyName ?? e.name).getText(sf),
    init: e.initializer ? e.initializer.getText(sf) : null,
  }));
}

/* ---------- 1. docs vs. source ---------- */
const files = await walk(uiDir);
const byExport = new Map(files.map((f) => [basename(f, ".tsx"), f]));

for (const c of allComponents) {
  const exportName = getExportName(c);
  const file = byExport.get(exportName);
  if (!file) { fail(c.name, `no ${exportName}.tsx under src/components/ui`); continue; }
  if (!c.usage) fail(c.name, "missing usage snippet");
  if (!c.props) { fail(c.name, "missing props (use [] for a component without props)"); continue; }

  const actual = sourceProps(file, await readFile(file, "utf8"));
  if (!actual) { fail(c.name, "could not read the prop signature (expected a destructured first parameter)"); continue; }

  const documented = new Map(c.props.map((p) => [p.name, p]));
  for (const p of actual) if (!documented.has(p.name)) fail(c.name, `prop "${p.name}" exists in the source but is not documented`);
  for (const p of c.props) {
    const src = actual.find((a) => a.name === p.name);
    if (!src) { fail(c.name, `documented prop "${p.name}" does not exist in the source`); continue; }
    if (!p.description) fail(c.name, `prop "${p.name}" has no description`);
    const literalish = (s) => /^["'`\d\[{-]|^(true|false|null)$/.test(s);
    if (src.init === null) {
      if (literalish(p.default)) fail(c.name, `prop "${p.name}" has no default in the source but docs say ${p.default}`);
    } else if (src.init.length <= 60 && !src.init.includes("\n") && /^["'\d]|^(true|false)$|^\[.*\]$/.test(src.init)) {
      if (norm(src.init) !== norm(p.default)) fail(c.name, `prop "${p.name}" default is ${src.init} in the source but ${p.default} in the docs`);
    } else if (!p.default || p.default === "undefined") {
      fail(c.name, `prop "${p.name}" has a default in the source; describe it in the docs`);
    }
  }
}

/* ---------- 2. snippets: type-check ---------- */
await rm(workDir, { recursive: true, force: true });
await mkdir(workDir, { recursive: true });
const written = [];
for (const c of allComponents) {
  const exportName = getExportName(c);
  const file = byExport.get(exportName);
  if (!file || !c.usage) continue;
  const dir = join(workDir, getSlug(c));
  await mkdir(dir, { recursive: true });
  const rel = relative(dir, file).split(sep).join("/").replace(/\.tsx$/, "");
  const marker = `./components/quantum-ui/${exportName}"`;
  if (!c.usage.includes(marker)) fail(c.name, `usage must import from "${marker.slice(0, -1)}"`);
  const code = c.usage.replace(marker, `${rel}"`);
  const out = join(dir, "App.tsx");
  await writeFile(out, code);
  written.push({ c, out });
}
await writeFile(
  join(workDir, "tsconfig.json"),
  JSON.stringify({ extends: "../tsconfig.registry.json", compilerOptions: { noEmit: true }, include: [], files: written.map((w) => relative(workDir, w.out)) }, null, 2)
);
const tsc = spawnSync(process.execPath, [join(root, "node_modules/typescript/bin/tsc"), "-p", join(workDir, "tsconfig.json")], { encoding: "utf8" });
if (tsc.status !== 0) {
  for (const line of (tsc.stdout + tsc.stderr).split("\n").filter((l) => /error TS/.test(l))) {
    const m = line.match(/\.verify-docs\/([^/]+)\//);
    const owner = written.find((w) => m && getSlug(w.c) === m[1]);
    fail(owner ? owner.c.name : "usage snippets", `type error: ${line.replace(/^.*\.verify-docs\//, "")}`);
  }
}

/* ---------- 3 + 4. render snippets and check props change output ---------- */
let seed = 1;
const seedRandom = () => { seed = 1; Math.random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; };
const realRandom = Math.random;
const server = await createServer({ root, server: { middlewareMode: true }, appType: "custom", logLevel: "silent", optimizeDeps: { noDiscovery: true, include: [] } });
const render = (Comp, props) => { seedRandom(); return renderToString(createElement(Comp, props)); };

try {
  for (const { c, out } of written) {
    let App;
    try {
      App = (await server.ssrLoadModule(pathToFileURL(out).pathname)).default;
      const html = render(App, {});
      if (!html || html.length < 20) fail(c.name, "usage snippet rendered nothing");
    } catch (e) {
      fail(c.name, `usage snippet failed to render: ${e.message.split("\n")[0]}`);
      continue;
    }

    const file = byExport.get(getExportName(c));
    const Comp = (await server.ssrLoadModule(pathToFileURL(file).pathname)).default;
    let base;
    try { base = render(Comp, {}); } catch (e) { fail(c.name, `default render failed: ${e.message.split("\n")[0]}`); continue; }

    const samples = SAMPLES[c.name] ?? {};
    const behavioural = new Set(BEHAVIOURAL[c.name] ?? []);
    for (const p of c.props) {
      if (behavioural.has(p.name)) continue;
      if (!(p.name in samples)) { fail(c.name, `prop "${p.name}" has no sample in scripts/verify-docs.mjs (add one, or list it as behavioural)`); continue; }
      try {
        if (render(Comp, { [p.name]: samples[p.name] }) === base) fail(c.name, `changing prop "${p.name}" does not change the rendered output`);
      } catch (e) {
        fail(c.name, `prop "${p.name}" sample failed to render: ${e.message.split("\n")[0]}`);
      }
    }
  }
} finally {
  Math.random = realRandom;
  await server.close();
  await rm(workDir, { recursive: true, force: true });
}

/* Ring Gallery lays cards out after mount, so check the layout maths that radius/cardSize feed directly. */
{
  const ring = await createServer({ root, server: { middlewareMode: true }, appType: "custom", logLevel: "silent" });
  try {
    const { layoutRing } = await ring.ssrLoadModule("/src/components/ui/interactive/RingGallery.tsx");
    const base = JSON.stringify(layoutRing(0, 6, 600, 600));
    if (JSON.stringify(layoutRing(0, 6, 600, 600, 0.2)) === base) fail("Ring Gallery", 'prop "radius" does not change the card layout');
    if (JSON.stringify(layoutRing(0, 6, 600, 600, undefined, 0.35)) === base) fail("Ring Gallery", 'prop "cardSize" does not change the card layout');
  } catch (e) {
    fail("Ring Gallery", `layout check failed: ${e.message.split("\n")[0]}`);
  } finally {
    await ring.close();
  }
}

if (errors.length) {
  console.error(`✗ docs verification failed (${errors.length}):\n  - ${errors.join("\n  - ")}`);
  process.exit(1);
}
const propCount = allComponents.reduce((n, c) => n + (c.props?.length ?? 0), 0);
console.log(`✓ docs verified: ${allComponents.length} components, ${propCount} props checked against source, all usage snippets compile and render`);
