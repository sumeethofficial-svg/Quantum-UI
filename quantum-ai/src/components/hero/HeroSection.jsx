import QuantumCore from "./QuantumCore";

function HeroSection({ onOpenLibrary }) {
  return (
    <section className="relative flex flex-col items-center px-6 pb-[90px] pt-[78px] text-center md:pt-[110px]">

      {/* Eyebrow */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.04] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-100">
        <span className="h-[5px] w-[5px] rounded-full bg-cyan-100 shadow-[0_0_6px_2px_rgba(77,216,255,0.35)]" />
        73 components · MIT licensed
      </div>

      {/* Heading */}
      <h1 className="m-0 text-[clamp(42px,12vw,68px)] font-bold leading-[1.02] tracking-[-0.02em]">
        Interfaces engineered
        <br />
        for the{" "}
        <span className="bg-gradient-to-r from-slate-100 via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
          future.
        </span>
      </h1>

      {/* Tagline */}
      <p className="mb-11 mt-5 max-w-[520px] text-base leading-relaxed text-slate-400 md:text-lg">
        A futuristic component library for React & Next.js — copy, paste,
        ship. Every piece calibrated like precision hardware.
      </p>

      {/* Actions */}
      <div className="mb-[58px] flex gap-3.5 md:mb-[78px]">
        <button
          onClick={onOpenLibrary}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-slate-100
            px-[22px]
            py-3
            text-sm
            font-semibold
            text-[#08090c]
            shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_24px_-8px_rgba(77,216,255,0.25)]
            transition-transform
            duration-200
            hover:-translate-y-0.5
          "
        >
          Explore Components →
        </button>

        <a
          href="#"
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-white/[0.14]
            px-[22px]
            py-3
            text-sm
            font-medium
            text-slate-100
            transition-all
            duration-200
            hover:border-cyan-400/35
            hover:text-cyan-100
          "
        >
          GitHub
        </a>
      </div>

      {/* Quantum Core */}
      <QuantumCore />
    </section>
  );
}

export default HeroSection;
