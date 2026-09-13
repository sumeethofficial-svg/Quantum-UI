import { useState } from "react";

const commands = ["Search commands", "Open component", "Switch theme", "Deploy build"];

function CommandPalette() {
  const [query, setQuery] = useState("");
  const filtered = commands.filter((c) => c.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full max-w-sm rounded-xl border border-white/[0.12] bg-[#0b0d11] shadow-2xl">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a command..."
        className="w-full border-b border-white/[0.08] bg-transparent px-4 py-3 font-mono text-sm text-white outline-none placeholder:text-slate-600"
      />
      <div className="max-h-48 overflow-y-auto p-2">
        {filtered.map((command) => (
          <div
            key={command}
            className="cursor-pointer rounded-md px-3 py-2 font-mono text-xs text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-cyan-100"
          >
            {command}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="px-3 py-2 font-mono text-xs text-slate-600">No matches</div>
        )}
      </div>
    </div>
  );
}

export default CommandPalette;
