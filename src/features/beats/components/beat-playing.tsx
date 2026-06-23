"use client";
import { Overlay } from "@/shared/components";
import { Button } from "@/components/ui";
import { usePlayerStore } from "@/features/audio-player/store/player-store";
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
import { BuyButton, PlayButton } from "@/shared/components";
import { BeatCover } from "./ui/beat-cover";
import { useBeatPlayer } from "../hooks/use-beat-player";
import { LoadingSkeleton } from "@/shared/components/loading-skeleton";

export function BeatPlaying() {
  const { currentIndex, playlist } = usePlayerStore(
    useShallow((state) => ({
      togglePlay: state.togglePlay,
      currentIndex: state.currentIndex,
      isPlaying: state.isPlaying,
      playlist: state.playlist,
    })),
  );

  const { handlePlay, isThisBeatPlaying } = useBeatPlayer();

  const currentBeat = playlist[currentIndex];
  if (!currentBeat) {
    return <LoadingSkeleton />;
  }

  const { cover, name, key, bpm, genre, price, audioUrl, moods, id } =
    currentBeat;
  return (
    <div className="flex items-center h-[45dvh] w-dvw overflow-hidden">
      <BackGroundImage cover={cover} name={name} />
      <Overlay
        to="t"
        from="from-black"
        fromVia="from-30%"
        via="black"
        toColor="transparent"
      />
      <div className="dark absolute w-full flex justify-evenly items-center text-foreground p-4 gap-2">
        <Card className="bg-gray-800/10 backdrop-blur-xs w-full md:w-[50dvw] shadow-xs shadow-foreground/10 animate-in fade-in slide-in-from-left-15 duration-500">
          <CardHeader>
            <div className="h-full w-full flex flex-row items-end justify-start gap-4">
              <BeatCover
                href={`/beats/${id}`}
                alt={name}
                cover={cover}
                size={24}
              />
              <div className="flex flex-row justify-between items-end h-full w-full ">
                <CardTitle className="h-full flex flex-col justify-between">
                  <PlayButton
                    variant="destructive"
                    isPlaying={isThisBeatPlaying(name)}
                    onClick={() => handlePlay(name)}
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
                label={price}
                product={{
                  id: name,
                  type: "beat",
                  title: name,
                  coverUrl: cover,
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
          <CardFooter className="bg-transparent justify-between p-2 md:p-3">
            <p className="truncate flex items-center gap-2">
              <span className=" bg-gray-900 border shadow-xs shadow-gray-600/10 px-2 py-1 rounded-lg">
                {genre}
              </span>
              {moods.map((mood) => (
                <span
                  key={mood}
                  className="text-muted-foreground"
                >{` #${mood}`}</span>
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

function BackGroundImage({ cover, name }: { cover: string; name: string }) {
  return (
    <div
      className={`sticky top-0 h-full w-full animate-in fade-in duration-3000`}
    >
      <div className={`relative inset-0 w-full h-full `}>
        {cover ? (
          <Image
            className={`object-cover`}
            src={cover}
            alt={name}
            fill
            loading="eager"
          />
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </div>
  );
}
