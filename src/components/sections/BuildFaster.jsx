import React from "react";

function BuildFaster() {
  return (
    <section
      id="build-with-quantum"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "620px",
        overflow: "hidden",
        backgroundColor: "#000000",
        color: "#ffffff",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.25,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Main container */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: "1500px",
          minHeight: "620px",
          margin: "0 auto",
        }}
      >
        {/* =====================================================
            LEFT
        ===================================================== */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 70px",
            borderRight: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Label */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "1px",
                background: "rgba(255,255,255,0.35)",
              }}
            />

            <span
              style={{
                fontSize: "10px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              QUANTUM SYSTEM
            </span>
          </div>

          {/* Heading */}

          <h2
            style={{
              margin: 0,
              fontSize: "clamp(44px, 5vw, 72px)",
              lineHeight: 0.95,
              letterSpacing: "-0.055em",
              fontWeight: 500,
            }}
          >
            Build with
            <br />

            <span
              style={{
                color: "rgba(255,255,255,0.32)",
              }}
            >
              Quantum UI.
            </span>
          </h2>

          {/* Description */}

          <p
            style={{
              maxWidth: "540px",
              marginTop: "30px",
              marginBottom: 0,
              fontSize: "15px",
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.40)",
            }}
          >
            Build distinctive interfaces using carefully engineered
            components, motion systems and layouts designed to work
            together from the start.
          </p>

          {/* Technology */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "28px",
            }}
          >
            {["React", "Next.js", "TypeScript", "Tailwind"].map(
              (item) => (
                <span
                  key={item}
                  style={{
                    padding: "7px 13px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.025)",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.40)",
                    fontFamily: "monospace",
                  }}
                >
                  {item}
                </span>
              )
            )}
          </div>

          {/* Buttons */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "38px",
            }}
          >
            <a
              href="/components"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 22px",
                borderRadius: "999px",
                background: "#ffffff",
                color: "#000000",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Explore Components
              <span>→</span>
            </a>

            <a
              href="https://github.com/sumeethofficial-svg/Quantum-UI"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 20px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.02)",
                color: "rgba(255,255,255,0.50)",
                textDecoration: "none",
                fontSize: "13px",
              }}
            >
              GitHub
              <span>↗</span>
            </a>
          </div>

          {/* Status */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginTop: "38px",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.20)",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.65)",
              }}
            />

            Quantum system ready
          </div>
        </div>

        {/* =====================================================
            RIGHT VISUAL
        ===================================================== */}

        <div
          style={{
            position: "relative",
            minHeight: "620px",
          }}
        >
          {/* Horizontal line */}

          <div
            style={{
              position: "absolute",
              left: "12%",
              right: "12%",
              top: "50%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
            }}
          />

          {/* Vertical line */}

          <div
            style={{
              position: "absolute",
              top: "15%",
              bottom: "15%",
              left: "50%",
              width: "1px",
              background:
                "linear-gradient(transparent, rgba(255,255,255,0.18), transparent)",
            }}
          />

          {/* =================================================
              TOP LEFT
          ================================================= */}

          <SystemNode
            number="01"
            title="Components"
            description="Precision primitives"
            symbol="◇"
            style={{
              position: "absolute",
              left: "7%",
              top: "13%",
            }}
          />

          {/* =================================================
              TOP RIGHT
          ================================================= */}

          <SystemNode
            number="02"
            title="Motion"
            description="Fluid interactions"
            symbol="◌"
            style={{
              position: "absolute",
              right: "7%",
              top: "13%",
            }}
          />

          {/* =================================================
              BOTTOM LEFT
          ================================================= */}

          <SystemNode
            number="03"
            title="Composition"
            description="Systematic layouts"
            symbol="⌘"
            style={{
              position: "absolute",
              left: "7%",
              bottom: "13%",
            }}
          />

          {/* =================================================
              BOTTOM RIGHT
          ================================================= */}

          <SystemNode
            number="04"
            title="Production"
            description="Ready to ship"
            symbol="↗"
            style={{
              position: "absolute",
              right: "7%",
              bottom: "13%",
            }}
          />

          {/* =================================================
              CENTER QUANTUM CORE
          ================================================= */}

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "190px",
              height: "190px",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Outer ring */}

            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "1px dashed rgba(255,255,255,0.15)",
              }}
            />

            {/* Middle ring */}

            <div
              style={{
                position: "absolute",
                inset: "20px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            />

            {/* Inner ring */}

            <div
              style={{
                position: "absolute",
                inset: "38px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />

            {/* Core */}

            <div
              style={{
                position: "relative",
                width: "112px",
                height: "112px",
                borderRadius: "28px",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(0,0,0,0.92)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
              }}
            >
              {/* Quantum symbol */}

              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    boxShadow:
                      "0 0 22px rgba(255,255,255,0.8)",
                  }}
                />
              </div>

              {/* Label */}

              <span
                style={{
                  position: "absolute",
                  bottom: "-35px",
                  whiteSpace: "nowrap",
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.30)",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}
              >
                Quantum Core
              </span>
            </div>
          </div>

          {/* Small connection points */}

          <span
            style={{
              position: "absolute",
              left: "19%",
              top: "50%",
              width: "6px",
              height: "6px",
              transform: "translateY(-50%)",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.55)",
            }}
          />

          <span
            style={{
              position: "absolute",
              right: "19%",
              top: "50%",
              width: "6px",
              height: "6px",
              transform: "translateY(-50%)",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.55)",
            }}
          />

          {/* Bottom label */}

          <span
            style={{
              position: "absolute",
              bottom: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              fontSize: "8px",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.16)",
              fontFamily: "monospace",
            }}
          >
            COMPONENT SYSTEM / READY
          </span>
        </div>
      </div>

      {/* Mobile */}
      <style>{`
        @media (max-width: 900px) {
          #build-with-quantum > div:nth-child(4) {
            grid-template-columns: 1fr !important;
          }

          #build-with-quantum > div:nth-child(4) > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
        }
      `}</style>
    </section>
  );
}


/* ============================================================
   SYSTEM NODE
============================================================ */

function SystemNode({
  number,
  title,
  description,
  symbol,
  style,
}) {
  return (
    <div
      style={{
        ...style,
        width: "155px",
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(0,0,0,0.85)",
        boxSizing: "border-box",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Number */}

      <span
        style={{
          position: "absolute",
          top: "7px",
          right: "8px",
          fontSize: "7px",
          color: "rgba(255,255,255,0.18)",
          fontFamily: "monospace",
        }}
      >
        {number}
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* Symbol */}

        <div
          style={{
            width: "36px",
            height: "36px",
            flexShrink: 0,
            borderRadius: "9px",
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.035)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {symbol}
        </div>

        {/* Text */}

        <div>
          <div
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.75)",
              fontWeight: 500,
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: "4px",
              fontSize: "7px",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildFaster;