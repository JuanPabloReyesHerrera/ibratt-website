import { create } from "zustand";
import { Beat } from "@/types";

type PlayerState = {
  playlist: Beat[];
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  duration: number;
  currentTime: number;

  setPlaylist: (beats: Beat[]) => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  playlist: [],
  currentIndex: 0,
  isPlaying: false,
  volume: 80,
  duration: 0,
  currentTime: 0,

  setPlaylist: (beats) => set({ playlist: beats, currentIndex: 0 }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  next: () => {
    const { currentIndex, playlist } = get();
    const nextIndex = (currentIndex + 1) % playlist.length;
    set({ currentIndex: nextIndex, isPlaying: true });
  },
  previous: () => {
    const { currentIndex, playlist } = get();
    const previousIdex =
      currentIndex - 1 === 0 ? playlist.length - 1 : currentIndex - 1;
    set({ currentIndex: previousIdex, isPlaying: true });
  },
  setVolume: (volume) => set({ volume }),
  setDuration: (duration) => set({ duration }),
  setCurrentTime: (time) => set({ currentTime: time }),
}));
