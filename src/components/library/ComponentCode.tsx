import { useEffect, useState } from "react";
import registryConfig from "../../../registry.config.json";
import { getExportName, getSlug } from "../../data/components";
import CopyButton from "./CopyButton";

type SourceState =
  | { status: "idle" | "loading" }
  | { status: "ready"; text: string }
  | { status: "error" };

/** Fetches the component's real source from the published registry file (public/r/<slug>.json). */
function useComponentSource(slug: string, enabled: boolean): SourceState {
  const [state, setState] = useState<SourceState>({ status: "idle" });

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setState({ status: "loading" });
    fetch(`${import.meta.env.BASE_URL}r/${slug}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((item) => {
        const text = item?.files?.[0]?.content;
        if (typeof text !== "string") throw new Error("no content");
        if (!cancelled) setState({ status: "ready", text });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, [slug, enabled]);

  return state;
}

function ComponentCode({ component }) {
  const exportName = getExportName(component);
  const slug = getSlug(component);
  const [file, setFile] = useState<"example" | "source">("example");
  const source = useComponentSource(slug, file === "source");

  // Same import path the shadcn CLI produces; adjust it to wherever the importing file lives.
  const importPath = `./${registryConfig.installDir}/${exportName}`;
  const example =
    component.usage ||
    `import ${exportName} from "${importPath}";

export default function Example() {
  return <${exportName} />;
}`;

  const tabs = [
    { id: "example", label: "App.tsx" },
    { id: "source", label: `${exportName}.tsx` },
  ] as const;

  const body =
    file === "example"
      ? example
      : source.status === "ready"
        ? source.text
        : source.status === "error"
          ? "// Could not load the source. Run the install command to copy it into your project."
          : "// Loading…";

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.14] bg-[#090b0e]">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-2 py-2 font-mono text-[11px] text-slate-400">
        <div role="tablist" aria-label="Code files" className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={file === tab.id}
              onClick={() => setFile(tab.id)}
              className={`rounded-md px-3 py-1.5 transition-all ${
                file === tab.id
                  ? "bg-[#202a30] text-cyan-100"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <CopyButton text={body} label="Copy code" />
      </div>
      <pre className="max-h-[560px] overflow-auto p-6 font-mono text-[13px] leading-[1.8] text-slate-400">
        <code>{body}</code>
      </pre>
    </div>
  );
}

export default ComponentCode;
