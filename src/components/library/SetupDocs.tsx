import { useState } from "react";
import CopyButton from "./CopyButton";
import registryConfig from "../../../registry.config.json";

/* =====================================================
   SETUP DOCS
   Shown in the component library when a "Setup" item
   is selected in the left sidebar.
===================================================== */

const { baseUrl, namespace, cliPackage, mcpPackage, installDir } =
  registryConfig;

const PMS = ["npm", "pnpm", "yarn", "bun"];

// Runner prefixes follow the shadcn CLI docs.
const SHADCN = {
  npm: "npx shadcn@latest",
  pnpm: "pnpm dlx shadcn@latest",
  yarn: "npx shadcn@latest",
  bun: "bunx --bun shadcn@latest",
};

const INSTALL = {
  npm: "npm install",
  pnpm: "pnpm add",
  yarn: "yarn add",
  bun: "bun add",
};

const RUNNER = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "npx",
  bun: "bunx",
};

const CREATE_NEXT = {
  npm: "npx create-next-app@latest my-app",
  pnpm: "pnpm create next-app@latest my-app",
  yarn: "yarn create next-app my-app",
  bun: "bun create next-app my-app",
};

const SAMPLE_URL = `${baseUrl}/photon-button.json`;

/** Items shown under "SETUP" in the sidebar (single source of truth). */
export const setupDocs = [
  { id: "nextjs", name: "Next.js" },
  { id: "tailwind", name: "Tailwind CSS" },
  { id: "features", name: "Add Features" },
  { id: "cli", name: "CLI" },
];

/* =====================================================
   BUILDING BLOCKS
===================================================== */

function Code({ children }) {
  return (
    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[13px] text-cyan-100">
      {children}
    </code>
  );
}

function P({ children }) {
  return (
    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">{children}</p>
  );
}

function Section({ id, title, children }) {
  return (
    <section className="mt-12">
      <h3
        id={id}
        className="scroll-mt-8 text-2xl font-semibold tracking-[-0.025em]"
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

function PmTabs({ pm, setPm }) {
  return (
    <div
      role="tablist"
      aria-label="Package manager"
      className="mt-6 flex w-fit gap-1 rounded-lg border border-white/[0.08] bg-[#0b0d11] p-1"
    >
      {PMS.map((name) => (
        <button
          key={name}
          type="button"
          role="tab"
          aria-selected={pm === name}
          onClick={() => setPm(name)}
          className={`rounded-md px-3 py-1.5 font-mono text-xs transition-all ${
            pm === name
              ? "bg-[#202a30] text-cyan-100"
              : "text-slate-600 hover:text-slate-300"
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

function Command({ command, caption = "" }) {
  return (
    <div className="mt-4">
      {caption && (
        <div className="mb-1.5 font-mono text-[11px] text-slate-600">
          {caption}
        </div>
      )}
      <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#0b0d11] px-4 py-3">
        <code className="overflow-x-auto whitespace-nowrap font-mono text-xs text-cyan-50">
          {command}
        </code>
        <CopyButton text={command} />
      </div>
    </div>
  );
}

/** Two-column list: a code label and a plain description. */
function Rows({ rows, labelWidth = "w-48" }) {
  return (
    <div className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0d11]">
      {rows.map(([label, text]) => (
        <div
          key={label}
          className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-6"
        >
          <code className={`${labelWidth} shrink-0 font-mono text-xs text-cyan-100`}>
            {label}
          </code>
          <span className="text-sm text-slate-400">{text}</span>
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ title = "code", code }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0d11]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.6)]" />
          {title}
        </div>
        <CopyButton text={code} label="Copy code" />
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-6 text-cyan-50">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* =====================================================
   CODE SNIPPETS
===================================================== */

const nextUsage = `import PhotonButton from "../components/quantum-ui/PhotonButton";

export default function Page() {
  return <PhotonButton>Initialize sequence →</PhotonButton>;
}`;

const nextClient = `"use client";

import PhotonButton from "../components/quantum-ui/PhotonButton";

export default function Page() {
  return <PhotonButton>Initialize sequence →</PhotonButton>;
}`;

const viteConfig = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`;

const cssImport = `@import "tailwindcss";`;

const postcssConfig = `export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};`;

const tailwindCheck = `<p className="text-cyan-300">Tailwind is working</p>`;

const utilsFile = `import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}`;

const utilsExample = `import { cn } from "../lib/utils";

export function Example({ active }) {
  return (
    <div
      className={cn(
        "rounded-md border px-4 py-2 text-sm",
        active && "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
      )}
    >
      Quantum UI
    </div>
  );
}`;

const registryTemplate = `${baseUrl}/{name}.json`;

const componentsJson = `{
  "registries": {
    "${namespace}": "${registryTemplate}"
  }
}`;

const mcpJson = `{
  "mcpServers": {
    "quantum-ui": { "command": "npx", "args": ["-y", "${mcpPackage}"] }
  }
}`;

const optionRows = [
  ["-y, --yes", "skip the confirmation prompt"],
  ["-o, --overwrite", "overwrite existing files"],
  ["-c, --cwd <cwd>", "the working directory"],
  ["-p, --path <path>", "the path to add the component to"],
  ["-h, --help", "display help for command"],
];

const targetRows = [
  ["cursor", ".cursor/rules/quantum-ui.mdc + .cursor/mcp.json"],
  ["claude", "CLAUDE.md section + .mcp.json"],
  ["mcp", "MCP server config only (.cursor/mcp.json and .mcp.json)"],
  ["-y", "Cursor + Claude + MCP config"],
];

/* =====================================================
   PAGES
===================================================== */

const PAGES = {
  nextjs: {
    title: "Next.js",
    description: "Use Quantum UI in a Next.js app.",
    sections: [
      { id: "create-project", title: "Create a project" },
      { id: "add-component", title: "Add a component" },
      { id: "use-component", title: "Use it" },
      { id: "client-components", title: "Client components" },
    ],
    render: (pm) => (
      <>
        <Section id="create-project" title="Create a project">
          <P>
            Start from the Next.js CLI. When it asks about Tailwind CSS, answer{" "}
            <Code>Yes</Code>: Quantum UI components are styled with Tailwind
            CSS v4 utility classes.
          </P>
          <Command command={CREATE_NEXT[pm]} />
          <P>
            TypeScript projects work too. Quantum UI files are <Code>.tsx</Code>
            , and the default Next.js <Code>tsconfig.json</Code> allows
            JavaScript imports.
          </P>
        </Section>

        <Section id="add-component" title="Add a component">
          <P>
            From your project root, add a component with the shadcn CLI. This
            works with no setup.
          </P>
          <Command command={`${SHADCN[pm]} add ${SAMPLE_URL}`} />
          <P>
            The file is copied to <Code>components/quantum-ui/</Code> (inside{" "}
            <Code>src/</Code> if your project uses a <Code>src</Code> folder).
            Want short names like <Code>@quantum-ui/photon-button</Code>? See
            the{" "}
            <a
              href="/docs"
              className="text-cyan-200 underline decoration-white/20 underline-offset-4 hover:decoration-cyan-200"
            >
              Docs
            </a>{" "}
            page for <Code>init</Code>.
          </P>
        </Section>

        <Section id="use-component" title="Use it">
          <P>
            Every component has a default export. Import it with a relative
            path (the <Code>@/</Code> alias that Next.js sets up works as well).
          </P>
          <CodeBlock title="app/page.tsx" code={nextUsage} />
        </Section>

        <Section id="client-components" title="Client components">
          <P>
            Most Quantum UI components use React state and effects, so in the
            App Router they must render inside a Client Component. If you see
            an error about hooks in a Server Component, add{" "}
            <Code>"use client"</Code> as the first line of the file that
            imports the component.
          </P>
          <CodeBlock title="app/page.tsx" code={nextClient} />
        </Section>
      </>
    ),
  },

  tailwind: {
    title: "Tailwind CSS",
    description: "Quantum UI is styled with Tailwind CSS v4.",
    sections: [
      { id: "install", title: "Install Tailwind CSS" },
      { id: "vite-plugin", title: "Configure Vite" },
      { id: "import-css", title: "Import Tailwind" },
      { id: "nextjs", title: "Using Next.js" },
      { id: "verify", title: "Check it works" },
    ],
    render: (pm) => (
      <>
        <Section id="install" title="Install Tailwind CSS">
          <P>
            Quantum UI needs Tailwind CSS <Code>v4</Code>. In a Vite + React
            project, install Tailwind and its Vite plugin.
          </P>
          <Command command={`${INSTALL[pm]} tailwindcss @tailwindcss/vite`} />
        </Section>

        <Section id="vite-plugin" title="Configure Vite">
          <P>Add the plugin to your Vite config.</P>
          <CodeBlock title="vite.config.ts" code={viteConfig} />
        </Section>

        <Section id="import-css" title="Import Tailwind">
          <P>Add one line to the top of your main CSS file.</P>
          <CodeBlock title="src/index.css" code={cssImport} />
        </Section>

        <Section id="nextjs" title="Using Next.js">
          <P>
            <Code>create-next-app</Code> sets Tailwind up for you when you
            answer Yes to its prompt. To add it to an existing Next.js app,
            install the PostCSS plugin instead:
          </P>
          <Command
            command={`${INSTALL[pm]} tailwindcss @tailwindcss/postcss postcss`}
          />
          <CodeBlock title="postcss.config.mjs" code={postcssConfig} />
          <P>
            Then import Tailwind at the top of <Code>app/globals.css</Code>{" "}
            with the same <Code>@import "tailwindcss";</Code> line.
          </P>
        </Section>

        <Section id="verify" title="Check it works">
          <P>
            Tailwind v4 finds your class names automatically, so there is no{" "}
            <Code>tailwind.config.js</Code> or content list to edit. Components
            added to <Code>components/quantum-ui</Code> are picked up right
            away. To test, render this anywhere. If the text turns cyan,
            you're set.
          </P>
          <CodeBlock title="any component" code={tailwindCheck} />
        </Section>
      </>
    ),
  },

  features: {
    title: "Add Features",
    description: "Optional helpers for the code you write around Quantum UI.",
    sections: [
      { id: "install-dependencies", title: "Install dependencies" },
      { id: "add-util-file", title: "Add util file" },
      { id: "use-the-utility", title: "Use the utility" },
      { id: "extra-dependencies", title: "Extra dependencies" },
    ],
    render: (pm) => (
      <>
        <P>
          Quantum UI components are self-contained and need none of this. These
          helpers are for your own components, when you want conditional
          classes that still merge Tailwind conflicts cleanly.
        </P>

        <Section id="install-dependencies" title="Install dependencies">
          <Command command={`${INSTALL[pm]} clsx tailwind-merge`} />
        </Section>

        <Section id="add-util-file" title="Add util file">
          <CodeBlock title="lib/utils.ts" code={utilsFile} />
        </Section>

        <Section id="use-the-utility" title="Use the utility">
          <P>
            Use <Code>cn</Code> anywhere you need conditional classes.
          </P>
          <CodeBlock title="components/example.tsx" code={utilsExample} />
        </Section>

        <Section id="extra-dependencies" title="Extra dependencies">
          <P>
            Quantum UI components ship with zero npm dependencies. If a
            component ever needs a package, it is listed in that component's
            registry file and the shadcn CLI installs it for you when you add
            the component.
          </P>
        </Section>
      </>
    ),
  },

  cli: {
    title: "CLI",
    description: "Installing Quantum UI with the shadcn CLI.",
    sections: [
      { id: "add-components", title: "Add components" },
      { id: "initialization", title: "Initialization" },
      { id: "namespaced-registry", title: "Namespaced registry" },
      { id: "add-options", title: "Add options" },
      { id: "monorepo", title: "Monorepo" },
      { id: "agents-mcp", title: "Agent rules + MCP" },
    ],
    render: (pm) => (
      <>
        <Section id="add-components" title="Add components">
          <P>
            Use the <Code>add</Code> command with the Quantum UI registry URL
            from any component page. This works in any project with no setup.
          </P>
          <Command command={`${SHADCN[pm]} add ${SAMPLE_URL}`} />
        </Section>

        <Section id="initialization" title="Initialization">
          <P>
            Optional, once per project. <Code>init</Code> registers the{" "}
            <Code>{namespace}</Code> registry in <Code>components.json</Code>{" "}
            so you can use short component names. It creates{" "}
            <Code>components.json</Code> if you don't have one, and only adds
            the registry entry if you do.
          </P>
          <Command command={`${RUNNER[pm]} ${cliPackage} init`} />
          <CodeBlock
            title="output"
            code={`✓ components.json created — ${namespace} → ${registryTemplate}

Next:
  ${SHADCN.npm} add ${namespace}/photon-button`}
          />
          <P>
            The shadcn CLI reads path aliases from <Code>tsconfig.json</Code>{" "}
            or <Code>jsconfig.json</Code>. <Code>init</Code> creates a{" "}
            <Code>jsconfig.json</Code> only when your project has neither. Add{" "}
            <Code>--dry-run</Code> to preview changes, or{" "}
            <Code>--registry &lt;url&gt;</Code> to point at another registry.
          </P>
        </Section>

        <Section id="namespaced-registry" title="Namespaced registry">
          <P>
            After <Code>init</Code>, <Code>components.json</Code> contains a
            registry alias, so you can install by short name. You can also add
            it by hand:
          </P>
          <CodeBlock title="components.json" code={componentsJson} />
          <Command
            caption="Add a component"
            command={`${SHADCN[pm]} add ${namespace}/photon-button`}
          />
          <Command
            caption="Browse the registry"
            command={`${SHADCN[pm]} search ${namespace}`}
          />
          <Command
            caption="Read the source before installing"
            command={`${SHADCN[pm]} view ${namespace}/wave-grid`}
          />
          <P>
            Components are copied to <Code>src/{installDir}/</Code>. Each one
            has a default export and needs no <Code>@/</Code> alias to use.
          </P>
        </Section>

        <Section id="add-options" title="Add options">
          <P>
            <Code>{`${SHADCN[pm]} add [options] [components...]`}</Code> accepts a
            component name or a registry URL, plus:
          </P>
          <Rows rows={optionRows} />
        </Section>

        <Section id="monorepo" title="Monorepo">
          <P>
            In a monorepo, pass the workspace path with <Code>-c</Code> or{" "}
            <Code>--cwd</Code>.
          </P>
          <Command command={`${SHADCN[pm]} add ${SAMPLE_URL} -c ./apps/web`} />
        </Section>

        <Section id="agents-mcp" title="Agent rules + MCP">
          <P>
            Install Quantum UI instructions for your AI editor and the MCP
            server config in one command. Pass a target, or <Code>-y</Code> for
            Cursor + Claude + MCP.
          </P>
          <CodeBlock
            title="code"
            code={[
              `${RUNNER[pm]} ${cliPackage} init cursor`,
              `${RUNNER[pm]} ${cliPackage} init claude`,
              `${RUNNER[pm]} ${cliPackage} init mcp`,
              `${RUNNER[pm]} ${cliPackage} init -y`,
            ].join("\n")}
          />
          <Rows rows={targetRows} labelWidth="w-24" />
          <P>
            Existing files are merged, never overwritten. Add{" "}
            <Code>--no-mcp</Code> to write the instructions without the MCP
            config. MCP configs use <Code>npx -y {mcpPackage}</Code>:
          </P>
          <CodeBlock title=".cursor/mcp.json · .mcp.json" code={mcpJson} />
          <P>
            The server gives your assistant four tools:{" "}
            <Code>list_components</Code>, <Code>search_components</Code>,{" "}
            <Code>get_component</Code> and <Code>get_install_command</Code>. It
            does not replace shadcn <Code>add</Code> for installing components.
            Set <Code>QUANTUM_UI_REGISTRY</Code> to a URL or a local folder
            containing <Code>registry.json</Code> to use a different registry.
          </P>
        </Section>
      </>
    ),
  },
};

/* =====================================================
   EXPORTS
===================================================== */

function SetupDocs({ docId }) {
  const [pm, setPm] = useState("npm");
  const page = PAGES[docId];

  if (!page) return null;

  return (
    <div key={docId}>
      <div className="font-mono text-xs text-slate-600">
        SETUP / <span className="text-white/80">{page.title.toUpperCase()}</span>
      </div>

      <div className="my-4">
        <h2 className="m-0 text-[30px] font-semibold tracking-[-0.035em] md:text-[38px]">
          {page.title}
        </h2>

        <p className="mt-2 text-sm text-slate-400 md:text-[15px]">
          {page.description}
        </p>
      </div>

      <PmTabs pm={pm} setPm={setPm} />

      <div className="pb-16">{page.render(pm)}</div>
    </div>
  );
}

/** Right-hand "On this page" list for a setup page. */
export function SetupPageNav({ docId }) {
  const page = PAGES[docId];
  if (!page) return null;

  const jump = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav
      aria-label="On this page"
      className="hidden min-h-0 overflow-y-auto border-l border-white/[0.06] px-6 py-[43px] xl:block"
    >
      <div className="mb-3 font-mono text-[10px] tracking-[0.14em] text-slate-600">
        ON THIS PAGE
      </div>

      <ul className="space-y-1">
        {page.sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => jump(section.id)}
              className="block w-full rounded-md px-2 py-1.5 text-left text-[13px] text-slate-500 transition-colors hover:text-white"
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SetupDocs;