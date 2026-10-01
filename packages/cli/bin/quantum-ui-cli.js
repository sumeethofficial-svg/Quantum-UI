#!/usr/bin/env node
// quantum-ui-cli — one-time project setup. Installing components is done by the shadcn CLI:
//   npx shadcn@latest add @quantum-ui/<component>
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { parseArgs } from "node:util";

// Keep in sync with registry.config.json (checked by `npm run registry:verify` in the repo).
const NAMESPACE = "@quantum-ui";
const DEFAULT_BASE_URL = "https://raw.githubusercontent.com/sumeethofficial-svg/Quantum-UI/main/public/r";
const MCP_PACKAGE = "quantum-ui-mcp";
const CLI_PACKAGE = "quantum-ui-cli";
const BLOCK_START = "<!-- quantum-ui:start -->";
const BLOCK_END = "<!-- quantum-ui:end -->";

const HELP = `
quantum-ui-cli — set a project up to install Quantum UI components with the shadcn CLI

Usage
  npx ${CLI_PACKAGE} init [target] [options]

Targets (optional)
  cursor      .cursor/rules/quantum-ui.mdc + .cursor/mcp.json
  claude      CLAUDE.md section + .mcp.json
  both        cursor + claude
  mcp         MCP server config only (.cursor/mcp.json and .mcp.json)

Options
  -y, --yes          cursor + claude + MCP config (same as: init both)
  --no-mcp           write instructions without MCP config
  --registry <url>   registry base URL (folder containing {name}.json); default: ${DEFAULT_BASE_URL}
  --dry-run          print what would change without writing
  -h, --help         show this help

Flags --cursor and --claude still work. Without a target, init only registers the registry.

After init, install components with:
  npx shadcn@latest add ${NAMESPACE}/photon-button
  npx shadcn@latest search ${NAMESPACE}
`;

const log = {
  ok: (m) => console.log(`\x1b[32m✓\x1b[0m ${m}`),
  warn: (m) => console.log(`\x1b[33m!\x1b[0m ${m}`),
  dim: (m) => console.log(`\x1b[2m${m}\x1b[0m`),
};

const exists = (p) => access(p).then(() => true, () => false);
const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));

export function registryTemplate(base) {
  return `${base.replace(/\/$/, "")}/{name}.json`;
}

export function agentInstructions() {
  return `## Quantum UI

This project installs UI components from the Quantum UI registry (React + Tailwind CSS v4) using the **shadcn CLI**.

- Add a component: \`npx shadcn@latest add ${NAMESPACE}/<component>\` (e.g. \`${NAMESPACE}/photon-button\`).
- Browse: \`npx shadcn@latest search ${NAMESPACE}\`. Inspect source first: \`npx shadcn@latest view ${NAMESPACE}/<component>\`.
- Components are copied into the project (default \`src/components/quantum-ui/\`). You own the code; edit it freely.
- Each file is self-contained and has a **default export**: \`import PhotonButton from "./components/quantum-ui/PhotonButton"\`. Compute the import path relative to the importing file; do not assume an \`@/\` alias.
- There is no runtime npm package to install for Quantum UI itself. Install only the extra npm packages a component lists (if any).
- If the \`${MCP_PACKAGE}\` MCP server is connected, use its \`search_components\` and \`get_component\` tools instead of guessing component names or props.
`;
}

async function mergeJson(path, mutate, dry) {
  const before = (await exists(path)) ? await readJson(path) : null;
  const after = mutate(structuredClone(before ?? {}));
  if (JSON.stringify(before) === JSON.stringify(after)) return "unchanged";
  if (!dry) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, JSON.stringify(after, null, 2) + "\n");
  }
  return before ? "updated" : "created";
}

async function upsertBlock(path, block, dry) {
  const wrapped = `${BLOCK_START}\n${block.trim()}\n${BLOCK_END}\n`;
  const cur = (await exists(path)) ? await readFile(path, "utf8") : null;
  let next;
  if (cur === null) next = wrapped;
  else if (cur.includes(BLOCK_START) && cur.includes(BLOCK_END)) {
    next = cur.replace(new RegExp(`${BLOCK_START}[\\s\\S]*?${BLOCK_END}\\n?`), wrapped);
  } else next = cur.replace(/\n*$/, "\n\n") + wrapped;
  if (next === cur) return "unchanged";
  if (!dry) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, next);
  }
  return cur === null ? "created" : "updated";
}

async function detectCss(cwd) {
  for (const c of ["src/index.css", "src/App.css", "src/styles.css", "src/app/globals.css", "app/globals.css", "styles/globals.css"]) {
    if (await exists(join(cwd, c))) return c;
  }
  return "src/index.css";
}

export async function init(cwd, opts) {
  const dry = !!opts.dryRun;
  const pkgPath = join(cwd, "package.json");
  if (!(await exists(pkgPath))) throw new Error("No package.json found. Run this from your project root.");
  const pkg = await readJson(pkgPath);
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (!deps.react) log.warn("react is not listed in package.json — Quantum UI components are React components.");
  if (!deps.tailwindcss) log.warn("tailwindcss not found — Quantum UI components are styled with Tailwind CSS v4 utilities.");
  else {
    const major = Number((String(deps.tailwindcss).match(/\d+/) || [])[0]);
    if (major && major < 4) log.warn(`tailwindcss ${deps.tailwindcss} detected — Quantum UI targets Tailwind v4.`);
  }

  // 1) shadcn reads path aliases from tsconfig.json / jsconfig.json. Create a jsconfig only if neither exists.
  const hasTs = await exists(join(cwd, "tsconfig.json"));
  const hasJs = await exists(join(cwd, "jsconfig.json"));
  if (!hasTs && !hasJs) {
    if (!dry) await writeFile(join(cwd, "jsconfig.json"), JSON.stringify({ compilerOptions: { baseUrl: ".", paths: { "@/*": ["./src/*"] } } }, null, 2) + "\n");
    log.ok("created jsconfig.json (path alias is only read by the shadcn CLI; Quantum UI files do not import through it)");
  } else {
    log.dim(`using existing ${hasTs ? "tsconfig.json" : "jsconfig.json"} (not modified). If shadcn reports a missing "@/*" alias, add it there.`);
  }

  // 2) components.json: create if missing, otherwise only add the registry entry.
  const cjPath = join(cwd, "components.json");
  const template = registryTemplate(opts.registry || DEFAULT_BASE_URL);
  const hadCj = await exists(cjPath);
  const css = await detectCss(cwd);
  const res = await mergeJson(
    cjPath,
    (cj) => {
      if (!hadCj) {
        Object.assign(cj, {
          $schema: "https://ui.shadcn.com/schema.json",
          style: "new-york",
          rsc: false,
          tsx: hasTs,
          tailwind: { config: "", css, baseColor: "neutral", cssVariables: false },
          aliases: { components: "@/components", utils: "@/lib/utils", ui: "@/components/ui", lib: "@/lib", hooks: "@/hooks" },
        });
      }
      cj.registries = { ...(cj.registries || {}), [NAMESPACE]: template };
      return cj;
    },
    dry
  );
  log.ok(`components.json ${res} — ${NAMESPACE} → ${template}`);

  // 3) Optional agent instructions + MCP config (merged, never overwritten).
  const mcpEntry = { command: "npx", args: ["-y", MCP_PACKAGE] };
  if (opts.registry) mcpEntry.env = { QUANTUM_UI_REGISTRY: opts.registry.replace(/\/$/, "") };
  const wantMcp = !opts.noMcp;

  if (opts.cursor) {
    const rule = `---\ndescription: Installing and using Quantum UI components\nalwaysApply: false\nglobs: ["**/*.jsx", "**/*.tsx"]\n---\n\n${agentInstructions()}`;
    const rulePath = join(cwd, ".cursor/rules/quantum-ui.mdc");
    if (!(await exists(rulePath))) {
      if (!dry) { await mkdir(dirname(rulePath), { recursive: true }); await writeFile(rulePath, rule); }
      log.ok("created .cursor/rules/quantum-ui.mdc");
    } else log.dim(".cursor/rules/quantum-ui.mdc already exists — left untouched");
    if (wantMcp) {
      const r = await mergeJson(join(cwd, ".cursor/mcp.json"), (j) => ({ ...j, mcpServers: { ...(j.mcpServers || {}), "quantum-ui": mcpEntry } }), dry);
      log.ok(`.cursor/mcp.json ${r}`);
    }
  }
  if (opts.claude) {
    const r = await upsertBlock(join(cwd, "CLAUDE.md"), agentInstructions(), dry);
    log.ok(`CLAUDE.md ${r}`);
    if (wantMcp) {
      const m = await mergeJson(join(cwd, ".mcp.json"), (j) => ({ ...j, mcpServers: { ...(j.mcpServers || {}), "quantum-ui": mcpEntry } }), dry);
      log.ok(`.mcp.json ${m}`);
    }
  }
  if (opts.mcpOnly) {
    for (const f of [".cursor/mcp.json", ".mcp.json"]) {
      const m = await mergeJson(join(cwd, f), (j) => ({ ...j, mcpServers: { ...(j.mcpServers || {}), "quantum-ui": mcpEntry } }), dry);
      log.ok(`${f} ${m}`);
    }
  }

  console.log(`\n${dry ? "(dry run — nothing written)\n" : ""}Next:\n  npx shadcn@latest add ${NAMESPACE}/photon-button`);
}

export const TARGETS = ["cursor", "claude", "both", "mcp"];

export function resolveTargets(target, values = {}) {
  if (target && !TARGETS.includes(target)) {
    throw new Error(`Unknown target "${target}". Use one of: ${TARGETS.join(", ")} (or -y).`);
  }
  const all = !!values.yes || target === "both";
  return {
    cursor: all || target === "cursor" || !!values.cursor,
    claude: all || target === "claude" || !!values.claude,
    mcpOnly: target === "mcp",
  };
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      cursor: { type: "boolean" },
      claude: { type: "boolean" },
      yes: { type: "boolean", short: "y" },
      "no-mcp": { type: "boolean" },
      registry: { type: "string" },
      "dry-run": { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
  });
  const [cmd, target] = positionals;
  if (values.help || !cmd) return console.log(HELP);
  if (cmd !== "init") {
    console.error(`Unknown command "${cmd}". To install components use: npx shadcn@latest add ${NAMESPACE}/<component>`);
    process.exit(1);
  }
  await init(process.cwd(), { ...resolveTargets(target, values), noMcp: values["no-mcp"], registry: values.registry, dryRun: values["dry-run"] });
}

import { pathToFileURL } from "node:url";
import { realpathSync } from "node:fs";
// realpath: when launched via npx / node_modules/.bin, argv[1] is a symlink to this file.
const isEntry = () => { try { return import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href; } catch { return false; } };
if (process.argv[1] && isEntry()) {
  main().catch((e) => { console.error(`\x1b[31m✗ ${e.message}\x1b[0m`); process.exit(1); });
}
