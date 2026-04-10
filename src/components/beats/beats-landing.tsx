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
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui";
import { Play } from "lucide-react";
import Image from "next/image";
import type { BeatsList } from "@/types/beat";

type BeatsLandingProps = BeatsList;

export default function BeatsLanding({ beats = [] }: BeatsLandingProps) {
  return (
    <div className="relative h-full w-full md:max-w-[80vw] xl:max-w-[60vw] flex flex-col items-center justify-center font-sans shadow-2xl shadow-foreground">
      {/* imagen sticky */}
      <div className="sticky top-0 h-screen w-full">
        <div className="relative inset-0 w-full h-full">
          <Image
            className="object-cover"
            src="/assets/beat-section.jpg"
            alt="Hero"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
            fill
            priority
          />
        </div>
      </div>

      <div className="w-full h-full -mt-[100vh] flex flex-col items-center justify-start space-y-10 z-10 bg-gradient-to-b from-primary via-foreground/10 to-transparent">
        <h1 className="dark text-5xl font-bold text-background my-15">
          Beats Catalog
        </h1>
        <div className="w-[98vw] md:max-w-[75vw] lg:max-w-[55vw] h-10 bg-primary-foreground px-4 flex flex-row items-center justify-between border border-foreground/30 rounded-xl shadow-sm shadow-foreground/30">
          <div>filter...</div>
          <ToggleGroup
            type="multiple"
            variant="outline"
            size="sm"
            orientation={"horizontal"}
            className="shadow-xs shadow-white/30"
          >
            <ToggleGroupItem value="key">KEY</ToggleGroupItem>
            <ToggleGroupItem value="bpm">BPM</ToggleGroupItem>
            <ToggleGroupItem value="genere">GENERE</ToggleGroupItem>
          </ToggleGroup>
        </div>
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
            <TableCaption className="text-foreground">
              Beats Catalog
            </TableCaption>
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
              {beats.map(({ portada, name, genre, bpm, key, price }) => (
                <TableRow key={name} className="border-b-foreground/10">
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
                    <Button className="transition-all transform-gpu hover:scale-110 active:scale-95 active:bg-primary/70 touch-manipulation">
                      {price}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <section className="w-full h-full p-10">
          <h3 className="">Política de Uso y Derechos de Autor </h3>
          <span className="text-muted text-sm">
            ⚠️ Todos los beats publicados por IBRATT son de libre escucha y
            descarga para fines estrictamente no comerciales y de uso personal
            (ensayos, maquetas o grabaciones caseras sin fines de lucro). Para
            cualquier uso comercial, es obligatorio adquirir la licencia
            correspondiente. Se considera uso comercial: Subir canciones a
            plataformas digitales (Spotify, Apple Music, Tidal, etc.).
            Monetización en YouTube, TikTok o Instagram. Presentaciones en vivo
            o eventos pagados. Uso en publicidad, radio o televisión. Nota
            importante: El uso de un beat sin licencia puede resultar en
            reclamaciones por derechos de autor (Content ID) y la eliminación
            del contenido de las plataformas. ¡Apoya al productor! Al comprar tu
            licencia, no solo obtienes el audio en alta calidad y los derechos
            legales, sino que permites que IBRATT siga creando contenido para la
            comunidad.
          </span>
        </section>
      </div>
    </div>
  );
}
