import React from "react";
import QuantumCore from "./QuantumCore";

function HomeSection({ onOpenLibrary }) {
  return (
    <section className="relative min-h-[calc(100vh-77px)] overflow-hidden bg-[#000000] text-white">
      {/* =====================================================
          STAR FIELD BACKGROUND
      ===================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-[url('/images/starfield.jpg')]
          bg-cover
          bg-center
          bg-no-repeat
          opacity-[0.18]
        "
      />

      {/* Dark overlay to keep the background subtle */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-black/70
        "
      />

      {/* =====================================================
          HERO CONTAINER
      ===================================================== */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-77px)] max-w-[1500px] items-center px-4 py-6 sm:px-6">
        <div
          className="
            relative
            flex
            min-h-[680px]
            w-full
            flex-col
            items-center
            overflow-hidden
            rounded-[32px]
            border
            border-white/[0.08]
            bg-black/70
            px-6
            py-10
            backdrop-blur-2xl
            sm:px-10
            lg:px-16
          "
        >
          {/* Glass reflection */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(
                circle_at_50%_0%,
                rgba(255,255,255,0.055),
                transparent_45%
              )]
            "
          />

          {/* Top glass highlight */}
          <div
            className="
              pointer-events-none
              absolute
              left-[10%]
              right-[10%]
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/[0.12]
              to-transparent
            "
          />

          {/* =================================================
              HERO CONTENT
          ================================================= */}
          <div className="relative z-10 flex w-full flex-1 flex-col items-center text-center">

            {/* Heading */}
            <div className="relative z-20 shrink-0">
              <h1
                className="
                  max-w-4xl
                  text-4xl
                  font-medium
                  leading-[1.02]
                  tracking-[-0.045em]
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                A futuristic component library
                <br />
                <span className="text-white/40">
                  for React & Next.js.
                </span>
              </h1>
            </div>

            {/* =================================================
                QUANTUM CORE
            ================================================= */}
            <div
              className="
                relative
                z-10
                mt-4
                flex
                h-[390px]
                w-full
                shrink-0
                items-center
                justify-center
              "
            >
              {/* Core ambient glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  h-[220px]
                  w-[220px]
                  rounded-full
                  bg-cyan-400/[0.025]
                  blur-[90px]
                "
              />

              {/* Quantum Core */}
              <div
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-center
                  scale-[0.80]
                  sm:scale-[0.85]
                  lg:scale-[0.88]
                "
              >
                <QuantumCore />
              </div>
            </div>

            {/* =================================================
                BUTTONS
            ================================================= */}
            <div
              className="
                relative
                z-30
                mt-2
                flex
                shrink-0
                items-center
                gap-3
              "
            >
              <button
                onClick={onOpenLibrary}
                className="
                  group
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.12]
                  bg-white/[0.04]
                  px-6
                  text-sm
                  font-medium
                  text-white/80
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-white/[0.22]
                  hover:bg-white/[0.08]
                  hover:text-white
                "
              >
                <span className="mr-2">•</span>

                <span>EXPLORE COMPONENTS</span>

                <span
                  className="
                    ml-2
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </button>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.10]
                  px-6
                  text-sm
                  font-medium
                  text-white/50
                  transition-all
                  duration-300
                  hover:border-white/[0.20]
                  hover:bg-white/[0.04]
                  hover:text-white
                "
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              right-0
              h-28
              bg-gradient-to-t
              from-black/60
              to-transparent
            "
          />
        </div>
      </div>
    </section>
  );
}

export default HomeSection;