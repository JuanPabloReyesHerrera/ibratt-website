"use client";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { ColapsedAudioPlayer } from "@/components/layout/player/colapsed-audio-player";
import { ExpandedAudioPlayer } from "./expanded-audio-player";
import { usePlayerStore } from "@/store/player-store";
import { useShallow } from "zustand/shallow";
import { WaveSurferForm } from "./wavesurfer-form";

import { Beat } from "@/types";

export function DrawerAudioPlayer({ beats }: { beats: Beat[] }) {
  const SNAP_POINT = ["100px", 1];
  const [snap, setSnap] = useState<string | number | null>(SNAP_POINT[0]);
  const isExpanded = snap === SNAP_POINT[1];

  const { playlist, setPlaylist } = usePlayerStore(
    useShallow((state) => ({
      playlist: state.playlist,
      setPlaylist: state.setPlaylist,
      currentIndex: state.currentIndex,
    })),
  );

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
        <Drawer.Content className="dark bg-linear-to-t from-primary to-black fixed bottom-0 left-0 right-0 z-50 flex flex-col h-[100dvh] rounded-t-lg p-6 shadow-lg">
          <Drawer.Title></Drawer.Title>
          <Drawer.Description></Drawer.Description>

          <div className="relative flex-1 p-4">
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
            <section
              className="absolute inset-0 transition-opacity duration-300"
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
