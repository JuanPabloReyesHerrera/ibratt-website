/**
 * EXPANDED AUDIO PLAYER
 *
 * Vista expandida del reproductor de audio (pantalla completa del drawer).
 * Características:
 * - Portada grande del beat (tamaño 70)
 * - Información del beat: nombre, género, BPM, tonalidad
 * - Waveform visual (WaveSurfer integrado)
 * - Controles completos: play/pause, shuffle, repeat
 * - Botones secundarios: like, share, playlist, headphones
 * - Timestamps de progreso (tiempo actual / duración)
 * - Layout vertical centrado con espaciado amplio
 */

"use client";

import Link from "next/link";
import { usePlayerStore } from "@/features/audio-player/store/player-store";
import { useShallow } from "zustand/shallow";
import { formatDuration } from "@/lib/utils";
import { AudioPlayerButtons, PlayerOptionsButton } from "@/shared/components";
import {
  ChevronDown,
  Ellipsis,
  Headphones,
  Heart,
  HeartPlus,
  List,
  Repeat,
  Share,
  Shuffle,
} from "lucide-react";
import { ReactNode } from "react";
import { BeatCover } from "@/features/beats/components/ui/beat-cover";
import { LoadingSkeleton } from "@/shared/components";

export function ExpandedAudioPlayer({ wavesurfer }: { wavesurfer: ReactNode }) {
  // Obtiene del store solo el estado necesario
  const { currentIndex, playlist, currentTime, duration, isLiked, setIsLiked } =
    usePlayerStore(
      useShallow((state) => ({
        currentIndex: state.currentIndex,
        setPlaylist: state.setPlaylist,
        playlist: state.playlist,
        currentTime: state.currentTime,
        duration: state.duration,
        isLiked: state.isLiked,
        setIsLiked: state.setIsLiked,
      })),
    );

  // Obtiene el beat actual y desestructura propiedades
  const currentBeat = playlist[currentIndex];
  const { cover, name, genre, bpm, key, id } = currentBeat;

  /**
   * Fallback: si el beat no existe todavía (undefined),
   * retorna un estado de carga
   */
  if (!currentBeat) return <LoadingSkeleton />;

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-16">
      {/* Header: botones de cerrar (chevron down) y menú (ellipsis) */}
      <section className="w-full flex flex-row justify-between items-center">
        <PlayerOptionsButton size={8}>
          <ChevronDown />
        </PlayerOptionsButton>
        <PlayerOptionsButton size={8}>
          <Ellipsis />
        </PlayerOptionsButton>
      </section>

      {/* Portada del beat grande (70px) */}
      <BeatCover cover={cover} href={`/beats/${id}`} alt={name} size={70} />

      {/* Sección principal: info + waveform + controles */}
      <section className="w-[90dvw] h-[20dvh] flex flex-col items-center space-y-2">
        {/* Info del beat: nombre, género, BPM, tonalidad + botón like */}
        <div className="w-full flex flex-row justify-between items-center">
          <div>
            {/* Link al beat (usa ID extraído de audioUrl) */}
            <Link
              href={`/beats/${id}`}
              className="flex items-end text-muted-foreground font-bold hover:text-primary transition-colors"
            >
              <h1>{name}</h1>
            </Link>
            {/* Metadatos: género, BPM, tonalidad */}
            <p className="flex w-full flex-row justify-start items-start text-muted-foreground font-bold text-[10px] md:text-sm lg:text-base">
              {genre} Bpm: {bpm} Key: {key}
            </p>
          </div>

          {/* Botón like/unlike */}
          <PlayerOptionsButton size={8} onClick={() => setIsLiked()}>
            {isLiked ? (
              <Heart strokeWidth={0} className="fill-red-500 text-red-500" />
            ) : (
              <HeartPlus />
            )}
          </PlayerOptionsButton>
        </div>

        {/* Waveform visual (WaveSurfer) */}
        {/* {<WaveSurferForm audioUrl={audioUrl} />} */}
        {wavesurfer}

        {/* Timestamps: tiempo actual / duración total */}
        <div className="w-full flex flex-row items-center justify-between text-xs font-bold text-muted-foreground">
          <span>{formatDuration(currentTime)}</span>
          <span>{formatDuration(duration)}</span>
        </div>

        {/* Row 1: Shuffle | Controles principales (skip, play, forward, volumen) | Repeat */}
        <div className="w-full h-full flex flex-row justify-between items-center">
          <PlayerOptionsButton>
            <Shuffle />
          </PlayerOptionsButton>

          <AudioPlayerButtons size={16} strokeWidth={2} />

          <PlayerOptionsButton>
            <Repeat />
          </PlayerOptionsButton>
        </div>

        {/* Row 2: Headphones | Share + Playlist */}
        <div className="w-full h-full flex flex-row justify-between items-center">
          <PlayerOptionsButton>
            <Headphones />
          </PlayerOptionsButton>

          <div>
            <PlayerOptionsButton>
              <Share />
            </PlayerOptionsButton>
            <PlayerOptionsButton>
              <List />
            </PlayerOptionsButton>
          </div>
        </div>
      </section>
    </div>
  );
}
