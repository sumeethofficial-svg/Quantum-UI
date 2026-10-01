import { useEffect, useRef, useState } from "react";

function CopyButton({ text, label = "Copy command", className = "" }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (insecure context / permissions): do nothing.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
      className={`shrink-0 rounded-lg border border-white/[0.12] px-2.5 py-1.5 font-mono text-xs text-slate-400 transition hover:border-cyan-300/30 hover:text-cyan-100 ${className}`}
    >
      {copied ? "✓" : "⧉"}
    </button>
  );
}

export default CopyButton;
