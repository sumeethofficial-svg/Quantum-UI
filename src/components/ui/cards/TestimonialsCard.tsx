import React, { useState } from "react";

const testimonials = [
  { title: "Mountain Landscape", description: "Beautiful mountain scenery with snow-capped peaks.", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80" },
  { title: "Ocean Horizon", description: "A quiet horizon stretching into the distance.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80" },
  { title: "Night City", description: "A luminous cityscape after dark.", image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=700&q=80" },
  { title: "Forest Light", description: "Soft light filtering through a dense forest.", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80" },
];

export default function TestimonialsCard() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];

  const next = () => setIndex((value) => (value + 1) % testimonials.length);
  const prev = () => setIndex((value) => (value - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="flex min-h-[330px] items-center justify-center px-4">
      <div className="flex flex-col items-center gap-7 md:flex-row md:gap-8">
        <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-neutral-900 p-1">
          <img src={item.image} alt={item.title} className="h-full w-full rounded-lg object-cover" />
          <div className="absolute -right-4 top-8 -z-10 h-36 w-10 rotate-6 rounded-xl border border-white/10 bg-neutral-700/60" />
        </div>

        <div className="max-w-xs">
          <div className="mb-3 font-mono text-xs text-white/45">
            {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </div>
          <h3 className="text-2xl font-bold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-white/55">{item.description}</p>
          <div className="mt-6 flex gap-2">
            <button onClick={prev} className="h-10 w-10 rounded-full border border-white/10 text-white/70 hover:bg-white/5" aria-label="Previous">←</button>
            <button onClick={next} className="h-10 w-10 rounded-full border border-white/10 text-white/70 hover:bg-white/5" aria-label="Next">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
