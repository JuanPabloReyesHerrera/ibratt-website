"use client";
import { GradientBackground } from "@/components/shared/gradient-background";
import { Button, PlayButton } from "@/components/ui";
import { usePlayerStore } from "@/store";
import { useShallow } from "zustand/shallow";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";

export function BeatPlaying() {
  const { togglePlay, currentIndex, playBeat, isPlaying, playlist } =
    usePlayerStore(
      useShallow((state) => ({
        togglePlay: state.togglePlay,
        currentIndex: state.currentIndex,
        playBeat: state.playBeat,
        isPlaying: state.isPlaying,
        playlist: state.playlist,
      })),
    );

  const currentBeat = playlist[currentIndex];
  if (!currentBeat) {
    // Puedes retornar null para no mostrar nada, o un "Skeleton" de carga
    return (
      <div className="flex items-center h-[40dvh] w-dvw text-gray-500">
        <p>Cargando beat...</p>
      </div>
    );
  }

  const { portada, name, key, bpm, genre, price } = currentBeat;
  return (
    <div className="flex items-center h-[30dvh] w-dvw overflow-hidden">
      <BackGroundImage portada={portada} name={name} />
      <GradientBackground
        to="t"
        from="from-black"
        fromVia="from-30%"
        via="black"
        toColor="transparent"
      />
      <div className="dark absolute w-full flex justify-evenly items-center text-foreground p-4 gap-2">
        <img
          className="size-45 border border-foreground rounded-2xl"
          src={portada}
          alt={name}
        />

        <Card className="bg-black/40 backdrop-blur-sm w-full md:w-[50dvw] h-45 shadow-md shadow-foreground/10">
          <CardHeader>
            <PlayButton isPlaying={isPlaying} onClick={togglePlay} />
            <div className="flex flex-row justify-between items-end">
              <CardTitle className="truncate">{name}</CardTitle>
              <CardDescription className="md:grid md:grid-cols-2">
                <p>
                  <span>{bpm}</span>
                  <span>bpm</span>
                </p>
                <p>
                  <span>key:</span>
                  <span>{key}</span>
                </p>
              </CardDescription>
            </div>
            <CardAction>
              <Button>{price}</Button>
            </CardAction>
          </CardHeader>

          <CardFooter className="bg-transparent justify-between">
            <p className="w-full truncate">{genre}</p>
            <Button>
              <Download />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function BackGroundImage({ portada, name }: { portada: string; name: string }) {
  return (
    <div className={`sticky top-0 h-full w-full `}>
      <div className={`relative inset-0 w-full h-full `}>
        <Image
          className={`object-cover`}
          src={portada}
          alt={name}
          sizes="(max-width: 768px) 100dvw, (max-width: 1200px) 80vw, 50dvw"
          fill
          priority
        />
      </div>
    </div>
  );
}
