import type { CSSProperties, ReactNode } from "react";

interface IsoButtonProps {
  /** Icon or logo shown in the circular badge on the top face. */
  icon?: ReactNode;
  /** Optional caption under the tile. */
  children?: ReactNode;
  /** Accessible name. Falls back to the caption when omitted. */
  label?: string;
  /** Side length of the square tile, in px. */
  size?: number;
  onClick?: () => void;
  className?: string;
}

/** Plates stacked to build the slab's side wall. */
const PLATES = 18;

function DefaultIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      className="size-[52%]"
      aria-hidden="true"
    >
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
    </svg>
  );
}

function IsoButton({
  icon,
  children,
  label,
  size = 150,
  onClick,
  className = "",
}: IsoButtonProps) {
  const plates = Array.from({ length: PLATES }, (_, i) => i);
  const top = PLATES - 1;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group inline-flex flex-col items-center gap-2 rounded-2xl p-2 outline-none ${className}`}
    >
      {/* Stage: leaves room for the tile to rise */}
      <span
        className="relative block"
        style={{ width: size * 1.6, height: size * 1.1 }}
      >
        {/* Lift on hover */}
        <span className="absolute inset-0 block transition-transform duration-500 ease-out group-hover:-translate-y-2 group-focus-visible:-translate-y-2 motion-reduce:transition-none">
          {/* Isometric scene. --t is the slab thickness. */}
          <span
            className="absolute left-1/2 top-1/2 block [--t:9px] group-hover:[--t:18px] group-focus-visible:[--t:18px] [transform-style:preserve-3d]"
            style={{
              width: size,
              height: size,
              transform: "translate(-50%, -50%) rotateX(60deg) rotateZ(-45deg)",
            }}
          >
            {/* Ground shadow */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-[18%] bg-black/90 blur-lg transition-opacity duration-500 group-hover:opacity-100"
              style={{ transform: "translateZ(-16px) scale(1.04)" }}
            />

            {plates.map((i) => {
              const isTop = i === top;
              const tone = 150 + i * 6; // gray at the base, near-white at the top edge

              const style: CSSProperties = {
                ["--i" as string]: i,
                transform: `translateZ(calc(var(--i) * var(--t) / ${top}))`,
              };

              return (
                <span
                  key={i}
                  aria-hidden={isTop ? undefined : "true"}
                  className={`absolute inset-0 rounded-[18%] border transition-transform duration-500 ease-out motion-reduce:transition-none ${
                    isTop
                      ? "flex items-center justify-center overflow-hidden border-white/20 bg-[#101010] group-hover:border-white/40"
                      : "border-white/[0.16] bg-[#0a0a0a]/70"
                  }`}
                  style={style}
                >
                  {isTop ? (
                    <>
                      {/* Fine mesh texture */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.10)_0.8px,transparent_1px)] [background-size:4px_4px]"
                      />
                      {/* Circular badge */}
                      <span className="relative flex size-[36%] items-center justify-center rounded-full bg-black text-white shadow-[0_0_0_1px_rgba(255,255,255,0.10)]">
                        {icon ?? <DefaultIcon />}
                      </span>
                    </>
                  ) : (
                    /* Lit wall: fades in on hover */
                    <span
                      aria-hidden="true"
                      className="absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                      style={{
                        background: `linear-gradient(to bottom, rgb(${tone},${tone},${tone}) 0%, rgb(${tone},${tone},${tone}) 55%, rgb(${Math.round(tone * 0.5)},${Math.round(tone * 0.5)},${Math.round(tone * 0.5)}) 100%)`,
                      }}
                    />
                  )}
                </span>
              );
            })}
          </span>
        </span>
      </span>

      {children != null && (
        <span className="font-mono text-xs tracking-wide text-slate-400 transition-colors duration-300 group-hover:text-white">
          {children}
        </span>
      )}
    </button>
  );
}

export default IsoButton;