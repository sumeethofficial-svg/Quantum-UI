# quantum-ui-mcp

MCP server for [Quantum UI](https://github.com/sumeethofficial-svg/Quantum-UI): search components and read their
source. Install components with `npx shadcn@latest add @quantum-ui/<name>` (run `npx quantum-ui-cli init` first).

```json
{ "mcpServers": { "quantum-ui": { "command": "npx", "args": ["-y", "quantum-ui-mcp"] } } }
```

Tools: `list_components`, `search_components`, `get_component`, `get_install_command`.
Set `QUANTUM_UI_REGISTRY` (URL or local folder containing `registry.json`) to use a different registry.
