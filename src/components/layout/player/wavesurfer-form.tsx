"use client";
import { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { usePlayerStore } from "@/store/player-store";
import { useShallow } from "zustand/shallow";

type WaveSurferFormOptions = {
  audioUrl: string;
};

export function WaveSurferForm({ audioUrl }: WaveSurferFormOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [isReady, setIsReady] = useState(false);

  const {
    isPlaying,
    setCurrentTime,
    setDuration,
    volume,
    setWavesurfer,
    next,
  } = usePlayerStore(
    useShallow((state) => ({
      isPlaying: state.isPlaying,
      setCurrentTime: state.setCurrentTime,
      setDuration: state.setDuration,
      volume: state.volume,
      setWavesurfer: state.setWavesurfer,
      next: state.next,
    })),
  );

  // Initialize WaveSurfer when audioUrl changes
  useEffect(() => {
    if (!containerRef.current) return;

    wavesurferRef.current?.destroy();
    setIsReady(false);

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
      //url: audioUrl,
    });

    ws.load(audioUrl);

    ws.on("ready", () => {
      setIsReady(true);
      setDuration(Math.floor(wavesurferRef.current?.getDuration() || 0));
      ws.setVolume(volume / 100);
      wavesurferRef.current = ws;

      setWavesurfer(wavesurferRef as React.MutableRefObject<WaveSurfer>);
    });

    ws.on("audioprocess", () => {
      setCurrentTime(Math.floor(ws.getCurrentTime()));
    });

    ws.on("finish", () => {
      next();
    });

    wavesurferRef.current = ws;

    return () => {
      ws.destroy();
      setIsReady(false);
    };
  }, [audioUrl]);

  // Play/pause when isPlaying changes
  useEffect(() => {
    const ws = wavesurferRef.current;
    if (!ws || !isReady) return;

    if (isPlaying) ws.play();
    else ws.pause();
  }, [isPlaying, isReady]);

  //Volume
  useEffect(() => {
    wavesurferRef.current?.setVolume(volume / 100);
  }, [volume]);

  return (
    <div
      ref={containerRef}
      className="h-full w-[calc(100%-120px)] cursor-pointer hover:scale-y-145 active:scale-y-145 transition-transform duration-400"
    />
  );
}
