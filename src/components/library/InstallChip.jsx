import CopyButton from "./CopyButton";
import { getAddCommand } from "./installCommands";

/** One-line install command shown beside the Preview / Code switch. */
function InstallChip({ component }) {
  const command = getAddCommand(component);
  const [, runner, target] = command.match(/^(.*?) add (.*)$/) || [
    null,
    "",
    command,
  ];

  return (
    <div className="flex min-w-0 max-w-full flex-1 items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0b0d11] py-1.5 pl-2 pr-1.5 md:max-w-[620px]">
      <span
        aria-hidden="true"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.05] font-mono text-[11px] text-slate-500"
      >
        &gt;_
      </span>

      <code
        title={command}
        className="min-w-0 flex-1 truncate font-mono text-[11px] text-slate-400"
      >
        <span className="text-slate-300">{runner}</span> add{" "}
        <span className="text-amber-200/80">{target}</span>
      </code>

      <CopyButton text={command} label="Copy install command" />
    </div>
  );
}

export default InstallChip;
