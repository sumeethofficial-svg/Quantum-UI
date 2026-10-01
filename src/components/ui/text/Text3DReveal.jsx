import React from "react";

function Text3DReveal() {
  return (
    <div className="w-full max-w-4xl select-none px-3 py-10 text-center sm:px-8" aria-label="Three dimensional QUANTUM text reveal preview">
      <style>{`
        @keyframes quantum-3d-reveal {
          0% { clip-path: inset(0 100% 0 0); opacity: .2; transform: perspective(700px) rotateX(18deg) translateY(22px); }
          65% { clip-path: inset(0 0 0 0); opacity: 1; transform: perspective(700px) rotateX(-3deg) translateY(-2px); }
          100% { clip-path: inset(0 0 0 0); opacity: 1; transform: perspective(700px) rotateX(0) translateY(0); }
        }
        @keyframes quantum-3d-subtitle {
          from { opacity: 0; letter-spacing: .75em; transform: translateY(8px); }
          to { opacity: 1; letter-spacing: .42em; transform: translateY(0); }
        }
        .quantum-3d-word {
          display: inline-block;
          color: #f4f5f7;
          animation: quantum-3d-reveal 1.25s cubic-bezier(.16,1,.3,1) both;
          transform-origin: center bottom;
          text-shadow: 0 2px 0 #c9cdd2, 0 4px 0 #a3a9b1, 0 6px 0 #7a828d, 0 8px 0 #535c68, 0 10px 0 #353d47, 0 14px 22px rgba(0,0,0,.8);
        }
        .quantum-3d-subtitle { opacity: 0; animation: quantum-3d-subtitle .9s .65s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .quantum-3d-word, .quantum-3d-subtitle { animation: none !important; clip-path: none; opacity: 1; transform: none; letter-spacing: .42em; }
        }
      `}</style>
      <div className="mb-8 flex items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-slate-600">
        <span className="h-px w-8 bg-white/15" />
        <span>Q / 002 — DEPTH TYPE</span>
        <span className="h-px w-8 bg-white/15" />
      </div>
      <div className="overflow-hidden py-4">
        <h2 className="quantum-3d-word whitespace-nowrap text-[clamp(2.5rem,10vw,7.5rem)] font-black uppercase leading-[.9] tracking-[-0.075em]">
          QUANTUM
        </h2>
      </div>
      <p className="quantum-3d-subtitle mt-7 font-mono text-[9px] uppercase text-slate-400 sm:text-[10px]">
        Built beyond the surface
      </p>
    </div>
  );
}

export default Text3DReveal;
