import { useState } from "react";
import type { Genre } from "../core/constants";

export type BeatsFilterParams = {
  search: string;
  genres: Genre[];
  // Aquí irán key y bpm cuando los trabajemos
};

export function useBeatsFilter() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const toggleFilter = (values: string[]) => {
    // ToggleGroup multiple nos entrega el array completo actualizado
    setActiveFilters(values);
    // Si cerramos GENRE, limpiamos los géneros seleccionados
    if (!values.includes("genre")) setSelectedGenres([]);
  };

  const toggleGenre = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const clearAll = () => {
    setSearch("");
    setActiveFilters([]);
    setSelectedGenres([]);
  };

  // Este objeto es el que eventualmente pasas a tu query de Drizzle
  const filterParams: BeatsFilterParams = {
    search,
    genres: selectedGenres,
  };

  return {
    search,
    setSearch,
    activeFilters,
    toggleFilter,
    selectedGenres,
    toggleGenre,
    clearAll,
    filterParams, // → lo pasas a la tabla o a la query
    isFiltering: search.length > 0 || selectedGenres.length > 0,
  };
}
