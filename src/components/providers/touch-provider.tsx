"use client";
import { useEffect } from "react";

export function TouchProvider() {
  useEffect(() => {
    // Delegación de eventos — un solo listener en document
    // que captura todos los touchstart de cualquier elemento
    // incluso los que se renderizan después
    function handleTouchStart(e: TouchEvent) {
      // Busca el elemento interactivo más cercano al punto de toque
      const target = e.target as HTMLElement;
      const interactive = target.closest("button, a, [role='button']");

      // Si encontró un elemento interactivo, no hace nada especial
      // pero el hecho de tener este listener activa :active en Safari
      if (interactive) return;
    }

    // capture: true — el listener corre antes de que el evento
    // llegue al elemento destino, captura TODOS los toques
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
      capture: true,
    });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart, {
        capture: true,
      });
    };
  }, []);

  return null;
}
