export function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
      <span className="text-zinc-600 mr-1.5 uppercase text-[10px]">
        {label}:
      </span>
      {value}
    </span>
  );
}
