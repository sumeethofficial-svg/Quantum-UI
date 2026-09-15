import { useState } from "react";

function LiquidButton({ children = "Activate liquid sequence →", onClick }) {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setActive(true);
        onClick?.();
        window.setTimeout(() => setActive(false), 650);
      }}
      className={`relative overflow-hidden rounded-full border px-6 py-3 font-mono text-sm text-cyan-100 transition-all duration-500 ${
        active
          ? "border-cyan-200 shadow-[0_0_40px_rgba(77,216,255,0.3)]"
          : "border-cyan-400/25 bg-black/40 hover:border-cyan-300/50"
      }`}
      style={{
        backgroundImage: active
          ? "radial-gradient(circle at 50% 120%, rgba(77,216,255,0.35), transparent 60%)"
          : "none",
      }}
    >
      {children}
    </button>
  );
}

export default LiquidButton;
