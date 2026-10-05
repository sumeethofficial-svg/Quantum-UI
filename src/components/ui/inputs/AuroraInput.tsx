import { useState } from "react";

function AuroraInput({ placeholder = "Acquire input" }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full max-w-xs">
      <input
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full rounded-lg border bg-[#0b0d11] px-4 py-2.5 font-mono text-sm text-white outline-none transition-all placeholder:text-slate-600 ${
          focused ? "border-cyan-300/50 shadow-[0_0_0_4px_rgba(77,216,255,0.08)]" : "border-white/[0.12]"
        }`}
      />
      <span
        className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent transition-all duration-500 ${
          focused ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
    </div>
  );
}

export default AuroraInput;
