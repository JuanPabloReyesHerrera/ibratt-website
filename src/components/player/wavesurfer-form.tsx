import { useState, useEffect, useRef, use } from "react";
import WaveSurfer from "wavesurfer.js";
import { useShallow } from "zustand/shallow";
import { usePlayerStore } from "@/store/player-store";

type WaveSurferFormOptions = {
  audioUrl: string;
  //   playbackRate: number;

  skipForward: boolean;
  skipBack: boolean;
  volume: number;

  //   onTimeUpdate: (time: number) => void;
  //   onDuration: (duration: number) => void;
  //   onFinish: () => void;
};

export function WaveSurferForm({
  audioUrl,

  skipForward,
  skipBack,
  volume,
}: WaveSurferFormOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [isReady, setIsReady] = useState(false);

  const { isPlaying, currentTime, setCurrentTime, duration, setDuration } =
    usePlayerStore(
      useShallow((state) => ({
        isPlaying: state.isPlaying,
        currentTime: state.currentTime,
        setCurrentTime: state.setCurrentTime,
        duration: state.duration,
        setDuration: state.setDuration,
      })),
    );

  //wavesurferRef.current?.destroy();

  // Initialize WaveSurfer when audioUrl changes
  useEffect(() => {
    if (!containerRef.current) return;
    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#999",
      progressColor: "hsl(350, 40%, 60%)",
      cursorColor: "#transparent",
      height: 55,
      barWidth: 5,
      barGap: 4,
      barRadius: 5,
      normalize: true,
    });

    ws.load(audioUrl);

    ws.on("ready", () => {
      setIsReady(true);
      setDuration(Math.floor(wavesurferRef.current?.getDuration() || 0));
    });

    ws.on("finish", () => {
      //onFinish();
    });

    wavesurferRef.current = ws;

    return () => {
      ws.destroy();
      setIsReady(false);
    };
  }, [audioUrl]);
  // Play/pause when isPlaying changes
  useEffect(() => {
    wavesurferRef.current?.playPause();
    console.log("isPlaying wavesurfer:", isPlaying);
  }, [isPlaying]);
  //skip back
  useEffect(() => {
    wavesurferRef.current?.skip(-15);
  }, [skipBack]);
  //skip forward
  useEffect(() => {
    wavesurferRef.current?.skip(15);
  }, [skipForward]);
  //Volume
  useEffect(() => {
    wavesurferRef.current?.setVolume(volume / 100);
  }, [volume]);

  useEffect(() => {
    const ws = wavesurferRef.current;
    if (!ws) return;

    ws.on("audioprocess", () => {
      setCurrentTime(Math.floor(ws.getCurrentTime()));
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-[calc(100%-120px)] cursor-pointer hover:scale-y-145 active:scale-y-145 transition-transform duration-400"
    />
  );
}
