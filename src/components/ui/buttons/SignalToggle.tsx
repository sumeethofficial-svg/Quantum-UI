
import { useState } from "react";

function SignalToggle({
  defaultChecked = true,
  onChange,
  orientation = "horizontal",
  disabled = false,
  label = "SIGNAL",
}) {
  const [checked, setChecked] = useState(defaultChecked);

  const isVertical = orientation === "vertical";

  function toggle() {
    if (disabled) return;

    const next = !checked;
    setChecked(next);
    onChange?.(next);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${label} ${checked ? "on" : "off"}`}
        disabled={disabled}
        onClick={toggle}
        className={[
          "group relative flex shrink-0 items-center justify-center",
          "rounded-full border border-white/15",
          "bg-gradient-to-b from-[#30323a] via-[#171920] to-[#08090d]",
          "shadow-[inset_0_3px_5px_rgba(255,255,255,0.12),",
          "inset_0_-5px_8px_rgba(0,0,0,0.9),0_8px_18px_rgba(0,0,0,0.5)]",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-cyan-400",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isVertical ? "h-[104px] w-[54px]" : "h-[54px] w-[104px]",
        ].join(" ")}
      >
        {/* Inner track */}
        <span
          className={[
            "absolute rounded-full border border-black/80",
            "bg-[#090a0e]",
            "shadow-[inset_0_3px_7px_rgba(0,0,0,1)]",
            isVertical
              ? "inset-x-[8px] inset-y-[7px]"
              : "inset-y-[8px] inset-x-[7px]",
          ].join(" ")}
        />

        {/* Status illumination */}
        <span
          className={[
            "absolute rounded-full transition-all duration-300",
            checked
              ? "bg-cyan-400/20 shadow-[0_0_16px_rgba(34,211,238,0.3)]"
              : "bg-transparent",
            isVertical
              ? [
                  "left-1/2 h-[35px] w-[25px] -translate-x-1/2",
                  checked ? "top-[10px]" : "bottom-[10px]",
                ].join(" ")
              : [
                  "top-1/2 h-[25px] w-[35px] -translate-y-1/2",
                  checked ? "right-[10px]" : "left-[10px]",
                ].join(" "),
          ].join(" ")}
        />

        {/* Physical 3D knob */}
        <span
          className={[
            "absolute z-10 flex items-center justify-center",
            "rounded-full border border-white/20",
            "bg-gradient-to-br from-[#555965] via-[#292c35] to-[#111218]",
            "shadow-[inset_0_2px_3px_rgba(255,255,255,0.25),",
            "inset_0_-3px_5px_rgba(0,0,0,0.9),0_4px_7px_rgba(0,0,0,0.8)]",
            "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            isVertical
              ? [
                  "left-1/2 h-[38px] w-[38px] -translate-x-1/2",
                  checked ? "top-[9px]" : "bottom-[9px]",
                ].join(" ")
              : [
                  "top-1/2 h-[38px] w-[38px] -translate-y-1/2",
                  checked ? "right-[9px]" : "left-[9px]",
                ].join(" "),
          ].join(" ")}
        >
          <span
            className={[
              "h-[9px] w-[9px] rounded-full border border-white/10",
              "transition-colors duration-300",
              checked
                ? "bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                : "bg-zinc-600",
            ].join(" ")}
          />
        </span>
      </button>

      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
        <span
          className={[
            "h-1.5 w-1.5 rounded-full transition-colors",
            checked
              ? "bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              : "bg-zinc-600",
          ].join(" ")}
        />
        <span className="text-zinc-400">
          {label} /{" "}
          <span className={checked ? "text-cyan-300" : "text-zinc-500"}>
            {checked ? "ON" : "OFF"}
          </span>
        </span>
      </div>
    </div>
  );
}

export default SignalToggle;