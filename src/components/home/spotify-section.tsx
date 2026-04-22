import { Separator } from "@/components/ui/separator";

type SpotifyProps = {
  spotifyUrl: string[];
};

export default function SpotifySection({ spotifyUrl }: SpotifyProps) {
  return (
    <div className="absolute w-full h-full -mt-[100dvh] md:max-w-[80dvw] xl:max-w-[60dvw] shadow-background shadow-2xl flex flex-col items-center justify-center font-sans">
      <div className="absolute w-full h-full bg-linear-to-b from-background from-10% via-transparent via-40% to-transparent" />
      <div className="absolute w-full h-full bg-linear-to-t from-primary via-foreground/50 to-transparent" />
      <section className="dark w-full h-full flex flex-col items-center justify-center font-sans p-8">
        <h1 className="text-5xl text-foreground font-bold text-center sm:text-left">
          Spotify Section
        </h1>
        <p className="text-foreground mt-4 mx-15 text-balance text-2xl text-center sm:text-left">
          This is where you can display the ibratt Spotify playlists, tracks, or
          albums.
        </p>
        <section className="w-full max-w-2xl flex flex-col items-center justify-center space-y-4 mt-8">
          <div className="flex flex-col items-center justify-center space-x-4 h-full">
            <Separator
              className="mb-5 translate-x-2 bg-border/30"
              orientation="horizontal"
            />
            <div
              className="h-100 w-full border-x border-fotext-foreground/30 p-5 space-y-6 overflow-y-auto"
              style={{
                WebkitOverflowScrolling: "touch", // Fuerza el scroll suave en iPhone
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)",
              }}
            >
              {spotifyUrl.map((url) => (
                <div key={url} className="h-20">
                  <iframe
                    className="h-full rounded-3xl w-full border-0"
                    data-testid="embed-iframe"
                    style={{ borderRadius: "12px" }}
                    src={url}
                    width="100%"
                    height="80"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                  <Separator className="my-3" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
