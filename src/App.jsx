import React from "react";

import Navbar from "./components/navigation/Navbar";
import HeroSection from "./components/hero/HeroSection";

import TechStack from "./components/sections/TechStack";

import ComponentLibrary from "./components/library/ComponentLibrary";

function HomePage() {
  return (
    <>
      <Navbar />

      <main>

        {/* =================================================
            HERO
        ================================================= */}
        <HeroSection />

        {/* =================================================
            TECH STACK
        ================================================= */}
        <TechStack />

        {/* =================================================
            LIBRARY MAP
        ================================================= */}
        <section
          id="library-map"
          className="
            relative
            border-t
            border-white/[0.06]
            bg-black
          "
        >
          <LibraryMap />
        </section>

        {/* =================================================
            WHY QUANTUM
        ================================================= */}
        <section
          id="why-quantum"
          className="
            relative
            border-t
            border-white/[0.06]
            bg-black
          "
        >
          <WhyQuantum />
        </section>

        {/* =================================================
            UNIQUE COMPONENTS
        ================================================= */}
        <section
          id="unique-components"
          className="
            relative
            border-t
            border-white/[0.06]
            bg-black
          "
        >
          <UniqueComponents />
        </section>

        {/* =================================================
            MODERN FRAMEWORKS
        ================================================= */}
        <section
          id="frameworks"
          className="
            relative
            border-t
            border-white/[0.06]
            bg-black
          "
        >
          <ModernFrameworks />
        </section>

        {/* =================================================
            OPEN SOURCE
        ================================================= */}
        <section
          id="open-source"
          className="
            relative
            border-t
            border-white/[0.06]
            bg-black
          "
        >
          <OpenSource />
        </section>

        {/* =================================================
            BUILD FASTER
        ================================================= */}
        <section
          id="build-faster"
          className="
            relative
            border-t
            border-white/[0.06]
            bg-black
          "
        >
          <BuildFaster />
        </section>

        {/* =================================================
            FINAL CTA
        ================================================= */}
        <section
          id="cta"
          className="
            relative
            border-t
            border-white/[0.06]
            bg-black
          "
        >
          <FinalCTA />
        </section>

      </main>
    </>
  );
}


/* ==========================================================
   LIBRARY MAP
========================================================== */

function LibraryMap() {
  const paths = [
    {
      number: "01",
      title: "Interaction",
      description:
        "Buttons, inputs, controls and interaction primitives engineered for modern interfaces.",
    },
    {
      number: "02",
      title: "Motion",
      description:
        "Animated surfaces, transitions and responsive motion systems built around the Quantum language.",
    },
    {
      number: "03",
      title: "Composition",
      description:
        "Cards, layouts, navigation and complete interface blocks designed to work together.",
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px] px-6 py-28 lg:px-16">

      <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">

        <div>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-white/35">
            Library Map
          </p>

          <h2 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
            Build with
            <br />
            <span className="text-white/40">
              Quantum UI.
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/45">
            A focused system for building interfaces with precision.
            Explore the interaction layer, motion system and composition
            primitives that form the Quantum ecosystem.
          </p>

          <div className="mt-12">

            {paths.map((path) => (
              <div
                key={path.number}
                className="
                  group
                  grid
                  grid-cols-[60px_1fr]
                  border-t
                  border-white/[0.08]
                  py-7
                "
              >
                <span className="font-mono text-xs text-white/25">
                  {path.number}
                </span>

                <div>
                  <h3 className="text-lg font-medium text-white/80 group-hover:text-white">
                    {path.title}
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/35">
                    {path.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Visual */}
        <div
          className="
            relative
            flex
            min-h-[520px]
            items-center
            justify-center
            overflow-hidden
            rounded-[28px]
            border
            border-white/[0.08]
            bg-white/[0.015]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
              bg-[size:48px_48px]
            "
          />

          <div className="relative flex flex-col items-center gap-6">

            <div
              className="
                flex
                h-28
                w-28
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.18]
                bg-black
                shadow-[0_0_80px_rgba(255,255,255,0.06)]
              "
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.12]">
                <div className="h-4 w-4 rounded-full bg-white shadow-[0_0_25px_rgba(255,255,255,0.7)]" />
              </div>
            </div>

            <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />

            <div className="grid grid-cols-3 gap-3">
              {["UI", "FX", "CORE"].map((item) => (
                <div
                  key={item}
                  className="
                    rounded-lg
                    border
                    border-white/[0.10]
                    bg-black/70
                    px-5
                    py-3
                    font-mono
                    text-[10px]
                    tracking-[0.15em]
                    text-white/45
                  "
                >
                  {item}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}


/* ==========================================================
   WHY QUANTUM
========================================================== */

function WhyQuantum() {
  const reasons = [
    {
      number: "01",
      title: "Precision by default",
      text: "Every surface, spacing rule and interaction is designed as part of one coherent visual system.",
    },
    {
      number: "02",
      title: "Motion with purpose",
      text: "Animations are treated as part of the interface rather than decoration layered on afterward.",
    },
    {
      number: "03",
      title: "Built to compose",
      text: "Components are designed to work independently and as building blocks for larger experiences.",
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px] px-6 py-28 lg:px-16">

      <div className="mx-auto max-w-3xl text-center">

        <p className="text-xs uppercase tracking-[0.28em] text-white/30">
          Why Quantum?
        </p>

        <h2 className="mt-5 text-4xl font-medium tracking-[-0.045em] text-white sm:text-5xl">
          Interfaces with
          <span className="text-white/35">
            {" "}
            intent.
          </span>
        </h2>

        <p className="mt-6 text-base leading-7 text-white/40">
          Quantum UI focuses on creating interfaces that feel engineered,
          responsive and unmistakably intentional.
        </p>

      </div>

      <div className="mt-20 grid border-l border-t border-white/[0.08] md:grid-cols-3">

        {reasons.map((reason) => (
          <div
            key={reason.number}
            className="
              min-h-[260px]
              border-b
              border-r
              border-white/[0.08]
              p-8
              transition-colors
              hover:bg-white/[0.02]
            "
          >
            <span className="font-mono text-xs text-white/20">
              {reason.number}
            </span>

            <h3 className="mt-16 text-xl font-medium text-white/85">
              {reason.title}
            </h3>

            <p className="mt-4 text-sm leading-6 text-white/35">
              {reason.text}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}


/* ==========================================================
   UNIQUE COMPONENTS
========================================================== */

function UniqueComponents() {
  return (
    <div className="mx-auto max-w-[1500px] px-6 py-28 lg:px-16">

      <div className="grid overflow-hidden rounded-[28px] border border-white/[0.08] lg:grid-cols-2">

        <div className="min-h-[460px] border-b border-white/[0.08] p-8 lg:border-b-0 lg:border-r lg:p-12">

          <p className="text-xs uppercase tracking-[0.25em] text-white/30">
            Component System
          </p>

          <h2 className="mt-6 max-w-xl text-4xl font-medium leading-tight tracking-[-0.04em] text-white">
            Components designed to feel different.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-6 text-white/40">
            Quantum is not trying to reproduce the same collection of
            predictable cards and buttons. The library is built around
            interaction, depth, motion and visual character.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">

            {[
              "Interactive Core",
              "Glass Surfaces",
              "Motion Systems",
              "Precision Buttons",
              "Navigation",
              "Dynamic Cards",
            ].map((item) => (
              <span
                key={item}
                className="
                  rounded-full
                  border
                  border-white/[0.10]
                  bg-white/[0.025]
                  px-4
                  py-2
                  text-xs
                  text-white/45
                "
              >
                {item}
              </span>
            ))}

          </div>
        </div>

        <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden bg-white/[0.015]">

          <div
            className="
              absolute
              inset-0
              bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
              bg-[size:40px_40px]
            "
          />

          <div className="relative w-[260px] rounded-[24px] border border-white/[0.12] bg-black/80 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">

            <div className="flex items-center justify-between">

              <div className="h-9 w-9 rounded-lg border border-white/[0.12] bg-white/[0.04]" />

              <span className="rounded-full border border-white/[0.10] px-3 py-1 text-[9px] tracking-[0.15em] text-white/35">
                LIVE
              </span>

            </div>

            <div className="mt-10">
              <div className="h-3 w-32 rounded-full bg-white/[0.10]" />
              <div className="mt-3 h-2 w-48 rounded-full bg-white/[0.05]" />
              <div className="mt-2 h-2 w-40 rounded-full bg-white/[0.05]" />
            </div>

            <div className="mt-12 rounded-xl border border-white/[0.10] bg-white/[0.035] p-4">

              <div className="flex items-center justify-between">

                <span className="text-sm text-white/65">
                  Quantum Core
                </span>

                <span className="text-white/40">
                  →
                </span>

              </div>

              <p className="mt-2 text-xs text-white/25">
                Hover to interact
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ==========================================================
   MODERN FRAMEWORKS
========================================================== */

function ModernFrameworks() {
  return (
    <div className="mx-auto max-w-[1500px] px-6 py-28 lg:px-16">

      <div className="grid items-center gap-16 lg:grid-cols-2">

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-white/30">
            Modern Stack
          </p>

          <h2 className="mt-5 text-4xl font-medium tracking-[-0.045em] text-white sm:text-5xl">
            Built for modern
            <br />
            <span className="text-white/35">
              React ecosystems.
            </span>
          </h2>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/40">
            Quantum components are designed with React, TypeScript,
            Tailwind CSS and Next.js applications in mind.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">

          {[
            ["React", "Component foundation"],
            ["Next.js", "Production ready"],
            ["TypeScript", "Typed interfaces"],
            ["Tailwind", "Utility styling"],
          ].map(([name, description]) => (
            <div
              key={name}
              className="bg-black p-7 transition-colors hover:bg-white/[0.025]"
            >
              <h3 className="text-lg font-medium text-white/80">
                {name}
              </h3>

              <p className="mt-2 text-xs text-white/30">
                {description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}


/* ==========================================================
   OPEN SOURCE
========================================================== */

function OpenSource() {
  return (
    <div className="mx-auto max-w-[1500px] px-6 py-28 lg:px-16">

      <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-white/30">
            Open Source
          </p>

          <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-[-0.045em] text-white sm:text-5xl">
            Open source with
            <span className="text-white/35">
              {" "}
              a reason.
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/40">
            Quantum UI is built in the open. Components, patterns and
            experiments are designed to be studied, adapted and improved
            by the community.
          </p>

        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">

          <div className="font-mono text-xs text-white/25">
            QUANTUM UI / OPEN SOURCE
          </div>

          <div className="mt-8 space-y-4">

            <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
              <span className="text-sm text-white/45">
                Components
              </span>

              <span className="font-mono text-sm text-white/70">
                OPEN
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
              <span className="text-sm text-white/45">
                Source
              </span>

              <span className="font-mono text-sm text-white/70">
                PUBLIC
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-white/45">
                Ecosystem
              </span>

              <span className="font-mono text-sm text-white/70">
                GROWING
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}


/* ==========================================================
   BUILD FASTER
========================================================== */

function BuildFaster() {
  return (
    <div className="mx-auto max-w-[1500px] px-6 py-28 lg:px-16">

      <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025]">

        <div className="grid items-center lg:grid-cols-2">

          <div className="p-8 lg:p-14">

            <p className="text-xs uppercase tracking-[0.25em] text-white/30">
              Build Faster
            </p>

            <h2 className="mt-6 max-w-xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl">
              Turn ideas into
              <br />
              interfaces faster.
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-6 text-white/40">
              Start with a carefully engineered primitive instead of
              rebuilding the same interaction from scratch.
            </p>

            <a
              href="/components"
              className="
                mt-9
                inline-flex
                items-center
                gap-3
                rounded-lg
                bg-white
                px-5
                py-3
                text-sm
                font-medium
                text-black
                transition-transform
                hover:-translate-y-0.5
              "
            >
              Explore Components
              <span>→</span>
            </a>

          </div>

          <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden border-t border-white/[0.08] lg:border-l lg:border-t-0">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_60%)]" />

            <div className="relative h-48 w-64 rounded-[24px] border border-white/[0.15] bg-black shadow-[0_30px_100px_rgba(0,0,0,0.7)]">

              <div className="absolute left-5 right-5 top-5 flex justify-between">
                <div className="h-2 w-16 rounded-full bg-white/[0.12]" />
                <div className="h-2 w-8 rounded-full bg-white/[0.06]" />
              </div>

              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.14]">
                <div className="absolute inset-5 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ==========================================================
   FINAL CTA
========================================================== */

function FinalCTA() {
  return (
    <div className="mx-auto max-w-[1500px] px-6 py-24 lg:px-16">

      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-black px-8 py-20 text-center lg:px-16">

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_55%)]" />

        <div className="relative">

          <p className="text-xs uppercase tracking-[0.28em] text-white/30">
            Quantum UI
          </p>

          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.05em] text-white sm:text-6xl">
            Ready to build
            <br />
            something unique?
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-6 text-white/40">
            Explore the Quantum component system and start building
            interfaces with a different level of precision.
          </p>

          <a
            href="/components"
            className="
              mt-9
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-white
              px-7
              py-3.5
              text-sm
              font-medium
              text-black
              transition-transform
              hover:-translate-y-0.5
            "
          >
            Explore Components
            <span>→</span>
          </a>

        </div>

      </div>

    </div>
  );
}


/* ==========================================================
   COMPONENTS PAGE
========================================================== */

function ComponentsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">

        <div className="mx-auto max-w-[1500px] px-6 pt-8 lg:px-10">

          <a
            href="/"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/[0.10]
              bg-white/[0.025]
              px-5
              py-2.5
              text-sm
              text-white/50
              transition-all
              duration-300
              hover:border-white/[0.20]
              hover:bg-white/[0.05]
              hover:text-white
            "
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            Back to Home
          </a>

        </div>

        <ComponentLibrary />

      </main>
    </>
  );
}


/* ==========================================================
   ROUTING
========================================================== */

function App() {
  const path = window.location.pathname;

  if (path === "/components") {
    return <ComponentsPage />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">

      {/* Global starfield */}
      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: "url('/images/starfield.jpg')",
          opacity: 0.18,
        }}
      />

      {/* Dark starfield layer */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/55" />

      {/* Homepage */}
      <div className="relative z-10">
        <HomePage />
      </div>

    </div>
  );
}

export default App;