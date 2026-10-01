// Spawns the server over stdio and exercises every tool against the local registry (public/r).
import { test } from "node:test";
import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const registry = join(here, "../../../public/r");
const entry = join(here, "../src/index.js");

async function withClient(fn) {
  const t = new StdioClientTransport({ command: process.execPath, args: [entry], env: { ...process.env, QUANTUM_UI_REGISTRY: registry } });
  const c = new Client({ name: "test", version: "0.0.0" });
  await c.connect(t);
  try { await fn(c); } finally { await c.close(); }
}
const body = (r) => r.content[0].text;

test("exposes the four tools", () => withClient(async (c) => {
  const names = (await c.listTools()).tools.map((t) => t.name).sort();
  assert.deepEqual(names, ["get_component", "get_install_command", "list_components", "search_components"]);
}));

test("list_components lists everything and filters by category", () => withClient(async (c) => {
  const all = body(await c.callTool({ name: "list_components", arguments: {} }));
  assert.match(all, /photon-button/);
  const bg = body(await c.callTool({ name: "list_components", arguments: { category: "backgrounds" } }));
  assert.match(bg, /wave-grid/);
  assert.doesNotMatch(bg, /photon-button/);
  const none = await c.callTool({ name: "list_components", arguments: { category: "zzz" } });
  assert.equal(none.isError, true);
}));

test("search_components ranks name matches", () => withClient(async (c) => {
  assert.match(body(await c.callTool({ name: "search_components", arguments: { query: "photon" } })), /^- photon-button/);
  assert.match(body(await c.callTool({ name: "search_components", arguments: { query: "qqqq" } })), /No matches/);
}));

test("get_component returns source, shadcn install command and default-export usage", () => withClient(async (c) => {
  const t = body(await c.callTool({ name: "get_component", arguments: { name: "Photon Button" } }));
  assert.match(t, /npx shadcn@latest add @quantum-ui\/photon-button/);
  assert.match(t, /import PhotonButton from "\.\/components\/quantum-ui\/PhotonButton"/);
  assert.match(t, /export default/);
  assert.doesNotMatch(t, /@quantum-ui\/react|from "@\//);
}));

test("get_component rejects unknown and path-like names", () => withClient(async (c) => {
  assert.equal((await c.callTool({ name: "get_component", arguments: { name: "nope" } })).isError, true);
  assert.equal((await c.callTool({ name: "get_component", arguments: { name: "../../etc/passwd" } })).isError, true);
}));

test("get_install_command builds one shadcn command and rejects unknowns", () => withClient(async (c) => {
  assert.equal(body(await c.callTool({ name: "get_install_command", arguments: { names: ["Flip Text", "wave-grid"] } })),
    "npx shadcn@latest add @quantum-ui/flip-text @quantum-ui/wave-grid");
  assert.equal((await c.callTool({ name: "get_install_command", arguments: { names: ["nope"] } })).isError, true);
}));

test("components whose file name differs from their title resolve correctly", () => withClient(async (c) => {
  const t = body(await c.callTool({ name: "get_component", arguments: { name: "3D Text Reveal" } }));
  assert.match(t, /npx shadcn@latest add @quantum-ui\/3d-text-reveal/);
  assert.match(t, /import Text3DReveal from "\.\/components\/quantum-ui\/Text3DReveal"/);
  assert.match(t, /components\/quantum-ui\/Text3DReveal\.jsx/);
  assert.doesNotMatch(t, /from "@\//);
  const k = body(await c.callTool({ name: "get_component", arguments: { name: "kinetic-typography" } }));
  assert.match(k, /import KineticText from "\.\/components\/quantum-ui\/KineticText"/);
}));
