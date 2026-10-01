
function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] h-16 border-b border-white/[0.08] bg-black text-white">
      <nav className="flex h-full items-center gap-6 px-7">
        {/* Original Quantum UI circular logo */}
        <a
          href="/"
          aria-label="Quantum UI home"
          className="flex shrink-0 items-center gap-3"
        >
          <svg
            viewBox="0 0 44 44"
            width="42"
            height="42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              cx="22"
              cy="22"
              r="20.5"
              stroke="#29292D"
              strokeWidth="1"
            />
            <circle
              cx="22"
              cy="22"
              r="14.5"
              stroke="#222226"
              strokeWidth="1"
            />
            <circle
              cx="22"
              cy="22"
              r="9.5"
              stroke="#303035"
              strokeWidth="0.8"
            />
            <circle cx="22" cy="22" r="5.8" fill="#FFFFFF" />
          </svg>

          <span className="whitespace-nowrap text-[13px] font-bold tracking-[0.13em] text-[#D4D4D8]">
            QUANTUM UI
          </span>
        </a>

        {/* Search */}
        <div className="ml-auto hidden h-10 w-[278px] items-center gap-2.5 rounded-lg border border-white/[0.12] bg-white/[0.025] px-3 sm:flex">
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="shrink-0 text-white/50"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <input
            type="search"
            aria-label="Search documentation"
            placeholder="Search documentation..."
            className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/45"
          />

          <kbd className="rounded border border-white/10 px-2 py-1 text-[10px] text-white/50">
            /
          </kbd>
        </div>

        {/* Navigation */}
        <div className="hidden shrink-0 items-center gap-7 md:flex">
          <a
            href="/components"
            className="text-sm text-white/75 transition-colors hover:text-white"
          >
            Components
          </a>
          <a
            href="#docs"
            className="text-sm text-white/75 transition-colors hover:text-white"
          >
            Docs
          </a>
          <a
            href="#templates"
            className="text-sm text-white/75 transition-colors hover:text-white"
          >
            Templates
          </a>
        </div>

        {/* GitHub */}
        <a
          href="https://github.com/sumeethofficial-svg/Quantum-UI"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Quantum UI GitHub repository"
          className="hidden h-9 shrink-0 items-center gap-2.5 rounded-full border border-white/[0.12] px-3 text-xs text-white/70 transition-colors hover:bg-white/[0.06] sm:flex"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.15a10.6 10.6 0 0 1 5.56 0c2.12-1.45 3.06-1.15 3.06-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
          </svg>

          <span className="h-4 w-px bg-white/10" />
          Open source
        </a>
      </nav>
    </header>
  );
}

export default Navbar;