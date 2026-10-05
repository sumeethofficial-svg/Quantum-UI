import React from "react";

/* ==========================================================
   STACK CUBE
   Exploding wireframe cube for the "Built with modern
   frameworks" cell.

   Four sides  -> Next.js, Tailwind, TypeScript, React
   Top         -> CLI prompt
   Bottom      -> plain wireframe

   Pure CSS 3D, no extra dependencies.
   Put this file at: src/components/sections/StackCube.jsx
========================================================== */

// Planes per face. The outermost plane carries the logo.
const LAYERS = 5;

const LOGOS = {
  next: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="qcube-next-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="98"
        height="98"
        rx="22"
        fill="#000"
        stroke="#2a2a2a"
        strokeWidth="2"
      />
      <path
        d="M33 72V28"
        stroke="#fff"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M33 28L68 74"
        stroke="url(#qcube-next-fade)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M68 28V50"
        stroke="url(#qcube-next-fade)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),

  tailwind: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <rect x="1" y="1" width="98" height="98" rx="22" fill="#1c1c1e" />
      <g transform="translate(15 29) scale(1.3)" fill="#2bb5b0">
        <path d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
      </g>
    </svg>
  ),

  ts: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <rect x="1" y="1" width="98" height="98" rx="14" fill="#3b5bb5" />
      <text
        x="92"
        y="90"
        textAnchor="end"
        fontFamily="Inter, 'Segoe UI', Arial, sans-serif"
        fontWeight="800"
        fontSize="62"
        fill="#e8e8e8"
        letterSpacing="-3"
      >
        TS
      </text>
    </svg>
  ),

  react: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <rect x="1" y="1" width="98" height="98" rx="22" fill="#1c1c1e" />
      <g fill="none" stroke="#2bb8e0" strokeWidth="3.6">
        <ellipse cx="50" cy="50" rx="36" ry="14" />
        <ellipse cx="50" cy="50" rx="36" ry="14" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="36" ry="14" transform="rotate(120 50 50)" />
      </g>
      <circle cx="50" cy="50" r="5.5" fill="#2bb8e0" />
    </svg>
  ),

  cli: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="98"
        height="98"
        rx="22"
        fill="#1c1c1e"
        stroke="#3a3a3c"
        strokeWidth="2"
      />
      <polyline
        points="28,34 52,50 28,66"
        fill="none"
        stroke="#f2f2f2"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="58"
        y1="68"
        x2="76"
        y2="68"
        stroke="#f2f2f2"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  ),
};

// Edit this list to change what sits on each face.
const FACES = [
  { side: "front", logo: "next" },
  { side: "right", logo: "tailwind" },
  { side: "back", logo: "ts" },
  { side: "left", logo: "react" },
  { side: "top", logo: "cli" },
  { side: "bottom", logo: null },
];

const CSS = `
  @property --qcube-spread {
    syntax: '<number>';
    inherits: true;
    initial-value: 0.05;
  }

  .qcube-scene {
    --s: clamp(100px, 12vw, 160px);
    --gap: calc(var(--s) * 0.095);
    --line: rgba(235, 235, 235, 0.85);
    display: grid;
    place-items: center;
    width: 100%;
    height: 400px;
    perspective: 1700px;
  }

  .qcube {
    position: relative;
    width: var(--s);
    height: var(--s);
    transform-style: preserve-3d;
    transform: rotateX(-24deg) rotateY(-35deg);
    animation:
      qcube-spin 18s linear infinite,
      qcube-breathe 7s cubic-bezier(.65, 0, .35, 1) infinite;
  }

  @keyframes qcube-spin {
    from { transform: rotateX(-24deg) rotateY(0deg); }
    to   { transform: rotateX(-24deg) rotateY(360deg); }
  }

  @keyframes qcube-breathe {
    0%, 100% { --qcube-spread: 0.05; }
    50%      { --qcube-spread: 1; }
  }

  .qcube-face {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
  }
  .qcube-face.front  { transform: rotateY(0deg); }
  .qcube-face.right  { transform: rotateY(90deg); }
  .qcube-face.back   { transform: rotateY(180deg); }
  .qcube-face.left   { transform: rotateY(-90deg); }
  .qcube-face.top    { transform: rotateX(90deg); }
  .qcube-face.bottom { transform: rotateX(-90deg); }

  .qcube-plane {
    position: absolute;
    inset: 0;
    box-sizing: border-box;
    border: 1.5px solid var(--line);
    background: #000;
    display: grid;
    place-items: center;
    transform: translateZ(
      calc(var(--s) / 2 + var(--i) * (0.7px + var(--gap) * var(--qcube-spread)))
    );
  }

  /* Logo plane is hidden from behind so logos never show mirrored */
  .qcube-plane.has-logo { backface-visibility: hidden; }

  .qcube-logo { width: 54%; aspect-ratio: 1; }
  .qcube-logo svg { width: 100%; height: 100%; display: block; }

  @media (prefers-reduced-motion: reduce) {
    .qcube { animation: none; --qcube-spread: 0.6; }
  }
`;

export default function StackCube() {
  return (
    <div
      className="qcube-scene"
      role="img"
      aria-label="Cube with Next.js, Tailwind CSS, TypeScript and React on its sides and a CLI prompt on top"
    >
      <style>{CSS}</style>

      <div className="qcube">
        {FACES.map(({ side, logo }) => (
          <div key={side} className={`qcube-face ${side}`}>
            {Array.from({ length: LAYERS }, (_, i) => {
              const isLogoPlane = logo && i === LAYERS - 1;

              return (
                <div
                  key={i}
                  className={`qcube-plane${isLogoPlane ? " has-logo" : ""}`}
                  style={{ "--i": i }}
                >
                  {isLogoPlane && (
                    <div className="qcube-logo">{LOGOS[logo]}</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}