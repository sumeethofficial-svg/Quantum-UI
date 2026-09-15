import { useMemo, useState } from "react";
import { componentGroups } from "../../data/components";

function ComponentSidebar({
  activeComponent,
  onSelectComponent,
  onClose,
}) {
  const [search, setSearch] = useState("");

  const filteredGroups = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return componentGroups;
    }

    return componentGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.name
            .toLowerCase()
            .includes(query)
        ),
      }))
      .filter(
        (group) => group.items.length > 0
      );
  }, [search]);

  return (
    <aside
      className="
        relative
        h-full
        min-h-0
        overflow-y-auto
        overflow-x-hidden
        border-b
        border-white/[0.08]
        bg-black/30
        p-5
        md:border-b-0
        md:border-r
        md:p-7
      "
    >
      {/* Header */}
      <div className="mb-7 flex items-center justify-between px-1.5">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-slate-400">
            Component Index
          </div>

          <div className="mt-1 font-mono text-[9px] text-slate-700">
            QUANTUM UI / COMPONENTS
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Return to homepage"
          className="
            text-lg
            text-slate-400
            transition-colors
            hover:text-cyan-100
          "
        >
          ×
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-7">
        <span className="pointer-events-none absolute left-3 top-2 text-lg text-cyan-400">
          ⌕
        </span>

        <input
          type="search"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search the interface"
          aria-label="Search components"
          className="
            w-full
            rounded-md
            border
            border-white/[0.14]
            bg-[#0b0e12]
            py-2.5
            pl-[34px]
            pr-3
            font-mono
            text-xs
            text-white
            outline-none
            placeholder:text-slate-600
            focus:border-cyan-400/35
            focus:ring-4
            focus:ring-cyan-400/[0.06]
          "
        />
      </div>

      {/* Groups */}
      {filteredGroups.map((group) => (
        <div
          key={group.label}
          className="my-6"
        >
          <p className="mb-2 ml-2 font-mono text-[10px] tracking-[0.14em] text-slate-600">
            {group.label}
          </p>

          <div className="space-y-1">
            {group.items.map((item) => {
              const active =
                item.name === activeComponent;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    onSelectComponent(item.name)
                  }
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-2.5
                    rounded-md
                    px-2.5
                    py-2
                    text-left
                    text-[13px]
                    transition-all
                    ${
                      active
                        ? "bg-white/[0.065] text-white shadow-[inset_2px_0_#4dd8ff]"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                    }
                  `}
                >
                  <span
                    className={`
                      w-[17px]
                      font-mono
                      transition-all
                      ${
                        active
                          ? "text-cyan-100"
                          : "text-cyan-400/70 group-hover:text-cyan-100"
                      }
                    `}
                  >
                    {item.glyph}
                  </span>

                  <span>{item.name}</span>

                  {item.number && (
                    <span
                      className={`
                        ml-auto
                        font-mono
                        text-[10px]
                        ${
                          active
                            ? "text-cyan-400/70"
                            : "text-slate-600"
                        }
                      `}
                    >
                      {item.number}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* No results */}
      {filteredGroups.length === 0 && (
        <div className="px-2 py-8 text-center">
          <div className="font-mono text-[10px] text-slate-600">
            NO COMPONENT SIGNAL
          </div>

          <div className="mt-1 text-xs text-slate-700">
            Try another search.
          </div>
        </div>
      )}
    </aside>
  );
}

export default ComponentSidebar;