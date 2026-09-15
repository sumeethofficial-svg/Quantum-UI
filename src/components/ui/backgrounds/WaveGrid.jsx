import React, { useRef, useState } from "react";

export default function WaveGrid({
  columns = 18,
  rows = 10,
}) {
  const ref = useRef(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  const handleMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    });
  };

  const cells = Array.from({ length: columns * rows });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="relative min-h-[360px] w-full overflow-hidden rounded-2xl bg-neutral-950 p-8"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "8% 10%",
        }}
      />
      <div className="relative grid h-full grid-cols-[repeat(18,minmax(0,1fr))] gap-2">
        {cells.map((_, index) => {
          const x = (index % columns) / columns;
          const y = Math.floor(index / columns) / rows;
          const distance = Math.sqrt((x - pointer.x) ** 2 + (y - pointer.y) ** 2);
          const lift = Math.max(0, 1 - distance * 4);
          return (
            <div
              key={index}
              className="aspect-square rounded-[3px] border border-white/10 bg-white/[0.035] transition-transform duration-150"
              style={{
                transform: `translateY(${-lift * 14}px) rotateX(${lift * 8}deg)`,
                opacity: 0.25 + lift * 0.6,
              }}
            />
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
        <div>
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">Wave Grid</h2>
          <p className="mt-2 text-sm text-white/60">Move your cursor across the grid to send ripples.</p>
        </div>
      </div>
    </div>
  );
}
