import React from "react";

const technologies = [
  {
    name: "Next.js",
    image: "/images/nextjs.jpeg",
  },
  {
    name: "Tailwind CSS",
    image: "/images/tailwind.jpeg",
  },
  {
    name: "TypeScript",
    image: "/images/typescript.jpeg",
  },
  {
    name: "React",
    image: "/images/react.jpeg",
  },
];

function TechStack() {
  return (
    <section
      id="tech-stack"
      className="
        relative
        w-full
        overflow-hidden
        border-y
        border-white/[0.09]
        bg-black
      "
    >
      {/* =====================================================
          TITLE
      ===================================================== */}

      <div
        className="
          flex
          h-[72px]
          items-center
          justify-center
          border-b
          border-white/[0.09]
        "
      >
        <h2
          className="
            text-2xl
            font-medium
            tracking-[-0.04em]
            text-white
            sm:text-3xl
          "
        >
          Tech Stack
        </h2>
      </div>

      {/* =====================================================
          TECHNOLOGY GRID
      ===================================================== */}

      <div className="grid grid-cols-2 md:grid-cols-4">
        {technologies.map((technology, index) => (
          <div
            key={technology.name}
            className={`
              tech-stack-cell
              group
              relative
              flex
              h-[190px]
              items-center
              justify-center
              overflow-hidden
              bg-black
              transition-colors
              duration-500
              hover:bg-[#050507]

              ${index !== technologies.length - 1
                ? "border-r border-white/[0.09]"
                : ""}

              ${index >= 2
                ? "border-t border-white/[0.09] md:border-t-0"
                : ""}
            `}
          >
            {/* =================================================
                BACKGROUND GRID
            ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-0
                transition-opacity
                duration-700
                group-hover:opacity-100
                bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
                bg-[size:32px_32px]
              "
            />

            {/* =================================================
                AMBIENT GLOW
            ================================================= */}

            <div className="tech-ambient-glow" />

            {/* =================================================
                LIQUID FRAME
            ================================================= */}

            <div className="tech-liquid-ring" />

            <div className="tech-liquid-ring-inner" />

            {/* =================================================
                LOGO
            ================================================= */}

            <div
              className="
                relative
                z-20
                flex
                flex-col
                items-center
              "
            >
              <div className="tech-logo-wrapper">

                <img
                  src={technology.image}
                  alt={technology.name}
                  className="
                    tech-logo
                    relative
                    z-10
                    h-[108px]
                    w-[108px]
                    rounded-[20px]
                    object-contain
                  "
                />

                {/* Glass reflection */}

                <div className="tech-logo-reflection" />

              </div>

              {/* Technology name */}

              <span
                className="
                  mt-5
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-white/25
                  transition-all
                  duration-500
                  group-hover:text-white/70
                "
              >
                {technology.name}
              </span>
            </div>

            {/* =================================================
                BOTTOM LIGHT
            ================================================= */}

            <div className="tech-bottom-light" />

            {/* =================================================
                CORNER DETAILS
            ================================================= */}

            <span className="tech-corner tech-corner-tl" />
            <span className="tech-corner tech-corner-tr" />
            <span className="tech-corner tech-corner-bl" />
            <span className="tech-corner tech-corner-br" />
          </div>
        ))}
      </div>

      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>{`

        /* =====================================================
           CELL
        ===================================================== */

        .tech-stack-cell {
          isolation: isolate;
        }


        /* =====================================================
           AMBIENT GLOW
        ===================================================== */

        .tech-ambient-glow {
          pointer-events: none;

          position: absolute;

          left: 50%;
          top: 50%;

          width: 240px;
          height: 180px;

          transform:
            translate(-50%, -50%)
            scale(0.45);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(0, 160, 255, 0.11),
              rgba(120, 70, 255, 0.07),
              transparent 70%
            );

          filter: blur(38px);

          opacity: 0;

          transition:
            opacity 800ms ease,
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tech-stack-cell:hover .tech-ambient-glow {
          opacity: 1;

          transform:
            translate(-50%, -50%)
            scale(1.15);
        }


        /* =====================================================
           MAIN LIQUID FRAME
        ===================================================== */

        .tech-liquid-ring {
          pointer-events: none;

          position: absolute;

          left: 50%;
          top: 50%;

          width: 138px;
          height: 138px;

          transform:
            translate(-50%, -50%)
            scale(0.72);

          border-radius: 30px;

          background:
            conic-gradient(
              from 0deg,

              #006eff 0deg,

              #00d9ff 45deg,

              #6855ff 90deg,

              #c43cff 135deg,

              #ff3c9e 180deg,

              #ff672d 225deg,

              #ffe600 270deg,

              #4dffb5 315deg,

              #00d9ff 345deg,

              #006eff 360deg
            );

          padding: 3px;

          /*
           * Cut out the middle.
           * This leaves only the colorful liquid border.
           */

          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);

          -webkit-mask-composite: xor;

          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);

          mask-composite: exclude;

          opacity: 0.10;

          filter:
            saturate(1.4)
            blur(0.3px);

          animation:
            quantumLiquidFrame
            8s
            linear
            infinite;

          transition:
            opacity 700ms ease,
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
        }


        /* =====================================================
           LIQUID GLOW
        ===================================================== */

        .tech-liquid-ring::before {
          content: "";

          position: absolute;

          inset: -10px;

          border-radius: 38px;

          background:
            conic-gradient(
              from 45deg,

              #00d9ff,

              #6855ff,

              #ff3cac,

              #ff672d,

              #ffe600,

              #4dffb5,

              #00d9ff
            );

          filter: blur(17px);

          opacity: 0.32;

          z-index: -1;
        }


        /* =====================================================
           INNER LIQUID FRAME
        ===================================================== */

        .tech-liquid-ring-inner {
          pointer-events: none;

          position: absolute;

          left: 50%;
          top: 50%;

          width: 122px;
          height: 122px;

          transform:
            translate(-50%, -50%)
            scale(0.72);

          border-radius: 26px;

          background:
            conic-gradient(
              from 180deg,

              #00cfff,

              transparent 18%,

              #8b4dff,

              transparent 40%,

              #ff3b8d,

              transparent 62%,

              #ffe600,

              transparent 80%,

              #00ffb7
            );

          padding: 2px;

          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);

          -webkit-mask-composite: xor;

          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);

          mask-composite: exclude;

          opacity: 0;

          filter: blur(0.5px);

          animation:
            quantumLiquidInner
            6s
            linear
            infinite;

          transition:
            opacity 600ms ease,
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
        }


        /* =====================================================
           HOVER LIQUID
        ===================================================== */

        .tech-stack-cell:hover .tech-liquid-ring {
          opacity: 0.95;

          transform:
            translate(-50%, -50%)
            scale(1.02);
        }

        .tech-stack-cell:hover .tech-liquid-ring-inner {
          opacity: 0.60;

          transform:
            translate(-50%, -50%)
            scale(0.96);
        }


        /* =====================================================
           LOGO WRAPPER
        ===================================================== */

        .tech-logo-wrapper {
          position: relative;

          display: flex;

          align-items: center;
          justify-content: center;

          width: 114px;
          height: 114px;

          border-radius: 22px;

          transition:
            transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tech-stack-cell:hover .tech-logo-wrapper {
          transform:
            translateY(-4px)
            scale(1.06);
        }


        /* =====================================================
           LOGO
        ===================================================== */

        .tech-logo {
          object-fit: contain;

          opacity: 0.90;

          filter:
            saturate(0.92)
            brightness(0.94);

          transition:
            filter 700ms ease,
            opacity 500ms ease,
            transform 700ms cubic-bezier(0.16, 1, 0.3, 1);

          box-shadow:
            0 15px 35px rgba(0, 0, 0, 0.45);
        }

        .tech-stack-cell:hover .tech-logo {
          opacity: 1;

          filter:
            saturate(1.15)
            brightness(1.08)
            drop-shadow(
              0 0 18px
              rgba(255,255,255,0.10)
            );
        }


        /* =====================================================
           GLASS REFLECTION
        ===================================================== */

        .tech-logo-reflection {
          pointer-events: none;

          position: absolute;

          inset: 0;

          border-radius: 20px;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.13),
              transparent 35%,
              transparent 70%,
              rgba(255,255,255,0.03)
            );

          opacity: 0.45;

          transition:
            opacity 500ms ease;
        }

        .tech-stack-cell:hover .tech-logo-reflection {
          opacity: 0.80;
        }


        /* =====================================================
           BOTTOM LIGHT
        ===================================================== */

        .tech-bottom-light {
          pointer-events: none;

          position: absolute;

          bottom: 0;
          left: 50%;

          width: 180px;
          height: 1px;

          transform:
            translateX(-50%)
            scaleX(0);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.35),
              transparent
            );

          filter: blur(1px);

          opacity: 0;

          transition:
            transform 700ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 500ms ease;
        }

        .tech-stack-cell:hover .tech-bottom-light {
          transform:
            translateX(-50%)
            scaleX(1);

          opacity: 1;
        }


        /* =====================================================
           CORNER DETAILS
        ===================================================== */

        .tech-corner {
          pointer-events: none;

          position: absolute;

          width: 8px;
          height: 8px;

          opacity: 0;

          transition:
            opacity 400ms ease;
        }

        .tech-corner-tl {
          top: 13px;
          left: 13px;

          border-top: 1px solid rgba(255,255,255,0.30);
          border-left: 1px solid rgba(255,255,255,0.30);
        }

        .tech-corner-tr {
          top: 13px;
          right: 13px;

          border-top: 1px solid rgba(255,255,255,0.30);
          border-right: 1px solid rgba(255,255,255,0.30);
        }

        .tech-corner-bl {
          bottom: 13px;
          left: 13px;

          border-bottom: 1px solid rgba(255,255,255,0.30);
          border-left: 1px solid rgba(255,255,255,0.30);
        }

        .tech-corner-br {
          bottom: 13px;
          right: 13px;

          border-bottom: 1px solid rgba(255,255,255,0.30);
          border-right: 1px solid rgba(255,255,255,0.30);
        }

        .tech-stack-cell:hover .tech-corner {
          opacity: 1;
        }


        /* =====================================================
           ANIMATION
        ===================================================== */

        @keyframes quantumLiquidFrame {

          0% {
            transform:
              translate(-50%, -50%)
              scale(0.72)
              rotate(0deg);
          }

          25% {
            transform:
              translate(-50%, -50%)
              scale(0.75)
              rotate(90deg);
          }

          50% {
            transform:
              translate(-50%, -50%)
              scale(0.72)
              rotate(180deg);
          }

          75% {
            transform:
              translate(-50%, -50%)
              scale(0.75)
              rotate(270deg);
          }

          100% {
            transform:
              translate(-50%, -50%)
              scale(0.72)
              rotate(360deg);
          }
        }


        @keyframes quantumLiquidInner {

          0% {
            transform:
              translate(-50%, -50%)
              scale(0.72)
              rotate(360deg);
          }

          50% {
            transform:
              translate(-50%, -50%)
              scale(0.76)
              rotate(180deg);
          }

          100% {
            transform:
              translate(-50%, -50%)
              scale(0.72)
              rotate(0deg);
          }
        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 767px) {

          .tech-stack-cell {
            height: 170px;
          }

          .tech-logo {
            width: 82px;
            height: 82px;
          }

          .tech-logo-wrapper {
            width: 90px;
            height: 90px;
          }

          .tech-liquid-ring {
            width: 112px;
            height: 112px;
          }

          .tech-liquid-ring-inner {
            width: 100px;
            height: 100px;
          }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .tech-liquid-ring,
          .tech-liquid-ring-inner {
            animation: none;
          }

          .tech-stack-cell *,
          .tech-stack-cell {
            transition: none !important;
          }

        }

      `}</style>
    </section>
  );
}

export default TechStack;