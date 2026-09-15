import React from "react";

function Navbar() {
  return (
    <nav className="relative z-50 border-b border-white/[0.06] bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[77px] max-w-[1500px] items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <a
          href="/"
          className="group flex items-center gap-3"
        >
          <div
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.12]
              bg-white/[0.02]
            "
          >
            <div
              className="
                absolute
                inset-[5px]
                rounded-full
                border
                border-white/[0.12]
              "
            />

            <div
              className="
                h-3
                w-3
                rounded-full
                bg-white
                shadow-[0_0_15px_rgba(255,255,255,0.45)]
              "
            />
          </div>

          <span
            className="
              text-sm
              font-semibold
              tracking-[0.12em]
              text-white/80
              transition-colors
              group-hover:text-white
            "
          >
            QUANTUM UI
          </span>
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <a
            href="/components"
            className="
              text-sm
              text-white/45
              transition-colors
              hover:text-white
            "
          >
            Components
          </a>

          <a
            href="#docs"
            className="
              text-sm
              text-white/45
              transition-colors
              hover:text-white
            "
          >
            Docs
          </a>

          <a
            href="#templates"
            className="
              text-sm
              text-white/45
              transition-colors
              hover:text-white
            "
          >
            Templates
          </a>

          <a
            href="#changelog"
            className="
              text-sm
              text-white/45
              transition-colors
              hover:text-white
            "
          >
            Changelog
          </a>

        </div>

        {/* CLI */}
        <div
          className="
            hidden
            items-center
            rounded-full
            border
            border-white/[0.10]
            bg-white/[0.025]
            px-4
            py-2
            font-mono
            text-xs
            text-white/40
            md:flex
          "
        >
          <span className="mr-2 text-white/20">
            $
          </span>

          npx quantum-ui init
        </div>

        {/* Mobile */}
        <button
          type="button"
          aria-label="Open navigation"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/[0.10]
            bg-white/[0.03]
            md:hidden
          "
        >
          <div className="flex flex-col gap-1">
            <span className="block h-px w-4 bg-white/60" />
            <span className="block h-px w-4 bg-white/60" />
          </div>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;