
import { useState } from "react";
import { allComponents, getComponent } from "../../data/components";

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
    <section className="h-[calc(100dvh-54px)] min-h-0 overflow-hidden bg-black text-white">
      <div className="grid h-full min-h-0 md:grid-cols-[276px_minmax(0,1fr)] xl:grid-cols-[276px_minmax(0,1fr)_218px]">
        {/* LEFT — COMPONENT INDEX */}
        <ComponentSidebar
          activeComponent={activeComponent}
          onSelectComponent={(name) => {
            setActiveComponent(name);
            setShowCode(false);
          }}
          onClose={onClose}
        />

        {/* CENTER — SCROLLABLE CONTENT */}
        <main
          className="
            quantum-content-scroll
            relative
            h-full
            min-h-0
            w-full
            overflow-x-hidden
            overflow-y-auto
            bg-black
            px-[18px]
            py-7
            md:px-[30px]
            md:py-[38px]
            xl:px-[50px]
            xl:py-[43px]
          "
        >
          {/* OVERVIEW */}
          <div id="overview" className="scroll-mt-8">
            <div className="font-mono text-xs text-slate-600">
              COMPONENTS / INTERACTIONS /{" "}
              <span className="text-white/80">
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

              {/* STATUS BADGE */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.025] px-2.5 py-1.5 font-mono text-[10px] text-white/75">
                <span className="h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_7px_2px_rgba(255,255,255,0.22)]" />
                STABLE · v2.4
              </div>
            </div>
          </div>

          {/* PREVIEW / CODE SWITCH */}
          <div className="mb-3 flex w-fit gap-1 rounded-xl border border-white/[0.10] bg-black/90 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
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
                    ? "border border-white/[0.12] bg-white/[0.075] text-white shadow-[0_0_18px_rgba(255,255,255,0.035)]"
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
                    ? "border border-white/[0.12] bg-white/[0.075] text-white shadow-[0_0_18px_rgba(255,255,255,0.035)]"
                    : "text-slate-600 hover:text-slate-300"
                }
              `}
            >
              ›_ Code
            </button>
          </div>

          {/* COMPONENT PREVIEW / SOURCE */}
          {showCode ? (
            <div id="code" className="scroll-mt-8">
              <ComponentCode component={component} />
            </div>
          ) : (
            <ComponentPreview component={component} />
          )}

          {/* DOCUMENTATION */}
          <ComponentDocumentation component={component} />

          {/* FOOTER */}
          <div className="mt-9 pb-12 font-mono text-[11px] text-slate-600">
            {allComponents.length} components · React / Next.js · zero visual dependencies
          </div>
        </main>

        {/* RIGHT — SECTION NAVIGATION */}
        <ComponentPageNav />
      </div>
    </section>
  );
}

export default ComponentLibrary;