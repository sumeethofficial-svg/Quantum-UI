# quantum-ui-cli

One-time setup for [Quantum UI](https://github.com/sumeethofficial-svg/Quantum-UI). Registers the `@quantum-ui`
registry in your `components.json`; components are then installed with the **shadcn CLI**.

```bash
npx quantum-ui-cli init                 # add the registry (creates components.json if missing)
npx quantum-ui-cli init --cursor        # + Cursor rule and .cursor/mcp.json
npx quantum-ui-cli init --claude        # + CLAUDE.md section and .mcp.json
npx shadcn@latest add @quantum-ui/photon-button
```

Existing files are merged, never overwritten. `--dry-run` previews changes; `--registry <url>` points at another registry.
