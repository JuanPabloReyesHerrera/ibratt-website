"use client";

import { BuyButton, PlayButton, LoadingSkeleton } from "@/shared/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { usePlayerStore } from "@/features/audio-player/store/player-store";
import { useBeatPlayer } from "../hooks/use-beat-player";
import { BeatCover } from "./ui/beat-cover";

/**
 * Componente BeatCatalog
 * Renderiza un catálogo de beats en formato tabla con opciones para:
 * - Reproducir/pausar cada beat
 * - Ver portada, nombre, género y precio
 * - Comprar beats individuales
 */
export function BeatList() {
  // Obtiene la playlist del store global (lista de beats a mostrar)
  const playlist = usePlayerStore((state) => state.playlist);

  // Obtiene funciones para controlar la reproducción:
  // - isThisBeatPlaying: verifica si un beat está actualmente en reproducción
  // - handlePlay: inicia la reproducción de un beat específico
  const { isThisBeatPlaying, handlePlay } = useBeatPlayer();
  if (!playlist.length) return <LoadingSkeleton />;
  return (
    <section
      className="w-full md:w-[80%] h-full flex items-start justify-center p-4 overflow-auto"
      style={{
        // Habilita scroll suave en dispositivos iOS
        WebkitOverflowScrolling: "touch",
        // Crea un efecto de desvanecimiento (fade) en los bordes superior e inferior
        // Transparent al 0% y 100% (arriba y abajo), opaco en el medio
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)",
        // Versión con prefijo -webkit para compatibilidad con navegadores basados en WebKit
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)",
      }}
    >
      <Table className="dark table-fixed">
        {/* Título/descripción de la tabla */}
        <TableCaption className="text-foreground">Beats Catalog</TableCaption>

        {/* Encabezado de la tabla con las columnas */}
        <TableHeader className="animate-in fade-in slide-in-from-left-50 duration-500">
          <TableRow>
            <TableHead className="text-foreground">Play</TableHead>
            <TableHead className="text-foreground">Beat</TableHead>
            <TableHead className="text-foreground">Name</TableHead>
            <TableHead className="text-foreground">Genre</TableHead>
            <TableHead className="text-foreground">Price</TableHead>
          </TableRow>
        </TableHeader>

        {/* Cuerpo de la tabla: renderiza cada beat de la playlist */}
        <TableBody>
          {playlist.map(
            ({ cover, name, genre, bpm, key, price, audioUrl, id }, i) => (
              <TableRow
                key={name}
                className="border-b-foreground/10 animate-in fade-in-0 slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Columna 1: Botón de reproducción/pausa */}
                <TableCell>
                  <PlayButton
                    variant="outline"
                    strokeWidth={1}
                    size={10}
                    svgSize={6}
                    onClick={() => handlePlay(name)} // Al hacer clic, inicia reproducción del beat
                    isPlaying={isThisBeatPlaying(name)} // Indica si este beat está reproduciendo
                  />
                </TableCell>

                {/* Columna 2: Portada del beat (imagen) */}
                <TableCell>
                  <BeatCover
                    cover={cover}
                    href={`/beats/${id}`}
                    alt={name}
                    size={12}
                  />
                </TableCell>

                {/* Columna 3: Nombre del beat (truncado si es muy largo) */}
                <TableCell className="text-foreground truncate ">
                  {name}
                </TableCell>

                {/* Columna 4: Género del beat */}
                <TableCell className="text-foreground">{genre}</TableCell>

                {/* Columna 5: Botón de compra con precio */}
                <TableCell className="text-foreground">
                  <BuyButton
                    label={`$${price}`} // Muestra el precio en el botón
                    product={{
                      id: name,
                      type: "beat",
                      title: name,
                      coverUrl: cover,
                      audioUrl: audioUrl,
                      // Metadatos adicionales del beat para la compra
                      metadata: { key: key, bpm: bpm, genre: genre },
                    }}
                    href={`/beats/${id}`} // Link a la página de detalle del beat
                  />
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </section>
  );
}
