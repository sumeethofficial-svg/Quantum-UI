import React, { useState } from "react";
import Navbar from "./components/navigation/Navbar";
import HeroSection from "./components/hero/HeroSection";
import StackCube from "./components/sections/StackCube";
import TechStack from "./components/sections/TechStack";
import ParticleOrb from "./components/sections/ParticleOrb";
import BetaNotice from "./components/ui/BetaNotice";
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
      <BetaNotice />
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
        {/* Visual — particle orb */}
        <div
          className="
            relative
            min-h-[520px]
            overflow-hidden
            rounded-[28px]
            border
            border-white/[0.08]
            bg-white/[0.015]
          "
        >
          <div className="absolute inset-0">
            <ParticleOrb size={0.34} />
          </div>
        </div>
      </div>
    </div>
  );
}
/* ==========================================================
   WHY QUANTUM
========================================================== */
const PICKS = [
  "Interactive Core",
  "Glass Surfaces",
  "Motion Systems",
  "Precision Buttons",
];
const ISO_TILES = [
  { label: "React", left: "16.5%", top: "22%" },
  { label: "Next.js", left: "50%", top: "22%" },
  { label: "Vite", left: "83.5%", top: "22%" },
  { label: "Tailwind", left: "33%", top: "48%" },
  { label: "TS", left: "67%", top: "48%" },
  { label: "CLI", left: "50%", top: "74%" },
];
const TREE_TILES = [
  { x: "10%", y: "14%", glyph: "◇" },
  { x: "50%", y: "14%", glyph: "◌" },
  { x: "90%", y: "14%", glyph: "⌘" },
  { x: "10%", y: "88%", glyph: "✦" },
  { x: "90%", y: "88%", glyph: "↗" },
];
const TILE_SHADOW =
  Array.from({ length: 9 }, (_, i) => `${i + 1}px ${i + 1}px 0 #19191c`).join(
    ","
  ) + ",0 40px 50px rgba(0,0,0,0.55)";
const GRID_BG =
  "bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px]";
function WhyQuantum() {
  return (
    <div className="mx-auto max-w-[1500px] border-x border-white/[0.08]">
      <style>{`
        @keyframes why-flow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -100; }
        }
        .why-flow {
          stroke-dasharray: 6 94;
          animation: why-flow 2.8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .why-flow { animation: none; }
        }
      `}</style>
      {/* Picks strip */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 lg:px-9">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/65">
          <span className="text-white/35">{">_"}</span>
          Quantum picks
        </span>
        {PICKS.map((pick) => (
          <span
            key={pick}
            className="text-[12px] text-white/40 transition-colors hover:text-white/80"
          >
            {pick}
          </span>
        ))}
      </div>
      {/* Heading */}
      <div className="border-t border-white/[0.08] px-6 py-24 text-center lg:py-32">
        <h2 className="text-5xl font-medium tracking-[-0.045em] text-white sm:text-6xl">
          Why Quantum?
        </h2>
        <p className="mx-auto mt-7 max-w-xl font-mono text-[13px] leading-7 text-white/40">
          Quantum UI is built to explore precise interaction patterns, from
          motion systems and glass surfaces to composable layout blocks.
        </p>
      </div>
      {/* Bento grid */}
      <div className="grid border-t border-white/[0.08] lg:grid-cols-2">
        <WhyCell
          className="border-b lg:border-r"
          title="Components built to feel different"
          text="Quantum focuses on distinctive interaction, depth and motion, so your interface does not look like every other card-and-button kit."
          visual={<StackedCards />}
        />
        <WhyCell
          className="border-b"
          visualFirst
          title="Built with modern frameworks"
          text="Designed for React, Next.js, TypeScript and Tailwind CSS, so components drop straight into real production projects."
          visual={<StackCube />}
        />
        <WhyCell
          className="border-b lg:border-b-0 lg:border-r"
          title="Open source, with intent"
          text="Every component is open source and crafted with intention. Each block explores an interaction pattern and the reasoning behind its design."
          visual={<ContributorTree />}
        />
        <WhyCell
          visualFirst
          title="Build interfaces faster"
          text="Start from carefully engineered blocks instead of rebuilding the same navbar, hero and form from scratch."
          visual={<LandingMock />}
        />
      </div>
    </div>
  );
}
/* ----------------------------------------------------------
   Bento cell
---------------------------------------------------------- */
function WhyCell({ title, text, visual, visualFirst = false, className = "" }) {
  const copy = (
    <div className="p-8 lg:p-10">
      <h3 className="text-3xl font-medium tracking-[-0.03em] text-white">
        {title}
      </h3>
      <p className="mt-4 max-w-xl font-mono text-[13px] leading-6 text-white/40">
        {text}
      </p>
    </div>
  );
  const art = (
    <div className="relative flex min-h-[420px] flex-1 items-center justify-center overflow-hidden bg-white/[0.012] p-6">
      <div className={`pointer-events-none absolute inset-0 ${GRID_BG}`} />
      <div className="relative w-full">{visual}</div>
    </div>
  );
  return (
    <div
      className={`flex flex-col border-white/[0.08] lg:min-h-[660px] ${className}`}
    >
      {visualFirst ? (
        <>
          {art}
          <div className="border-t border-white/[0.08]">{copy}</div>
        </>
      ) : (
        <>
          <div>{copy}</div>
          <div className="flex flex-1 flex-col border-t border-white/[0.08]">
            {art}
          </div>
        </>
      )}
    </div>
  );
}
/* ----------------------------------------------------------
   Visual 1 — stacked cards (fan out on hover)
---------------------------------------------------------- */
function StackedCards() {
  return (
    <div className="group flex items-center justify-center py-6">
      <div className="relative h-[330px] w-[250px]">
        {/* Back left */}
        <div className="absolute inset-0 origin-bottom -rotate-[7deg] rounded-[26px] border border-white/[0.08] bg-[#0a0a0c] p-5 transition-transform duration-500 group-hover:-translate-x-10 group-hover:-rotate-[12deg]">
          <div className="h-2 w-10 rounded bg-white/[0.08]" />
          <div className="mt-3 h-2 w-16 rounded bg-white/[0.05]" />
        </div>
        {/* Back right */}
        <div className="absolute inset-0 origin-bottom rotate-[7deg] rounded-[26px] border border-white/[0.08] bg-[#0a0a0c] p-5 transition-transform duration-500 group-hover:translate-x-10 group-hover:rotate-[12deg]">
          <div className="ml-auto h-2 w-10 rounded bg-white/[0.08]" />
          <div className="ml-auto mt-3 h-2 w-16 rounded bg-white/[0.05]" />
        </div>
        {/* Front */}
        <div className="absolute inset-0 flex flex-col rounded-[26px] border border-white/[0.14] bg-[#0e0e11] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-translate-y-3">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              >
                <path d="M12 3 3 8l9 5 9-5-9-5Z" />
                <path d="m3 12 9 5 9-5" />
                <path d="m3 16 9 5 9-5" />
              </svg>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.12em] text-white/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              LIVE
            </span>
          </div>
          <div className="mt-8 space-y-3">
            <div className="h-9 w-full rounded-lg bg-white/[0.06]" />
            <div className="h-2.5 w-3/5 rounded bg-white/[0.05]" />
          </div>
          <div className="mt-auto flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
            <div>
              <p className="text-sm font-medium text-white">Quantum Core</p>
              <p className="mt-1 text-xs text-white/40">Hover to expand</p>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-black">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
/* ----------------------------------------------------------
   Visual 2 — isometric tiles
---------------------------------------------------------- */
function IsoTile({ label, left, top }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="absolute"
      style={{
        left,
        top,
        width: "21%",
        aspectRatio: "1 / 1",
        transform: `translate(-50%, -50%) translateY(${hover ? -10 : 0}px)`,
        transition: "transform 0.35s ease",
      }}
    >
      <div
        className="flex h-full w-full items-center justify-center rounded-[18%] border bg-[#101013]"
        style={{
          transform: "rotateX(60deg) rotateZ(45deg)",
          boxShadow: TILE_SHADOW,
          borderColor: hover
            ? "rgba(255,255,255,0.35)"
            : "rgba(255,255,255,0.14)",
          transition: "border-color 0.35s ease",
        }}
      >
        <span
          className="font-mono text-[11px] font-bold tracking-tight sm:text-[13px]"
          style={{
            color: hover ? "#ffffff" : "rgba(255,255,255,0.7)",
            transition: "color 0.35s ease",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
function IsoStack() {
  return (
    <div className="relative mx-auto aspect-[1.25/1] w-full max-w-[460px]">
      {ISO_TILES.map((tile) => (
        <IsoTile key={tile.label} {...tile} />
      ))}
    </div>
  );
}
/* ----------------------------------------------------------
   Visual 3 — blocks feeding into the Quantum core
---------------------------------------------------------- */
function ContributorTree() {
  const lines = [
    "M80 112 V210 Q80 270 140 270 H400",
    "M720 112 V210 Q720 270 660 270 H400",
    "M400 112 V270",
    "M400 270 V380",
    "M130 440 H330",
    "M470 440 H670",
  ];
  return (
    <div className="relative mx-auto aspect-[8/5] w-full max-w-[640px]">
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <g stroke="rgba(255,255,255,0.14)" strokeWidth="2">
          {lines.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round">
          {lines.map((d) => (
            <path key={d} d={d} pathLength="100" className="why-flow" />
          ))}
        </g>
        <circle
          cx="400"
          cy="270"
          r="12"
          fill="#222226"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="2"
        />
      </svg>
      {TREE_TILES.map((tile) => (
        <div
          key={tile.glyph}
          className="absolute flex aspect-square w-[10%] items-center justify-center rounded-xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.02] text-xl text-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-colors hover:border-white/30 hover:text-white"
          style={{
            left: tile.x,
            top: tile.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {tile.glyph}
        </div>
      ))}
      {/* Center logo tile */}
      <div
        className="absolute flex aspect-square w-[16%] items-center justify-center rounded-2xl border border-white/[0.16] bg-[#17171a] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        style={{ left: "50%", top: "88%", transform: "translate(-50%, -50%)" }}
      >
        <div className="flex h-[58%] w-[58%] items-center justify-center rounded-full border border-white/[0.22]">
          <div className="h-[28%] w-[28%] rounded-full bg-white shadow-[0_0_22px_rgba(255,255,255,0.7)]" />
        </div>
      </div>
    </div>
  );
}
/* ----------------------------------------------------------
   Visual 4 — landing page mock with floating labels
---------------------------------------------------------- */
function LandingMock() {
  return (
    <div className="relative mx-auto w-full max-w-[640px] py-10">
      {/* Floating label: left */}
      <div className="absolute left-0 top-[22%] z-10 hidden items-center sm:flex">
        <span className="rounded-lg border border-white/[0.12] bg-black px-3.5 py-2 text-xs font-semibold text-white">
          Navbar Component
        </span>
        <span className="w-8 border-t border-dashed border-white/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
      </div>
      {/* Floating label: right */}
      <div className="absolute right-0 top-[56%] z-10 hidden items-center sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="w-8 border-t border-dashed border-white/30" />
        <span className="rounded-lg border border-white/[0.12] bg-black px-3.5 py-2 text-xs font-semibold text-white">
          Hero Block
        </span>
      </div>
      {/* Card */}
      <div className="mx-auto w-full max-w-[350px] overflow-hidden rounded-[26px] border border-white/[0.1] bg-[#08080a] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.06]">
            <div className="h-3 w-3 rounded-full border border-white/50" />
          </div>
          <div className="flex items-center gap-4 text-[10px] font-semibold text-white/70">
            <span>Product</span>
            <span>Features</span>
          </div>
          <span className="rounded-lg bg-white px-3 py-1.5 text-[10px] font-semibold text-black">
            Sign Up
          </span>
        </div>
        <div className="px-6 pb-8 pt-10 text-center">
          <h4 className="text-[22px] font-semibold leading-tight tracking-[-0.03em] text-white">
            Ship interfaces
            <br />
            with precision
          </h4>
          <p className="mx-auto mt-4 max-w-[240px] text-[10px] leading-4 text-white/45">
            Stop rebuilding the same UI elements. Pre-built components designed
            for speed and consistency.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="flex">
              <span className="h-5 w-5 rounded-full bg-indigo-400" />
              <span className="-ml-1.5 h-5 w-5 rounded-full bg-fuchsia-400" />
              <span className="-ml-1.5 h-5 w-5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[9px] text-white/40">Built in the open</span>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex h-10 flex-1 items-center rounded-lg border border-white/[0.08] bg-white/[0.05] px-3 text-left text-[10px] text-white/35">
              Enter your email
            </div>
            <span className="flex h-10 items-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-3 text-[10px] font-semibold text-black">
              ✦ Get Early Access
            </span>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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
      <BetaNotice />
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
