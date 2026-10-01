
import React, { useState } from "react";
import {
  House,
  CircleCheck,
  CalendarDays,
  Target,
  Search,
} from "lucide-react";

const defaultItems = [
  { label: "Home", icon: House },
  { label: "Updates", icon: CircleCheck },
  { label: "Schedule", icon: CalendarDays },
  { label: "Goals", icon: Target },
];

export default function SpotlightNavbar({
  items = defaultItems,
  defaultActive = 0,
  onChange,
}) {
  const [active, setActive] = useState(defaultActive);

  const icons = [House, CircleCheck, CalendarDays, Target, Search];

  const navItems = items.map((item, index) => {
    if (typeof item === "string") {
      return {
        label: item,
        icon: icons[index % icons.length],
      };
    }

    return {
      ...item,
      icon: item.icon || Search,
    };
  });

  function selectItem(index) {
    setActive(index);
    onChange?.(navItems[index], index);
  }

  return (
    <div className="flex min-h-[240px] w-full items-center justify-center px-4 py-8">
      <nav
        aria-label="Spotlight navigation"
        className="relative w-full max-w-[440px] rounded-full border border-white/[0.14] bg-[#101116]/90 p-[5px] shadow-[0_12px_35px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl"
      >
        <div className="relative grid grid-cols-4">
          {/* Animated active spotlight */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 top-0 rounded-full border border-white/[0.20] transition-[left,width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              left: `${(active / navItems.length) * 100}%`,
              width: `${100 / navItems.length}%`,
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.17), rgba(255,255,255,0.045))",
              boxShadow:
                "inset 0 1px 2px rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.3)",
            }}
          />

          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = active === index;

            return (
              <button
                key={item.label}
                type="button"
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                title={item.label}
                onClick={() => selectItem(index)}
                className={[
                  "relative z-10 flex h-[62px] min-w-0",
                  "items-center justify-center rounded-full",
                  "transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-cyan-300 focus-visible:ring-inset",
                  "active:scale-95",
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-cyan-200",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-10 w-10 items-center justify-center",
                    "rounded-full transition-all duration-300",
                    isActive
                      ? "bg-white/[0.06] shadow-[inset_0_1px_2px_rgba(255,255,255,0.12)]"
                      : "",
                  ].join(" ")}
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.1 : 1.7}
                    className={
                      isActive
                        ? "drop-shadow-[0_0_7px_rgba(103,232,249,0.3)]"
                        : ""
                    }
                  />
                </span>

                <span className="sr-only">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}