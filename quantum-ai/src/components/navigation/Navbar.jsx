function Navbar({ onOpenLibrary }) {
  return (
    <nav className="relative flex items-center justify-between border-b border-white/[0.08] px-5 py-[18px] backdrop-blur-lg md:px-10 md:py-5">
      
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="relative h-7 w-7 rounded-full border border-cyan-400/35 bg-[radial-gradient(circle,rgba(77,216,255,0.28),transparent_70%)]">
          <div className="absolute inset-[9px] rounded-full bg-cyan-100 shadow-[0_0_9px_2px_rgba(77,216,255,0.35)]" />
          <div className="absolute -inset-[5px] rounded-full border border-cyan-400/20" />
        </div>

        <div className="text-sm font-semibold tracking-[0.06em]">
          QUANTUM<span className="text-cyan-100">UI</span>
        </div>
      </div>

      {/* Desktop navigation */}
      <div className="hidden items-center gap-8 text-[13px] text-slate-400 md:flex">
        <button
          onClick={onOpenLibrary}
          className="transition-colors hover:text-slate-100"
        >
          Components
        </button>

        <a
          href="#"
          className="transition-colors hover:text-slate-100"
        >
          Docs
        </a>

        <a
          href="#"
          className="transition-colors hover:text-slate-100"
        >
          Templates
        </a>

        <a
          href="#"
          className="transition-colors hover:text-slate-100"
        >
          Changelog
        </a>
      </div>

      {/* CLI */}
      <div className="rounded-md border border-white/[0.14] px-3.5 py-1.5 font-mono text-[10px] text-slate-400 md:text-xs">
        npx quantum-ui init
      </div>
    </nav>
  );
}

export default Navbar;