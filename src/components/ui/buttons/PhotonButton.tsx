import { useState } from "react";

function PhotonButton({ children = "Initialize sequence →", onClick, className = "" }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(true);
    onClick?.();
    window.setTimeout(() => setActive(false), 700);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-lg border px-6 py-3 font-mono text-sm text-cyan-100 transition-all duration-300 ${
        active
          ? "border-cyan-200 bg-cyan-300/10 shadow-[0_0_35px_rgba(77,216,255,0.25)]"
          : "border-cyan-400/25 bg-black/40 hover:border-cyan-300/60 hover:bg-cyan-300/5"
      } ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-gradient-to-r from-transparent via-cyan-200/15 to-transparent transition-transform duration-700 group-hover:translate-x-[110%]" />
    </button>
  );
}

export default PhotonButton;
