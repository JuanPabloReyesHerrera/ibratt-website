"use client";
import { BuyButton } from "@/components/shared/buy-button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  PlayButton,
} from "@/components/ui";
import { usePlayerStore } from "@/features/beats/store/player-store";
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
      className="w-full md:w-[80%] h-full flex items-start justify-center p-4 overflow-auto"
      style={{
        WebkitOverflowScrolling: "touch",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)",
      }}
    >
      <Table className="dark table-fixed">
        <TableCaption className="text-foreground">Beats Catalog</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-foreground">Play</TableHead>
            <TableHead className="text-foreground">Beat</TableHead>
            <TableHead className="text-foreground">Name</TableHead>
            <TableHead className="text-foreground">Genre</TableHead>
            <TableHead className="text-foreground">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playlist.map(
            ({ portada, name, genre, bpm, key, price, audioUrl }) => (
              <TableRow key={name} className="border-b-foreground/10">
                <TableCell>
                  <PlayButton
                    variant="outline"
                    strokeWidth={1}
                    size={10}
                    svgSize={6}
                    onClick={() => handlePlay(name)}
                    isPlaying={isThisBeatPlaying(name)}
                  />
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
                <TableCell className="text-foreground truncate ">
                  {name}
                </TableCell>
                <TableCell className="text-foreground">{genre}</TableCell>

                <TableCell className="text-foreground">
                  <BuyButton
                    label={`$${price}`}
                    product={{
                      id: name,
                      type: "beat",
                      title: name,
                      coverUrl: portada,
                      audioUrl: audioUrl,
                      metadata: { key: key, bpm: bpm, genre: genre },
                    }}
                  ></BuyButton>
                  {/* <Button className="">${price}</Button> */}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </section>
  );
}
