import React, { useMemo } from "react";

export default function StarsBackground({ count = 90 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 2 + Math.random() * 5,
        delay: Math.random() * 5,
        opacity: 0.25 + Math.random() * 0.7,
      })),
    [count]
  );

  return (
    <div className="relative min-h-[380px] w-full overflow-hidden rounded-2xl bg-[#090a0d]">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `quantum-star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
          }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.05),transparent_60%)]" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/35">
            Deep space
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white">Stars Background</h2>
        </div>
      </div>

      <style>{`
        @keyframes quantum-star-twinkle {
          from { opacity: .2; transform: scale(.8); }
          to { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
