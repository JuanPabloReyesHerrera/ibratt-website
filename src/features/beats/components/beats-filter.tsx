/**
 * BEATS FILTER
 *
 * Componente de filtrado dinámico para búsqueda y filtros de beats.
 * Características:
 * - Barra de búsqueda expandible (animada)
 * - Toggle group para filtros: KEY, BPM, GENRE
 * - Panel desplegable de géneros con chips seleccionables
 * - Cierre automático con Escape o click fuera
 * - Animaciones suaves (cubic-bezier personalizados)
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search } from "lucide-react";
import { useBeatsFilter } from "../hooks/use-beats-filters";
import { GENRES } from "../core";

export function BeatsFilter() {
  // Estado para controlar si el input de búsqueda está abierto
  const [searchOpen, setSearchOpen] = useState(false);

  // Referencias al DOM para manejar focus y detección de clicks fuera
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Obtiene del hook: búsqueda, filtros activos (KEY, BPM, GENRE), géneros seleccionados
  const {
    search,
    setSearch,
    activeFilters,
    toggleFilter,
    selectedGenres,
    toggleGenre,
  } = useBeatsFilter();

  // Determina si el panel de géneros está visible
  const genreOpen = activeFilters.includes("genre");

  /**
   * Effect 1: Hace focus al input cuando se abre
   * Usa setTimeout para dejar que termine la animación (260ms) antes de hacer focus
   */
  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 260);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  /**
   * Effect 2: Cierra el search con Escape o si se hace click fuera del contenedor
   * Limpia listeners al desmontar o cambiar searchOpen
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) setSearchOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-2 w-[90dvw] md:max-w-[75vw] lg:max-w-[55vw] z-10 animate-in fade-in slide-in-from-right-50 duration-500"
    >
      {/* Barra principal de filtros y búsqueda */}
      <div className="h-11 bg-[#111] flex flex-row items-center border border-white/10 rounded-[14px] px-1.5 pl-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_3px_rgba(0,0,0,0.6)]">
        {/* Botón toggle para abrir/cerrar búsqueda */}
        <button
          onClick={() => setSearchOpen((prev) => !prev)}
          aria-label="Toggle search"
          className="size-9 flex items-center justify-center rounded-[10px] shrink-0 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Search
            className={`size-3.5 transition-colors ${
              searchOpen ? "text-white/70" : "text-white/30"
            }`}
          />
        </button>

        {/* Input expandible con animación de ancho */}
        <div
          className={`overflow-hidden transition-[width] duration-250 ease-in-out shrink-0 ${
            searchOpen ? "w-40" : "w-0"
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search beats..."
            className="bg-transparent border-none outline-none font-mono text-xs text-white/60 placeholder:text-white/20 tracking-wider w-40"
          />
        </div>

        {/* Espaciador flexible + divisor visual */}
        <div className="flex-1" />
        <div className="w-px h-5 bg-white/8 mx-2 shrink-0" />

        {/* Toggle group: selecciona qué filtros mostrar (KEY, BPM, GENRE) */}
        <ToggleGroup
          type="multiple"
          value={activeFilters}
          onValueChange={toggleFilter}
          className="gap-0.5 shrink-0"
        >
          {(["KEY", "BPM", "GENRE"] as const).map((filter) => (
            <ToggleGroupItem
              key={filter}
              value={filter.toLowerCase()}
              className="h-8 px-2.5 rounded-[9px] font-mono text-[10px] tracking-widest text-white/35 border border-white/8 bg-transparent hover:bg-white/5 hover:text-white/60 data-[state=on]:bg-white/8 data-[state=on]:border-white/25 data-[state=on]:text-white/90"
            >
              {filter}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Panel de géneros: aparece/desaparece cuando GENRE está activado */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          genreOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-wrap gap-1.5 px-1 pt-1">
          {GENRES.map((genre) => {
            // Verifica si este género está seleccionado
            const selected = selectedGenres.includes(genre);

            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`h-7 px-3 rounded-full font-mono text-[10px] tracking-wider border transition-all duration-150 cursor-pointer ${
                  selected
                    ? "bg-white/10 border-white/30 text-white/90"
                    : "bg-transparent border-white/8 text-white/35 hover:bg-white/5 hover:text-white/60"
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
