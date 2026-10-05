import React, { useEffect, useState } from "react";

const STORAGE_KEY = "quantum-ui:beta-notice-v2";

export default function BetaNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setOpen(true), 700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeNotice();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeNotice = () => {
    localStorage.setItem(STORAGE_KEY, "seen");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="beta-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeNotice();
      }}
    >
      {/* Home-page style backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[10px]" />

      {/* Subtle Quantum glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.035] blur-[100px]" />

      <div
        className="
          relative
          w-full
          max-w-[560px]
          overflow-hidden
          rounded-[24px]
          border
          border-white/[0.10]
          bg-[#08080a]/95
          shadow-[0_30px_100px_rgba(0,0,0,0.75)]
          animate-[betaIn_0.45s_cubic-bezier(0.16,1,0.3,1)]
        "
      >
        {/* Quantum top line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        {/* Tiny ambient grid */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
            [background-size:32px_32px]
          "
        />

        <div className="relative p-7 sm:p-9">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/[0.10]
                bg-white/[0.035]
                px-3
                py-1.5
                font-mono
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white/55
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              Beta
            </div>

            <button
              onClick={closeNotice}
              aria-label="Close"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.025]
                text-white/35
                transition-all
                duration-200
                hover:border-white/[0.16]
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="mt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/25">
              Quantum UI / 01
            </p>

            <h2
              id="beta-title"
              className="
                mt-3
                text-3xl
                font-medium
                leading-tight
                tracking-[-0.04em]
                text-white
                sm:text-[34px]
              "
            >
              Quantum UI is still in beta.
            </h2>

            <p className="mt-5 max-w-[470px] text-sm leading-6 text-white/40">
              New components and features are being added regularly. You may
              encounter rough edges or changes as the system evolves.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-white/25">
              <span className="h-px w-6 bg-white/15" />
              Contributions are welcome.
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <button
              onClick={closeNotice}
              className="
                group
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/[0.12]
                bg-white/[0.035]
                text-sm
                font-medium
                text-white/75
                transition-all
                duration-300
                hover:border-white/[0.22]
                hover:bg-white/[0.07]
                hover:text-white
              "
            >
              Got it
              <span className="text-white/25 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <a
              href="https://github.com/sumeethofficial-svg/Quantum-UI"
              target="_blank"
              rel="noreferrer"
              className="
                group
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                text-sm
                font-medium
                text-black
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-white/90
              "
            >
              Contribute
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.77.11 3.06.75.81 1.2 1.84 1.2 3.1 0 4.42-2.69 5.39-5.25 5.67.41.35.77 1.04.77 2.1v3.12c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes betaIn {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [class*="animate-"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}