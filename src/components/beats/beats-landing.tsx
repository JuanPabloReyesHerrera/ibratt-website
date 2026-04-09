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
import Image from "next/image";
import type { BeatsList } from "@/types/beat";

type BeatsLandingProps = BeatsList;

export default function BeatsLanding({ beats = [] }: BeatsLandingProps) {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center font-sans shadow-2xl shadow-foreground">
      <Image
        className="object-cover"
        src="/assets/beat-section.jpg"
        alt="Hero"
        fill
        priority
      />
      <div className="w-full h-full flex flex-col items-center justify-start z-10 bg-gradient-to-b from-background via-foreground/10 to-transparent">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Beats Catalog
        </h1>
        <div
          className="w-full md:w-[80%] h-[600px] flex items-start justify-center p-4 overflow-auto"
          style={{
            WebkitOverflowScrolling: "touch",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)",
          }}
        >
          <Table>
            <TableCaption className="text-foreground">
              Beats Catalog
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Play</TableHead>
                <TableHead className="text-foreground">Beat</TableHead>
                <TableHead className="text-foreground">Name</TableHead>
                <TableHead className="text-foreground">Genre</TableHead>
                <TableCell className="text-foreground">BPM</TableCell>
                <TableCell className="text-foreground">Key</TableCell>
                <TableHead className="text-foreground">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beats.map(({ portada, name, genre, bpm, key, price }, index) => (
                <TableRow key={index} className="border-b-foreground/10">
                  <TableCell>
                    <Button
                      variant="ghost"
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
                    <Button
                      // Repetimos la dosis de fluidez en el botón de precio
                      onTouchStart={() => {}}
                      className="transition-all transform-gpu hover:scale-110 active:scale-95 active:bg-primary/70 touch-manipulation"
                    >
                      {price}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
