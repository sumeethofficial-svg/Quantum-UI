import { useRef, useState } from "react";

function MagneticLink({ children = "Follow trajectory ↗", strength = 0.18 }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const move = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setOffset({
      x: (event.clientX - (rect.left + rect.width / 2)) * strength,
      y: (event.clientY - (rect.top + rect.height / 2)) * strength,
    });
  };

  return (
    <a
      ref={ref}
      href="#"
      onMouseMove={move}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      onClick={(e) => e.preventDefault()}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      className="inline-flex rounded-md px-3 py-2 font-mono text-sm text-cyan-200 transition-transform duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
    >
      {children}
    </a>
  );
}

export default MagneticLink;
