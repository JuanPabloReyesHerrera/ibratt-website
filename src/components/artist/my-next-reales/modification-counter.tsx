import { cn } from "@/lib/utils";
import { useMyNextReleasesStore } from "@/store/my-next-releases-store";

export function ModificationCounter() {
  const { getRemainingModifications, release } = useMyNextReleasesStore();

  if (!release) return null;

  const remaining = getRemainingModifications();
  const total = release.maxModifications;
  const used = total - remaining;

  // Color cambia según cuántas quedan
  const color =
    remaining === 0
      ? "text-destructive"
      : remaining === 1
        ? "text-yellow-500"
        : "text-green-500";

  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={cn("text-xl font-bold tabular-nums", color)}>
        {remaining}
      </span>
      <span className="text-[10px] text-muted-foreground text-center leading-tight">
        modif.
        <br />
        restantes
      </span>
      {/* Barra de progreso visual */}
      <div className="flex gap-0.5 mt-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-colors",
              i < used ? "bg-destructive" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}
