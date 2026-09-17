import React, { useEffect } from "react";

function DevelopmentNotice({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-6 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#08090c]/95 p-8 text-center shadow-[0_30px_120px_rgba(0,0,0,0.7)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(77,216,255,0.09),transparent_55%)]" />

        <div className="relative">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] text-2xl">
            🚧
          </div>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-100/60">
            Quantum UI
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
            Still in Development
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-400">
            The component library is currently being built and refined. It will be available soon.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-7 inline-flex items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-cyan-400/30 hover:bg-white/[0.07]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DevelopmentNotice;
