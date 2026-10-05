# Quantum UI

Quantum UI is a futuristic React component library focused on precision interfaces, motion, glass surfaces, and reusable UI primitives.

> Work in progress — the public component library is currently under active development.

## Development

This repository contains the active Vite + React application.

```bash
npm install
npm run dev
```

## Status

Quantum UI is open source and actively being built. Components and documentation will continue to evolve.

## Using Quantum UI in your project

Quantum UI is a copy-paste component registry (React + Tailwind CSS v4). Components are installed with the
[shadcn CLI](https://ui.shadcn.com/docs/cli); there is no runtime package to depend on.

```bash
# add a component: works in any project, no setup (this is the command on each component page)
npx shadcn@latest add https://raw.githubusercontent.com/sumeethofficial-svg/Quantum-UI/main/public/r/photon-button.json

# or register the @quantum-ui registry once, then use short names
npx quantum-ui-cli init
npx shadcn@latest add @quantum-ui/photon-button
npx shadcn@latest search @quantum-ui         # browse
npx shadcn@latest view @quantum-ui/wave-grid # read the source first
```

Components are copied to `src/components/quantum-ui/` and each has a **default export**:

```jsx
import PhotonButton from "./components/quantum-ui/PhotonButton"; // path relative to the importing file

export default function App() {
  return <PhotonButton>Initialize sequence →</PhotonButton>;
}
```

No `@/` alias is needed to *use* the components. (The shadcn CLI itself reads `tsconfig.json`/`jsconfig.json`;
`init` creates a `jsconfig.json` only if the project has neither.)

### Cursor / Claude

```bash
npx quantum-ui-cli init cursor   # .cursor/rules/quantum-ui.mdc + .cursor/mcp.json
npx quantum-ui-cli init claude   # CLAUDE.md section + .mcp.json
npx quantum-ui-cli init mcp      # MCP server config only (.cursor/mcp.json and .mcp.json)
npx quantum-ui-cli init -y       # Cursor + Claude + MCP config
```

Existing files are merged, never overwritten. Add `--no-mcp` to write the instructions without the MCP config.

### MCP server

`quantum-ui-mcp` lets an assistant search components and read their source before installing.

```json
{
  "mcpServers": {
    "quantum-ui": { "command": "npx", "args": ["-y", "quantum-ui-mcp"] }
  }
}
```

Tools: `list_components`, `search_components`, `get_component`, `get_install_command`.
Because `init` writes the `@quantum-ui` registry into `components.json`, shadcn's own MCP server
(`npx shadcn@latest mcp init`) can also browse it.

## Maintaining the registry

`src/data/components.ts` decides what is public; sources live in `src/components/ui/`. Empty placeholder files are
never published. Registry config (name, namespace, base URL, package names) lives in `registry.config.json`.

```bash
npm run registry:build    # writes public/r/*.json (also runs before every `npm run build`)
npm run registry:verify   # every listed component resolves, content is fresh, names/URLs agree
npm run mcp:install       # one-time: install MCP server dependencies
npm test                  # build + verify registry, then CLI and MCP server tests
```

Commit `public/r/` after changing a component: the default registry URL serves it straight from `main`.
