function ComponentCode({ component }) {
  const fallbackName = component.name.replaceAll(" ", "");
  const source = component.code || `// Quantum UI component

import { ${fallbackName} } from "@quantum-ui/react";

export function Example() {
  return (
    <${fallbackName}>
      ${component.demo}
    </${fallbackName}>
  );
}`;

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.14] bg-[#090b0e]">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 font-mono text-[11px] text-slate-400">
        <span>
          {component.name.toLowerCase().replaceAll(" ", "-")}.jsx
        </span>
        <span>JSX</span>
      </div>
      <pre className="overflow-auto p-6 font-mono text-[13px] leading-[1.8] text-slate-400">
        <code>{source}</code>
      </pre>
    </div>
  );
}

export default ComponentCode;
