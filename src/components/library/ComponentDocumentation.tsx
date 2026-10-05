import { useState } from "react";
import CopyButton from "./CopyButton";
import {
  packageManagers,
  getAddCommand,
  getNamespacedCommand,
  getInitCommand,
} from "./installCommands";
import registryConfig from "../../../registry.config.json";
import { getExportName } from "../../data/components";

function CommandBlock({ command }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#0b0d11] px-4 py-3">
      <code className="overflow-x-auto whitespace-nowrap font-mono text-xs text-cyan-50">
        {command}
      </code>
      <CopyButton text={command} />
    </div>
  );
}

function ComponentDocumentation({ component }) {
  const [pm, setPm] = useState("npm");
  const exportName = getExportName(component);
  const importPath = `./${registryConfig.installDir}/${exportName}`;

  return (
    <div className="mt-12 space-y-14">

      {/* =====================================================
          INSTALLATION
      ===================================================== */}

      <section
        id="installation"
        className="scroll-mt-8"
      >
        <h3 className="text-2xl font-semibold tracking-[-0.025em]">
          Install in one transmission
        </h3>

        <div
          role="tablist"
          aria-label="Package manager"
          className="mt-6 flex w-fit gap-1 rounded-lg border border-white/[0.08] bg-[#0b0d11] p-1"
        >
          {packageManagers.map((name) => (
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

        <p className="mt-4 text-sm text-slate-500">
          Works in any React + Tailwind v4 project with the{" "}
          <a
            href="https://ui.shadcn.com/docs/cli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-cyan-100"
          >
            shadcn CLI
          </a>
          . No setup needed.
        </p>
        <div className="mt-3">
          <CommandBlock command={getAddCommand(component, pm)} />
        </div>

        <h4 className="mt-8 text-base font-semibold text-slate-200">
          Namespaced registry
        </h4>
        <p className="mt-2 text-sm text-slate-500">
          Prefer short names? Register{" "}
          <code className="font-mono text-slate-300">
            {registryConfig.namespace}
          </code>{" "}
          once per project, then add components by name.
        </p>
        <div className="mt-3 space-y-2">
          <CommandBlock command={getInitCommand(pm)} />
          <CommandBlock command={getNamespacedCommand(component, pm)} />
        </div>
      </section>

      {/* =====================================================
          USAGE
      ===================================================== */}

      <section
        id="usage"
        className="scroll-mt-8"
      >
        <h3 className="text-2xl font-semibold tracking-[-0.025em]">
          Usage
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Integrate the component directly into
          your interface and customize its
          behavior through the available
          properties. The import path is relative to
          the importing file; components are copied
          to <code className="font-mono">src/{registryConfig.installDir}/</code> by default.
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0d11]">
          <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 text-slate-300">
            <code>
{component.usage ||
`import ${exportName} from "${importPath}";

export default function Example() {
  return (
    <${exportName} />
  );
}`}
            </code>
          </pre>
        </div>
      </section>

      {/* =====================================================
          PROPS
      ===================================================== */}

      <section
        id="props"
        className="scroll-mt-8"
      >
        <h3 className="text-2xl font-semibold tracking-[-0.025em]">
          Props
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Configure the component through its
          available parameters.
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.08]">

          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-white/[0.08] bg-white/[0.025] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.08em] text-slate-600">
            <span>Property</span>
            <span>Type</span>
            <span>Default</span>
          </div>

          <div className="divide-y divide-white/[0.06]">

            {component.props?.length ? (
              component.props.map(
                (prop) => (
                  <div
                    key={prop.name}
                    className="grid grid-cols-[1fr_1fr_1fr] px-5 py-4 text-xs"
                  >
                    <span className="font-mono text-cyan-100">
                      {prop.name}
                    </span>

                    <span className="font-mono text-slate-500">
                      {prop.type}
                    </span>

                    <span className="font-mono text-slate-600">
                      {prop.default ?? "—"}
                    </span>
                  </div>
                )
              )
            ) : (
              <div className="px-5 py-6 text-xs text-slate-600">
                No configurable props documented.
              </div>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}

export default ComponentDocumentation;