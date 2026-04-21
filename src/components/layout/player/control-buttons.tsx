import {
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Button, Slider } from "../../ui";
import { usePlayerStore } from "@/store/player-store";
import { useShallow } from "zustand/shallow";
import { cn } from "@/lib/utils";

type PlayerButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  size?: 6 | 8 | 10 | 14 | 16 | 20;
  className?: string;
};

export function PlayerOptionsButton({
  children,
  onClick,
  size = 6,
  className,
}: PlayerButtonProps) {
  const svgSizeClasses = {
    6: "[&_svg]:size-6!",
    8: "[&_svg]:size-8!",
    10: "[&_svg]:size-10!",
    14: "[&_svg]:size-14!",
    16: "[&_svg]:size-16!",
    20: "[&_svg]:size-20!",
  } as const;
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "[&_svg]:text-foreground hover:scale-115 active:scale-95 transition-transform duration-200 mx-1",
        svgSizeClasses[size],
        className,
      )}
    >
      {children}
    </Button>
  );
}

function PlayerButtonItem({
  children,
  onClick,
  size = 10,
  className,
}: PlayerButtonProps) {
  const sizeClasses = {
    6: "size-6!",
    8: "size-8!",
    10: "size-10!",
    14: "size-14!",
    16: "size-16!",
    20: "size-20!",
  } as const;
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        "[&_svg]:size-6! [&_svg]:text-foreground transition-all hover:scale-125 active:scale-95",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Button>
  );
}
export function AudioPlayerButtons({ size }: PlayerButtonProps) {
  const {
    isPlaying,
    togglePlay,
    setSkipBack,
    setSkipForward,
    next,
    previous,
    volume,
    setVolume,
  } = usePlayerStore(
    useShallow((state) => ({
      isPlaying: state.isPlaying,
      togglePlay: state.togglePlay,
      setSkipBack: state.setSkipBack,
      setSkipForward: state.setSkipForward,
      next: state.next,
      previous: state.previous,
      volume: state.volume,
      setVolume: state.setVolume,
    })),
  );

  return (
    <div className="flex justify-center items-center w-full max-w-md gap-5">
      <PlayerButtonItem
        size={size}
        onClick={() => {
          previous();
        }}
      >
        <SkipBack strokeWidth={3} />
      </PlayerButtonItem>
      <PlayerButtonItem
        size={size}
        className={`hidden md:flex `}
        onClick={() => {
          setSkipBack();
        }}
      >
        <RotateCcw strokeWidth={3} />
        <span className="absolute text-[10px] font-bold">-15</span>
      </PlayerButtonItem>
      <PlayerButtonItem
        size={size}
        onClick={() => {
          togglePlay();
        }}
      >
        {isPlaying ? <Pause strokeWidth={3} /> : <Play strokeWidth={3} />}
      </PlayerButtonItem>
      <PlayerButtonItem
        size={size}
        className={`hidden md:flex `}
        onClick={() => {
          setSkipForward();
        }}
      >
        <RotateCw strokeWidth={3} />
        <span className="absolute text-[10px] font-bold">+15</span>
      </PlayerButtonItem>

      <PlayerButtonItem size={size} onClick={() => next()}>
        <SkipForward strokeWidth={3} />
      </PlayerButtonItem>
      <Slider
        step={1}
        max={100}
        defaultValue={[volume]}
        onValueChange={(value) => setVolume(value[0])}
        className="hidden h-4 md:flex w-full max-w-xs min-w-20 hover:scale-115 active:scale-115 cursor-pointer transition-transform mx-2"
      />
    </div>
  );
}
