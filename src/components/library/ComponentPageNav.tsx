import { useCallback, useEffect, useId, useMemo, useState } from "react";

export interface PageNavItem {
  /** Must match the `id` of a heading/section element on the page. */
  id: string;
  title: string;
  /** 2 = top level (default), 3 = nested/indented. */
  depth?: number;
}

interface PageNavProps {
  /** Sections to show. Omit to get the default component-page sections. */
  items?: PageNavItem[];
  /** CSS selector of the scrolling container that holds the sections. */
  scrollSelector?: string;
}

const DEFAULT_ITEMS: PageNavItem[] = [
  { id: "overview", title: "Overview", depth: 2 },
  { id: "preview", title: "Preview", depth: 3 },
  { id: "installation", title: "Installation", depth: 2 },
  { id: "usage", title: "Usage", depth: 3 },
  { id: "props", title: "Props", depth: 2 },
];

const SCROLL_SELECTOR = ".quantum-content-scroll";
const ROW_HEIGHT = 40;
const RAIL_WIDTH = 24;

type Point = { x: number; y: number };

function buildZigzagPath(count: number): string {
  const points: Point[] = Array.from({ length: count }, (_, index) => ({
    x: index % 2 === 0 ? 5 : 19,
    y: index * ROW_HEIGHT,
  }));

  points.push({
    x: count % 2 === 0 ? 5 : 19,
    y: count * ROW_HEIGHT,
  });

  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}

function ComponentPageNav({
  items = DEFAULT_ITEMS,
  scrollSelector = SCROLL_SELECTOR,
}: PageNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // useId can contain ":" which is awkward inside url(#...), so strip it.
  const clipId = `quantum-zigzag-${useId().replace(/:/g, "")}`;

  const depthOf = (item: PageNavItem) => item.depth ?? 2;

  const path = useMemo(() => buildZigzagPath(items.length), [items.length]);
  const totalHeight = items.length * ROW_HEIGHT;

  // Items can change when the user switches pages, so never trust a stale index.
  const safeIndex = Math.min(activeIndex, Math.max(items.length - 1, 0));

  const activeStartIndex = useMemo(() => {
    const activeItem = items[safeIndex];

    if (!activeItem || depthOf(activeItem) <= 2) {
      return safeIndex;
    }

    for (let index = safeIndex - 1; index >= 0; index--) {
      if (depthOf(items[index]) < depthOf(activeItem)) {
        return index;
      }
    }

    return safeIndex;
  }, [items, safeIndex]);

  const handleScroll = useCallback(() => {
    const container = document.querySelector<HTMLElement>(scrollSelector);

    if (!container || items.length === 0) return;

    const activationLine = container.getBoundingClientRect().top + 120;

    const isAtBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 50;

    // Only snap to the last item if the page can actually scroll.
    const canScroll = container.scrollHeight > container.clientHeight + 50;

    if (isAtBottom && canScroll) {
      setActiveIndex(items.length - 1);
      return;
    }

    let currentIndex = 0;

    for (let index = items.length - 1; index >= 0; index--) {
      const section = document.getElementById(items[index].id);

      if (section && section.getBoundingClientRect().top <= activationLine) {
        currentIndex = index;
        break;
      }
    }

    setActiveIndex(currentIndex);
  }, [items, scrollSelector]);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>(scrollSelector);

    if (!container) return undefined;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    // Sync once for the new page's sections.
    handleScroll();

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, [handleScroll, scrollSelector]);

  const scrollToSection = useCallback(
    (id: string) => {
      const container = document.querySelector<HTMLElement>(scrollSelector);
      const section = document.getElementById(id);

      if (!container || !section) return;

      const containerRect = container.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();

      container.scrollTo({
        top: container.scrollTop + sectionRect.top - containerRect.top - 32,
        behavior: "smooth",
      });
    },
    [scrollSelector],
  );

  if (items.length === 0) return null;

  return (
    <aside
      aria-label="On this page"
      className="
        hidden
        h-full
        min-h-0
        overflow-hidden
        border-l
        border-white/[0.08]
        bg-black/10
        xl:block
      "
    >
      <div className="relative h-full px-5 pt-10">
        {/* SIDEBAR HEADING */}
        <div className="mb-5 px-1">
          <span
            className="
              font-mono
              text-[10px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-slate-500
            "
          >
            On this page
          </span>
        </div>

        {/* ZIGZAG NAVIGATION */}
        <div className="relative ml-1">
          {/* BASE ZIGZAG */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 overflow-visible"
            width={RAIL_WIDTH}
            height={totalHeight}
            viewBox={`0 0 ${RAIL_WIDTH} ${totalHeight}`}
            fill="none"
          >
            <path
              d={path}
              stroke="rgba(148,163,184,0.20)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* ACTIVE BLUE ZIGZAG */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 overflow-visible"
            width={RAIL_WIDTH}
            height={totalHeight}
            viewBox={`0 0 ${RAIL_WIDTH} ${totalHeight}`}
            fill="none"
          >
            <defs>
              <clipPath id={clipId}>
                <rect
                  x="0"
                  y={activeStartIndex * ROW_HEIGHT}
                  width={RAIL_WIDTH}
                  height={(safeIndex - activeStartIndex + 1) * ROW_HEIGHT}
                />
              </clipPath>
            </defs>

            <path
              d={path}
              clipPath={`url(#${clipId})`}
              stroke="#4DD8FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 0 3px rgba(77,216,255,0.35))",
                transition: "opacity 200ms ease",
              }}
            />
          </svg>

          {/* BLUE ACTIVE INDICATOR */}
          <div
            className="
              pointer-events-none
              absolute
              z-20
              size-2
              rounded-full
              bg-cyan-300
              shadow-[0_0_7px_2px_rgba(77,216,255,0.85),0_0_18px_5px_rgba(77,216,255,0.30)]
              transition-[top,left]
              duration-500
              ease-out
            "
            style={{
              left: 8,
              top: safeIndex * ROW_HEIGHT + ROW_HEIGHT / 2 - 4,
            }}
          />

          {/* NAVIGATION LABELS */}
          <ul className="relative z-10 flex w-full flex-col">
            {items.map((item, index) => {
              const isActive = index === safeIndex;

              return (
                <li key={item.id} className="relative h-10">
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`
                      flex
                      h-full
                      w-full
                      cursor-pointer
                      items-center
                      truncate
                      text-left
                      text-[13px]
                      font-medium
                      leading-none
                      transition-colors
                      duration-300
                      ease-out
                      ${
                        isActive
                          ? "text-cyan-100"
                          : "text-slate-500 hover:text-slate-200"
                      }
                    `}
                    style={{
                      paddingInlineStart: depthOf(item) <= 2 ? 20 : 32,
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default ComponentPageNav;