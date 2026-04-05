type SpotifyProps = {
  spotifyUrl: string[];
};

export function Spotify({ spotifyUrl }: SpotifyProps) {
  return (
    <div className="w-full h-full flex flex-col items-center space-y-4 ">
      <h1 className="text-5xl text-foreground font-bold text-center sm:text-left">
        Spotify Section
      </h1>
      <p className="text-foreground mt-4 mx-15 text-balance text-2xl text-center sm:text-left">
        This is where you can display the ibratt Spotify playlists, tracks, or
        albums.
      </p>
      <section className="w-xl flex flex-col items-center justify-evenly p-20 gap-5">
        {spotifyUrl.map((url, index) => (
          <iframe
            className="rounded-2xl"
            data-testid="embed-iframe"
            style={{ borderRadius: "12px" }}
            src={url}
            width="100%"
            height="152"
            allow="
              autoplay;
              clipboard-write;
              encrypted-media;
              fullscreen;
              picture-in-picture;
            "
            loading="lazy"
            key={index}
          ></iframe>
        ))}
      </section>
    </div>
  );
}
