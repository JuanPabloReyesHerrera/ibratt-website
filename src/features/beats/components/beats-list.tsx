"use client";

import { BuyButton, PlayButton, LoadingSkeleton } from "@/shared/components";
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
      className="w-full md:w-[85%] px-4 overflow-auto"
      style={{
        // Habilita scroll suave en dispositivos iOS
        WebkitOverflowScrolling: "touch",
        // Crea un efecto de desvanecimiento (fade) en los bordes superior e inferior
        // Transparent al 0% y 100% (arriba y abajo), opaco en el medio
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 5%, black 92%, transparent 100%)",
        // Versión con prefijo -webkit para compatibilidad con navegadores basados en WebKit
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 5%, black 92%, transparent 100%)",
      }}
    >
      {/* ── Encabezados de columna ── */}
      <div className="flex items-center gap-3 px-3 mb-2 pb-3 border-b border-white/[0.06]">
        <span className="w-6 shrink-0" />
        <span className="w-11 shrink-0" />
        <span className="flex-1 text-[8.5px] tracking-[0.45em] uppercase text-white/25 font-sans font-medium">
          Track
        </span>
        <span className="w-20 text-[8.5px] tracking-[0.45em] uppercase text-white/25 text-center font-sans font-medium hidden sm:block">
          Genre
        </span>
        <span className="w-8 shrink-0" />
        <span className="w-16 text-[8.5px] tracking-[0.45em] uppercase text-white/25 text-right font-sans font-medium">
          License
        </span>
      </div>

      {/* ── Lista de beats ── */}
      <div className="flex flex-col">
        {playlist.map(
          ({ cover, name, genre, bpm, key, price, audioUrl, id }, i) => {
            const playing = isThisBeatPlaying(name);

            return (
              <div
                key={name}
                className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-xl border
                transition-all duration-300
                animate-in fade-in-0 slide-in-from-bottom
                ${
                  playing
                    ? "border-amber-400/25 bg-amber-400/[0.045] shadow-[0_0_18px_rgba(212,168,83,0.08)]"
                    : "border-transparent hover:border-white/[0.06] hover:bg-white/[0.025]"
                }
              `}
                style={{ animationDelay: `${i * 75}ms` }}
              >
                {/* Número de track — Cormorant italic */}
                <span
                  className="w-6 shrink-0 text-center text-[11px] select-none transition-colors duration-200"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: "italic",
                    color: playing ? "#D4A853" : "rgba(255,255,255,0.2)",
                  }}
                >
                  {playing ? "♪" : String(i + 1).padStart(2, "0")}
                </span>

                {/* Cover art */}
                <div className="w-11 shrink-0">
                  <BeatCover
                    cover={cover}
                    href={`/beats/${id}`}
                    alt={name}
                    size={12}
                  />
                </div>

                {/* Info de la pista */}
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <span
                    className="text-sm font-medium truncate leading-tight transition-colors duration-200"
                    style={{
                      fontFamily: "sans-serif",
                      color: playing
                        ? "rgba(255,255,255,0.92)"
                        : "rgba(255,255,255,0.72)",
                    }}
                  >
                    {name}
                  </span>

                  {/* Metadata: BPM + key */}
                  <div className="flex items-center gap-2">
                    {bpm && (
                      <span
                        className="text-[9px] tracking-[0.25em] uppercase font-sans"
                        style={{ color: "rgba(255,255,255,0.22)" }}
                      >
                        {bpm} BPM
                      </span>
                    )}
                    {bpm && key && (
                      <span
                        className="text-[8px]"
                        style={{ color: "rgba(255,255,255,0.12)" }}
                      >
                        ·
                      </span>
                    )}
                    {key && (
                      <span
                        className="text-[9px] tracking-[0.25em] font-sans"
                        style={{ color: "rgba(255,255,255,0.22)" }}
                      >
                        {key}
                      </span>
                    )}
                  </div>
                </div>

                {/* Genre pill */}
                <span
                  className="hidden sm:block w-20 text-center text-[8px] tracking-[0.3em] uppercase font-sans rounded-full px-2 py-1 border shrink-0"
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  {genre}
                </span>

                {/* Play button */}
                <div className="w-8 shrink-0 flex justify-center">
                  <PlayButton
                    variant="ghost"
                    strokeWidth={1}
                    size={8}
                    svgSize={6}
                    onClick={() => handlePlay(name)}
                    isPlaying={playing}
                  />
                </div>

                {/* Buy button */}
                <div className="w-16 flex justify-end shrink-0">
                  <BuyButton
                    label={`$${price}`}
                    product={{
                      id: name,
                      type: "beat",
                      title: name,
                      coverUrl: cover,
                      audioUrl: audioUrl,
                      metadata: { key: key, bpm: bpm, genre: genre },
                    }}
                    href={`/beats/${id}`}
                  />
                </div>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}
