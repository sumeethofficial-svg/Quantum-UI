function SystemStatus({ label = "Systems nominal", online = true }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#0b0d11] px-3 py-1.5 font-mono text-xs text-slate-300">
      <span
        className={`h-2 w-2 rounded-full ${
          online ? "bg-cyan-300 shadow-[0_0_8px_2px_rgba(77,216,255,0.6)]" : "bg-slate-600"
        }`}
      />
      {label}
    </div>
  );
}

export default SystemStatus;
