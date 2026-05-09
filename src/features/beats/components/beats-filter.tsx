// components/beats/beats-filter.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search } from "lucide-react";
import { GENRES } from "../constants";
import { useBeatsFilter } from "../hooks/use-beats-filters";

export function BeatsFilter() {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    search,
    setSearch,
    activeFilters,
    toggleFilter,
    selectedGenres,
    toggleGenre,
  } = useBeatsFilter();

  const genreOpen = activeFilters.includes("genre");

  // Focus al abrir el input
  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 260);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  // Cerrar search con Escape o click fuera
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
      className="flex flex-col gap-2 w-[90dvw] md:max-w-[75vw] lg:max-w-[55vw] z-10"
    >
      {/* Main bar */}
      <div className="h-11 bg-[#111] flex flex-row items-center border border-white/10 rounded-[14px] px-1.5 pl-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_3px_rgba(0,0,0,0.6)]">
        {/* Search button */}
        <button
          onClick={() => setSearchOpen((prev) => !prev)}
          aria-label="Toggle search"
          className="size-9 flex items-center justify-center rounded-[10px] shrink-0 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Search
            className={`size-3.5 transition-colors ${searchOpen ? "text-white/70" : "text-white/30"}`}
          />
        </button>

        {/* Input expandible */}
        <div
          className={`overflow-hidden transition-[width] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] shrink-0 ${
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

        <div className="flex-1" />
        <div className="w-px h-5 bg-white/[0.08] mx-2 shrink-0" />

        {/* Toggle group — controlled */}
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
              className="h-8 px-2.5 rounded-[9px] font-mono text-[10px] tracking-widest text-white/35 border border-white/[0.08] bg-transparent hover:bg-white/5 hover:text-white/60 data-[state=on]:bg-white/[0.08] data-[state=on]:border-white/25 data-[state=on]:text-white/90"
            >
              {filter}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Genre chips — se expanden debajo del bar */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          genreOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-wrap gap-1.5 px-1 pt-1">
          {GENRES.map((genre) => {
            const selected = selectedGenres.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`h-7 px-3 rounded-full font-mono text-[10px] tracking-wider border transition-all duration-150 cursor-pointer ${
                  selected
                    ? "bg-white/10 border-white/30 text-white/90"
                    : "bg-transparent border-white/[0.08] text-white/35 hover:bg-white/5 hover:text-white/60"
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
