import React, { useState } from "react";

const defaultAvatars = [
  { name: "A", image: "https://i.pravatar.cc/96?img=12" },
  { name: "B", image: "https://i.pravatar.cc/96?img=32" },
  { name: "C", image: "https://i.pravatar.cc/96?img=47" },
  { name: "D", image: "https://i.pravatar.cc/96?img=5" },
  { name: "E", image: "https://i.pravatar.cc/96?img=68" },
];

export default function AvatarGroup({
  avatars = defaultAvatars,
  size = 48,
  overlap = 14,
}) {
  const [active, setActive] = useState(null);

  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex items-center">
        {avatars.map((avatar, index) => (
          <button
            key={index}
            type="button"
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            className="relative overflow-hidden rounded-full border-2 border-[#08090c] bg-neutral-800 transition-all duration-300 ease-out focus:outline-none"
            style={{
              width: size,
              height: size,
              marginLeft: index === 0 ? 0 : -overlap,
              zIndex: active === index ? 50 : index + 1,
              transform:
                active === index
                  ? "translateY(-8px) scale(1.12)"
                  : "translateY(0) scale(1)",
            }}
            aria-label={avatar.name}
          >
            <img
              src={avatar.image}
              alt={avatar.name}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
