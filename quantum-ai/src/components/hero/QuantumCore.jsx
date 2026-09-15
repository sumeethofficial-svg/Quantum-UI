function QuantumCore() {
  return (
    <div
      className="
        core-wrap
        relative
        grid
        aspect-square
        w-[min(430px,88vw)]
        place-items-center
        isolate
      "
      role="img"
      aria-label="Animated quantum energy core with a stationary triangular center"
    >
      <div
        className="
          absolute
          inset-[13%]
          -z-10
          rounded-full
          bg-[radial-gradient(circle,rgba(196,247,255,0.19)_0_5%,rgba(77,216,255,0.14)_23%,rgba(77,216,255,0.05)_43%,transparent_69%)]
          blur-lg
          animate-core-pulse
        "
      />

      <div
        className="
          absolute
          inset-0
          -z-20
          rounded-full
          bg-[conic-gradient(from_25deg,transparent_0_7%,rgba(77,216,255,0.14)_8%,transparent_10%_24%,rgba(255,255,255,0.10)_25%,transparent_27%_45%,rgba(77,216,255,0.12)_46%,transparent_48%_74%,rgba(255,255,255,0.09)_75%,transparent_77%)]
          opacity-70
          [mask-image:radial-gradient(transparent_61%,#000_62%_64%,transparent_65%)]
          animate-spin-slow
        "
      />

      <svg
        className="h-full w-full overflow-visible drop-shadow-[0_0_10px_rgba(77,216,255,0.18)]"
        viewBox="0 0 500 500"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="metal"
            x1="130"
            y1="110"
            x2="370"
            y2="390"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#d9f9ff" />
            <stop offset=".26" stopColor="#4dd8ff" />
            <stop offset=".6" stopColor="#16394a" />
            <stop offset="1" stopColor="#b7f2ff" />
          </linearGradient>

          <radialGradient
            id="core"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(250 242) rotate(90) scale(104)"
          >
            <stop stopColor="white" />
            <stop offset=".16" stopColor="#dfffff" />
            <stop
              offset=".48"
              stopColor="#54daff"
              stopOpacity=".85"
            />
            <stop
              offset="1"
              stopColor="#0b3343"
              stopOpacity=".15"
            />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur
              stdDeviation="4"
              result="b"
            />

            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer ring */}
        <g
          className="origin-center animate-ring-a"
          stroke="url(#metal)"
        >
          <circle
            cx="250"
            cy="250"
            r="220"
            strokeWidth="1.5"
            strokeDasharray="2 11"
            opacity=".9"
          />

          <path
            d="M250 19v27M250 454v27M19 250h27M454 250h27M87 87l19 19M394 394l19 19M413 87l-19 19M106 394l-19 19"
            strokeWidth="4"
          />

          <path
            d="M250 28a222 222 0 0 1 146 55M472 250a222 222 0 0 1-55 146M250 472a222 222 0 0 1-146-55M28 250A222 222 0 0 1 83 104"
            strokeWidth="5"
            opacity=".65"
          />
        </g>

        {/* Second ring */}
        <g
          className="origin-center animate-ring-b"
          stroke="#63e1ff"
        >
          <circle
            cx="250"
            cy="250"
            r="190"
            strokeWidth="2"
            strokeDasharray="42 9 5 12"
            opacity=".65"
          />

          <circle
            cx="250"
            cy="250"
            r="176"
            strokeWidth="1"
            strokeDasharray="1 10"
            opacity=".8"
          />

          <path
            d="M250 58l8 19-8 19-8-19 8-19ZM442 250l-19 8-19-8 19-8 19 8ZM250 442l-8-19 8-19 8 19-8 19ZM58 250l19-8 19 8-19 8-19-8Z"
            fill="#baf0ff"
            stroke="none"
            filter="url(#glow)"
          />
        </g>

        {/* Third ring */}
        <g
          className="origin-center animate-ring-c"
          stroke="url(#metal)"
        >
          <circle
            cx="250"
            cy="250"
            r="151"
            strokeWidth="12"
            strokeDasharray="44 12 21 14"
            opacity=".48"
          />

          <circle
            cx="250"
            cy="250"
            r="137"
            strokeWidth="2"
            strokeDasharray="58 15"
            opacity=".9"
          />

          <path
            d="M250 97v28M403 250h-28M250 403v-28M97 250h28"
            strokeWidth="6"
          />
        </g>

        {/* Inner ring */}
        <g
          className="origin-center animate-ring-d"
          stroke="#a9efff"
        >
          <circle
            cx="250"
            cy="250"
            r="117"
            strokeWidth="2"
            strokeDasharray="3 8"
            opacity=".8"
          />

          <path
            d="M250 126l9 18M374 250l-18 9M250 374l-9-18M126 250l18-9"
            strokeWidth="3"
          />
        </g>

        {/* Energy core */}
        <g
          className="animate-energy"
          opacity=".9"
          filter="url(#glow)"
        >
          <circle
            cx="250"
            cy="250"
            r="102"
            fill="url(#core)"
          />

          <circle
            cx="250"
            cy="250"
            r="96"
            stroke="#84eaff"
            strokeWidth="2"
          />

          <circle
            cx="250"
            cy="250"
            r="83"
            stroke="#e5fbff"
            strokeWidth="1"
            opacity=".7"
          />
        </g>

        {/* Stationary center */}
        <g>
          <circle
            cx="250"
            cy="250"
            r="72"
            fill="#09151b"
            stroke="#bdf5ff"
            strokeWidth="3"
            filter="url(#glow)"
          />

          <path
            d="M250 183 310 286H190L250 183Z"
            fill="rgba(133,232,255,.18)"
            stroke="#efffff"
            strokeWidth="7"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          <path
            d="M250 206 289 273H211L250 206Z"
            fill="#c8f8ff"
            opacity=".9"
          />

          <path
            d="M250 219 278 267H222L250 219Z"
            fill="#0c3340"
          />

          <circle
            cx="250"
            cy="250"
            r="8"
            fill="white"
            filter="url(#glow)"
          />

          <path
            d="M174 250h36M290 250h36M250 174v36M250 290v36"
            stroke="#c2f6ff"
            strokeWidth="2"
            opacity=".75"
          />
        </g>
      </svg>
    </div>
  );
}

export default QuantumCore;