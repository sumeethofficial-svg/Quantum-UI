import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

export interface StackOrbitItem {
  /** Shown under the front item and used as the accessible name. */
  name: string;
  /** Logo or any element. Fills the tile. */
  logo: ReactNode;
  /** Glow color behind the front item. */
  accent?: string;
}

interface StackOrbitProps {
  items?: StackOrbitItem[];
  /** Milliseconds between automatic steps. */
  interval?: number;
  /** Rotate on its own. Always off for reduced-motion users. */
  autoPlay?: boolean;
  className?: string;
}

/* ---------- Simplified brand marks (trademarks of their owners) ---------- */

function NextMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="#fff" />
      <path
        d="M11 9.5v13M11 9.5l10.5 13.5M21.5 9.5v7"
        fill="none"
        stroke="#000"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReactMark() {
  return (
    <svg viewBox="-12 -10.5 24 21" aria-hidden="true">
      <g fill="none" stroke="#61dafb" strokeWidth="0.9">
        <ellipse rx="10.8" ry="4.2" />
        <ellipse rx="10.8" ry="4.2" transform="rotate(60)" />
        <ellipse rx="10.8" ry="4.2" transform="rotate(120)" />
      </g>
      <circle r="1.9" fill="#61dafb" />
    </svg>
  );
}

function TypeScriptMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="4" fill="#3178c6" />
      <text
        x="29"
        y="28"
        textAnchor="end"
        fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
        fontWeight="800"
        fontSize="15"
        fill="#fff"
      >
        TS
      </text>
    </svg>
  );
}

function TailwindMark() {
  return (
    <svg viewBox="0 0 54 33" aria-hidden="true">
      <path
        fill="#38bdf8"
        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
      />
    </svg>
  );
}

function ViteMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="stack-orbit-vite-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#41d1ff" />
          <stop offset="1" stopColor="#bd34fe" />
        </linearGradient>
        <linearGradient id="stack-orbit-vite-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffea83" />
          <stop offset="1" stopColor="#ffa800" />
        </linearGradient>
      </defs>
      <path
        fill="url(#stack-orbit-vite-a)"
        d="M29.9 6.1 16.7 29.7a.9.9 0 0 1-1.6 0L2 6.2a.9.9 0 0 1 .9-1.4l13.2 2.4a.9.9 0 0 0 .3 0l12.9-2.3a.9.9 0 0 1 .9 1.3z"
      />
      <path fill="url(#stack-orbit-vite-b)" d="M21.5 3 11.5 5l-.7 10.5 3-.7-.9 5 2.1-.6-1.4 6.7L22 12.5l-3 .6z" />
    </svg>
  );
}

function NodeMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#539e43" d="M16 2l12.1 7v14L16 30 3.9 23V9z" />
      <text
        x="16"
        y="20.5"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
        fontWeight="800"
        fontSize="9"
        fill="#fff"
      >
        JS
      </text>
    </svg>
  );
}

function VercelMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#fff" d="M16 5 29 27H3z" />
    </svg>
  );
}

/** Ready-made marks you can pass as `logo`, e.g. `logo: <techLogos.React />`. */
export const techLogos = {
  Next: NextMark,
  React: ReactMark,
  TypeScript: TypeScriptMark,
  Tailwind: TailwindMark,
  Vite: ViteMark,
  Node: NodeMark,
  Vercel: VercelMark,
};

const DEFAULT_ITEMS: StackOrbitItem[] = [
  { name: "Next.js", logo: <NextMark />, accent: "#ffffff" },
  { name: "TypeScript", logo: <TypeScriptMark />, accent: "#3178c6" },
  { name: "React", logo: <ReactMark />, accent: "#61dafb" },
  { name: "Tailwind CSS", logo: <TailwindMark />, accent: "#38bdf8" },
  { name: "Vite", logo: <ViteMark />, accent: "#a855f7" },
  { name: "Node.js", logo: <NodeMark />, accent: "#539e43" },
  { name: "Vercel", logo: <VercelMark />, accent: "#e5e5e5" },
];

/* ---------- Layout maths ---------- */

/** Where item `i` sits when the loop is rotated to `pos`. */
function place(i: number, pos: number, n: number, time: number, bob: boolean) {
  let offset = (((i - pos) % n) + n) % n;
  if (offset > n / 2) offset -= n;

  const theta = (offset / n) * Math.PI * 2;
  const depth = Math.cos(theta); // 1 = front, -1 = back

  const x = 46 + Math.sin(theta) * 36 - depth * 6;
  const y =
    35 + ((depth + 1) / 2) * 27 + (bob ? Math.sin(time / 900 + i * 1.7) * 0.8 : 0);

  const scale = 1.4 / (1.4 + (1 - depth));
  const blur = Math.max(0, -depth) * 2.6;
  const opacity = 0.3 + 0.7 * Math.pow((depth + 1) / 2, 0.8);

  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: `translate(-50%, -50%) scale(${scale.toFixed(4)})`,
    filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none",
    opacity: opacity.toFixed(3),
    zIndex: String(Math.round((depth + 1) * 50)),
  };
}

function StackOrbit({
  items = DEFAULT_ITEMS,
  interval = 2600,
  autoPlay = true,
  className = "",
}: StackOrbitProps) {
  const count = items.length;
  const [front, setFront] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const target = useRef(0); // unwrapped target position
  const pos = useRef(0); // animated position
  const nodes = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedRef = useRef(false);

  const running = autoPlay && !reduced && count > 1 && !paused;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(query.matches);
      reducedRef.current = query.matches;
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const apply = (time: number) => {
    for (let i = 0; i < count; i++) {
      const node = nodes.current[i];
      if (!node) continue;
      const p = place(i, pos.current, count, time, !reducedRef.current);
      node.style.left = p.left;
      node.style.top = p.top;
      node.style.transform = p.transform;
      node.style.filter = p.filter;
      node.style.opacity = p.opacity;
      node.style.zIndex = p.zIndex;
    }
  };

  // Position items before the first paint.
  useLayoutEffect(() => {
    apply(0);
  });

  // One animation loop: eases `pos` toward `target` and adds a gentle float.
  useEffect(() => {
    if (count === 0) return undefined;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(now - last, 64);
      last = now;

      const gap = target.current - pos.current;
      if (reducedRef.current) {
        pos.current = target.current;
      } else if (Math.abs(gap) > 0.0005) {
        pos.current += gap * (1 - Math.exp(-delta / 230));
      } else {
        pos.current = target.current;
      }

      apply(now);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const goTo = (index: number) => {
    const current = ((Math.round(target.current) % count) + count) % count;
    let delta = (((index - current) % count) + count) % count;
    if (delta > count / 2) delta -= count;
    target.current += delta;
    setFront(index);
  };

  const step = (direction: 1 | -1) => {
    const next = (((Math.round(target.current) + direction) % count) + count) % count;
    target.current += direction;
    setFront(next);
  };

  // Restarts after every change (including manual picks) so a click is never
  // followed instantly by an automatic step.
  useEffect(() => {
    if (!running) return undefined;
    const id = window.setTimeout(() => step(1), interval);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [front, running, interval, count]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    step(event.key === "ArrowRight" ? 1 : -1);
  };

  if (count === 0) return null;

  const current = Math.min(front, count - 1);
  const tile = "calc(var(--tile) * 1)";

  return (
    <div className={`w-full max-w-xl [container-type:inline-size] ${className}`}>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Tech stack"
        onKeyDown={onKeyDown}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative aspect-[5/4] w-full select-none text-white"
        style={{ "--tile": "25cqw" } as CSSProperties}
      >
        {items.map((item, index) => {
          const isFront = index === current;
          const glow = item.accent ?? "#ffffff";

          return (
            <button
              key={`${item.name}-${index}`}
              ref={(node) => {
                nodes.current[index] = node;
              }}
              type="button"
              aria-label={item.name}
              aria-current={isFront ? "true" : undefined}
              onClick={() => goTo(index)}
              className="absolute block cursor-pointer rounded-[22%] outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-white/70"
              style={{ width: tile, height: tile }}
            >
              <span
                className="flex size-full items-center justify-center rounded-[22%] border bg-gradient-to-br from-[#171a20] to-[#0a0c10] p-[22%] transition-[box-shadow,border-color] duration-500 [&>svg]:h-full [&>svg]:w-full [&>svg]:drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                style={{
                  borderColor: isFront ? `${glow}66` : "rgba(255,255,255,0.10)",
                  boxShadow: isFront
                    ? `0 0 48px -6px ${glow}55, inset 0 1px 0 rgba(255,255,255,0.12)`
                    : "inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {item.logo}
              </span>
            </button>
          );
        })}

        {/* Name of the front item */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[4cqw] z-[200] h-[7cqw]">
          {items.map((item, index) => (
            <p
              key={`label-${item.name}-${index}`}
              aria-hidden={index !== current}
              className={`absolute inset-x-0 top-0 text-center font-mono text-[3.1cqw] tracking-wide transition-[opacity,transform] duration-500 motion-reduce:transition-none ${
                index === current
                  ? "translate-y-0 text-white opacity-100"
                  : "translate-y-1 opacity-0"
              }`}
            >
              {item.name}
            </p>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {items[current].name}
        </p>
      </div>
    </div>
  );
}

export default StackOrbit;