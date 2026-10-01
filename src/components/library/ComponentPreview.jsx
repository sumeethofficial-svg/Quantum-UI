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
          border-white/[0.10]
          bg-[#050505]
          shadow-[0_24px_80px_rgba(0,0,0,0.38)]
        "
      >
        {/* Soft white ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,255,255,0.045),transparent_58%)]"
        />

        {/* Subtle concentric rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(76vw,430px)] w-[min(76vw,430px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035] shadow-[0_0_70px_rgba(255,255,255,0.012)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(58vw,320px)] w-[min(58vw,320px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045] shadow-[inset_0_0_55px_rgba(255,255,255,0.012)]"
        />

        {/* Fine, low-contrast grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:36px_36px]"
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