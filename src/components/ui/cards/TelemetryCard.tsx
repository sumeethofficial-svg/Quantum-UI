function TelemetryCard({ label = "Uplink", value = "98.4%", status = "Nominal" }) {
  return (
    <div className="w-full max-w-xs rounded-xl border border-white/[0.08] bg-[#0b0d11] p-5">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">
        <span>{label}</span>
        <span className="text-cyan-300">{status}</span>
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full w-[84%] rounded-full bg-cyan-300/70" />
      </div>
    </div>
  );
}

export default TelemetryCard;
