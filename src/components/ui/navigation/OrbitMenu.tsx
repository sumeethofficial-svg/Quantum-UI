import { useState } from "react";

const items = ["Overview", "Signals", "Archive", "Settings"];

function OrbitMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex min-h-[240px] items-center justify-center">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/30 bg-black/60 text-cyan-100 shadow-[0_0_25px_rgba(77,216,255,0.18)] transition-colors hover:border-cyan-200/60"
      >
        ◍
      </button>

      {items.map((item, index) => {
        const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2;
        const radius = open ? 90 : 0;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <button
            key={item}
            type="button"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              opacity: open ? 1 : 0,
            }}
            className="absolute rounded-full border border-white/10 bg-[#0b0d11] px-3 py-1.5 font-mono text-[11px] text-slate-300 transition-all duration-300 hover:border-cyan-300/40 hover:text-cyan-100"
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default OrbitMenu;
