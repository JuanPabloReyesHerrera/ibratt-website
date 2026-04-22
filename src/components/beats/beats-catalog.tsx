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

  function handlePlay(beatName: string) {
    // Busca el índice real del beat dentro de la playlist del store
    const beatIndex = playlist.findIndex((b) => b.name === beatName);
    if (beatIndex === -1) return; // el beat no está en la playlist todavía

    const isCurrentBeat = playlist[currentIndex]?.name === beatName;

    if (isCurrentBeat) {
      // El usuario tocó el beat que ya está sonando → pausa o reanuda
      togglePlay();
    } else {
      // El usuario tocó un beat diferente → cambia y reproduce
      playBeat(beatIndex);
    }
  }

  function isThisBeatPlaying(beatName: string): boolean {
    return isPlaying && playlist[currentIndex]?.name === beatName;
  }

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
          {playlist.map(({ portada, name, genre, bpm, key, price }) => (
            <TableRow key={name} className="border-b-foreground/10">
              <TableCell>
                <Button
                  variant="ghost"
                  size={"icon-lg"}
                  onClick={() => handlePlay(name)}
                  className="md:hover:bg-foreground/40 active:bg-primary/70 transition-all active:scale-95 group touch-manipulation"
                >
                  {isThisBeatPlaying(name) ? <Pause /> : <Play />}
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
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
