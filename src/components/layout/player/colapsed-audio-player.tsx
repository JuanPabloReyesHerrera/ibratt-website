"use client";
import { Button, Slider } from "@/components/ui";
import Image from "next/image";
import { usePlayerStore } from "@/store/player-store";
import { useShallow } from "zustand/shallow";
import { formatDuration } from "@/lib/utils";
import { PlayerOptionsButton, AudioPlayerButtons } from "./control-buttons";
import { Ellipsis, Heart, HeartPlus } from "lucide-react";

export function ColapsedAudioPlayer() {
  const { currentIndex, playlist, currentTime, duration, isLiked, setIsLiked } =
    usePlayerStore(
      useShallow((state) => ({
        currentIndex: state.currentIndex,
        playlist: state.playlist,
        currentTime: state.currentTime,
        duration: state.duration,
        skipBack: state.skipBack,
        skipForward: state.skipForward,
        volume: state.volume,
        isLiked: state.isLiked,
        setIsLiked: state.setIsLiked,
      })),
    );
  const currentBeat = playlist[currentIndex];
  if (!currentBeat) {
    return (
      <div className="z-100 h-30 w-dvw flex flex-col justify-center items-center bg-gray-950">
        <span className="text-muted-foreground text-xs">Cargando beat...</span>
      </div>
    );
  }

  const { portada, name } = currentBeat;

  return (
    <div className="flex flex-col items-center justify-start h-dvh">
      <section className="dark w-full flex flex-row justify-between items-center mb-1">
        {/* BANNER */}
        <Button
          variant={"outline"}
          className="text-foreground flex justify-center items-center bg-linear-to-t from-primary/70 to-black w-15 h-full hover:bg-black/10 active:bg-primary/50 group"
        >
          <Image
            src={portada}
            alt={name}
            width={40}
            height={40}
            className={`rounded-sm border-2 border-accent-foreground size-10 transition-all group-hover:scale-125 group-active:scale-95`}
          />
        </Button>

        {/* CONTROL BUTTONS */}
        <AudioPlayerButtons />
        <div className="flex flex-row">
          <PlayerOptionsButton onClick={() => setIsLiked()}>
            {isLiked ? (
              <Heart strokeWidth={3} className="fill-red-500 text-red-500" />
            ) : (
              <HeartPlus />
            )}
          </PlayerOptionsButton>
          <PlayerOptionsButton>
            <Ellipsis />
          </PlayerOptionsButton>
        </div>
      </section>
      <section className="flex flex-col">
        <div className="flex flex-row items-center justify-between text-xs font-bold text-muted-foreground px-4">
          <span>{formatDuration(duration)}</span>
          <span>{formatDuration(currentTime)}</span>
        </div>
        <Slider
          className="w-[95dvw]"
          value={[currentTime]}
          defaultValue={[0]}
          min={0}
          max={duration || 100}
        />
      </section>
    </div>
  );
}
