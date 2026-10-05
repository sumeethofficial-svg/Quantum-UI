import React, { useEffect, useRef } from "react";

export default function Cursor({
  children = "Move your mouse over the div",
  label = "Designer",
}) {
  const areaRef = useRef(null);
  const cursorRef = useRef(null);
  const followRef = useRef(null);

  useEffect(() => {
    const area = areaRef.current;
    const cursor = cursorRef.current;
    const follow = followRef.current;
    if (!area || !cursor || !follow) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf;

    const move = (event) => {
      const rect = area.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      cursor.style.transform = `translate3d(${targetX - 10}px, ${targetY - 10}px, 0)`;
      follow.style.transform = `translate3d(${currentX - 32}px, ${currentY - 32}px, 0)`;

      raf = requestAnimationFrame(animate);
    };

    area.addEventListener("mousemove", move);
    raf = requestAnimationFrame(animate);

    return () => {
      area.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={areaRef}
      className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl bg-neutral-900"
    >
      <div
        ref={followRef}
        className="pointer-events-none absolute left-0 top-0 h-16 w-16 rounded-full border border-white/10 bg-white/[0.04] blur-[1px] transition-opacity duration-200"
      />
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-20 h-5 w-5 rotate-[-20deg] text-white"
      >
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M4 2l6.7 17.8 2.6-7.1 7.1-2.6L4 2z" />
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <span className="mb-5 inline-flex rounded-lg border border-black/20 bg-white px-4 py-2 text-sm font-medium text-black shadow-xl">
          {label}
        </span>
        <p className="text-base italic text-white/70">{children}</p>
      </div>
    </div>
  );
}
