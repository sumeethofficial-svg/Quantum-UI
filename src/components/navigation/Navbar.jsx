function Navbar({ onOpenLibrary }) {
  return (
    <nav
      className="
        relative
        flex
        h-[77px]
        items-center
        justify-between
        border-b
        border-white/[0.08]
        bg-black/70
        px-5
        backdrop-blur-2xl
        md:px-10
      "
    >
      {/* Brand */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group flex items-center gap-3"
      >
        {/* Quantum mark */}
        <div
          className="
            relative
            h-7
            w-7
            rounded-full
            border
            border-white/20
            bg-white/[0.04]
            transition-all
            duration-300
            group-hover:border-white/40
          "
        >
          <div
            className="
              absolute
              inset-[8px]
              rounded-full
              bg-white/90
              shadow-[0_0_12px_rgba(255,255,255,0.35)]
            "
          />

          <div
            className="
              absolute
              -inset-[5px]
              rounded-full
              border
              border-white/[0.08]
            "
          />
        </div>

        <div className="text-sm font-semibold tracking-[0.08em] text-white">
          QUANTUM<span className="text-white/45">UI</span>
        </div>
      </button>

      {/* Desktop navigation */}
      <div className="hidden items-center gap-8 text-[13px] text-white/45 md:flex">
        <button
          type="button"
          onClick={onOpenLibrary}
          className="
            transition-colors
            duration-200
            hover:text-white
          "
        >
          Components
        </button>

        <a
          href="#"
          className="
            transition-colors
            duration-200
            hover:text-white
          "
        >
          Docs
        </a>

        <a
          href="#"
          className="
            transition-colors
            duration-200
            hover:text-white
          "
        >
          Templates
        </a>

        <a
          href="#"
          className="
            transition-colors
            duration-200
            hover:text-white
          "
        >
          Changelog
        </a>
      </div>

      {/* CLI */}
      <div
        className="
          rounded-full
          border
          border-white/[0.12]
          bg-white/[0.035]
          px-3.5
          py-1.5
          font-mono
          text-[10px]
          text-white/40
          backdrop-blur-xl
          md:text-xs
        "
      >
        npx quantum-ui init
      </div>
    </nav>
  );
}

export default Navbar;