"use client";

import { useState } from "react";

/**
 * UsagePolicies
 * Disclaimer de licencias como disclosure colapsable.
 * Evita el muro de texto — el usuario lo expande si le interesa.
 */
export function UsagePolicies() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative w-full md:w-[85%] px-4 py-8 mt-4">
      {/* Divider */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <span
          className="text-[8.5px] tracking-[0.5em] uppercase font-sans font-medium"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          Licensing &amp; Rights
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </div>

      {/* Toggle header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: "rgba(212,168,83,0.65)" }}>
            ⚠
          </span>
          <h3
            className="text-sm font-medium transition-colors duration-200"
            style={{
              fontFamily: "sans-serif",
              color: expanded
                ? "rgba(255,255,255,0.6)"
                : "rgba(255,255,255,0.38)",
            }}
          >
            Política de Uso y Derechos de Autor
          </h3>
        </div>

        <span
          className="text-[9px] tracking-[0.35em] uppercase font-sans font-medium transition-colors duration-200"
          style={{ color: expanded ? "#D4A853" : "rgba(255,255,255,0.2)" }}
        >
          {expanded ? "Cerrar" : "Leer"}
        </span>
      </button>

      {/* Contenido expandible */}
      {expanded && (
        <p
          className="mt-5 leading-relaxed animate-in fade-in-0 duration-300"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.8rem",
            lineHeight: "1.8",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          Todos los beats publicados por IBRATT son de libre escucha y descarga
          para fines estrictamente no comerciales y de uso personal (ensayos,
          maquetas o grabaciones caseras sin fines de lucro). Para cualquier uso
          comercial, es obligatorio adquirir la licencia correspondiente. Se
          considera uso comercial: subir canciones a plataformas digitales
          (Spotify, Apple Music, Tidal, etc.), monetización en YouTube, TikTok o
          Instagram, presentaciones en vivo o eventos pagados, y uso en
          publicidad, radio o televisión.{" "}
          <span style={{ color: "rgba(255,255,255,0.42)" }}>
            El uso de un beat sin licencia puede resultar en reclamaciones por
            derechos de autor (Content ID) y la eliminación del contenido de las
            plataformas.
          </span>{" "}
          Al comprar tu licencia, no solo obtienes el audio en alta calidad y
          los derechos legales, sino que permites que IBRATT siga creando
          contenido para la comunidad.
        </p>
      )}
    </section>
  );
}
