export const siteConfig = {
  name: "Ibratt",
  title: "Ibratt — Producer",
  description: "Beats, production and sound design.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  spotifyArtistId: process.env.SPOTIFY_ARTIST_ID ?? "",
  social: {
    instagram: "https://instagram.com/ibratt.wav",
    spotify:
      "https://open.spotify.com/artist/1wUKssr6AfhdTG67hcfnRY?si=slFWfNT-RO2_yXFacxzRqA",
    youtube: "https://youtube.com/@ibratt",
  },
} as const;

export type SiteConfig = typeof siteConfig;
