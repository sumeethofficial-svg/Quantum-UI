function HologramPanel({ title = "Interface", children }) {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-cyan-300/[0.15] bg-[#0b0d11]/80 p-6 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/[0.06] via-transparent to-transparent" />
      <div className="relative font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-200/70">{title}</div>
      <div className="relative mt-3 text-sm text-slate-400">
        {children || "A layered glass surface with projected depth."}
      </div>
    </div>
  );
}

export default HologramPanel;
