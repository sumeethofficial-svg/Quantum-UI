import React, { useState } from "react";

export default function SpotlightNavbar({
  items = ["Home", "About", "Events", "Sponsors", "Pricing"],
}) {
  const [active, setActive] = useState(0);

  return (
    <nav className="flex min-h-[240px] items-center justify-center">
      <div className="relative flex rounded-full border border-white/15 bg-black/70 p-1 shadow-2xl backdrop-blur-xl">
        <div
          className="absolute bottom-1 top-1 rounded-full bg-white transition-all duration-300"
          style={{
            left: `${4 + active * (100 / items.length)}%`,
            width: `calc(${100 / items.length}% - 8px)`,
            transform: "translateX(-50%)",
          }}
        />
        {items.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setActive(index)}
            className={`relative z-10 min-w-20 px-5 py-2.5 text-sm transition-colors ${
              active === index ? "text-black" : "text-white/65 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}
