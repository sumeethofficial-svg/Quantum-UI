import { componentRegistry } from "./ComponentRegistry";

function ComponentPreview({ component }) {
  const Component = componentRegistry[component?.name];

  return (
    <section id="preview" className="scroll-mt-8">
      <div
        className="
          relative
          overflow-hidden
          rounded-xl
          border
          border-white/[0.08]
          bg-[#0b0d11]
        "
      >
        {/* Ambient grid */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.18]
            bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
            bg-[size:32px_32px]
          "
        />

        {/* Preview content */}
        <div
          className="
            relative
            flex
            min-h-[360px]
            items-center
            justify-center
            p-10
          "
        >
          {Component ? (
            <Component />
          ) : (
            <div className="text-center">
              <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-red-400">
                Component unavailable
              </div>

              <div className="font-mono text-sm text-slate-500">
                {component?.name || "Unknown component"}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ComponentPreview;