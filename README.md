<div align="center">

# Quantum UI

**Components built to feel different.**

Open-source React components with distinctive interaction, depth and motion, for interfaces that don't look like every other card-and-button kit.

[Live site](https://quantumui-labs.vercel.app) · [Browse components](https://quantumui-labs.vercel.app/components) · [Report a bug](https://github.com/sumeethofficial-svg/Quantum-UI/issues) · [Request a component](https://github.com/sumeethofficial-svg/Quantum-UI/issues)

![Status: beta](https://img.shields.io/badge/status-beta-4dd8ff?style=flat-square)
![React](https://img.shields.io/badge/React-black?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-black?style=flat-square&logo=tailwindcss&logoColor=38BDF8)
![Vite](https://img.shields.io/badge/Vite-black?style=flat-square&logo=vite&logoColor=A78BFA)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-black?style=flat-square)

</div>

<!-- Add a screenshot or GIF of the site here, for example:
![Quantum UI preview](./public/preview.png)
-->

> [!NOTE]
> Quantum UI is in **beta**. New components and features are added regularly, so expect rough edges and the occasional breaking change. Contributions are welcome.

## Why Quantum

Most component kits look alike. Quantum focuses on three things instead:

- **Interaction**: buttons, toggles, links and menus engineered around how they feel to use.
- **Motion**: animated surfaces and transitions that share one visual language.
- **Composition**: cards, navigation and layout blocks designed to work together.

Everything is open source, so you can read how each component is built and adapt it to your project.

## Components

| Group | Components |
| --- | --- |
| Interactions | Photon Button, Magnetic Link, Signal Toggle, Orbit Menu, Liquid Button |

Plus data and surface components. Every component has a live preview, its source code and a copyable install command on the [components page](https://quantumui-labs.vercel.app/components).

## Getting started

### Requirements

- A React project (Vite or Next.js) using **Tailwind CSS v4**
- A `components.json` for the shadcn CLI. If your project doesn't have one, run `npx shadcn@latest init` first.

### Install a component

Components install through the shadcn CLI, so the source lands in your own project and you own it.

<!-- TODO: replace <registry-path> with the real path from the install command on the components page -->
```bash
npx shadcn@latest add https://raw.githubusercontent.com/sumeethofficial-svg/Quantum-UI/main/<registry-path>/photon-button.json
```

Each component page has the exact command for that component with a copy button.

### Use it

Import the component from wherever the CLI placed it. That depends on the aliases in your `components.json`, so adjust the path to match your project:

```jsx
import PhotonButton from "./components/ui/photon-button";

export default function Example() {
  return <PhotonButton>Initialize sequence</PhotonButton>;
}
```

## Run the docs site locally

```bash
git clone https://github.com/sumeethofficial-svg/Quantum-UI.git
cd Quantum-UI
npm install
npm run dev
```

Then open <http://localhost:5173>.

## Project structure

```
Quantum-UI/
├── public/                # static assets
├── scripts/               # helper scripts
├── packages/              # CLI and MCP server (in progress)
├── src/
│   ├── components/
│   │   ├── hero/          # homepage hero
│   │   ├── library/       # components page: sidebar, preview, code, install
│   │   ├── navigation/    # navbar
│   │   ├── sections/      # homepage sections
│   │   └── ui/            # the Quantum components
│   ├── data/              # component metadata
│   ├── pages/             # home and docs pages
│   ├── App.jsx
│   └── main.jsx
├── registry.config.json   # registry configuration
└── vercel.json
```

## Roadmap

- [x] Docs site with live previews, source code and copyable install commands
- [ ] Registry: every component installable through the shadcn CLI
- [ ] Quantum CLI
- [ ] MCP server, so AI assistants can browse and install components
- [ ] More components across interaction, motion and composition

## Contributing

Contributions of every size are welcome: a bug fix, a docs improvement, a new component.

1. Fork the repo and create a branch: `git checkout -b feat/my-component`
2. Run the site locally with `npm run dev`
3. Make your change. For a new component, look at how an existing one such as Photon Button is built and listed, and follow the same pattern.
4. Check that it works on the components page, then open a pull request describing what you changed and why.

Not sure where to start? Open an [issue](https://github.com/sumeethofficial-svg/Quantum-UI/issues) with your idea before you build it, and we can talk it through.

## License

<!-- Add a LICENSE file to the repo and name the license here, for example: MIT -->

## Author

Built by **Sumeeth HB**. Find me on [X (@sumedev_)](https://x.com/sumedev_) and [GitHub](https://github.com/sumeethofficial-svg).

If you find Quantum UI useful, a star on the repo helps a lot.
