"use client";
import { Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { usePlayerStore } from "@/store/player-store";
import { useShallow } from "zustand/shallow";
import { WaveSurferForm } from "@/components/layout/player/wavesurfer-form";
import { formatDuration } from "@/lib/utils";
import {
  AudioPlayerButtons,
  PlayerOptionsButton,
} from "../../ui/control-buttons";
import {
  ChevronDown,
  Ellipsis,
  Headphones,
  Heart,
  HeartPlus,
  List,
  Repeat,
  Share,
  Shuffle,
} from "lucide-react";
import { ReactNode } from "react";

export function ExpandedAudioPlayer({ wavesurfer }: { wavesurfer: ReactNode }) {
  const { currentIndex, playlist, currentTime, duration, isLiked, setIsLiked } =
    usePlayerStore(
      useShallow((state) => ({
        currentIndex: state.currentIndex,
        setPlaylist: state.setPlaylist,
        playlist: state.playlist,
        currentTime: state.currentTime,
        duration: state.duration,
        isLiked: state.isLiked,
        setIsLiked: state.setIsLiked,
      })),
    );

  const currentBeat = playlist[currentIndex];
  const { portada, name, audioUrl, genre, bpm, key } = currentBeat;

  // 3. Si el beat no existe todavía (es undefined), retornamos un estado de carga o nada
  if (!currentBeat) {
    return (
      <div className="z-100 h-30 w-dvw flex flex-col justify-center items-center bg-gray-950">
        <span className="text-muted-foreground text-xs">Cargando beat...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-16">
      {/* BANNER */}
      <section className="w-full flex flex-row justify-between items-center">
        <PlayerOptionsButton size={8}>
          <ChevronDown />
        </PlayerOptionsButton>
        <PlayerOptionsButton size={8}>
          <Ellipsis />
        </PlayerOptionsButton>
      </section>
      <Button
        variant="outline"
        size="icon-lg"
        className="size-[40dvh] flex justify-center items-center bg-linear-to-t from-primary/70 to-black hover:bg-black/10 active:bg-primary/50 group"
      >
        <Image
          src={portada}
          alt={name}
          width={40}
          height={40}
          className={`size-70 rounded-sm border-2 border-accent-foreground transition-all group-hover:scale-105 group-active:scale-95`}
        />
      </Button>

      <section className="w-[90dvw] h-[20dvh] flex flex-col items-center space-y-2">
        <div className="w-full flex flex-row justify-between items-center">
          <div>
            <Link
              href={`/beats/${audioUrl ? audioUrl.split("/").slice(-1)[0].replace(".mp3", "") : ""}`}
              className="flex items-end text-muted-foreground font-bold hover:text-primary transition-colors"
            >
              <h1>{name}</h1>
            </Link>
            <p className="flex w-full flex-row justify-start items-start text-muted-foreground font-bold text-[10px] md:text-sm lg:text-base">
              {genre} Bpm: {bpm} Key: {key}
            </p>
          </div>

          <PlayerOptionsButton size={8} onClick={() => setIsLiked()}>
            {isLiked ? (
              <Heart strokeWidth={0} className="fill-red-500 text-red-500" />
            ) : (
              <HeartPlus />
            )}
          </PlayerOptionsButton>
        </div>

        {/* WAVEFORM */}
        {/* <WaveSurferForm audioUrl={audioUrl} /> */}

        {wavesurfer}

        <div className="w-full flex flex-row items-center justify-between text-xs font-bold text-muted-foreground">
          <span>{formatDuration(currentTime)}</span>
          <span>{formatDuration(duration)}</span>
        </div>
        <div className="w-full h-full flex flex-row justify-between items-center">
          <PlayerOptionsButton>
            <Shuffle />
          </PlayerOptionsButton>

          <AudioPlayerButtons size={16} />

          <PlayerOptionsButton>
            <Repeat />
          </PlayerOptionsButton>
        </div>
        <div className="w-full h-full flex flex-row justify-between items-center">
          <PlayerOptionsButton>
            <Headphones />
          </PlayerOptionsButton>

          <div>
            <PlayerOptionsButton>
              <List />
            </PlayerOptionsButton>
            <PlayerOptionsButton>
              <Share />
            </PlayerOptionsButton>
          </div>
        </div>
      </section>
    </div>
  );
}
