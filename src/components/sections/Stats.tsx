function Stats() {
  const stats = [
    {
      number: "73",
      suffix: "+",
      label: "COMPONENTS",
    },
    {
      number: "9",
      suffix: "",
      label: "CATEGORIES",
    },
    {
      number: "0",
      suffix: "",
      label: "DEPENDENCIES ADDED",
    },
  ];

  return (
    <section className="flex justify-center gap-7 border-b border-white/[0.08] px-6 pb-[70px] md:gap-16 md:pb-[100px]">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center"
        >
          <div className="font-mono text-[22px] font-semibold text-slate-100 md:text-[26px]">
            <span className="text-cyan-100">
              {stat.number}
            </span>
            {stat.suffix}
          </div>

          <div className="mt-1 text-[10px] tracking-[0.04em] text-slate-500 md:text-xs">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Stats;