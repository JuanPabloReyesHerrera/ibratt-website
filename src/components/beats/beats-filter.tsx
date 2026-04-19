import { ToggleGroup, ToggleGroupItem } from "@/components/ui";

export function BeatsFilter() {
  return (
    <div className="w-[98vw] md:max-w-[75vw] lg:max-w-[55vw] h-10 bg-primary-foreground px-4 flex flex-row items-center justify-between border border-foreground/30 rounded-xl shadow-sm shadow-foreground/30">
      <div>filter...</div>
      <ToggleGroup
        type="multiple"
        variant="outline"
        size="sm"
        orientation={"horizontal"}
        className="shadow-xs shadow-white/30"
      >
        <ToggleGroupItem value="key">KEY</ToggleGroupItem>
        <ToggleGroupItem value="bpm">BPM</ToggleGroupItem>
        <ToggleGroupItem value="genere">GENERE</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
