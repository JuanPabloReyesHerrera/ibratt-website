"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "@/components/ui";

import { Pause, Play } from "lucide-react";
import { usePlayerStore } from "@/store/player-store";
import { useShallow } from "zustand/shallow";

export function BeatCatalog() {
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
  return (
    <section
      className="w-full md:w-[80%] h-fit flex items-start justify-center p-4 overflow-auto"
      style={{
        WebkitOverflowScrolling: "touch",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)",
      }}
    >
      <Table className="dark">
        <TableCaption className="text-foreground">Beats Catalog</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-foreground">Play</TableHead>
            <TableHead className="text-foreground">Beat</TableHead>
            <TableHead className="text-foreground">Name</TableHead>
            <TableHead className="text-foreground">Genre</TableHead>
            <TableHead className="text-foreground">BPM</TableHead>
            <TableHead className="text-foreground">Key</TableHead>
            <TableHead className="text-foreground">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playlist.map(
            ({ portada, name, genre, bpm, key, price, audioUrl }) => (
              <TableRow key={name} className="border-b-foreground/10">
                <TableCell>
                  <Button
                    variant="ghost"
                    size={"icon-lg"}
                    onClick={() => {
                      if (isPlaying && playlist[currentIndex].name === name)
                        togglePlay();
                      else playBeat(currentIndex);
                    }}
                    className="md:hover:bg-foreground/40 active:bg-primary/70 transition-all active:scale-95 group touch-manipulation"
                  >
                    {isPlaying && playlist[currentIndex].name === name ? (
                      <Pause />
                    ) : (
                      <Play />
                    )}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    size="icon-lg"
                    className="flex justify-center items-center w-12"
                  >
                    <img
                      src={portada}
                      alt={name}
                      className="size-12 rounded-lg object-cover"
                    />
                  </Button>
                </TableCell>
                <TableCell className="text-foreground">{name}</TableCell>
                <TableCell className="text-foreground">{genre}</TableCell>
                <TableCell className="text-foreground">{bpm}</TableCell>
                <TableCell className="text-foreground">{key}</TableCell>
                <TableCell className="text-foreground">
                  <Button className="transition-all transform-gpu hover:scale-110 active:scale-95 active:bg-primary/70 touch-manipulation">
                    {price}
                  </Button>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </section>
  );
}
