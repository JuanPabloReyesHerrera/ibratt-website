/**
 * WAVESURFER FORM
 *
 * Integración de WaveSurfer.js con Zustand para reproducción de audio visual.
 * Características:
 * - Inicialización única de WaveSurfer al montar
 * - Carga dinámica de tracks sin recrear la instancia (mantiene AudioContext vivo)
 * - Sincronización bidireccional: estado global ↔ WaveSurfer
 * - Manejo de autoplay en Safari después de cambio automático de track
 * - Control de volumen y tiempo actual en tiempo real
 * - Drag-free para integración con drawer (vaul)
 */

"use client";
import { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { usePlayerStore } from "@/features/beats/store/player-store";
import { useShallow } from "zustand/shallow";

export function WaveSurferForm() {
  // Referencia al contenedor DOM donde renderiza WaveSurfer
  const containerRef = useRef<HTMLDivElement>(null);

  // Referencia a la instancia de WaveSurfer
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  // Flag que indica si WaveSurfer está listo (audio cargado y parseado)
  const [isReady, setIsReady] = useState(false);

  /**
   * Flag para rastrear si el cambio de track fue automático (finish) o manual
   * Usado en Safari para evitar problemas de AudioContext suspendido
   */
  const autoAdvanceRef = useRef(false);

  // Obtiene del store solo lo necesario para evitar re-renders innecesarios
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

  // URL del audio del track actual
  const audioUrl = playlist[currentIndex]?.audioUrl;

  /**
   * Effect 1: Crea WaveSurfer UNA sola vez al montar el componente
   * Configuración visual: colores, altura, ancho de barras, etc.
   * Listeners para eventos: ready, audioprocess, seeking, finish
   *
   * Se limpia al desmontar con destroy()
   */
  useEffect(() => {
    if (!containerRef.current) return;

    // Crea instancia de WaveSurfer con configuración visual
    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#666",
      progressColor: "hsl(350, 40%, 60%)", // Rosa/rojo para la onda reproducida
      cursorColor: "transparent",
      height: 55,
      barWidth: 5,
      barGap: 4,
      barRadius: 5,
      normalize: true,
      interact: true,
    });

    // Listener: cuando el audio está listo para reproducir
    ws.on("ready", () => {
      setIsReady(true);
      setDuration(Math.floor(ws.getDuration())); // Actualiza duración en store
      ws.setVolume(volume / 100);

      // Añade atributo para integración con drawer (vaul) — previene arrastre
      if (containerRef.current) {
        containerRef.current
          .querySelectorAll("*")
          .forEach((el) => el.setAttribute("data-vaul-no-drag", ""));
      }

      /**
       * Si el cambio de track fue automático (finish), iniciamos autoplay.
       * El AudioContext sigue vivo desde la interacción original del usuario,
       * evitando problemas en Safari donde el contexto se suspende.
       */
      if (autoAdvanceRef.current) {
        autoAdvanceRef.current = false;
        ws.play().catch((e) => console.error("Safari autoadvance error:", e));
      }
    });

    // Listener: actualiza el tiempo actual mientras se reproduce
    ws.on("audioprocess", () => {
      setCurrentTime(Math.floor(ws.getCurrentTime()));
    });

    // Listener: cuando el usuario busca/scrubea en la onda
    ws.on("seeking", (currentTime) => {
      setCurrentTime(Math.floor(currentTime));
    });

    // Listener: cuando termina la reproducción, avanza al siguiente track
    ws.on("finish", () => {
      // Marca que el próximo load debe autoplay automáticamente
      autoAdvanceRef.current = true;
      next();
    });

    wavesurferRef.current = ws;
    // Pasa la referencia al store para que otros componentes puedan controlar el player
    setWavesurfer(wavesurferRef as React.MutableRefObject<WaveSurfer>);

    // Cleanup: destruye WaveSurfer al desmontar
    return () => {
      ws.destroy();
      wavesurferRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← Solo se ejecuta UNA vez al montar

  /**
   * Effect 2: Cuando cambia la URL del audio, carga el nuevo track
   * Usa .load() en lugar de destroy+recrear para mantener AudioContext vivo en Safari
   * Decodifica # a %23 para URLs con caracteres especiales
   */
  useEffect(() => {
    const ws = wavesurferRef.current;
    if (!ws || !audioUrl) return;

    setIsReady(false);
    // Escapa caracteres especiales en la URL
    const safeAudioUrl = audioUrl.replace(/#/g, "%23");

    ws.load(safeAudioUrl).catch((error) => {
      // AbortError ocurre cuando se cancela un load anterior (normal)
      if (error.name !== "AbortError")
        console.error("Error al cargar beat:", error);
    });
  }, [audioUrl]);

  /**
   * Effect 3: Sincroniza isPlaying (estado global) con play/pause de WaveSurfer
   * Solo actúa si el audio está listo (isReady)
   */
  useEffect(() => {
    const ws = wavesurferRef.current;
    if (!ws || !isReady) return;
    if (isPlaying) ws.play().catch(console.error);
    else ws.pause();
  }, [isPlaying, isReady]);

  /**
   * Effect 4: Sincroniza volumen del store con WaveSurfer
   * Convierte de 0-100 a 0-1
   */
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
