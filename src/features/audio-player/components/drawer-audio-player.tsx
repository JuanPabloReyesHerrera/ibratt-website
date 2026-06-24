/**
 * DRAWER AUDIO PLAYER
 *
 * Contenedor principal del reproductor de audio con drawer expandible (vaul).
 * Características:
 * - Drawer con dos snap points: colapsado (100px) y expandido (pantalla completa)
 * - Toggle entre vista compacta (ColapsedAudioPlayer) y expandida (ExpandedAudioPlayer)
 * - Sincronización con Zustand: carga beats en la playlist al montar
 * - WaveSurfer integrado en la vista expandida
 * - Transiciones suaves de opacidad entre vistas
 */

"use client";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { ColapsedAudioPlayer } from "@/features/audio-player/components/colapsed-audio-player";
import { ExpandedAudioPlayer } from "./expanded-audio-player";
import { usePlayerStore } from "@/features/audio-player/store/player-store";
import { useShallow } from "zustand/shallow";
import { WaveSurferForm } from "../core/wavesurfer-form";

import type { Beat } from "@/features/beats/core";

export function DrawerAudioPlayer({ beats }: { beats: Beat[] }) {
  // Puntos de snap del drawer: colapsado (100px) y expandido (pantalla completa)
  const SNAP_POINT = ["64px", 1];

  // Estado actual del snap point
  const [snap, setSnap] = useState<string | number | null>(SNAP_POINT[0]);

  // Determina si el drawer está completamente expandido
  const isExpanded = snap === SNAP_POINT[1];

  // Obtiene playlist y función para actualizarla del store
  const { playlist, setPlaylist } = usePlayerStore(
    useShallow((state) => ({
      playlist: state.playlist,
      setPlaylist: state.setPlaylist,
      currentIndex: state.currentIndex,
    })),
  );

  /**
   * Effect: Inicializa la playlist con los beats pasados como prop
   * Solo se ejecuta si la playlist está vacía para evitar sobrescrituras
   */
  useEffect(() => {
    if (playlist.length === 0) setPlaylist(beats);
  }, [setPlaylist, playlist.length]);

  return (
    <Drawer.Root
      open={true}
      snapPoints={SNAP_POINT}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      modal={false}
      dismissible={false}
    >
      <Drawer.Portal>
        <Drawer.Content className="shadow-2xl shadow-white dark bg-linear-to-b from-black/90 from-30% via-gray-950 to-primary/50 backdrop-blur-lg fixed bottom-0 left-0 right-0 z-50 flex flex-col h-full rounded-t-md">
          {/* Titles ocultos pero necesarios para accesibilidad */}
          <Drawer.Title></Drawer.Title>
          <Drawer.Description></Drawer.Description>

          {/* Contenedor de vistas intercambiables */}
          <div className="relative flex-1 p-4">
            {/* Vista expandida: muestra reproductor completo con WaveSurfer */}
            <section
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: isExpanded ? 1 : 0,
                pointerEvents: isExpanded ? "auto" : "none",
                zIndex: isExpanded ? 10 : 0,
              }}
            >
              <ExpandedAudioPlayer wavesurfer={<WaveSurferForm />} />
            </section>

            {/* Vista colapsada: muestra reproductor compacto */}
            <section
              className="absolute inset-0 transition-opacity duration-300 h-full"
              style={{
                opacity: isExpanded ? 0 : 1,
                pointerEvents: isExpanded ? "none" : "auto",
                zIndex: isExpanded ? 0 : 10,
              }}
            >
              <ColapsedAudioPlayer />
            </section>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
