import { create } from "zustand";
import { Beat } from "@/types";

type PlayerState = {
  playlist: Beat[];
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  duration: number;
  currentTime: number;
  skipBack: boolean;
  skipForward: boolean;
  isLiked: boolean;

  wavesurfer: React.MutableRefObject<any> | null;

  setPlaylist: (beats: Beat[]) => void;
  setWavesurfer: (ref: React.MutableRefObject<any>) => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setSkipBack: () => void;
  setSkipForward: () => void;
  setIsLiked: () => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  playlist: [],
  currentIndex: 0,
  isPlaying: false,
  volume: 80,
  duration: 0,
  currentTime: 0,
  skipBack: false,
  skipForward: false,
  isLiked: false,

  wavesurfer: null,

  setPlaylist: (beats) => set({ playlist: beats, currentIndex: 0 }),
  setWavesurfer: (ref) => set({ wavesurfer: ref }),

  togglePlay: () => {
    const { isPlaying, wavesurfer } = get();
    const ws = wavesurfer?.current;

    if (!ws) return;

    if (isPlaying) ws.pause();
    else ws.play();

    set({ isPlaying: !isPlaying });
  },

  next: () => {
    const { currentIndex, playlist } = get();
    const nextIndex = (currentIndex + 1) % playlist.length;
    set({ currentIndex: nextIndex, isPlaying: true });
  },
  previous: () => {
    const { currentIndex, playlist } = get();
    const previousIndex =
      currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    set({ currentIndex: previousIndex, isPlaying: true });
  },

  setVolume: (volume) => set({ volume }),
  setDuration: (duration) => set({ duration }),
  setCurrentTime: (time) => set({ currentTime: time }),

  setSkipBack: () => {
    const { wavesurfer } = get();
    const ws = wavesurfer?.current;

    if (!ws) return;

    const currentTime = ws.getCurrentTime();
    const duration = ws.getDuration();
    const newTime = Math.min(0, currentTime - 15);

    ws.setTime(newTime);
  },
  setSkipForward: () => {
    const { wavesurfer } = get();
    const ws = wavesurfer?.current;

    if (!ws) return;

    const currentTime = ws.getCurrentTime();
    const duration = ws.getDuration();
    const newTime = Math.min(duration, currentTime + 15);

    ws.setTime(newTime);
  },

  setIsLiked: () => set((state) => ({ isLiked: !state.isLiked })),
}));
