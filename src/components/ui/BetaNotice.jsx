import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/* ==========================================================
   BETA NOTICE
   One-time popup: shows on a visitor's first visit, then never
   again on that browser (remembered in localStorage).

   Put this file at: src/components/ui/BetaNotice.jsx
========================================================== */

const REPO_URL = "https://github.com/sumeethofficial-svg/Quantum-UI";

// Bump the version (v1 -> v2) to show the popup again to everyone.
const STORAGE_KEY = "quantum-ui:beta-notice-v1";

function hasSeen() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* storage blocked: the popup will simply show again next visit */
  }
}

const CSS = `
  @keyframes qbeta-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes qbeta-rise {
    from { opacity: 0; transform: translateY(12px) scale(0.97); }
    to { opacity: 1; transform: none; }
  }
  .qbeta-backdrop { animation: qbeta-fade 0.25s ease-out both; }
  .qbeta-card { animation: qbeta-rise 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
  @media (prefers-reduced-motion: reduce) {
    .qbeta-backdrop, .qbeta-card { animation: none; }
  }
`;

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function BetaNotice() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const okayRef = useRef(null);

  // Open once, shortly after the page loads
  useEffect(() => {
    if (hasSeen()) {
      return undefined;
    }

    const timer = setTimeout(() => setOpen(true), 700);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    markSeen();
    setOpen(false);
  }, []);

  // Escape to close, keep Tab inside the dialog, lock page scroll
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    okayRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        dismiss();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = dialogRef.current?.querySelectorAll("button, a[href]");

      if (!focusable || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, dismiss]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <style>{CSS}</style>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={dismiss}
        className="qbeta-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="qbeta-title"
        aria-describedby="qbeta-desc"
        className="
          qbeta-card
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.12]
          bg-[#08080a]
          p-7
          shadow-[0_30px_100px_rgba(0,0,0,0.8)]
        "
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4dd8ff]/60 to-transparent" />

        <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4dd8ff] motion-safe:animate-pulse" />
          BETA
        </span>

        <h2
          id="qbeta-title"
          className="mt-5 text-2xl font-medium tracking-[-0.03em] text-white"
        >
          Quantum UI is still in beta
        </h2>

        <p
          id="qbeta-desc"
          className="mt-3 text-sm leading-6 text-white/50"
        >
          New components and features are being added regularly, so you may
          run into rough edges or changes along the way. Contributions are
          welcome: fix a bug, improve a component or add a new one.
        </p>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            ref={okayRef}
            type="button"
            onClick={dismiss}
            className="
              flex-1
              rounded-lg
              border
              border-white/[0.14]
              bg-white/[0.03]
              px-5
              py-2.5
              text-sm
              font-medium
              text-white/80
              transition-colors
              hover:border-white/30
              hover:text-white
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#4dd8ff]
            "
          >
            Okay
          </button>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => {
              markSeen();
              // Close after the browser has handled the link click
              setTimeout(() => setOpen(false), 0);
            }}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-white
              px-5
              py-2.5
              text-sm
              font-medium
              text-black
              transition-transform
              hover:-translate-y-0.5
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#4dd8ff]
            "
          >
            <GitHubMark />
            Contribute
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}