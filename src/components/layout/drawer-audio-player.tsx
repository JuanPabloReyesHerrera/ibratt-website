"use client";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { ColapsedAudioPlayer } from "@/components/layout/player/colapsed-audio-player";
import { ExpandedAudioPlayer } from "./player/expanded-audio-player";
import { MOCK_BEATS } from "@/lib/mock-data";
import { usePlayerStore } from "@/store/player-store";
import { useShallow } from "zustand/shallow";
import { WaveSurferForm } from "./player/wavesurfer-form";

export function DrawerAudioPlayer() {
  const SNAP_POINT = ["100px", 1];
  const [snap, setSnap] = useState<string | number | null>(SNAP_POINT[0]);
  const isExpanded = snap === SNAP_POINT[1];

  const { playlist, setPlaylist, currentIndex } = usePlayerStore(
    useShallow((state) => ({
      playlist: state.playlist,
      setPlaylist: state.setPlaylist,
      currentIndex: state.currentIndex,
    })),
  );

  useEffect(() => {
    if (playlist.length === 0) setPlaylist(MOCK_BEATS);
  }, [setPlaylist, playlist.length]);

  const currentBeat = playlist[currentIndex];

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

          <div className="flex-1 overflow-hidden p-4">
            {isExpanded ? <ExpandedAudioPlayer /> : <ColapsedAudioPlayer />}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
