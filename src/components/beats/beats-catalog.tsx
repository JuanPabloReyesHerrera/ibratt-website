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

import { Play } from "lucide-react";
import { Beat } from "@/types";
import { usePlayerStore } from "@/store/player-store";
import { useShallow } from "zustand/shallow";
type BeatsCatalogProps = {
  beats: Beat[];
};

export function BeatCatalog({ beats }: BeatsCatalogProps) {
  const { togglePlay, currentIndex } = usePlayerStore(
    useShallow((state) => ({
      togglePlay: state.togglePlay,
      currentIndex: state.currentIndex,
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
          {beats.map(({ portada, name, genre, bpm, key, price, audioUrl }) => (
            <TableRow key={name} className="border-b-foreground/10">
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => {}}
                  className="w-full h-12 bg-transparent md:hover:bg-foreground/40 active:bg-primary/70 transition-all active:scale-95 group touch-manipulation"
                >
                  <Play className="size-5 text-foreground md:group-hover:scale-125 group-active:scale-95 md:group-hover:text-background transition-transform touch-manipulation" />
                </Button>
              </TableCell>
              <TableCell>
                <img
                  src={portada}
                  alt={name}
                  className="size-12 rounded-lg object-cover"
                />
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
