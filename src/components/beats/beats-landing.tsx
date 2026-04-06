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
              "linear-gradient(to-bottom, transparent 0%, black 10%, black 80%, transparent 100%)",
            WebkitMaskBoxImage:
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
                <TableCell className="text-foreground">bpm</TableCell>
                <TableCell className="text-foreground">key</TableCell>
                <TableHead className="text-foreground">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beats.map(({ portada, name, genre, bpm, key, price }, index) => (
                <TableRow key={index}>
                  <TableCell className="text-foreground hover:bg-foreground/40 group active:bg-primary/70">
                    <Button className="w-full  bg-transparent">
                      <Play className="size-5 group-hover:scale-130 group-active:scale-95 group-hover:text-background transition-transform" />
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
                    <Button className="hover:scale-115 active:scale-95 active:bg-primary/70">
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
