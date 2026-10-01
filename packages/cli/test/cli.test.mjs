import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const bin = join(dirname(fileURLToPath(import.meta.url)), "../bin/quantum-ui-cli.js");
const project = (pkg = { dependencies: { react: "^19", tailwindcss: "^4.1.0" } }) => {
  const d = mkdtempSync(join(tmpdir(), "qui-"));
  writeFileSync(join(d, "package.json"), JSON.stringify(pkg));
  return d;
};
const run = (cwd, ...args) => spawnSync(process.execPath, [bin, ...args], { cwd, encoding: "utf8" });
const read = (d, f) => readFileSync(join(d, f), "utf8");
const json = (d, f) => JSON.parse(read(d, f));
const has = (d, f) => existsSync(join(d, f));

test("bare init only registers the registry", () => {
  const d = project();
  const r = run(d, "init");
  assert.equal(r.status, 0, r.stderr);
  assert.match(json(d, "components.json").registries["@quantum-ui"], /\/\{name\}\.json$/);
  assert.equal(has(d, "CLAUDE.md") || has(d, ".mcp.json") || has(d, ".cursor"), false);
  assert.equal(has(d, "jsconfig.json"), true);
});

test("init cursor writes rule + cursor mcp only", () => {
  const d = project();
  assert.equal(run(d, "init", "cursor").status, 0);
  assert.equal(has(d, ".cursor/rules/quantum-ui.mdc"), true);
  assert.deepEqual(json(d, ".cursor/mcp.json").mcpServers["quantum-ui"].args, ["-y", "quantum-ui-mcp"]);
  assert.equal(has(d, "CLAUDE.md"), false);
  assert.equal(has(d, ".mcp.json"), false);
});

test("init claude writes CLAUDE.md block + .mcp.json only", () => {
  const d = project();
  assert.equal(run(d, "init", "claude").status, 0);
  assert.match(read(d, "CLAUDE.md"), /npx shadcn@latest add @quantum-ui\//);
  assert.equal(has(d, ".mcp.json"), true);
  assert.equal(has(d, ".cursor"), false);
});

test("init mcp writes both MCP configs and no instructions", () => {
  const d = project();
  assert.equal(run(d, "init", "mcp").status, 0);
  assert.equal(has(d, ".mcp.json"), true);
  assert.equal(has(d, ".cursor/mcp.json"), true);
  assert.equal(has(d, "CLAUDE.md"), false);
  assert.equal(has(d, ".cursor/rules/quantum-ui.mdc"), false);
});

test("init -y and init both do cursor + claude + mcp; --no-mcp skips configs", () => {
  for (const args of [["init", "-y"], ["init", "both"]]) {
    const d = project();
    assert.equal(run(d, ...args).status, 0);
    for (const f of [".cursor/rules/quantum-ui.mdc", ".cursor/mcp.json", "CLAUDE.md", ".mcp.json"]) assert.equal(has(d, f), true, `${args} -> ${f}`);
  }
  const d = project();
  assert.equal(run(d, "init", "-y", "--no-mcp").status, 0);
  assert.equal(has(d, "CLAUDE.md"), true);
  assert.equal(has(d, ".mcp.json"), false);
  assert.equal(has(d, ".cursor/mcp.json"), false);
});

test("legacy --cursor / --claude flags still work", () => {
  const d = project();
  assert.equal(run(d, "init", "--cursor", "--claude").status, 0);
  assert.equal(has(d, ".cursor/rules/quantum-ui.mdc"), true);
  assert.equal(has(d, "CLAUDE.md"), true);
});

test("merges existing files, is idempotent, never duplicates the CLAUDE.md block", () => {
  const d = project();
  writeFileSync(join(d, "CLAUDE.md"), "# Mine\n\nKeep me.\n");
  writeFileSync(join(d, ".mcp.json"), JSON.stringify({ mcpServers: { other: { command: "x" } } }));
  writeFileSync(join(d, "components.json"), JSON.stringify({ style: "default", registries: { "@other": "https://x/{name}.json" } }));
  assert.equal(run(d, "init", "-y").status, 0);
  const snapshot = ["CLAUDE.md", ".mcp.json", "components.json", ".cursor/mcp.json"].map((f) => read(d, f));
  assert.equal(run(d, "init", "-y").status, 0);
  assert.deepEqual(["CLAUDE.md", ".mcp.json", "components.json", ".cursor/mcp.json"].map((f) => read(d, f)), snapshot);
  assert.match(read(d, "CLAUDE.md"), /Keep me\./);
  assert.equal(read(d, "CLAUDE.md").split("quantum-ui:start").length - 1, 1);
  assert.ok(json(d, ".mcp.json").mcpServers.other && json(d, ".mcp.json").mcpServers["quantum-ui"]);
  const cj = json(d, "components.json");
  assert.equal(cj.style, "default");
  assert.ok(cj.registries["@other"] && cj.registries["@quantum-ui"]);
});

test("--registry sets the URL template and the MCP env", () => {
  const d = project();
  assert.equal(run(d, "init", "mcp", "--registry", "https://example.com/r/").status, 0);
  assert.equal(json(d, "components.json").registries["@quantum-ui"], "https://example.com/r/{name}.json");
  assert.equal(json(d, ".mcp.json").mcpServers["quantum-ui"].env.QUANTUM_UI_REGISTRY, "https://example.com/r");
});

test("--dry-run writes nothing", () => {
  const d = project();
  const r = run(d, "init", "-y", "--dry-run");
  assert.equal(r.status, 0);
  assert.equal(has(d, "components.json") || has(d, "CLAUDE.md") || has(d, ".cursor"), false);
});

test("unknown target / command fail with exit 1; missing package.json fails", () => {
  const d = project();
  const t = run(d, "init", "vscode");
  assert.equal(t.status, 1);
  assert.match(t.stderr, /Unknown target/);
  const c = run(d, "add", "x");
  assert.equal(c.status, 1);
  assert.match(c.stderr, /npx shadcn@latest add @quantum-ui/);
  const empty = mkdtempSync(join(tmpdir(), "qui-empty-"));
  assert.equal(run(empty, "init").status, 1);
});
