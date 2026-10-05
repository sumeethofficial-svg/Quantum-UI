import { useState } from "react";

function LiquidText({ children = "Hover Me" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-block cursor-default text-4xl font-semibold tracking-tight text-white transition-all duration-500"
      style={{
        transform: hovered ? "skewX(-8deg) scaleX(1.08)" : "skewX(0) scaleX(1)",
        filter: hovered ? "blur(.2px)" : "blur(0)",
        textShadow: hovered ? "10px 0 18px rgba(77,216,255,.16), -10px 0 18px rgba(255,255,255,.08)" : "none",
      }}
    >
      {children}
    </span>
  );
}

export default LiquidText;
