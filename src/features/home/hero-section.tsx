import { siteConfig } from "@/config/site";
import { HeroSocialMedia, YoutubeCarousel } from "./components";
import { Overlay } from "@/shared/components";

type HeroSectionProps = {
  youtubeVideos: string[];
};

// Duplicados para el loop sin-corte (50% scroll = vuelve al inicio)
const SKILLS_MARQUEE = [
  "Mixing & Mastering",
  "◆",
  "Beatmaking",
  "◆",
  "Sound Design",
  "◆",
  "Music Production",
  "◆",
  "Audio Engineering",
  "◆",
];

export function HeroSection({ youtubeVideos }: HeroSectionProps) {
  return (
    <div
      className="relative w-full h-main-content flex flex-col overflow-hidden -mt-main-content"
      id="Hero-Section"
    >
      <div className="overlay-fade-t" />
      <div className="overlay-grain" />
      <div className="vignette-radial" />

      {/* ─── Contenido principal ─── */}
      <div className="relative z-10 flex flex-col h-full justify-between pt-[5vh] pb-6 px-6 sm:px-10">
        {/* ── IDENTIDAD DEL PRODUCTOR ── */}
        <div className="flex flex-col">
          {/* Etiqueta superior */}
          <span
            className="text-[10px] sm:text-[11px] tracking-[0.65em] text-amber-400 uppercase font-semibold"
            style={{ animation: "heroFadeUp 0.65s ease-out 0.05s both" }}
          >
            {siteConfig.title}
          </span>

          {/* Nombre — Bebas Neue masivo */}
          <h1
            className="leading-[0.86] text-white uppercase"
            style={{
              fontFamily: "'Bebas Neue', 'Anton', 'Impact', sans-serif",
              fontSize: "clamp(4.5rem, 22vw, 10rem)",
              letterSpacing: "-0.01em",
              animation: "heroFadeUp 0.65s ease-out 0.18s both",
            }}
          >
            {siteConfig.name}
          </h1>

          {/* Tagline — Cormorant italic refinado */}
          <div
            className="flex items-center gap-3 mt-2"
            style={{ animation: "heroFadeUp 0.65s ease-out 0.34s both" }}
          >
            <div className="w-7 h-px bg-amber-400/60 shrink-0" />
            <p
              className="text-white/45"
              style={{
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
                fontStyle: "italic",
              }}
            >
              {siteConfig.description}
            </p>
          </div>
        </div>

        {/* ── YOUTUBE CAROUSEL ── */}
        <div style={{ animation: "heroFadeUp 0.65s ease-out 0.52s both" }}>
          <YoutubeCarousel videos={youtubeVideos} />
        </div>

        {/* ── FILA INFERIOR: social + marquee ── */}
        <div className="flex flex-col gap-4">
          {/* Social links */}
          <div style={{ animation: "heroFadeUp 0.65s ease-out 0.66s both" }}>
            <HeroSocialMedia />
          </div>

          {/* Tira de skills — marquee infinito */}
          <div
            className="overflow-hidden border-y border-white/8 py-2.5"
            style={{ animation: "heroFadeUp 0.65s ease-out 0.78s both" }}
          >
            <div
              className="flex items-center whitespace-nowrap"
              style={{
                width: "max-content",
                animation: "marqueeScroll 32s linear infinite",
              }}
            >
              {/* Duplicado: cuando llega a 50% del scroll, vuelve al inicio sin salto */}
              {[...SKILLS_MARQUEE, ...SKILLS_MARQUEE].map((item, i) => (
                <span
                  key={i}
                  className={
                    item === "◆"
                      ? "px-3 text-amber-400/50 text-[7px]"
                      : "px-5 text-white/30 text-[10px] sm:text-[11px] tracking-[0.42em] uppercase font-medium"
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
