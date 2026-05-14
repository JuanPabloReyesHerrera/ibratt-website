/**
 * AUDIO PLAYER BUTTONS & CONTROLS
 *
 * Proporciona componentes de botones reutilizables para controlar la reproducción de audio:
 * - PlayerOptionsButton: botón fantasma compacto para opciones
 * - PlayerButton: botón base con variantes (outline, ghost, etc.)
 * - PlayButton: botón play/pausa que alterna entre estados
 * - AudioPlayerButtons: barra de control completa (skip, rewind, play, forward, volumen)
 *
 * Características:
 * - Tamaños dinámicos (6px a 22px)
 * - Iconos escalables
 * - Integración con Zustand para estado global de reproducción
 * - Controles responsivos (algunos botones solo visibles en md+)
 */

import {
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Button, Slider } from "../ui";
import { usePlayerStore } from "@/features/beats/store/player-store";
import { useShallow } from "zustand/shallow";
import { cn } from "@/lib/utils";

type PlayerButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  size?: 6 | 8 | 10 | 14 | 16 | 20 | 22;
  svgSize?: 6 | 8 | 10 | 14 | 16 | 20;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  isPlaying?: any;
  strokeWidth?: number;
};

// Mapeo de tamaños de SVG a clases Tailwind
const svgSizeClasses = {
  6: "[&_svg]:size-6!",
  8: "[&_svg]:size-8!",
  10: "[&_svg]:size-10!",
  14: "[&_svg]:size-14!",
  16: "[&_svg]:size-16!",
  20: "[&_svg]:size-20!",
} as const;

// Mapeo de tamaños de botón a clases Tailwind
const sizeClasses = {
  6: "size-6!",
  8: "size-8!",
  10: "size-10!",
  14: "size-14!",
  16: "size-16!",
  20: "size-20!",
  22: "size-22!",
} as const;

/**
 * PlayerOptionsButton
 * Botón pequeño tipo "ghost" con escala al hover.
 * Ideal para opciones secundarias en el player.
 */
export function PlayerOptionsButton({
  children,
  onClick,
  size = 8,
  className,
  svgSize = 6,
}: PlayerButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "[&_svg]:text-foreground hover:scale-115 active:scale-95 transition-transform duration-200 mx-1",
        svgSizeClasses[svgSize],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Button>
  );
}

/**
 * PlayerButton
 * Botón base del player con variantes personalizables.
 * Soporte para tamaños dinámicos de botón e iconos.
 */
export function PlayerButton({
  children,
  onClick,
  size = 10,
  svgSize = 6,
  className,
  variant = "outline",
}: PlayerButtonProps) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={cn(
        "[&_svg]:text-foreground transition-all",
        svgSizeClasses[svgSize],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Button>
  );
}

/**
 * PlayButton
 * Botón inteligente que alterna entre Play y Pause según el estado isPlaying.
 * Mostrará ícono de pausa si está reproduciendo, Play si está parado.
 *
 * ⚠️ BUG DETECTADO: En la línea de Play, dice {children} sin llaves
 * Debería ser {children} entre las etiquetas Play, no como string
 */
export function PlayButton({
  size = 10,
  onClick,
  isPlaying,
  variant,
  svgSize = 6,
  className,
  strokeWidth = 1,
  children,
}: PlayerButtonProps) {
  return (
    <PlayerButton
      svgSize={svgSize}
      size={size}
      onClick={onClick}
      variant={variant}
      className={cn("[&_svg]:text-foreground transition-all", className)}
    >
      {isPlaying ? (
        <Pause strokeWidth={strokeWidth}>{children}</Pause>
      ) : (
        <Play strokeWidth={strokeWidth}>{children}</Play>
      )}
    </PlayerButton>
  );
}

/**
 * AudioPlayerButtons
 * Barra de control completa del reproductor.
 * Incluye: skip anterior/siguiente, retroceder/adelantar 15s, play/pausa, control de volumen.
 *
 * Usa useShallow de Zustand para optimizar re-renders, seleccionando solo el estado necesario.
 */
export function AudioPlayerButtons({
  size,
  strokeWidth = 1,
  svgSize = 10,
}: PlayerButtonProps) {
  // Obtiene solo el estado necesario del store para evitar re-renders innecesarios
  const {
    isPlaying,
    togglePlay,
    setSkipBack,
    setSkipForward,
    next,
    previous,
    volume,
    setVolume,
  } = usePlayerStore(
    useShallow((state) => ({
      isPlaying: state.isPlaying,
      togglePlay: state.togglePlay,
      setSkipBack: state.setSkipBack,
      setSkipForward: state.setSkipForward,
      next: state.next,
      previous: state.previous,
      volume: state.volume,
      setVolume: state.setVolume,
    })),
  );

  return (
    <div className="flex justify-center items-center w-full max-w-md gap-5">
      {/* Botón: ir a beat anterior */}
      <PlayerButton
        size={size}
        svgSize={svgSize}
        onClick={() => {
          previous();
        }}
      >
        <SkipBack strokeWidth={strokeWidth} />
      </PlayerButton>

      {/* Botón: retroceder 15 segundos (solo visible en pantallas md+) */}
      <PlayerButton
        size={size}
        svgSize={svgSize}
        className={`hidden md:flex `}
        onClick={() => {
          setSkipBack();
        }}
      >
        <RotateCcw strokeWidth={strokeWidth} />
        <span className="absolute text-[10px] font-bold">-15</span>
      </PlayerButton>

      {/* Botón: play/pausa (principal) */}
      <PlayButton
        onClick={() => {
          togglePlay();
        }}
        isPlaying={isPlaying}
        svgSize={svgSize}
        size={size}
        strokeWidth={strokeWidth}
      />

      {/* Botón: adelantar 15 segundos (solo visible en pantallas md+) */}
      <PlayerButton
        size={size}
        svgSize={svgSize}
        className={`hidden md:flex `}
        onClick={() => {
          setSkipForward();
        }}
      >
        <RotateCw strokeWidth={strokeWidth} />
        <span className="absolute text-[10px] font-bold">+15</span>
      </PlayerButton>

      {/* Botón: ir a siguiente beat */}
      <PlayerButton size={size} svgSize={svgSize} onClick={() => next()}>
        <SkipForward strokeWidth={strokeWidth} />
      </PlayerButton>

      {/* Slider de volumen (solo visible en pantallas md+) */}
      <Slider
        step={1}
        max={100}
        defaultValue={[volume]}
        onValueChange={(value) => setVolume(value[0])}
        className="hidden h-4 md:flex w-full max-w-xs min-w-20 mx-2"
      />
    </div>
  );
}
