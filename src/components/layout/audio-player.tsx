import { Slider, Button } from "@/components/ui";
import { Play, Pause, RotateCcw, RotateCw } from "lucide-react";
import Image from "next/image";
import type { Beat } from "@/types";

export default function AudioPlayer({ beat }: { beat: Beat }) {
  const { portada, name } = beat;
  const buttonActive =
    "transition-all group-hover:scale-125 group-active:scale-95";
  return (
    <div className="h-12 w-screen bg-gradient-to-t from-accent-foreground via-foreground/80 to-trasparent z-30 fixed bottom-0 flex flex-row justify-center items-center">
      <Button className="relative bg-transparent group">
        <RotateCcw strokeWidth={1.5} className={`size-6 ${buttonActive}`} />
        <span className="absolute text-[10px] font-bold">15</span>
      </Button>
      <Button className="rounded h-full w-0 bg-transparent group">
        <Play className={`size-5 ${buttonActive}`} />
      </Button>
      <Button className="relative bg-transparent group">
        <RotateCw strokeWidth={1.5} className={`size-6 ${buttonActive}`} />
        <span className="absolute text-[10px] font-bold">15</span>
      </Button>
      <Slider
        step={1}
        max={100}
        defaultValue={[0]}
        className="mx-auto w-full max-w-xs"
      />
      <h1 className="text-background font-bold mr-4">{name}</h1>
      <Button className="flex justify-center items-center bg-gradient-to-t from-foreground/70 w-20 h-full rounded-none hover:bg-black/10 active:bg-primary/50 group">
        <Image
          src={portada}
          alt={name}
          width={40}
          height={40}
          className={`bg-primary rounded-sm border-2 border-accent-foreground ${buttonActive}`}
        />
      </Button>
    </div>
  );
}
