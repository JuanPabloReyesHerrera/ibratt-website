export const siteConfig = {
  name: "Ibratt",
  title: "Ibratt Producer",
  logo: "🪬",
  description: "Beats, production and sound design.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  spotifyArtistId: process.env.SPOTIFY_ARTIST_ID ?? "",
  socialsMedia: {
    instagram: {
      userId: "ibratt.wav",
      page: "https://instagram.com",
      url: new URL("ibratt.wav", "https://instagram.com"),
      className:
        "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white",
    },
    spotify:
      "https://open.spotify.com/artist/1wUKssr6AfhdTG67hcfnRY?si=slFWfNT-RO2_yXFacxzRqA",
    youtube: "https://youtube.com/@ibratt",
    whatsapp: {
      url: "",
      number: "",
      className:
        "bg-gradient-to-b from-green-700 via-green-400 to-green-500 text-white",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
