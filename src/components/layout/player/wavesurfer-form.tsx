"use client";
import { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { usePlayerStore } from "@/store/player-store";
import { useShallow } from "zustand/shallow";

export function WaveSurferForm() {
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
    playlist,
    currentIndex,
  } = usePlayerStore(
    useShallow((state) => ({
      isPlaying: state.isPlaying,
      setCurrentTime: state.setCurrentTime,
      setDuration: state.setDuration,
      volume: state.volume,
      setWavesurfer: state.setWavesurfer,
      next: state.next,
      playlist: state.playlist,
      currentIndex: state.currentIndex,
    })),
  );

  const audioUrl = playlist[currentIndex]?.audioUrl;

  useEffect(() => {
    if (!containerRef.current || !audioUrl) return;

    wavesurferRef.current?.destroy();
    setIsReady(false);

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#666",
      progressColor: "hsl(350, 40%, 60%)",
      cursorColor: "transparent",
      height: 55,
      barWidth: 5,
      barGap: 4,
      barRadius: 5,
      normalize: true,
      interact: true,
      autoplay: isPlaying,
    });
    const safeAudioUrl = audioUrl.replace(/#/g, "%23");

    ws.load(safeAudioUrl).catch((error) => {
      if (error.name === "AbortError")
        console.log("Desacarga de beat cancelada (Cambio de pista o reload)");
      else console.log("Error al cargar beat en wavesurfer: ", error);
    });

    ws.on("ready", () => {
      setIsReady(true);
      setDuration(Math.floor(ws.getDuration()));
      ws.setVolume(volume / 100);
      wavesurferRef.current = ws;
      setWavesurfer(wavesurferRef as React.MutableRefObject<WaveSurfer>);

      // Agrega data-vaul-no-drag a todos los elementos internos
      if (containerRef.current) {
        containerRef.current
          .querySelectorAll("*")
          .forEach((el) => el.setAttribute("data-vaul-no-drag", ""));
      }
    });

    ws.on("audioprocess", () => {
      setCurrentTime(Math.floor(ws.getCurrentTime()));
    });

    // Cuando el usuario hace click en la onda, sincroniza el store
    ws.on("seeking", (currentTime) => {
      setCurrentTime(Math.floor(currentTime));
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

  useEffect(() => {
    const ws = wavesurferRef.current;
    if (!ws || !isReady) return;
    if (isPlaying) ws.play();
    else ws.pause();
  }, [isPlaying, isReady]);

  useEffect(() => {
    wavesurferRef.current?.setVolume(volume / 100);
  }, [volume]);

  return (
    <div
      ref={containerRef}
      data-vaul-no-drag
      className="w-full h-[55px] cursor-pointer hover:scale-y-145 active:scale-y-145 transition-transform duration-400"
    />
  );
}
