import { create } from "zustand";
import { Beat } from "@/features/beats/core/beat.types";

/**
 * Define la forma del estado global del reproductor de audio.
 * Incluye tanto los datos del estado como las acciones para modificarlo.
 */
type PlayerState = {
  // --- ESTADO ---

  /** Lista de beats cargados en el reproductor */
  playlist: Beat[];

  /** Índice del beat que se está reproduciendo actualmente */
  currentIndex: number;

  /** Indica si el reproductor está reproduciendo audio en este momento */
  isPlaying: boolean;

  /** Volumen actual del reproductor (0–100) */
  volume: number;

  /** Duración total del beat actual en segundos */
  duration: number;

  /** Tiempo de reproducción actual en segundos */
  currentTime: number;

  /** Señal para retroceder 15 segundos (toggle interno) */
  skipBack: boolean;

  /** Señal para avanzar 15 segundos (toggle interno) */
  skipForward: boolean;

  /** Indica si el beat actual está marcado como favorito */
  isLiked: boolean;

  /**
   * Referencia mutable a la instancia de WaveSurfer.
   * Se usa para controlar la reproducción directamente sobre el visualizador de audio.
   */
  wavesurfer: React.MutableRefObject<any> | null;

  // --- ACCIONES ---

  /** Reproduce el beat en la posición `index` de la playlist */
  playBeat: (index: number) => void;

  /** Reemplaza la playlist completa y reinicia el índice a 0 */
  setPlaylist: (beats: Beat[]) => void;

  /** Registra la referencia de WaveSurfer en el store */
  setWavesurfer: (ref: React.MutableRefObject<any>) => void;

  /** Alterna entre reproducir y pausar el beat actual */
  togglePlay: () => void;

  /** Avanza al siguiente beat en la playlist (vuelve al inicio si es el último) */
  next: () => void;

  /**
   * Retrocede al beat anterior.
   * Si el tiempo actual supera los 3 segundos, reinicia el beat en lugar de cambiar.
   */
  previous: () => void;

  /** Actualiza el volumen del reproductor */
  setVolume: (volume: number) => void;

  /** Actualiza la duración total del beat actual */
  setDuration: (duration: number) => void;

  /** Actualiza el tiempo de reproducción actual */
  setCurrentTime: (time: number) => void;

  /** Retrocede 15 segundos en el beat actual */
  setSkipBack: () => void;

  /** Avanza 15 segundos en el beat actual */
  setSkipForward: () => void;

  /** Alterna el estado de "me gusta" del beat actual */
  setIsLiked: () => void;

  /** Mueve la reproducción a un tiempo específico en segundos */
  seekTo: (time: number) => void;
};

/**
 * Store global del reproductor de audio, creado con Zustand.
 *
 * Centraliza todo el estado relacionado con la reproducción:
 * playlist, beat activo, volumen, tiempo, y control de WaveSurfer.
 */
export const usePlayerStore = create<PlayerState>((set, get) => ({
  // --- VALORES INICIALES ---
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

  // --- IMPLEMENTACIÓN DE ACCIONES ---

  /**
   * Cambia el beat activo al índice recibido y lo reproduce inmediatamente.
   * Accede a WaveSurfer directamente para iniciar la reproducción de audio.
   */
  playBeat: (index) => {
    const { wavesurfer } = get();
    const ws = wavesurfer?.current;
    set({ currentIndex: index, isPlaying: true });
    if (ws) ws.play();
  },

  /** Carga una nueva playlist y reinicia el índice al primer beat */
  setPlaylist: (beats) => set({ playlist: beats, currentIndex: 0 }),

  /** Guarda la referencia de WaveSurfer para poder controlarlo desde el store */
  setWavesurfer: (ref) => set({ wavesurfer: ref }),

  /**
   * Pausa si está reproduciendo, reproduce si está pausado.
   * No hace nada si WaveSurfer aún no está inicializado.
   */
  togglePlay: () => {
    const { isPlaying, wavesurfer } = get();
    const ws = wavesurfer?.current;

    if (!ws) return;

    if (isPlaying) ws.pause();
    else ws.play();

    set({ isPlaying: !isPlaying });
  },

  /**
   * Avanza al siguiente beat de la playlist.
   * Si el beat actual es el último, vuelve al primero (comportamiento circular).
   */
  next: () => {
    const { currentIndex, playlist } = get();
    const nextIndex = (currentIndex + 1) % playlist.length;
    set({ currentIndex: nextIndex, isPlaying: true });
  },

  /**
   * Lógica del botón "anterior":
   * - Si el tiempo actual es mayor a 3 segundos → reinicia el beat desde el inicio.
   * - Si el tiempo actual es menor o igual a 3 segundos → va al beat anterior.
   *   Si ya es el primero, salta al último de la playlist.
   */
  previous: () => {
    const { currentIndex, playlist, currentTime, wavesurfer } = get();

    if (currentTime > 3) {
      console.log(currentTime);
      set({ currentTime: 0 });
      if (wavesurfer && wavesurfer?.current) wavesurfer.current.setTime(0);
    } else {
      const previousIndex =
        currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
      set({ currentIndex: previousIndex, isPlaying: true });
    }
  },

  /** Actualiza el volumen en el estado */
  setVolume: (volume) => set({ volume }),

  /** Actualiza la duración total del beat en el estado */
  setDuration: (duration) => set({ duration }),

  /** Actualiza el tiempo de reproducción actual en el estado */
  setCurrentTime: (time) => set({ currentTime: time }),

  /**
   * Retrocede 15 segundos en el beat actual.
   * Si el resultado es negativo, se clampea en 0 gracias a Math.min con la duración
   * (nota: debería usarse Math.max para el límite inferior; este es un posible bug).
   */
  setSkipBack: () => {
    const { wavesurfer } = get();
    const ws = wavesurfer?.current;

    if (!ws) return;

    const currentTime = ws.getCurrentTime();
    const duration = ws.getDuration();
    const newTime = Math.max(0, currentTime - 15);

    ws.setTime(newTime);
  },

  /**
   * Avanza 15 segundos en el beat actual.
   * Si supera la duración total, se clampea al final del beat.
   */
  setSkipForward: () => {
    const { wavesurfer } = get();
    const ws = wavesurfer?.current;

    if (!ws) return;

    const currentTime = ws.getCurrentTime();
    const duration = ws.getDuration();
    const newTime = Math.min(duration, currentTime + 15);

    ws.setTime(newTime);
  },

  /** Invierte el estado de "me gusta" del beat actual */
  setIsLiked: () => set((state) => ({ isLiked: !state.isLiked })),

  /**
   * Mueve la reproducción a un tiempo exacto en segundos.
   * Actualiza tanto WaveSurfer como el estado del store para mantenerlos sincronizados.
   */
  seekTo: (time) => {
    const { wavesurfer } = get();
    const ws = wavesurfer?.current;
    if (!ws) return;
    ws.setTime(time);
    set({ currentTime: time });
  },
}));
