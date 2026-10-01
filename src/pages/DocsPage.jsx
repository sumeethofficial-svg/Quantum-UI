import { useEffect, useRef, useState } from "react";
import CopyButton from "../components/library/CopyButton";
import registryConfig from "../../registry.config.json";

/* =====================================================
   CONFIG — everything comes from registry.config.json,
   so the docs never drift from the real registry.
===================================================== */

const { baseUrl, namespace, cliPackage, mcpPackage, homepage, installDir } =
  registryConfig;

const PMS = ["npm", "pnpm", "yarn", "bun"];

// Runner prefixes follow the shadcn CLI docs.
const SHADCN = {
  npm: "npx shadcn@latest",
  pnpm: "pnpm dlx shadcn@latest",
  yarn: "npx shadcn@latest",
  bun: "bunx --bun shadcn@latest",
};

const RUNNER = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "npx",
  bun: "bunx",
};

const SAMPLE = "photon-button";
const SAMPLE_URL = `${baseUrl}/${SAMPLE}.json`;
const REGISTRY_TEMPLATE = `${baseUrl}/{name}.json`;

const SECTIONS = [
  { id: "requirements", title: "Requirements", keywords: "react tailwind v4 node" },
  { id: "add-components", title: "Add components", keywords: "add install url shadcn" },
  { id: "initialization", title: "Initialization", keywords: "init cli components.json setup" },
  { id: "namespaced-registry", title: "Namespaced registry", keywords: "short names alias search view" },
  { id: "using-components", title: "Using a component", keywords: "import default export path usage" },
  { id: "options", title: "Add options", keywords: "yes overwrite cwd path flags" },
  { id: "monorepo", title: "Monorepo", keywords: "cwd workspace apps web" },
  { id: "agents-mcp", title: "Agent rules + MCP", keywords: "cursor claude mcp ai assistant agent" },
];

/* =====================================================
   SMALL BUILDING BLOCKS
===================================================== */

function Code({ children }) {
  return (
    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[13px] text-cyan-100">
      {children}
    </code>
  );
}

function P({ children }) {
  return <p className="mt-3 text-[15px] leading-7 text-slate-400">{children}</p>;
}

function H2({ id, children }) {
  return (
    <h2
      id={id}
      className="group scroll-mt-28 text-2xl font-semibold tracking-[-0.025em] text-white"
    >
      <a href={`#${id}`} className="no-underline">
        {children}
        <span className="ml-2 font-mono text-base text-slate-700 opacity-0 transition group-hover:opacity-100">
          #
        </span>
      </a>
    </h2>
  );
}

function PmTabs({ pm, setPm }) {
  return (
    <div
      role="tablist"
      aria-label="Package manager"
      className="mt-5 flex w-fit gap-1 rounded-lg border border-white/[0.08] bg-[#0b0d11] p-1"
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

/** One-line shell command with a copy button. */
function Command({ command, caption }) {
  return (
    <div className="mt-3">
      {caption && (
        <div className="mb-1.5 font-mono text-[11px] text-slate-600">{caption}</div>
      )}
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0b0d11] px-4 py-3">
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
          bash
        </span>
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs text-cyan-50">
          {command}
        </code>
        <CopyButton text={command} />
      </div>
    </div>
  );
}

/** Multi-line code / output block with a titled header. */
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
   HEADER (matches the /components top bar)
===================================================== */

function DocsHeader({ onSearch, searchRef }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[77px] max-w-[1500px] items-center justify-between gap-4 px-6 lg:px-10">
        {/* Logo */}
        <a href="/" className="group flex shrink-0 items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.02]">
            <div className="absolute inset-[5px] rounded-full border border-white/[0.12]" />
            <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.45)]" />
          </div>
          <span className="text-sm font-semibold tracking-[0.12em] text-white/80 transition-colors group-hover:text-white">
            QUANTUM UI
          </span>
        </a>

        {/* Search */}
        <div className="hidden min-w-0 flex-1 justify-center md:flex">
          <label className="flex h-[54px] w-full max-w-[382px] items-center gap-3 rounded-xl border border-white/[0.10] bg-white/[0.02] px-4 text-slate-500 focus-within:border-cyan-300/40">
            <span aria-hidden="true">⌕</span>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search documentation..."
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch(e.currentTarget.value);
              }}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
            <kbd className="rounded-md border border-white/[0.12] px-2 py-0.5 font-mono text-xs text-slate-500">
              /
            </kbd>
          </label>
        </div>

        {/* Links */}
        <nav className="flex shrink-0 items-center gap-6 text-sm md:gap-8">
          <a href="/components" className="hidden text-white/70 transition-colors hover:text-white sm:block">
            Components
          </a>
          <a href="/docs" className="text-white">
            Docs
          </a>
          <a href="#templates" className="hidden text-white/70 transition-colors hover:text-white sm:block">
            Templates
          </a>
          <a
            href={homepage}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.025] px-4 py-2 text-white/80 transition-colors hover:text-white md:flex"
          >
            <span aria-hidden="true">⌥</span>
            Open source
          </a>
        </nav>
      </div>
    </header>
  );
}

/* =====================================================
   PAGE
===================================================== */

function DocsPage() {
  const [pm, setPm] = useState("npm");
  const [active, setActive] = useState(SECTIONS[0].id);
  const searchRef = useRef(null);

  const shadcn = SHADCN[pm];
  const runner = RUNNER[pm];

  /* page title */
  useEffect(() => {
    const previous = document.title;
    document.title = "CLI · Docs · Quantum UI";
    return () => {
      document.title = previous;
    };
  }, []);

  /* scroll-spy for the sidebar */
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* "/" focuses the search box */
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* jump to the first section matching the query */
  const jumpTo = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const hit = SECTIONS.find((s) =>
      `${s.title} ${s.keywords}`.toLowerCase().includes(q)
    );
    if (!hit) return;
    document.getElementById(hit.id)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `#${hit.id}`);
  };

  const usageCode = `import PhotonButton from "./${installDir}/PhotonButton"; // path relative to the importing file

export default function App() {
  return <PhotonButton>Initialize sequence →</PhotonButton>;
}`;

  const componentsJson = `{
  "registries": {
    "${namespace}": "${REGISTRY_TEMPLATE}"
  }
}`;

  const initOutput = `✓ components.json created — ${namespace} → ${REGISTRY_TEMPLATE}

Next:
  ${SHADCN.npm} add ${namespace}/${SAMPLE}`;

  const agentCommands = [
    `${runner} ${cliPackage} init cursor`,
    `${runner} ${cliPackage} init claude`,
    `${runner} ${cliPackage} init mcp`,
    `${runner} ${cliPackage} init -y`,
  ].join("\n");

  const mcpJson = `{
  "mcpServers": {
    "quantum-ui": { "command": "npx", "args": ["-y", "${mcpPackage}"] }
  }
}`;

  const options = [
    ["-y, --yes", "skip the confirmation prompt"],
    ["-o, --overwrite", "overwrite existing files"],
    ["-c, --cwd <cwd>", "the working directory"],
    ["-p, --path <path>", "the path to add the component to"],
    ["-h, --help", "display help for command"],
  ];

  const targets = [
    ["cursor", ".cursor/rules/quantum-ui.mdc + .cursor/mcp.json"],
    ["claude", "CLAUDE.md section + .mcp.json"],
    ["mcp", "MCP server config only (.cursor/mcp.json and .mcp.json)"],
    ["-y", "Cursor + Claude + MCP config"],
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <DocsHeader onSearch={jumpTo} searchRef={searchRef} />

      <div className="mx-auto grid max-w-[1500px] md:grid-cols-[276px_minmax(0,1fr)]">
        {/* LEFT — NAV */}
        <aside className="sticky top-[77px] hidden h-[calc(100vh-77px)] overflow-y-auto border-r border-white/[0.06] px-5 py-8 md:block">
          <div className="px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
            Installation
          </div>

          <div className="mt-3 rounded-lg border-l border-cyan-300/70 bg-white/[0.04] px-3 py-2 text-sm text-white">
            CLI
          </div>

          <ul className="mt-2 space-y-0.5 border-l border-white/[0.08] pl-2 ml-3">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`block rounded-md px-3 py-1.5 text-[13px] transition-colors ${
                    active === s.id
                      ? "text-cyan-100"
                      : "text-slate-500 hover:text-slate-200"
                  }`}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
            Browse
          </div>
          <a
            href="/components"
            className="mt-3 block rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white"
          >
            Components →
          </a>
        </aside>

        {/* CENTER — CONTENT */}
        <main className="min-w-0 px-[18px] py-10 md:px-10 xl:px-16">
          <article className="max-w-3xl pb-24">
            <div className="font-mono text-xs text-slate-600">
              DOCS / INSTALLATION / <span className="text-white/80">CLI</span>
            </div>

            <h1 className="mt-4 text-[34px] font-semibold tracking-[-0.035em] md:text-[44px]">
              CLI
            </h1>
            <p className="mt-2 text-base text-slate-400">
              Installing Quantum UI with the shadcn CLI
            </p>

            <PmTabs pm={pm} setPm={setPm} />

            {/* REQUIREMENTS */}
            <section className="mt-12">
              <H2 id="requirements">Requirements</H2>
              <P>
                Quantum UI is a copy-paste component registry for{" "}
                <Code>React</Code> + <Code>Tailwind CSS v4</Code>. Components
                are installed with the{" "}
                <a
                  href="https://ui.shadcn.com/docs/cli"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-200 underline decoration-white/20 underline-offset-4 hover:decoration-cyan-200"
                >
                  shadcn CLI
                </a>
                . There is no runtime package to depend on: the code is copied
                into your project and you own it.
              </P>
            </section>

            {/* ADD COMPONENTS */}
            <section className="mt-14">
              <H2 id="add-components">Add components</H2>
              <P>
                Use the <Code>add</Code> command with the Quantum UI registry
                URL from any component page. This works in any project with no
                setup.
              </P>
              <Command command={`${shadcn} add ${SAMPLE_URL}`} />
            </section>

            {/* INITIALIZATION */}
            <section className="mt-14">
              <H2 id="initialization">Initialization</H2>
              <P>
                Optional, once per project. <Code>init</Code> registers the{" "}
                <Code>{namespace}</Code> registry in <Code>components.json</Code>{" "}
                so you can use short component names. It creates{" "}
                <Code>components.json</Code> if you don't have one, and only
                adds the registry entry if you do.
              </P>
              <Command command={`${runner} ${cliPackage} init`} />
              <CodeBlock title="output" code={initOutput} />
              <P>
                The shadcn CLI reads path aliases from{" "}
                <Code>tsconfig.json</Code> or <Code>jsconfig.json</Code>.{" "}
                <Code>init</Code> creates a <Code>jsconfig.json</Code> only when
                your project has neither. Add <Code>--dry-run</Code> to preview
                changes, or <Code>--registry &lt;url&gt;</Code> to point at
                another registry.
              </P>
            </section>

            {/* NAMESPACED REGISTRY */}
            <section className="mt-14">
              <H2 id="namespaced-registry">Namespaced registry</H2>
              <P>
                After <Code>init</Code>, <Code>components.json</Code> contains a
                registry alias, so you can install by short name. You can also
                add it by hand:
              </P>
              <CodeBlock title="components.json" code={componentsJson} />
              <Command
                caption="Add a component"
                command={`${shadcn} add ${namespace}/${SAMPLE}`}
              />
              <Command
                caption="Browse the registry"
                command={`${shadcn} search ${namespace}`}
              />
              <Command
                caption="Read the source before installing"
                command={`${shadcn} view ${namespace}/wave-grid`}
              />
            </section>

            {/* USING A COMPONENT */}
            <section className="mt-14">
              <H2 id="using-components">Using a component</H2>
              <P>
                Components are copied to <Code>src/{installDir}/</Code> and each
                one has a <Code>default export</Code>. No <Code>@/</Code> alias
                is needed to use them.
              </P>
              <CodeBlock title="App.jsx" code={usageCode} />
            </section>

            {/* OPTIONS */}
            <section className="mt-14">
              <H2 id="options">Add options</H2>
              <P>
                <Code>{`${shadcn} add [options] [components...]`}</Code> accepts a
                component name or a registry URL, plus:
              </P>
              <div className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0d11]">
                {options.map(([flag, text]) => (
                  <div
                    key={flag}
                    className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-6"
                  >
                    <code className="w-48 shrink-0 font-mono text-xs text-cyan-100">
                      {flag}
                    </code>
                    <span className="text-sm text-slate-400">{text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* MONOREPO */}
            <section className="mt-14">
              <H2 id="monorepo">Monorepo</H2>
              <P>
                In a monorepo, pass the workspace path with <Code>-c</Code> or{" "}
                <Code>--cwd</Code>.
              </P>
              <Command command={`${shadcn} add ${SAMPLE_URL} -c ./apps/web`} />
            </section>

            {/* AGENTS + MCP */}
            <section className="mt-14">
              <H2 id="agents-mcp">Agent rules + MCP</H2>
              <P>
                Install Quantum UI instructions for your AI editor and the MCP
                server config in one command. Pass a target, or <Code>-y</Code>{" "}
                for Cursor + Claude + MCP.
              </P>
              <CodeBlock title="code" code={agentCommands} />

              <div className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0d11]">
                {targets.map(([target, writes]) => (
                  <div
                    key={target}
                    className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-6"
                  >
                    <code className="w-24 shrink-0 font-mono text-xs text-cyan-100">
                      {target}
                    </code>
                    <span className="text-sm text-slate-400">{writes}</span>
                  </div>
                ))}
              </div>

              <P>
                Existing files are merged, never overwritten. Add{" "}
                <Code>--no-mcp</Code> to write the instructions without the MCP
                config. MCP configs use <Code>npx -y {mcpPackage}</Code>:
              </P>
              <CodeBlock title=".cursor/mcp.json · .mcp.json" code={mcpJson} />
              <P>
                The server gives your assistant four tools:{" "}
                <Code>list_components</Code>, <Code>search_components</Code>,{" "}
                <Code>get_component</Code> and <Code>get_install_command</Code>.
                It does not replace shadcn <Code>add</Code> for installing
                components. Set <Code>QUANTUM_UI_REGISTRY</Code> to a URL or a
                local folder containing <Code>registry.json</Code> to use a
                different registry.
              </P>
            </section>

            {/* NEXT */}
            <a
              href="/components"
              className="mt-16 flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#0b0d11] px-5 py-4 transition-colors hover:border-cyan-300/30"
            >
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
                  Next
                </span>
                <span className="mt-1 block text-sm text-white">
                  Browse components
                </span>
              </span>
              <span aria-hidden="true" className="text-slate-500">
                →
              </span>
            </a>
          </article>
        </main>
      </div>
    </div>
  );
}

export default DocsPage;
