import { usePlayerStore } from "@/features/audio-player/store/player-store";
import { useShallow } from "zustand/shallow";

export function useBeatPlayer() {
  // Tomamos solo lo que necesitamos del store global
  const { playlist, currentIndex, isPlaying, playBeat, togglePlay } =
    usePlayerStore(
      useShallow((state) => ({
        playlist: state.playlist,
        currentIndex: state.currentIndex,
        isPlaying: state.isPlaying,
        playBeat: state.playBeat,
        togglePlay: state.togglePlay,
      })),
    );

  // Si el beat que tocaron ya es el actual → pausa/reanuda
  // Si es uno diferente → búscalo en la playlist y reprodúcelo
  function handlePlay(beatName: string) {
    if (!playlist.length) return;

    if (beatName === playlist[currentIndex].name) {
      togglePlay();
    } else {
      const index = playlist.findIndex((beat) => beat.name === beatName);
      if (index === -1) return;
      playBeat(index);
    }
  }

  // Devuelve true solo si este beat específico está sonando ahora mismo
  function isThisBeatPlaying(beatName: string) {
    return beatName === playlist[currentIndex]?.name && isPlaying;
  }

  return { handlePlay, isThisBeatPlaying };
}
