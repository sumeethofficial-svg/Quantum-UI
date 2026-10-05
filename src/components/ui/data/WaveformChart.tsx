function WaveformChart({ bars = 28 }) {
  const values = Array.from({ length: bars }, (_, i) => 20 + Math.abs(Math.sin(i * 0.5)) * 70);

  return (
    <div className="flex h-32 w-full max-w-md items-end gap-1 rounded-xl border border-white/[0.08] bg-[#0b0d11] p-4">
      {values.map((height, index) => (
        <div
          key={index}
          style={{ height: `${height}%` }}
          className="flex-1 rounded-full bg-cyan-300/60 transition-all duration-300 hover:bg-cyan-200"
        />
      ))}
    </div>
  );
}

export default WaveformChart;
