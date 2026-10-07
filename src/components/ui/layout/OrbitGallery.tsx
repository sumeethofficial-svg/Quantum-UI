import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";

export interface OrbitGalleryItem {
  /** Full name. The last word is set in italic. */
  name: string;
  /** Small line under the name, e.g. "1748 — 1825". */
  years?: string;
  /** Full-bleed background image URL. */
  image?: string;
  /** Portrait image URL for the circular avatar. */
  avatar?: string;
  /** CSS background used when `image` is not set (e.g. a gradient). */
  background?: string;
}

interface OrbitGalleryProps {
  items?: OrbitGalleryItem[];
  /** Milliseconds each item stays active. */
  interval?: number;
  /** Advance automatically. Always off for reduced-motion users. */
  autoPlay?: boolean;
  className?: string;
}

const DEFAULT_ITEMS: OrbitGalleryItem[] = [
  {
    name: "Leonardo da Vinci",
    years: "1452 — 1519",
    background:
      "radial-gradient(120% 90% at 50% 20%, #6b5236 0%, #1f1610 60%, #0a0705 100%)",
  },
  {
    name: "Francisco Goya",
    years: "1746 — 1828",
    background: "linear-gradient(160deg, #3b2a2a, #7a3b25 55%, #1a1210)",
  },
  {
    name: "Édouard Manet",
    years: "1832 — 1883",
    background: "linear-gradient(165deg, #2a2d2a, #8a8670 60%, #201f1a)",
  },
  {
    name: "Jan Vermeer",
    years: "1632 — 1675",
    background: "linear-gradient(150deg, #d9d3c0, #6f7a86 55%, #1b1d22)",
  },
  {
    name: "Jacques-Louis David",
    years: "1748 — 1825",
    background: "linear-gradient(170deg, #6f7f8a, #a63a2a 58%, #2a1b14)",
  },
  {
    name: "Peter Paul Rubens",
    years: "1577 — 1640",
    background: "linear-gradient(160deg, #5e1b1b, #c9a97a 55%, #2a1a12)",
  },
  {
    name: "Sandro Botticelli",
    years: "1445 — 1510",
    background: "linear-gradient(150deg, #2f6f73, #b3402f 60%, #3a1510)",
  },
];

interface Slot {
  x: number; // % of card width
  y: number; // % of card height
  scale: number;
  opacity: number;
  z: number;
}

/** Where an avatar sits relative to the active one. */
const FORWARD: Slot[] = [
  { x: 50, y: 40, scale: 1, opacity: 1, z: 30 },
  { x: 85, y: 56, scale: 0.62, opacity: 1, z: 20 },
  { x: 97, y: 87, scale: 0.52, opacity: 0.9, z: 10 },
];
const BACKWARD: Slot[] = [
  { x: 15, y: 56, scale: 0.62, opacity: 1, z: 20 },
  { x: 3, y: 87, scale: 0.52, opacity: 0.9, z: 10 },
];
const HIDDEN: Slot = { x: 50, y: 78, scale: 0.2, opacity: 0, z: 0 };

function slotFor(offset: number, count: number): Slot {
  if (offset < FORWARD.length) return FORWARD[offset];
  const back = count - offset; // 1 = previous, 2 = the one before that
  if (back >= 1 && back <= BACKWARD.length) return BACKWARD[back - 1];
  return HIDDEN;
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return { lead: "", last: name };
  return { lead: parts.slice(0, -1).join(" "), last: parts[parts.length - 1] };
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "");
}

function OrbitGallery({
  items = DEFAULT_ITEMS,
  interval = 3200,
  autoPlay = true,
  className = "",
}: OrbitGalleryProps) {
  const count = items.length;
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const paused = useRef(false);
  const ringId = `orbit-ring-${useId().replace(/:/g, "")}`;
  const ringRef = useRef<SVGCircleElement | null>(null);

  const current = Math.min(active, Math.max(count - 1, 0));
  const running = autoPlay && !reduced && count > 1;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Drives both the progress ring and the auto-advance from one clock.
  useEffect(() => {
    ringRef.current?.setAttribute("stroke-dashoffset", "100");
    if (!running) return undefined;

    let frame = 0;
    let last = performance.now();
    let elapsed = 0;

    const tick = (now: number) => {
      const delta = now - last;
      last = now;

      if (!paused.current && !document.hidden) elapsed += delta;

      const progress = Math.min(elapsed / interval, 1);
      ringRef.current?.setAttribute("stroke-dashoffset", String(100 - progress * 100));

      if (progress >= 1) {
        setActive((value) => (value + 1) % count);
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [current, running, interval, count]);

  if (count === 0) return null;

  const activeItem = items[current];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Gallery"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
      className={`relative isolate aspect-[3/4] w-[22rem] max-w-full select-none overflow-hidden rounded-3xl bg-black text-white [container-type:inline-size] ${className}`}
    >
      {/* Backgrounds */}
      {items.map((item, index) => {
        const isActive = index === current;
        const style: CSSProperties = item.image
          ? {}
          : { background: item.background ?? "linear-gradient(160deg,#27303a,#0b0d11)" };

        return (
          <div
            key={`bg-${item.name}-${index}`}
            aria-hidden="true"
            className={`absolute inset-0 -z-10 transition-[opacity,transform] duration-[1200ms] ease-out motion-reduce:transition-none ${
              isActive ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
            }`}
            style={style}
          >
            {item.image && (
              <img
                src={item.image}
                alt=""
                draggable={false}
                className="size-full object-cover"
              />
            )}
          </div>
        );
      })}

      {/* Legibility gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/30"
      />

      {/* Orbiting avatars */}
      {items.map((item, index) => {
        const isActive = index === current;
        const offset = (index - current + count) % count;
        const slot = slotFor(offset, count);

        const style: CSSProperties = {
          left: `${slot.x}%`,
          top: `${slot.y}%`,
          opacity: slot.opacity,
          zIndex: slot.z,
          transform: `translate(-50%, -50%) scale(${slot.scale})`,
        };

        return (
          <button
            key={`avatar-${item.name}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show ${item.name}`}
            aria-current={isActive ? "true" : undefined}
            tabIndex={slot.opacity === 0 ? -1 : 0}
            style={style}
            className="absolute size-[30cqw] rounded-full outline-none transition-[left,top,transform,opacity] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none"
          >
            {/* Glass frame */}
            <span
              className={`absolute inset-0 rounded-full border backdrop-blur-sm transition-colors duration-700 ${
                isActive
                  ? "border-white/30 bg-white/15"
                  : "border-white/20 bg-white/10 hover:bg-white/20"
              }`}
            />

            {/* Portrait */}
            <span className="absolute inset-[7%] overflow-hidden rounded-full bg-zinc-800">
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt=""
                  draggable={false}
                  className="size-full object-cover grayscale"
                />
              ) : (
                <span className="flex size-full items-center justify-center bg-gradient-to-br from-zinc-300 to-zinc-600 font-serif text-[9cqw] text-zinc-900">
                  {initials(item.name)}
                </span>
              )}
            </span>

            {/* Progress ring (active only) */}
            {isActive && running && (
              <svg
                viewBox="0 0 100 100"
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[2%] size-[104%] -rotate-90"
              >
                <defs>
                  <linearGradient id={ringId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f6d58f" />
                    <stop offset="100%" stopColor="#9a6a22" />
                  </linearGradient>
                </defs>
                <circle
                  ref={ringRef}
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke={`url(#${ringId})`}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
              </svg>
            )}
          </button>
        );
      })}

      {/* Captions */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[8cqw] z-40 h-[18cqw]">
        {items.map((item, index) => {
          const isActive = index === current;
          const { lead, last } = splitName(item.name);

          return (
            <div
              key={`caption-${item.name}-${index}`}
              aria-hidden={!isActive}
              className={`absolute inset-x-0 top-0 px-[6cqw] text-center transition-[opacity,transform,filter] duration-700 ease-out motion-reduce:transition-none ${
                isActive
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-[35%] opacity-0 blur-[2px]"
              }`}
            >
              <p className="font-serif text-[7.6cqw] leading-none tracking-tight">
                {lead && <span>{lead} </span>}
                <em className="italic">{last}</em>
              </p>
              {item.years && (
                <p className="mt-[2.6cqw] text-[2.4cqw] tracking-[0.22em] text-white/70">
                  {item.years}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {activeItem.name}
        {activeItem.years ? `, ${activeItem.years}` : ""}
      </p>
    </div>
  );
}

export default OrbitGallery;