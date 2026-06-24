/**
 * COLLAPSED AUDIO PLAYER
 *
 * Vista compacta del reproductor de audio (estado colapsado del drawer).
 * Características:
 * - Portada del beat + nombre (visible en sm+)
 * - Controles de reproducción: skip, play/pause, forward, volumen
 * - Botones de opciones: like/unlike, menú (ellipsis)
 * - Slider de progreso con timestamps (tiempo actual / duración)
 * - Layout grid de 3 columnas: info | controles | opciones
 * - Fallback si no hay beat cargado
 */

"use client";
import { Slider } from "@/components/ui";

import { usePlayerStore } from "@/features/audio-player/store/player-store";
import { useShallow } from "zustand/shallow";
import { formatDuration } from "@/lib/utils";
import {
  PlayerOptionsButton,
  AudioPlayerButtons,
  LoadingSkeleton,
} from "@/shared/components";
import { Ellipsis, Heart, HeartPlus } from "lucide-react";
import { BeatCover } from "@/features/beats/components/ui/beat-cover";

export function ColapsedAudioPlayer() {
  // Obtiene del store solo el estado necesario para evitar re-renders
  const {
    currentIndex,
    playlist,
    currentTime,
    duration,
    isLiked,
    setIsLiked,
    seekTo,
  } = usePlayerStore(
    useShallow((state) => ({
      currentIndex: state.currentIndex,
      playlist: state.playlist,
      currentTime: state.currentTime,
      duration: state.duration,
      skipBack: state.skipBack,
      skipForward: state.skipForward,
      volume: state.volume,
      isLiked: state.isLiked,
      setIsLiked: state.setIsLiked,
      seekTo: state.seekTo,
    })),
  );

  // Obtiene el beat actual basado en el índice
  const currentBeat = playlist[currentIndex];

  // Fallback si no hay beat cargado
  if (!currentBeat) {
    return <LoadingSkeleton />;
  }

  const { cover, name, id } = currentBeat;

  return (
    <div className="flex flex-col items-center justify-start h-svh ">
      <section className="dark w-full h-audioplayer flex flex-col justify-between">
        {/* Fila principal: 3 columnas (cover | controles | opciones) */}
        <div className="grid grid-cols-3 items-center px-4 pt-1">
          {/* columna 1: Portada + nombre del beat */}
          <div className="flex flex-row space-x-2 overflow-hidden">
            <BeatCover
              cover={cover}
              href={`/beats/${id}`}
              alt={name}
              size={12}
            />
            <div className="flex justify-start items-end">
              <p className=" hidden sm:flex truncate underline underline-offset-3">
                {name}
              </p>
            </div>
          </div>

          {/* Columna 2: Controles de reproducción (skip back, play/pause, skip forward, volumen) */}
          <AudioPlayerButtons
            variant="ghost"
            strokeWidth={1}
            size={10}
            svgSize={8}
          />

          {/* Columna 3: Botones de opciones (like, menú) */}
          <div className="flex flex-row justify-end items-center">
            {/* Botón like/unlike */}
            <PlayerOptionsButton size={6} onClick={() => setIsLiked()}>
              {isLiked ? (
                <Heart strokeWidth={0} className="fill-red-500 text-red-500" />
              ) : (
                <HeartPlus />
              )}
            </PlayerOptionsButton>

            {/* Botón menú (opciones adicionales) */}
            <PlayerOptionsButton size={6}>
              <Ellipsis />
            </PlayerOptionsButton>
          </div>
        </div>
        {/* Barra de progreso: slider */}
        <section className="">
          {/* Slider de progreso: permite seekTo (saltar a un tiempo específico) */}
          <Slider
            className="w-full"
            value={[currentTime]}
            defaultValue={[0]}
            min={0}
            max={duration || 100}
            onValueChange={(values) => seekTo(values[0])}
            data-vaul-no-drag
          />
        </section>
      </section>
    </div>
  );
}
