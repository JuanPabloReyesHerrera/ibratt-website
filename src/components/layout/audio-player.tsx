"use client";
import { useState } from "react";
import { Slider, Button } from "@/components/ui";
import {
  Play,
  RotateCcw,
  RotateCw,
  Heart,
  HeartPlus,
  Ellipsis,
} from "lucide-react";
import Image from "next/image";
import type { Beat } from "@/types";
import Link from "next/link";
import { usePlayerStore } from "@/store/player-store";
import { WaveSurferForm } from "@/components/player/wavesurfer-form";

export default function AudioPlayer({ beat }: { beat: Beat }) {
  const { portada, name, audioUrl, genre, bpm, key } = beat;

  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [skipBack, setSkipBack] = useState(false);
  const [skipForward, setSkipForward] = useState(false);
  const [volume, setVolume] = useState(80);

  const buttonActive =
    "flex justify-center items-center size-6 transition-all group-hover:scale-125 group-active:scale-95";
  const buttonControl = "text-muted-foreground bg-transparent p-1.5 group";

  return (
    <div className="fixed bottom-0 z-100 h-30 w-screen flex flex-col justify-center items-center">
      {/* WAVEFORM */}
      <section className="w-full h-18 flex flex-row justify-center items-center bg-linear-to-t from-gray-950 from-20% to-transparent to-90% shadow-lg">
        <WaveSurferForm
          audioUrl={audioUrl}
          isPlaying={isPlaying}
          skipBack={skipBack}
          skipForward={skipForward}
          volume={volume}
        />
      </section>

      {/* CONTROL SECTION */}
      <section className="dark h-12 w-full bg-gray-950 z-30 flex flex-row justify-center items-center">
        {/* BANNER */}
        <Button className="text-foreground flex justify-center items-center bg-linear-to-t from-primary/70 to-black w-20 h-full rounded-none hover:bg-black/10 active:bg-primary/50 group">
          <Image
            src={portada}
            alt={name}
            width={40}
            height={40}
            className={`${buttonActive} bg-primary rounded-sm border-2 border-accent-foreground size-10`}
          />
        </Button>

        {/* CONTROL BUTTONS */}
        <div className="flex justify-center items-center w-full max-w-md">
          <Button
            onClick={() => {
              setSkipBack(!skipBack);
            }}
            className={`relative ${buttonControl}`}
          >
            <RotateCcw strokeWidth={2} className={`${buttonActive}`} />
            <span className="absolute text-[10px] font-bold">-15</span>
          </Button>
          <Button
            className={buttonControl}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <Play strokeWidth={2} className={`${buttonActive}`} />
          </Button>
          <Button
            onClick={() => {
              setSkipForward(!skipForward);
            }}
            className={buttonControl}
          >
            <RotateCw strokeWidth={2} className={`${buttonActive}`} />
            <span className="absolute text-[10px] font-bold">+15</span>
          </Button>
          <Slider
            step={1}
            max={100}
            defaultValue={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            className="w-full max-w-xs min-w-20 hover:scale-115 active:scale-95 cursor-pointer transition-transform mx-2"
          />
        </div>

        {/* BEAT URL */}
        <Link
          href={`/beats/${beat.audioUrl ? beat.audioUrl.split("/").slice(-1)[0].replace(".mp3", "") : ""}`}
          className="w-full h-full flex items-center bg-amber-50 text-muted-foreground font-bold text-left hover:text-primary transition-colors"
        >
          <h1 className="">{name}</h1>
        </Link>

        {/* BEAT DATA */}
        <div className="bg-white w-full h-full flex flex-col justify-center items-start px-0 text-muted-foreground font-bold text-[10px] md:text-sm lg:text-base">
          <span className="">{genre}</span>
          <div>
            <span>Bpm:</span>
            <span className="">{bpm}</span>
            <span> Key:</span>
            <span className="">{key}</span>
          </div>
        </div>

        {/* OPTIONS */}
        <div className="bg-sky-400 w-full h-full flex justify-center items-center gap-4 px-1">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="h-full hover:scale-115 active:scale-95 transition-transform duration-200"
          >
            {isLiked ? (
              <Heart strokeWidth={3} className="fill-red-500 text-red-500" />
            ) : (
              <HeartPlus />
            )}
          </button>
          <button className="h-full hover:scale-115 active:scale-95 transition-transform duration-200">
            <Ellipsis />
          </button>
        </div>
      </section>
    </div>
  );
}
