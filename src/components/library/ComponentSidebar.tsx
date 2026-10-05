import { useMemo, useState } from "react";
import { componentGroups } from "../../data/components";
import { setupDocs } from "./SetupDocs";

const X_URL = "https://x.com/sumedev_";
const X_HANDLE = "@sumedev_";

/* ==========================================================
   Icons (inline, stroke-based, no dependency)
========================================================== */

const ICON_PATHS = {
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </>
  ),
  pointer: (
    <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" />
  ),
  type: (
    <>
      <path d="M12 4v16" />
      <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" />
      <path d="M9 20h6" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </>
  ),
  layers: (
    <>
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
      <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </>
  ),
};

// Picks an icon from the group name; unknown groups get the grid icon.
function iconFor(label) {
  const name = label.toLowerCase();

  if (/interact|button|control/.test(name)) return "pointer";
  if (/text|type|motion|anim/.test(name)) return "type";
  if (/data|chart|graph|stat/.test(name)) return "chart";
  if (/surface|glass|card|layer|layout/.test(name)) return "layers";

  return "grid";
}

function SectionIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

// "INTERACTIONS" -> "Interactions" (labels that are already mixed case stay as is)
const prettyLabel = (label) =>
  label === label.toUpperCase()
    ? label.charAt(0) + label.slice(1).toLowerCase()
    : label;

const itemClass = (active) => `
  -ml-px
  block
  w-full
  truncate
  border-l
  py-[9px]
  pl-[22px]
  pr-2
  text-left
  text-[14px]
  outline-none
  transition-colors
  focus-visible:text-white
  ${
    active
      ? "border-[#4dd8ff] bg-gradient-to-r from-white/[0.05] to-transparent text-white"
      : "border-transparent text-zinc-400 hover:text-white"
  }
`;

const HATCH =
  "repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 6px)";


function ComponentSidebar({
  activeComponent,
  activeDoc = null,
  onSelectComponent,
  onSelectDoc,
}) {
  const [closed, setClosed] = useState({});

  // Same order as the reference: follow, installation, then component groups
  const sections = useMemo(
    () => [
      {
        id: "follow",
        label: "Follow for updates",
        icon: "x",
        items: [
          { key: "link:x", name: `X ${X_HANDLE}`, kind: "link", href: X_URL },
        ],
      },
      {
        id: "installation",
        label: "Installation",
        icon: "download",
        items: setupDocs.map((doc) => ({
          key: `doc:${doc.id}`,
          name: doc.name,
          kind: "doc",
          id: doc.id,
        })),
      },
      ...componentGroups.map((group) => ({
        id: `group:${group.label}`,
        label: prettyLabel(group.label),
        icon: iconFor(group.label),
        items: group.items.map((item) => ({
          key: `component:${item.name}`,
          name: item.name,
          kind: "component",
        })),
      })),
    ],
    []
  );

  const isActive = (item) => {
    if (item.kind === "doc") {
      return activeDoc === item.id;
    }

    if (item.kind === "component") {
      return !activeDoc && item.name === activeComponent;
    }

    return false;
  };

  const toggle = (id) =>
    setClosed((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <aside
      className="
        relative
        flex
        h-full
        min-h-0
        border-b
        border-white/[0.08]
        bg-black
        md:border-b-0
        md:border-r
      "
    >
      <nav
        aria-label="Component index"
        className="
          min-w-0
          flex-1
          overflow-y-auto
          overflow-x-hidden
          px-6
          pb-10
          pt-9
          md:px-10
          [scrollbar-color:rgba(255,255,255,0.12)_transparent]
          [scrollbar-width:thin]
        "
      >
        {sections.map((section) => {
          const open = !closed[section.id];

          return (
            <section key={section.id} className="mb-9 last:mb-0">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => toggle(section.id)}
                className="group flex w-full items-center gap-3 text-left text-[14px] font-semibold text-white outline-none"
              >
                <span className="text-zinc-200">
                  <SectionIcon name={section.icon} />
                </span>

                <span className="flex-1 truncate">{section.label}</span>

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 group-hover:text-zinc-300 ${
                    open ? "" : "rotate-180"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="ml-2 mt-3 border-l border-white/[0.1]">
                    {section.items.map((item) => (
                      <li key={item.key}>
                        {item.kind === "link" ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className={itemClass(false)}
                          >
                            {item.name}
                          </a>
                        ) : (
                          <button
                            type="button"
                            aria-current={isActive(item) ? "page" : undefined}
                            onClick={() =>
                              item.kind === "doc"
                                ? onSelectDoc?.(item.id)
                                : onSelectComponent(item.name)
                            }
                            className={itemClass(isActive(item))}
                          >
                            {item.name}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        })}
      </nav>

      {/* Hatched gutter */}
      <div
        aria-hidden="true"
        className="hidden w-[26px] shrink-0 border-l border-white/[0.08] md:block"
        style={{ backgroundImage: HATCH }}
      />
    </aside>
  );
}

export default ComponentSidebar;