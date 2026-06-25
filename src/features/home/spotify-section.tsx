import { siteConfig } from "@/config/site";

type SpotifyProps = {
  spotifyUrl: string[];
};

export function SpotifySection({ spotifyUrl }: SpotifyProps) {
  return (
    <div
      className="relative w-full h-main-content flex flex-col"
      id="Spotify-Section"
    >
      <div className="overlay-fade-b" />
      <div className="overlay-fade-t" />
      <div className="overlay-dim" />
      <div className="overlay-grain" />

      {/* ─── Contenido ─── */}
      <div className="relative z-10 dark flex flex-col h-full items-center justify-start px-6 py-10 gap-8">
        {/* ── HEADER EDITORIAL ── */}
        <div className="w-full max-w-xl flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.65em] text-amber-400 uppercase font-semibold">
            Now Streaming
          </span>

          <div className="flex items-end justify-between gap-4">
            {/* Título masivo */}
            <h2
              className="leading-[0.86] text-white uppercase shrink-0"
              style={{
                fontFamily: "'Bebas Neue', 'Anton', 'Impact', sans-serif",
                fontSize: "clamp(1.5rem, 13vw, 5.5rem)",
                letterSpacing: "0.02em",
              }}
            >
              Latest
              <br />
              Drops
            </h2>

            {/* Contador de tracks */}
            <div className="flex flex-col items-end gap-1.5 pb-1.5">
              <span
                className="text-white/25 tabular-nums"
                style={{
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
                  fontStyle: "italic",
                }}
              >
                {spotifyUrl.length} tracks
              </span>
              <div className="w-14 h-px bg-amber-400/45" />
            </div>
          </div>
        </div>

        {/* ── TRACKLIST ── */}
        <div className="w-[80dvw] max-w-xl">
          <div
            className="flex flex-col gap-3 overflow-y-auto"
            style={{
              maxHeight: "52vh",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 9%, black 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 9%, black 88%, transparent 100%)",
            }}
          >
            {spotifyUrl.map((url, i) => (
              <div key={url} className="group flex items-center gap-3 sm:gap-4">
                {/* Número de track */}
                <span
                  className="hidden sm:block text-amber-400/35 w-5 shrink-0 tabular-nums select-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Embed con hover glow */}
                <div className="flex-1 overflow-hidden rounded-xl ring-1 ring-white/[0.07] transition-all duration-300 group-hover:ring-amber-400/25 group-hover:shadow-[0_0_24px_rgba(196,164,60,0.12)]">
                  <iframe
                    style={{ borderRadius: "12px", display: "block" }}
                    src={url}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <a
          href={siteConfig.platform.spotify.playlist[0].miMusica}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          <span className="w-10 h-px bg-white/15 transition-colors duration-300 group-hover:bg-amber-400/45" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-white/25 transition-colors duration-300 group-hover:text-amber-400/65 font-medium">
            Open in Spotify
          </span>
          <span className="w-10 h-px bg-white/15 transition-colors duration-300 group-hover:bg-amber-400/45" />
        </a>
      </div>
    </div>
  );
}
