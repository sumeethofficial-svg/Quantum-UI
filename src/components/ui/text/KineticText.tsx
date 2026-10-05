import React from "react";

function KineticText({ lines = ["WORDS", "IN", "MOTION"] } = {}) {
  return (
    <div className="w-full max-w-3xl select-none px-4 py-8 sm:px-8" aria-label="Words in motion kinetic typography preview">
      <style>{`
        @keyframes quantum-kinetic-enter {
          0% { opacity: 0; transform: translate3d(0, 115%, 0) skewY(9deg); filter: blur(8px); }
          65% { opacity: 1; transform: translate3d(0, -5%, 0) skewY(-1deg); filter: blur(0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) skewY(0); filter: blur(0); }
        }
        @keyframes quantum-kinetic-glint {
          0%, 70%, 100% { opacity: .12; }
          35% { opacity: .42; }
        }
        .quantum-kinetic-line { overflow: hidden; line-height: .82; }
        .quantum-kinetic-letter {
          display: inline-block;
          opacity: 0;
          animation: quantum-kinetic-enter 900ms cubic-bezier(.2,.75,.2,1) forwards;
          will-change: transform, opacity;
        }
        .quantum-kinetic-glint { animation: quantum-kinetic-glint 3.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .quantum-kinetic-letter, .quantum-kinetic-glint { animation: none !important; opacity: 1; transform: none; filter: none; }
        }
      `}</style>
      <div className="mb-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-slate-500 sm:text-[10px]">
        <span>Q / 001 — KINETIC TYPE</span>
        <span className="quantum-kinetic-glint text-cyan-200">Motion study</span>
      </div>
      <div className="space-y-2 sm:space-y-3" aria-hidden="true">
        {lines.map((line, lineIndex) => (
          <div key={line} className="quantum-kinetic-line">
            <div
              className="whitespace-nowrap text-[clamp(3.2rem,12vw,8rem)] font-black uppercase tracking-[-0.085em] text-slate-100"
              style={{ textShadow: "0 2px 0 #a5aeb8, 0 5px 0 #515a66, 0 12px 30px rgba(0,0,0,.55)" }}
            >
              {[...line].map((letter, letterIndex) => (
                <span
                  className="quantum-kinetic-letter"
                  key={`${line}-${letterIndex}`}
                  style={{ animationDelay: `${lineIndex * 170 + letterIndex * 48}ms` }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-7 flex items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/60 to-transparent" />
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-600">Stagger · Reveal · Repeat</span>
      </div>
    </div>
  );
}

export default KineticText;
