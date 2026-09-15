import { useState } from "react";
import { getComponent } from "../../data/components";

import ComponentSidebar from "./ComponentSidebar";
import ComponentPreview from "./ComponentPreview";
import ComponentCode from "./ComponentCode";
import ComponentDocumentation from "./ComponentDocumentation";
import ComponentPageNav from "./ComponentPageNav";

function ComponentLibrary({ onClose }) {
  const [activeComponent, setActiveComponent] =
    useState("Photon Button");

  const [showCode, setShowCode] = useState(false);

  const component = getComponent(activeComponent);

  return (
    <section className="h-screen overflow-hidden bg-gradient-to-br from-[#08090c] via-[#071016] to-[#08090c]">

      <div className="grid h-full min-h-0 md:grid-cols-[276px_minmax(0,1fr)] xl:grid-cols-[276px_minmax(0,1fr)_218px]">

        {/* =====================================================
            LEFT — COMPONENT INDEX
        ===================================================== */}

        <ComponentSidebar
          activeComponent={activeComponent}
          onSelectComponent={(name) => {
            setActiveComponent(name);
            setShowCode(false);
          }}
          onClose={onClose}
        />

        {/* =====================================================
            CENTER — ONLY SCROLLABLE REGION
        ===================================================== */}

        <main
          className="
            quantum-content-scroll
            relative
            h-full
            min-h-0
            w-full
            overflow-x-hidden
            overflow-y-auto
            px-[18px]
            py-7
            md:px-[30px]
            md:py-[38px]
            xl:px-[50px]
            xl:py-[43px]
          "
        >

          {/* =================================================
              OVERVIEW
          ================================================= */}

          <div
            id="overview"
            className="scroll-mt-8"
          >
            <div className="font-mono text-xs text-slate-600">
              COMPONENTS / INTERACTIONS /{" "}
              <span className="text-cyan-100">
                {component.name.toUpperCase()}
              </span>
            </div>

            <div className="my-4 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">

              <div>
                <h2 className="m-0 text-[30px] font-semibold tracking-[-0.035em] md:text-[38px]">
                  {component.name}
                </h2>

                <p className="mt-2 text-sm text-slate-400 md:text-[15px]">
                  {component.description}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/[0.19] px-2.5 py-1.5 font-mono text-[10px] text-cyan-100">
                <span className="h-[5px] w-[5px] rounded-full bg-cyan-100 shadow-[0_0_6px_2px_rgba(77,216,255,0.35)]" />

                STABLE · v2.4
              </div>
            </div>
          </div>

          {/* =================================================
              PREVIEW / CODE SWITCH
          ================================================= */}

          <div className="mb-3 flex w-fit gap-1 rounded-lg border border-white/[0.08] bg-[#0b0d11] p-1">

            <button
              type="button"
              onClick={() => setShowCode(false)}
              className={`
                rounded-md
                px-3
                py-1.5
                font-mono
                text-xs
                transition-all
                ${
                  !showCode
                    ? "bg-[#202a30] text-cyan-100"
                    : "text-slate-600 hover:text-slate-300"
                }
              `}
            >
              ◫ Preview
            </button>

            <button
              type="button"
              onClick={() => setShowCode(true)}
              className={`
                rounded-md
                px-3
                py-1.5
                font-mono
                text-xs
                transition-all
                ${
                  showCode
                    ? "bg-[#202a30] text-cyan-100"
                    : "text-slate-600 hover:text-slate-300"
                }
              `}
            >
              ›_ Code
            </button>

          </div>

          {/* =================================================
              PREVIEW / CODE
          ================================================= */}

          {showCode ? (
            <div
              id="code"
              className="scroll-mt-8"
            >
              <ComponentCode
                component={component}
              />
            </div>
          ) : (
            <ComponentPreview
              component={component}
            />
          )}

          {/* =================================================
              DOCUMENTATION
          ================================================= */}

          <ComponentDocumentation
            component={component}
          />

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="mt-9 pb-12 font-mono text-[11px] text-slate-600">
            73 components · React / Next.js · zero visual dependencies
          </div>

        </main>

        {/* =====================================================
            RIGHT — QUANTUM SIGNAL RAIL
        ===================================================== */}

        <ComponentPageNav />

      </div>
    </section>
  );
}

export default ComponentLibrary;