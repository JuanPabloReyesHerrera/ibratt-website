import { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { usePlayerStore } from "@/store/player-store";

type WaveSurferFormOptions = {
  audioUrl: string;
  //   playbackRate: number;
  isPlaying: boolean;
  skipForward: boolean;
  skipBack: boolean;
  volume: number;

  //   onTimeUpdate: (time: number) => void;
  //   onDuration: (duration: number) => void;
  //   onFinish: () => void;
};

export function WaveSurferForm({
  audioUrl,
  isPlaying,
  skipForward,
  skipBack,
  volume,
}: WaveSurferFormOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [isReady, setIsReady] = useState(false);

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

    ws.on("ready", (dur) => {
      setIsReady(true);
      //onDuration(dur);
    });

    ws.on("timeupdate", (time) => {
      //onTimeUpdate(time);
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
  }, [isPlaying]);
  //skip back
  useEffect(() => {
    wavesurferRef.current?.skip(-15);
  }, [skipBack]);
  //skip forward
  useEffect(() => {
    wavesurferRef.current?.skip(15);
  }, [skipForward]);

  useEffect(() => {
    wavesurferRef.current?.setVolume(volume / 100);
  }, [volume]);

  // useEffect(() => {
  //   if (!wavesurferRef.current) return;
  //   setCurrentTime(Math.floor(wavesurferRef.current?.getCurrentTime()));
  // });

  return (
    <div
      ref={containerRef}
      className="h-full w-[calc(100%-120px)] cursor-pointer hover:scale-y-145 active:scale-y-145 transition-transform duration-400"
    />
  );
}
