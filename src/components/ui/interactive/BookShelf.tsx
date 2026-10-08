import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

export interface BookShelfItem {
  /** Short title printed on the spine. */
  title: string;
  /** Longer title for the generated cover (used when `cover` is not set). */
  fullTitle?: string;
  author?: string;
  /** Cover image URL. Without it, a cover is generated from `color`. */
  cover?: string;
  /** Spine and generated-cover color. */
  color?: string;
  /** Text color on the spine and generated cover. */
  textColor?: string;
}

interface BookShelfProps {
  items?: BookShelfItem[];
  /** Small serif heading above the shelf. Pass "" to hide it. */
  heading?: string;
  /** Milliseconds each book stays open. */
  interval?: number;
  /** Open the books one after another. Always off for reduced-motion users. */
  autoPlay?: boolean;
  /** Open a book on click (default) or as soon as the pointer enters it. */
  trigger?: "click" | "hover";
  className?: string;
}

const DEFAULT_ITEMS: BookShelfItem[] = [
  {
    title: "Grid Systems",
    fullTitle: "Grid systems",
    author: "Josef Müller-Brockmann",
    color: "#b5493a",
    textColor: "#ffffff",
  },
  {
    title: "Kinfolk Entrepreneur",
    fullTitle: "The Kinfolk Entrepreneur",
    author: "Kinfolk",
    color: "#ababac",
    textColor: "#101010",
  },
  {
    title: "Genius Behind Apple",
    fullTitle: "Jony Ive",
    author: "Leander Kahney",
    color: "#27282b",
    textColor: "#ffffff",
  },
  {
    title: "App Icon Book",
    fullTitle: "The iOS App Icon Book",
    author: "Michael Flarup",
    color: "#bcbcbd",
    textColor: "#101010",
  },
  {
    title: "Principles of UX",
    fullTitle: "Universal Principles of UX",
    author: "Irene Pereyra",
    color: "#18151b",
    textColor: "#ffffff",
  },
  {
    title: "How To",
    fullTitle: "How to",
    author: "Michael Bierut",
    color: "#b5b5b6",
    textColor: "#101010",
  },
];

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

function BookShelf({
  items = DEFAULT_ITEMS,
  heading = "Favorite books",
  interval = 3000,
  autoPlay = true,
  trigger = "click",
  className = "",
}: BookShelfProps) {
  const count = items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const current = Math.min(active, Math.max(count - 1, 0));
  const running = autoPlay && !reduced && count > 1 && !paused;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const id = window.setTimeout(
      () => setActive((value) => (value + 1) % count),
      interval,
    );
    return () => window.clearTimeout(id);
  }, [current, running, interval, count]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next =
      (current + (event.key === "ArrowRight" ? 1 : -1) + count) % count;
    setActive(next);
    buttons.current[next]?.focus();
  };

  if (count === 0) return null;

  const rootVars = {
    "--d": "5.4cqw", // spine thickness
    "--w": "30cqw", // cover width
    "--h": "40cqw", // book height
  } as CSSProperties;

  return (
    <div className={`w-full max-w-3xl [container-type:inline-size] ${className}`}>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={heading || "Book shelf"}
        onKeyDown={onKeyDown}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="select-none py-[3cqw] text-white"
        style={rootVars}
      >
        {heading && (
          <div className="mb-[5cqw] flex items-center justify-center gap-[2.4cqw]">
            <span aria-hidden="true" className="h-px w-[6cqw] bg-white/70" />
            <h3 className="font-serif text-[2.7cqw] uppercase tracking-wide">
              {heading}
            </h3>
            <span aria-hidden="true" className="h-px w-[6cqw] bg-white/70" />
          </div>
        )}

        <div
          className="mx-auto flex items-start justify-center gap-[1.4cqw]"
          style={{ height: "var(--h)" }}
        >
          {items.map((item, index) => {
            const open = index === current;
            const color = item.color ?? "#2a2d33";
            const textColor = item.textColor ?? "#ffffff";

            const face: CSSProperties = {
              backfaceVisibility: "hidden",
              background: color,
              color: textColor,
            };

            return (
              <button
                key={`${item.title}-${index}`}
                ref={(node) => {
                  buttons.current[index] = node;
                }}
                type="button"
                aria-label={`${item.fullTitle ?? item.title}${item.author ? `, ${item.author}` : ""}`}
                aria-pressed={open}
                onClick={() => setActive(index)}
                onPointerEnter={() => trigger === "hover" && setActive(index)}
                className="relative block shrink-0 cursor-pointer rounded-sm outline-none [perspective:1100px] focus-visible:ring-2 focus-visible:ring-white/60 motion-reduce:!transition-none"
                style={{
                  width: open ? "var(--w)" : "var(--d)",
                  height: "var(--h)",
                  transition: `width 800ms ${EASE}`,
                }}
              >
                {/* 3D box: closed = spine faces front, open = cover faces front */}
                <span
                  className="absolute left-1/2 top-0 block [transform-style:preserve-3d] motion-reduce:!transition-none"
                  style={{
                    width: "var(--d)",
                    height: "var(--h)",
                    marginLeft: "calc(var(--d) / -2)",
                    transform: open
                      ? "translateZ(calc(var(--d) / -2 + 3cqw)) rotateY(-86deg)"
                      : "translateZ(calc(var(--w) / -2)) rotateY(0deg)",
                    transition: `transform 800ms ${EASE}`,
                  }}
                >
                  {/* Spine */}
                  <span
                    className="absolute inset-0 flex justify-center overflow-hidden"
                    style={{ ...face, transform: "translateZ(calc(var(--w) / 2))" }}
                  >
                    <span
                      className="pt-[2.6cqw] text-[1.95cqw] font-semibold leading-none tracking-tight whitespace-nowrap [writing-mode:vertical-rl]"
                    >
                      {item.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/25"
                    />
                  </span>

                  {/* Back of spine */}
                  <span
                    className="absolute inset-0"
                    style={{
                      ...face,
                      transform: "rotateY(180deg) translateZ(calc(var(--w) / 2))",
                    }}
                  />

                  {/* Front cover (right side of the box) */}
                  <span
                    className="absolute top-0 h-full overflow-hidden"
                    style={{
                      ...face,
                      width: "var(--w)",
                      left: "calc((var(--d) - var(--w)) / 2)",
                      transform: "rotateY(90deg) translateZ(calc(var(--d) / 2))",
                    }}
                  >
                    {item.cover ? (
                      <img
                        src={item.cover}
                        alt=""
                        draggable={false}
                        className="size-full object-cover"
                      />
                    ) : (
                      <span className="flex size-full flex-col justify-between p-[2.6cqw] text-left">
                        <span className="font-sans text-[4.4cqw] font-extrabold leading-[1.02] tracking-tight">
                          {item.fullTitle ?? item.title}
                        </span>
                        {item.author && (
                          <span className="text-[1.7cqw] opacity-75">
                            {item.author}
                          </span>
                        )}
                      </span>
                    )}
                    {/* Hinge shadow + sheen */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-white/10"
                    />
                  </span>

                  {/* Back cover (page block side) */}
                  <span
                    className="absolute top-0 h-full"
                    style={{
                      background: "#e9e6df",
                      backfaceVisibility: "hidden",
                      width: "var(--w)",
                      left: "calc((var(--d) - var(--w)) / 2)",
                      transform: "rotateY(-90deg) translateZ(calc(var(--d) / 2))",
                    }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BookShelf;