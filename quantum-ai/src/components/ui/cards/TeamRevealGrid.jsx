import React, { useState } from "react";

const members = [
  { name: "Aizen", role: "Web3 Lead", image: "https://i.pravatar.cc/300?img=12", bio: "Designs decentralized product systems." },
  { name: "Batman", role: "Infrastructure Engineer", image: "https://i.pravatar.cc/300?img=14", bio: "Builds resilient infrastructure." },
  { name: "Johan", role: "Backend Engineer", image: "https://i.pravatar.cc/300?img=33", bio: "Builds silent, ultra-precise distributed systems." },
  { name: "Shinji", role: "Frontend Engineer", image: "https://i.pravatar.cc/300?img=47", bio: "Creates expressive interface systems." },
  { name: "Kaname", role: "Security Engineer", image: "https://i.pravatar.cc/300?img=51", bio: "Hardens critical application surfaces." },
  { name: "Ashutosh", role: "Product Engineer", image: "https://i.pravatar.cc/300?img=68", bio: "Turns concepts into polished products." },
];

export default function TeamRevealGrid() {
  const [active, setActive] = useState(null);

  return (
    <div className="w-full py-8">
      <h2 className="mb-10 text-center text-4xl font-bold tracking-tight text-white">
        Meet the Team
      </h2>

      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3">
        {members.map((member, index) => (
          <div
            key={member.name}
            className="text-center"
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
          >
            <div
              className={`mx-auto aspect-square w-32 overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 p-1 transition-all duration-500 md:w-36 ${
                active === index ? "scale-105 border-white/40 shadow-2xl" : ""
              }`}
            >
              <div className="relative h-full overflow-hidden rounded-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`h-full w-full object-cover grayscale transition duration-500 ${
                    active === index ? "grayscale-0" : ""
                  }`}
                />
                <div
                  className={`absolute inset-x-2 bottom-2 rounded-lg bg-black/80 p-2 text-left text-xs text-white transition-all duration-300 ${
                    active === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                >
                  {member.bio}
                </div>
              </div>
            </div>
            <h3 className="mt-4 font-semibold text-white">{member.name}</h3>
            <p className="mt-1 text-sm text-white/55">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
