import React, { useState } from "react";

export default function Tooltip({
  label = "Documentation",
  items = ["Docs", "Lorem", "Guide"],
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-[260px] items-center justify-center">
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div
          className={`absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-medium text-black shadow-xl transition-all duration-200 ${
            open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          {label}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-white" />
        </div>

        <div className="flex gap-2 rounded-lg border border-white/10 bg-neutral-900 p-2">
          {items.map((item) => (
            <button
              key={item}
              type="button"
              className="rounded-lg bg-neutral-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="mx-auto mt-8 block rounded-lg bg-neutral-800 px-5 py-3 text-sm font-medium text-white"
        >
          Repo
        </button>
      </div>
    </div>
  );
}
