function ComponentDocumentation({ component }) {
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

        <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0d11]">

          <div className="flex items-center justify-between gap-4 px-5 py-5">

            <code className="overflow-x-auto font-mono text-xs text-cyan-50">
              {component.installation ||
                `npx shadcn@latest add @quantum-ui/${component.slug}`}
            </code>

            <button
              type="button"
              className="
                shrink-0
                rounded-lg
                border
                border-white/[0.12]
                px-3
                py-2
                font-mono
                text-xs
                text-slate-400
                transition
                hover:border-cyan-300/30
                hover:text-cyan-100
              "
              onClick={() =>
                navigator.clipboard?.writeText(
                  component.installation ||
                    `npx shadcn@latest add @quantum-ui/${component.slug}`
                )
              }
            >
              ⧉
            </button>

          </div>
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
          properties.
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0d11]">
          <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 text-slate-300">
            <code>
{component.usage ||
`import { ${component.name.replace(/\s+/g, "")} } from "@/components";

export default function Example() {
  return (
    <${component.name.replace(/\s+/g, "")} />
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