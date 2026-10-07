"use client";

import {
  useEffect,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";

/* ==========================================================
   Types
========================================================== */

export interface RingGalleryItem {
  id: string;
  /** Image URL. Used when `content` is not provided. */
  src?: string;
  alt?: string;
  /** Custom card face (text, SVG, anything). Designed on a 200px card. */
  content?: ReactNode;
  /** Card background colour / gradient for `content` cards. */
  background?: string;
  /** width / height of the card. Default 1 (square). */
  aspect?: number;
}

export interface RingGalleryProps {
  /** Cards to place on the ring. Defaults to a built-in demo set. */
  items?: RingGalleryItem[];
  /** Centre button label. Pressing it pushes the ring forward one card. */
  label?: ReactNode;
  /** Auto-rotation in degrees per second. 0 turns it off. */
  speed?: number;
  /** Ring radius as a fraction of the smaller side of the container. */
  radius?: number;
  /** Size of the front card as a fraction of the smaller side. */
  cardSize?: number;
  /** Stop auto-rotation while the pointer is over the gallery. */
  pauseOnHover?: boolean;
  /** Fires when a different card reaches the front slot. */
  onActiveChange?: (item: RingGalleryItem, index: number) => void;
  className?: string;
}

/* ==========================================================
   Ring maths (pure, so it is easy to test or reuse)
========================================================== */

const TAU = Math.PI * 2;

/** Cards are authored on a 200px face and scaled from there. */
export const DESIGN_SIZE = 200;

/** How quickly cards shrink away from the front slot. */
const FALLOFF = 2.7;

const wrap = (a: number) => {
  let r = (a + Math.PI) % TAU;
  if (r < 0) r += TAU;
  return r - Math.PI;
};

export interface RingSlot {
  /** Centre of the card, in container pixels */
  x: number;
  y: number;
  /** Scale to apply to the 200px design face */
  scale: number;
  /** 0 - 1, how close the card is to the front slot */
  weight: number;
  /** Absolute angular distance from the front slot, in radians */
  distance: number;
}

/**
 * Cards sit on a circle. The front slot is at 3 o'clock; a card shrinks
 * smoothly as it moves away from it. Increasing `angle` turns the ring
 * clockwise.
 */
export function layoutRing(
  angle: number,
  count: number,
  width: number,
  height: number,
  radius = 0.34,
  cardSize = 0.2
): RingSlot[] {
  const m = Math.min(width, height);
  const R = radius * m;
  const front = (cardSize * m) / DESIGN_SIZE;
  const step = TAU / Math.max(1, count);
  const slots: RingSlot[] = [];

  for (let i = 0; i < count; i++) {
    const d = wrap(angle + i * step);
    const weight = Math.exp(-FALLOFF * (d / Math.PI) ** 2);
    slots.push({
      x: width / 2 + Math.cos(d) * R,
      y: height / 2 + Math.sin(d) * R,
      scale: weight * front,
      weight,
      distance: Math.abs(d),
    });
  }

  return slots;
}

/* ==========================================================
   Demo cards (all original artwork)
========================================================== */

export const defaultRingItems: RingGalleryItem[] = [
  {
    id: "a",
    background: "#0a0a0a",
    content: (
      <span className="text-[130px] font-medium leading-none text-white">a</span>
    ),
  },
  {
    id: "orb",
    background: "#e8553d",
    content: (
      <div className="h-[120px] w-[120px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffe3b8,#ff7a59_45%,#6a4cff_100%)] shadow-[0_14px_30px_rgba(0,0,0,0.3)]" />
    ),
  },
  {
    id: "hey",
    background: "#f01818",
    content: (
      <span className="text-[84px] font-black leading-none tracking-tighter text-white">
        HEY
      </span>
    ),
  },
  {
    id: "flow",
    background: "#d9d9dc",
    content: (
      <div className="flex flex-col items-center">
        <span className="text-[56px] font-normal leading-none text-black">Flow</span>
        <svg viewBox="0 0 100 10" className="mt-1 w-[110px]" fill="none">
          <path
            d="M2 5 q6 -8 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0"
            stroke="#ff5a2a"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
  },
  {
    id: "note",
    background: "#161618",
    aspect: 1.1,
    content: (
      <p className="px-5 text-left text-[12px] leading-[1.45] text-white/85">
        Quantum Sans is a versatile typeface family. Precision, depth and
        motion in every glyph, from the first letter to the last.
      </p>
    ),
  },
  {
    id: "rings",
    background: "#c8f751",
    content: (
      <svg viewBox="0 0 100 60" className="w-[130px]" fill="none" stroke="#111" strokeWidth="4">
        <ellipse cx="30" cy="30" rx="20" ry="13" transform="rotate(-20 30 30)" />
        <ellipse cx="50" cy="30" rx="20" ry="13" transform="rotate(20 50 30)" />
        <ellipse cx="70" cy="30" rx="20" ry="13" transform="rotate(-20 70 30)" />
      </svg>
    ),
  },
  {
    id: "globe",
    background: "#8f8f93",
    content: (
      <svg viewBox="0 0 100 100" className="w-[120px]" fill="none" stroke="#111" strokeWidth="3.5">
        <circle cx="50" cy="50" r="40" />
        <path d="M14 34h72M10 50h80M14 66h72M24 20h52M24 80h52" />
      </svg>
    ),
  },
  {
    id: "signal",
    background: "#0a2a9a",
    content: (
      <span className="text-[40px] font-black italic tracking-tight text-white">
        SIGNAL
      </span>
    ),
  },
  {
    id: "ember",
    background:
      "radial-gradient(circle at 30% 70%, #ff7a1a 0%, #5a1206 55%, #120404 100%)",
    aspect: 0.82,
  },
  {
    id: "shade",
    background: "#5b8db8",
    content: (
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <path
          d="M40 200 C30 130 70 60 120 60 C170 60 190 110 175 150 C165 180 130 190 100 180 C70 190 45 195 40 200Z"
          fill="#0b0b10"
        />
      </svg>
    ),
  },
  {
    id: "yes",
    background: "#fafafa",
    content: (
      <span className="text-[84px] font-black leading-none tracking-tighter text-[#e01616]">
        YES.
      </span>
    ),
  },
  {
    id: "dots",
    background:
      "#000 radial-gradient(#fff 1.6px, transparent 1.8px) 0 0 / 12px 12px",
  },
];

/* ==========================================================
   Component
========================================================== */

export default function RingGallery({
  items = defaultRingItems,
  label = "Push",
  speed = 24,
  radius = 0.34,
  cardSize = 0.2,
  pauseOnHover = true,
  onActiveChange,
  className = "",
}: RingGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Motion state lives in refs, so animating never re-renders React
  const motion = useRef({ angle: 0, target: 0, pausedUntil: 0 });

  // Latest props, read inside the animation loop
  const live = useRef({
    items,
    radius,
    cardSize,
    speed,
    pauseOnHover,
    onActiveChange,
  });
  live.current = { items, radius, cardSize, speed, pauseOnHover, onActiveChange };

  /* ---------- controls ---------- */

  const hold = () => {
    motion.current.pausedUntil = performance.now() + 2500;
  };

  const push = (direction: 1 | -1 = 1) => {
    const step = TAU / Math.max(1, live.current.items.length);
    const m = motion.current;
    // snap to the next / previous slot on the ring
    m.target =
      direction === 1
        ? Math.floor(m.target / step + 1e-4) * step + step
        : Math.ceil(m.target / step - 1e-4) * step - step;
    hold();
  };

  const bringToFront = (index: number) => {
    const step = TAU / Math.max(1, live.current.items.length);
    const m = motion.current;
    m.target = m.angle - wrap(m.angle + index * step);
    hold();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      push(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      push(-1);
    }
  };

  /* ---------- animation loop ---------- */

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let hovering = false;
    let visible = true;
    let activeIndex = -1;

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) {
        w = rect.width;
        h = rect.height;
      }
    });
    ro.observe(root);

    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const cfg = live.current;
      const m = motion.current;
      const count = cfg.items.length;

      // Auto-rotate (clockwise), unless held, hovered or reduced-motion
      const idle =
        now > m.pausedUntil &&
        !(cfg.pauseOnHover && hovering) &&
        !reduceMotion;
      if (idle && cfg.speed !== 0) {
        m.target += (cfg.speed * Math.PI * dt) / 180;
      }

      // Ease toward the target for a smooth, weighty feel
      m.angle += (m.target - m.angle) * (1 - Math.exp(-dt * 9));

      if (w > 0 && h > 0 && count > 0) {
        const slots = layoutRing(m.angle, count, w, h, cfg.radius, cfg.cardSize);

        let nearest = 0;
        for (let i = 0; i < slots.length; i++) {
          const slot = slots[i];
          const el = cardRefs.current[i];
          if (!slot || !el) continue;

          const item = cfg.items[i];
          const cw = DESIGN_SIZE;
          const ch = DESIGN_SIZE / (item?.aspect ?? 1);

          el.style.transform = `translate3d(${slot.x - cw / 2}px, ${
            slot.y - ch / 2
          }px, 0) scale(${slot.scale})`;
          el.style.zIndex = String(Math.round(slot.weight * 1000));
          el.style.visibility = "visible";

          if (slot.distance < (slots[nearest]?.distance ?? Infinity)) {
            nearest = i;
          }
        }

        if (nearest !== activeIndex) {
          activeIndex = nearest;
          const item = cfg.items[nearest];
          if (item) cfg.onActiveChange?.(item, nearest);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    // Do no work while the gallery is off screen
    const io = new IntersectionObserver((entries) => {
      const nowVisible = entries[0]?.isIntersecting ?? true;
      if (nowVisible && !visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!nowVisible) {
        cancelAnimationFrame(raf);
      }
      visible = nowVisible;
    });
    io.observe(root);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  /* ---------- render ---------- */

  return (
    <div
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Ring gallery"
      onKeyDown={onKeyDown}
      className={`relative mx-auto aspect-square w-full max-w-[460px] select-none overflow-hidden text-white ${className}`}
    >
      {items.map((item, i) => (
        <div
          key={item.id}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          role="button"
          tabIndex={-1}
          aria-label={item.alt ?? item.id}
          onClick={() => bringToFront(i)}
          className="invisible absolute left-0 top-0 flex cursor-pointer items-center justify-center overflow-hidden rounded-[6px] shadow-[0_10px_30px_rgba(0,0,0,0.28)] will-change-transform"
          style={{
            width: DESIGN_SIZE,
            height: DESIGN_SIZE / (item.aspect ?? 1),
            background: item.background,
          }}
        >
          {item.content ??
            (item.src ? (
              <img
                src={item.src}
                alt={item.alt ?? ""}
                draggable={false}
                className="h-full w-full object-cover"
              />
            ) : null)}
        </div>
      ))}

      <button
        type="button"
        onClick={() => push(1)}
        className="absolute left-1/2 top-1/2 z-[2000] -translate-x-1/2 -translate-y-1/2 rounded-lg px-4 py-2 text-3xl font-medium tracking-tight text-current outline-none transition-[opacity,transform] hover:opacity-70 focus-visible:ring-2 focus-visible:ring-white/50 active:scale-95 sm:text-4xl"
      >
        {label}
      </button>
    </div>
  );
}