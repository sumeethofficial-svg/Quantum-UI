import { useState } from "react";

function SignalToggle({ defaultChecked = true, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={toggle}
      className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#0b0d11] px-3 py-2 font-mono text-xs text-slate-300 transition-colors hover:border-cyan-300/40"
    >
      <span className={`relative h-5 w-9 rounded-full transition-colors ${checked ? "bg-cyan-300/30" : "bg-white/10"}`}>
        <span className={`absolute top-1 h-3 w-3 rounded-full transition-all ${checked ? "left-5 bg-cyan-200 shadow-[0_0_12px_rgba(77,216,255,.7)]" : "left-1 bg-slate-500"}`} />
      </span>
      <span>{checked ? "Signal enabled" : "Signal disabled"}</span>
    </button>
  );
}

export default SignalToggle;
