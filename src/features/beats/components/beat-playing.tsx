"use client";
import { GradientBackground } from "@/components/shared/gradient-background";
import { Button, PlayButton } from "@/components/ui";
import { usePlayerStore } from "@/store";
import { useShallow } from "zustand/shallow";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";
import Link from "next/link";
import { BuyButton } from "@/components/shared/buy-button";

export function BeatPlaying() {
  const { togglePlay, currentIndex, isPlaying, playlist } = usePlayerStore(
    useShallow((state) => ({
      togglePlay: state.togglePlay,
      currentIndex: state.currentIndex,
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

  const { portada, name, key, bpm, genre, price, audioUrl, tags, id } =
    currentBeat;
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
        <Card className="bg-gray-800/10 backdrop-blur-xs w-full md:w-[50dvw] h-45 shadow-xs shadow-foreground/10">
          <CardHeader>
            <div className="h-full w-full flex flex-row items-end justify-start gap-4">
              <Link
                href={`/beats/${id}`}
                className="block hover:scale-105 transition-transform active:scale-90 group"
              >
                {/* Contenedor con tamaño fijo */}
                <div className="relative size-20 border border-foreground rounded-2xl overflow-hidden">
                  <Image
                    src={portada}
                    alt={name}
                    fill // El componente ocupa todo el div padre
                    sizes="80px" // Ayuda a Next.js a optimizar el tamaño
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
              </Link>

              <div className="flex flex-row justify-between items-end h-full w-full ">
                <CardTitle className="h-full flex flex-col justify-between">
                  <PlayButton
                    variant="destructive"
                    isPlaying={isPlaying}
                    onClick={togglePlay}
                  />
                  {name}
                </CardTitle>

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
            </div>
            <CardAction>
              <BuyButton
                variant="destructive"
                label={`$${price}`}
                product={{
                  id: name,
                  type: "beat",
                  title: name,
                  coverUrl: portada,
                  audioUrl: audioUrl,
                  metadata: {
                    key: key,
                    bpm: bpm,
                    genre: genre,
                  },
                }}
              ></BuyButton>
            </CardAction>
          </CardHeader>

          <CardFooter className="bg-transparent justify-between items-center h-full">
            <p className="w-full h-full truncate flex items-center gap-2">
              <span className=" bg-gray-900 border shadow-xs shadow-gray-600/10 px-2 py-1 rounded-lg">
                {genre}
              </span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-muted-foreground"
                >{` #${tag}`}</span>
              ))}
            </p>
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
