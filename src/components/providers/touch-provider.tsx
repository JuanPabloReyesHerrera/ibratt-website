"use client";
import { useEffect } from "react";

export function TouchProvider() {
  useEffect(() => {
    // Fix global para iOS active states
    const handler = () => {};
    document.addEventListener("touchstart", handler, { passive: true });

    // Agrega touch listener a todos los elementos interactivos
    const interactiveElements = document.querySelectorAll(
      "button, a, [role='button']",
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("touchstart", handler, { passive: true });
    });

    return () => {
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return null;
}
