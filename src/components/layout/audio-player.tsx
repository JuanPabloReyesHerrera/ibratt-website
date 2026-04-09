import { Slider, Button } from "@/components/ui";
import { Play, RotateCcw, RotateCw } from "lucide-react";
import Image from "next/image";
import type { Beat } from "@/types";

export default function AudioPlayer({ beat }: { beat: Beat }) {
  const { portada, name } = beat;

  const buttonActive =
    "size-6 transition-all group-hover:scale-125 group-active:scale-95";
  return (
    <div className="dark h-12 w-screen bg-gray-950 z-30 fixed bottom-0 flex flex-row justify-center items-center">
      <Button className="relative text-muted-foreground bg-transparent group ">
        <RotateCcw strokeWidth={2.5} className={`${buttonActive}`} />
        <span className="absolute text-[10px] font-bold">15</span>
      </Button>
      <Button className="text-muted-foreground rounded h-full bg-transparent group ">
        <Play strokeWidth={2.5} className={`${buttonActive}`} />
      </Button>
      <Button className="relative text-muted-foreground bg-transparent group">
        <RotateCw strokeWidth={2.5} className={`${buttonActive}`} />
        <span className="absolute text-[10px] font-bold">15</span>
      </Button>

      <Slider
        step={1}
        max={100}
        defaultValue={[0]}
        className="mx-auto w-full max-w-xs bg-foreground"
      />
      <h1 className="text-muted-foreground font-bold mr-4">{name}</h1>
      <Button className="text-foreground flex justify-center items-center bg-linear-to-t from-primary/70 to-black w-20 h-full rounded-none hover:bg-black/10 active:bg-primary/50 group">
        <Image
          src={portada}
          alt={name}
          width={40}
          height={40}
          className={`${buttonActive} bg-primary rounded-sm border-2 border-accent-foreground size-10`}
        />
      </Button>
    </div>
  );
}
