#!/usr/bin/env node
// quantum-ui-mcp — lets AI assistants browse the Quantum UI registry and read component source.
// Installing components is done by the shadcn CLI: npx shadcn@latest add @quantum-ui/<name>
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { z } from "zod";

const NAMESPACE = "@quantum-ui";
const INSTALL_DIR = "components/quantum-ui";
// Keep in sync with registry.config.json (checked by `npm run registry:verify` in the repo).
const DEFAULT_REGISTRY = "https://raw.githubusercontent.com/sumeethofficial-svg/Quantum-UI/main/public/r";
const REGISTRY = (process.env.QUANTUM_UI_REGISTRY || DEFAULT_REGISTRY).replace(/\/$/, "");

const cache = new Map();
async function load(file) {
  if (cache.has(file)) return cache.get(file);
  let data;
  if (/^https?:\/\//.test(REGISTRY)) {
    const res = await fetch(`${REGISTRY}/${file}`);
    if (!res.ok) throw new Error(`Registry request failed: ${res.status} ${REGISTRY}/${file}`);
    data = await res.json();
  } else {
    data = JSON.parse(await readFile(join(resolve(REGISTRY), file), "utf8"));
  }
  cache.set(file, data);
  return data;
}

const text = (t) => ({ content: [{ type: "text", text: t }] });
const fail = (t) => ({ isError: true, content: [{ type: "text", text: t }] });
const norm = (n) => n.trim().toLowerCase().replace(/^@quantum-ui\//, "").replace(/\s+/g, "-");
const addCommand = (slugs) => `npx shadcn@latest add ${slugs.map((s) => `${NAMESPACE}/${s}`).join(" ")}`;

export function createServer() {
  const server = new McpServer({ name: "quantum-ui", version: "0.1.0" });

  server.registerTool(
    "list_components",
    {
      title: "List Quantum UI components",
      description: "List all Quantum UI components, optionally filtered by category (e.g. interactions, backgrounds, navigation).",
      inputSchema: { category: z.string().optional().describe("Case-insensitive category filter") },
    },
    async ({ category }) => {
      const { items } = await load("registry.json");
      const rows = items.filter((i) => !category || i.meta.category.toLowerCase().includes(category.toLowerCase()));
      if (!rows.length) return fail(`No components in category "${category}".`);
      const groups = {};
      for (const i of rows) (groups[i.meta.category] ||= []).push(`- ${i.name}: ${i.description}`);
      return text(Object.entries(groups).map(([k, v]) => `## ${k}\n${v.join("\n")}`).join("\n\n"));
    }
  );

  server.registerTool(
    "search_components",
    {
      title: "Search Quantum UI components",
      description: "Find components by keyword across name, description and category (e.g. 'hover', 'background', 'navbar').",
      inputSchema: { query: z.string().min(1) },
    },
    async ({ query }) => {
      const { items } = await load("registry.json");
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      const scored = items
        .map((i) => {
          const hay = `${i.name} ${i.title} ${i.description} ${i.meta.category}`.toLowerCase();
          return { i, score: terms.reduce((s, t) => s + (hay.includes(t) ? (i.name.includes(t) ? 2 : 1) : 0), 0) };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      if (!scored.length) return text(`No matches for "${query}". Try list_components.`);
      return text(scored.map(({ i }) => `- ${i.name} (${i.meta.category}): ${i.description}`).join("\n"));
    }
  );

  server.registerTool(
    "get_component",
    {
      title: "Get component source",
      description:
        "Get the full source, npm dependencies, install command and usage example for a Quantum UI component. Components are self-contained React + Tailwind v4 files with a default export.",
      inputSchema: { name: z.string().describe("Component slug or title, e.g. 'photon-button' or 'Photon Button'") },
    },
    async ({ name }) => {
      const slug = norm(name);
      if (!/^[a-z0-9-]+$/.test(slug)) return fail(`Invalid component name "${name}".`);
      let item;
      try { item = await load(`${slug}.json`); }
      catch { return fail(`Component "${name}" not found. Use list_components or search_components.`); }
      const file = item.files[0];
      const exp = item.meta.exportName;
      return text(
        [
          `# ${item.title} (${item.name})`,
          item.description,
          `Category: ${item.meta.category}`,
          `Extra npm dependencies: ${item.dependencies.length ? item.dependencies.join(", ") : "none (react + Tailwind v4 only)"}`,
          `\n## Install (shadcn CLI)\n\`${addCommand([item.name])}\`\nWrites ${file.target}. Needs a one-time \`npx quantum-ui-cli init\` so the ${NAMESPACE} registry is in components.json.`,
          `\n## Usage (default export; path is relative to the importing file)\n\`\`\`jsx\nimport ${exp} from "./${INSTALL_DIR}/${exp}";\n\n<${exp}>${item.meta.demo}</${exp}>\n\`\`\``,
          `\n## Source: ${file.target}\n\`\`\`jsx\n${file.content}\n\`\`\``,
        ].join("\n")
      );
    }
  );

  server.registerTool(
    "get_install_command",
    {
      title: "Get install command",
      description: "Return the shadcn CLI command that installs one or more Quantum UI components into a project.",
      inputSchema: { names: z.array(z.string()).min(1) },
    },
    async ({ names }) => {
      const { items } = await load("registry.json");
      const known = new Set(items.map((i) => i.name));
      const slugs = names.map(norm);
      const bad = slugs.filter((s) => !known.has(s));
      if (bad.length) return fail(`Unknown component(s): ${bad.join(", ")}`);
      return text(addCommand(slugs));
    }
  );

  return server;
}

import { pathToFileURL } from "node:url";
import { realpathSync } from "node:fs";
// realpath: when launched via npx / node_modules/.bin, argv[1] is a symlink to this file.
const isEntry = () => { try { return import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href; } catch { return false; } };
if (process.argv[1] && isEntry()) {
  await createServer().connect(new StdioServerTransport());
}
