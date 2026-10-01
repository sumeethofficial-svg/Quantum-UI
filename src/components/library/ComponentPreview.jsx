import { componentRegistry } from "./ComponentRegistry";

function ComponentPreview({ component }) {
  const Component = componentRegistry[component?.name];

  return (
    <section id="preview" className="scroll-mt-8">
      <div className="relative overflow-hidden rounded-xl border border-white/[0.12] bg-[#050505] shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
        {/* A quiet black canvas with the fine grid used in the reference UI. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px]"
        />

        {/* Large, subtle concentric rings centered behind the live component. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(78vw,460px)] w-[min(78vw,460px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.055]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(58vw,340px)] w-[min(58vw,340px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.065]"
        />

        {/* Keep the component above the decorative background layers. */}
        <div className="relative flex min-h-[388px] items-center justify-center p-8 sm:p-10">
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
