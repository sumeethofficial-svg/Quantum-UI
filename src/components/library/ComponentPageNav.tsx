import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_ITEMS = [
  { id: "overview", title: "Overview", depth: 2 },
  { id: "preview", title: "Preview", depth: 3 },
  { id: "installation", title: "Installation", depth: 2 },
  { id: "usage", title: "Usage", depth: 3 },
  { id: "props", title: "Props", depth: 2 },
];

const ROW_HEIGHT = 40;
const RAIL_WIDTH = 24;

function buildZigzagPath(items) {
  const points = items.map((_, index) => ({
    x: index % 2 === 0 ? 5 : 19,
    y: index * ROW_HEIGHT,
  }));

  points.push({
    x: items.length % 2 === 0 ? 5 : 19,
    y: items.length * ROW_HEIGHT,
  });

  return points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");
}

function ComponentPageNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  const path = useMemo(
    () => buildZigzagPath(DEFAULT_ITEMS),
    []
  );

  const totalHeight = DEFAULT_ITEMS.length * ROW_HEIGHT;

  const activeStartIndex = useMemo(() => {
    const activeItem = DEFAULT_ITEMS[activeIndex];

    if (!activeItem || activeItem.depth <= 2) {
      return activeIndex;
    }

    for (let index = activeIndex - 1; index >= 0; index--) {
      if (DEFAULT_ITEMS[index].depth < activeItem.depth) {
        return index;
      }
    }

    return activeIndex;
  }, [activeIndex]);

  const handleScroll = useCallback(() => {
    const container = document.querySelector(
      ".quantum-content-scroll"
    );

    if (!container) return;

    const activationLine =
      container.getBoundingClientRect().top + 120;

    const isAtBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 50;

    if (isAtBottom) {
      setActiveIndex(DEFAULT_ITEMS.length - 1);
      return;
    }

    let currentIndex = 0;

    for (let index = DEFAULT_ITEMS.length - 1; index >= 0; index--) {
      const section = document.getElementById(
        DEFAULT_ITEMS[index].id
      );

      if (
        section &&
        section.getBoundingClientRect().top <= activationLine
      ) {
        currentIndex = index;
        break;
      }
    }

    setActiveIndex(currentIndex);
  }, []);

  useEffect(() => {
    const container = document.querySelector(
      ".quantum-content-scroll"
    );

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

    container.addEventListener("scroll", onScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, [handleScroll]);

  const scrollToSection = useCallback((id) => {
    const container = document.querySelector(
      ".quantum-content-scroll"
    );

    const section = document.getElementById(id);

    if (!container || !section) return;

    const containerRect = container.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();

    const targetPosition =
      container.scrollTop +
      sectionRect.top -
      containerRect.top -
      32;

    container.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }, []);

  return (
    <aside
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
              <clipPath id="quantum-zigzag-active-clip">
                <rect
                  x="0"
                  y={activeStartIndex * ROW_HEIGHT}
                  width={RAIL_WIDTH}
                  height={
                    (activeIndex - activeStartIndex + 1) *
                    ROW_HEIGHT
                  }
                />
              </clipPath>
            </defs>

            <path
              d={path}
              clipPath="url(#quantum-zigzag-active-clip)"
              stroke="#4DD8FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter:
                  "drop-shadow(0 0 3px rgba(77,216,255,0.35))",
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
              top: activeIndex * ROW_HEIGHT + ROW_HEIGHT / 2 - 4,
            }}
          />

          {/* NAVIGATION LABELS */}
          <ul className="relative z-10 flex w-full flex-col">
            {DEFAULT_ITEMS.map((item, index) => {
              const isActive = index === activeIndex;

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
                      paddingInlineStart:
                        item.depth <= 2 ? 20 : 32,
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