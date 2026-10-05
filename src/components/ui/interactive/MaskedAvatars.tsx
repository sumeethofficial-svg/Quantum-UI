import React, { useState } from "react";

const people = [
  { name: "JOHAN", image: "https://i.pravatar.cc/160?img=14" },
  { name: "AIZEN", image: "https://i.pravatar.cc/160?img=12" },
  { name: "SHINJI", image: "https://i.pravatar.cc/160?img=47" },
  { name: "KANAME", image: "https://i.pravatar.cc/160?img=51" },
];

export default function MaskedAvatars() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex min-h-[280px] items-center justify-center">
      <div className="relative flex items-end justify-center">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.2em] text-white/75">
          {people[active].name}
        </div>
        {people.map((person, index) => (
          <button
            key={person.name}
            type="button"
            onMouseEnter={() => setActive(index)}
            className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-black bg-neutral-900 transition-all duration-300"
            style={{
              marginLeft: index === 0 ? 0 : -16,
              zIndex: active === index ? 20 : index + 1,
              transform: active === index ? "translateY(-12px) scale(1.08)" : "",
            }}
            aria-label={person.name}
          >
            <img src={person.image} alt="" className="h-full w-full object-cover grayscale" />
            <span className="absolute inset-0 bg-black/10" />
          </button>
        ))}
      </div>
    </div>
  );
}
