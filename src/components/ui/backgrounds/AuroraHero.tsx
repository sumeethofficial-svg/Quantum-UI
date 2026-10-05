import React, { useState } from "react";

export default function AuroraHero() {
  const [mode, setMode] = useState(0);
  const palettes = [
    "from-emerald-500/40 via-lime-400/20 to-red-500/50",
    "from-cyan-500/40 via-blue-500/20 to-violet-500/50",
    "from-orange-500/40 via-amber-400/20 to-pink-500/50",
  ];

  return (
    <div className="relative min-h-[380px] overflow-hidden rounded-2xl bg-[#08090c]">
      <div className="absolute inset-0 flex justify-center gap-2 overflow-hidden opacity-80">
        {Array.from({ length: 22 }).map((_, index) => (
          <div
            key={index}
            className={`h-full w-6 shrink-0 bg-gradient-to-b ${palettes[mode]} blur-[7px] transition-all duration-1000`}
            style={{
              transform: `skewX(${index % 2 ? -3 : 3}deg)`,
              opacity: 0.25 + ((index * 13) % 60) / 100,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#08090c_85%)]" />

      <div className="relative z-10 flex min-h-[380px] flex-col items-center justify-center text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-white/45">
          Quantum atmosphere
        </p>
        <h2 className="text-4xl font-bold text-white">Aurora Hero</h2>
        <p className="mt-3 max-w-md text-sm text-white/60">
          Fluted glass dynamic hero with an interactive color switch.
        </p>
        <div className="mt-7 flex gap-2">
          {palettes.map((_, index) => (
            <button
              key={index}
              onClick={() => setMode(index)}
              className={`h-3 w-3 rounded-full border transition ${
                mode === index ? "scale-125 border-white" : "border-white/20"
              }`}
              aria-label={`Select palette ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
