import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const DEFAULT_ITEMS = [
  {
    id: "overview",
    title: "Overview",
    depth: 2,
  },
  {
    id: "preview",
    title: "Preview",
    depth: 3,
  },
  {
    id: "installation",
    title: "Installation",
    depth: 2,
  },
  {
    id: "usage",
    title: "Usage",
    depth: 3,
  },
  {
    id: "props",
    title: "Props",
    depth: 2,
  },
];

/* =========================================================
   PATH CONFIGURATION

   These values come directly from the reference concept.
========================================================= */

const railOffset = 8;
const rowHeight = 40;
const rowInset = 8;

const getLineOffset = (depth) => {
  return depth <= 2
    ? railOffset
    : railOffset * 2;
};

const getItemOffset = (depth) => {
  return depth <= 2 ? 20 : 32;
};

const getMotionDuration = (distance) => {
  return Math.min(
    900,
    Math.max(420, distance * 7)
  );
};

/* =========================================================
   BUILD SVG PATH
========================================================= */

function buildTocPath(items) {
  let width = 0;
  let d = "";

  const positions = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const x =
      getLineOffset(item.depth) + 0.5;

    const top =
      i * rowHeight + rowInset;

    const bottom =
      (i + 1) * rowHeight - rowInset;

    width = Math.max(
      x + 8,
      width
    );

    if (i === 0) {
      d += ` M${x} ${top} L${x} ${bottom}`;
    } else {
      const previous =
        positions[i - 1];

      const previousBottom =
        previous[1];

      const previousX =
        previous[2];

      /*
       * Curved transition between
       * parent and child depth.
       */
      d += `
        C
        ${previousX} ${top - 4}
        ${x} ${previousBottom + 4}
        ${x} ${top}
        L${x} ${bottom}
      `;
    }

    positions.push([
      top,
      bottom,
      x,
    ]);
  }

  return {
    d,
    height:
      items.length * rowHeight,
    positions,
    width,
  };
}

/* =========================================================
   READ CSS VARIABLE
========================================================= */

function getCssNumber(
  element,
  property
) {
  const value =
    parseFloat(
      element.style.getPropertyValue(
        property
      )
    );

  return Number.isFinite(value)
    ? value
    : null;
}

/* =========================================================
   TOC ITEM
========================================================= */

function TOCItem({
  item,
  active,
  onClick,
}) {
  return (
    <li className="relative z-0 h-10">
      <button
        type="button"
        onClick={() =>
          onClick(item.id)
        }
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
          ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            active
              ? "text-cyan-100"
              : "text-slate-500 hover:text-slate-200"
          }
        `}
        style={{
          paddingInlineStart:
            getItemOffset(
              item.depth
            ),
        }}
      >
        {item.title}
      </button>
    </li>
  );
}

/* =========================================================
   ACTIVE SVG PATH
========================================================= */

function ActiveTocPath({
  activeEndIndex,
  activeStartIndex,
  computed,
}) {
  const ref =
    useRef(null);

  const previousRef =
    useRef(null);

  const itemLineLengthsRef =
    useRef([]);

  const activeStartPosition =
    computed.positions[
      activeStartIndex
    ];

  const activeEndPosition =
    computed.positions[
      activeEndIndex
    ];

  /* -------------------------------------------------------
     Calculate animated position
  ------------------------------------------------------- */

  const updateThumb =
    useCallback(() => {
      const element =
        ref.current;

      const itemLineLengths =
        itemLineLengthsRef.current;

      const startLength =
        itemLineLengths[
          activeStartIndex
        ];

      const endLength =
        itemLineLengths[
          activeEndIndex
        ];

      const start =
        computed.positions[
          activeStartIndex
        ];

      const end =
        computed.positions[
          activeEndIndex
        ];

      if (
        !element ||
        !start ||
        !end ||
        !startLength ||
        !endLength
      ) {
        return;
      }

      let isUp =
        activeEndIndex === 0;

      /*
       * Determine movement direction.
       *
       * This is what allows the particle
       * to animate naturally both up and down.
       */
      if (previousRef.current) {
        const previous =
          previousRef.current;

        isUp =
          previous.startIndex >
            activeStartIndex ||
          previous.endIndex >
            activeEndIndex ||
          (
            previous.startIndex ===
              activeStartIndex &&
            previous.endIndex ===
              activeEndIndex &&
            previous.isUp
          );
      }

      previousRef.current = {
        endIndex:
          activeEndIndex,
        startIndex:
          activeStartIndex,
        isUp,
      };

      const nextTrackTop =
        start[0];

      const nextTrackBottom =
        end[1];

      const nextOffsetDistance =
        isUp
          ? startLength[0]
          : endLength[1];

      const previousTrackTop =
        getCssNumber(
          element,
          "--track-top"
        ) ??
        nextTrackTop;

      const previousTrackBottom =
        getCssNumber(
          element,
          "--track-bottom"
        ) ??
        nextTrackBottom;

      const previousOffsetDistance =
        getCssNumber(
          element,
          "--offset-distance"
        ) ??
        nextOffsetDistance;

      const distance =
        Math.max(
          Math.abs(
            previousTrackTop -
              nextTrackTop
          ),
          Math.abs(
            previousTrackBottom -
              nextTrackBottom
          ),
          Math.abs(
            previousOffsetDistance -
              nextOffsetDistance
          )
        );

      const duration =
        getMotionDuration(
          distance
        );

      element.style.setProperty(
        "--toc-duration",
        `${duration}ms`
      );

      element.style.setProperty(
        "--track-top",
        `${nextTrackTop}px`
      );

      element.style.setProperty(
        "--track-bottom",
        `${nextTrackBottom}px`
      );

      element.style.setProperty(
        "--offset-distance",
        `${nextOffsetDistance}px`
      );

      element.style.setProperty(
        "--opacity",
        "1"
      );
    }, [
      activeEndIndex,
      activeStartIndex,
      computed.positions,
    ]);

  /* -------------------------------------------------------
     Calculate path lengths
  ------------------------------------------------------- */

  useEffect(() => {
    const path =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

    path.setAttribute(
      "d",
      computed.d
    );

    const pathLength =
      path.getTotalLength();

    const lengths = [];

    for (
      let i = 0;
      i < computed.positions.length;
      i++
    ) {
      const [
        top,
        bottom,
      ] =
        computed.positions[i];

      let length =
        i > 0
          ? lengths[i - 1][1] +
            (
              top -
              computed.positions[
                i - 1
              ][1]
            )
          : 0;

      while (
        length <
          pathLength &&
        path.getPointAtLength(
          length
        ).y < top
      ) {
        length++;
      }

      lengths.push([
        length,
        length + bottom - top,
      ]);
    }

    itemLineLengthsRef.current =
      lengths;

    updateThumb();
  }, [
    computed.d,
    computed.positions,
    updateThumb,
  ]);

  useEffect(() => {
    updateThumb();
  }, [updateThumb]);

  if (
    !activeStartPosition ||
    !activeEndPosition
  ) {
    return null;
  }

  const [
    top,
  ] = activeStartPosition;

  const [
    ,
    bottom,
  ] = activeEndPosition;

  const initialStyle = {
    "--offset-distance":
      "0px",
    "--opacity":
      "0",
    "--toc-duration":
      "520ms",
    "--track-bottom":
      `${bottom}px`,
    "--track-top":
      `${top}px`,
    height:
      computed.height,
    width:
      computed.width,
  };

  return (
    <div
      ref={ref}
      className="
        pointer-events-none
        absolute
        left-0
        top-0
        z-10
      "
      style={initialStyle}
    >
      {/* =====================================================
          BASE PATH
      ===================================================== */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        viewBox={`0 0 ${computed.width} ${computed.height}`}
        style={{
          height:
            computed.height,
          width:
            computed.width,
        }}
      >
        <path
          d={computed.d}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeLinecap="butt"
          strokeWidth="1.15"
        />
      </svg>

      {/* =====================================================
          ACTIVE PATH
      ===================================================== */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="
          absolute
          transition-[clip-path]
          ease-[cubic-bezier(0.16,1,0.3,1)]
        "
        viewBox={`0 0 ${computed.width} ${computed.height}`}
        style={{
          clipPath:
            "polygon(" +
            "0 var(--track-top, 0px), " +
            "100% var(--track-top, 0px), " +
            "100% var(--track-bottom, 0px), " +
            "0 var(--track-bottom, 0px)" +
            ")",
          height:
            computed.height,
          width:
            computed.width,
          transitionDuration:
            "var(--toc-duration)",
        }}
      >
        <path
          d={computed.d}
          fill="none"
          stroke="rgba(77,216,255,0.95)"
          strokeLinecap="butt"
          strokeWidth="1.25"
        />
      </svg>

      {/* =====================================================
          MOVING GLOWING PARTICLE
      ===================================================== */}

      <div
        className="
          absolute
          left-0
          size-2
          rounded-full
          bg-cyan-300
          shadow-[0_0_7px_2px_rgba(77,216,255,0.85),0_0_18px_5px_rgba(77,216,255,0.30)]
          transition-[opacity,offset-distance]
          ease-[cubic-bezier(0.16,1,0.3,1)]
        "
        style={{
          opacity:
            "var(--opacity,0)",

          offsetPath:
            `path("${computed.d}")`,

          offsetAnchor:
            "50% 50%",

          offsetDistance:
            "var(--offset-distance,0px)",

          offsetRotate:
            "0deg",

          transitionDuration:
            "var(--toc-duration)",
        }}
      />
    </div>
  );
}

/* =========================================================
   FIND PARENT SECTION
========================================================= */

function getActiveStartIndex(
  items,
  activeIndex
) {
  const active =
    items[activeIndex];

  if (
    !active ||
    active.depth <= 2
  ) {
    return activeIndex;
  }

  for (
    let i =
      activeIndex - 1;
    i >= 0;
    i--
  ) {
    if (
      items[i].depth <
      active.depth
    ) {
      return i;
    }
  }

  return activeIndex;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

function ComponentPageNav() {
  const items =
    DEFAULT_ITEMS;

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const computed =
    useMemo(
      () =>
        buildTocPath(
          items
        ),
      []
    );

  const activeStartIndex =
    getActiveStartIndex(
      items,
      activeIndex
    );

  const lastIndexRef =
    useRef(0);

  /* =======================================================
     INTERNAL CENTER SCROLL
  ======================================================= */

  const handleScroll =
    useCallback(() => {
      const scrollContainer =
        document.querySelector(
          ".quantum-content-scroll"
        );

      if (!scrollContainer) {
        return;
      }

      const containerTop =
        scrollContainer.getBoundingClientRect()
          .top;

      /*
       * Reading line.
       *
       * This determines when a section
       * becomes active.
       */
      const activationLine =
        containerTop + 120;

      let currentIndex = 0;

      /*
       * Bottom of content.
       */
      const isAtBottom =
        scrollContainer.scrollTop +
          scrollContainer.clientHeight >=
        scrollContainer.scrollHeight -
          50;

      if (isAtBottom) {
        currentIndex =
          items.length - 1;
      } else {
        /*
         * Walk backwards so the last section
         * above the reading line wins.
         */
        for (
          let i =
            items.length - 1;
          i >= 0;
          i--
        ) {
          const element =
            document.getElementById(
              items[i].id
            );

          if (!element) {
            continue;
          }

          const top =
            element.getBoundingClientRect()
              .top;

          if (
            top <=
            activationLine
          ) {
            currentIndex = i;
            break;
          }
        }
      }

      if (
        lastIndexRef.current !==
        currentIndex
      ) {
        lastIndexRef.current =
          currentIndex;

        setActiveIndex(
          currentIndex
        );
      }
    }, [items]);

  /* =======================================================
     SCROLL LISTENER
  ======================================================= */

  useEffect(() => {
    const scrollContainer =
      document.querySelector(
        ".quantum-content-scroll"
      );

    if (!scrollContainer) {
      return undefined;
    }

    let ticking = false;

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    };

    scrollContainer.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    handleScroll();

    return () => {
      scrollContainer.removeEventListener(
        "scroll",
        onScroll
      );
    };
  }, [handleScroll]);

  /* =======================================================
     CLICK NAVIGATION
  ======================================================= */

  const scrollToSection =
    (id) => {
      const scrollContainer =
        document.querySelector(
          ".quantum-content-scroll"
        );

      const element =
        document.getElementById(
          id
        );

      if (
        !scrollContainer ||
        !element
      ) {
        return;
      }

      const containerRect =
        scrollContainer.getBoundingClientRect();

      const elementRect =
        element.getBoundingClientRect();

      const targetPosition =
        scrollContainer.scrollTop +
        (
          elementRect.top -
          containerRect.top
        ) -
        32;

      scrollContainer.scrollTo({
        top:
          targetPosition,
        behavior:
          "smooth",
      });
    };

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
      <div
        className="
          relative
          h-full
          px-5
          pt-10
        "
      >
        {/* ===================================================
            TITLE
        =================================================== */}

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

        {/* ===================================================
            TOC
        =================================================== */}

        <div className="relative ml-1">

          <ActiveTocPath
            activeEndIndex={
              activeIndex
            }
            activeStartIndex={
              activeStartIndex
            }
            computed={
              computed
            }
          />

          <ul
            className="
              relative
              z-0
              flex
              w-full
              flex-col
            "
          >
            {items.map(
              (item, index) => (
                <TOCItem
                  key={
                    item.id
                  }
                  item={
                    item
                  }
                  active={
                    index >=
                      activeStartIndex &&
                    index <=
                      activeIndex
                  }
                  onClick={
                    scrollToSection
                  }
                />
              )
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default ComponentPageNav;