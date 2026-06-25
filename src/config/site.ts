export const siteConfig = {
  title: "Beatmaker and songwriter.",
  name: "Ibratt",
  description: "Crafting sounds that move the world.",
  logo: "🪬",
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

    whatsapp: {
      url: "",
      number: "3209527366",
      className:
        "bg-gradient-to-b from-green-700 via-green-400 to-green-500 text-white",
    },
  },
  platform: {
    spotify: {
      artistProfile:
        "https://open.spotify.com/artist/1wUKssr6AfhdTG67hcfnRY?si=slFWfNT-RO2_yXFacxzRqA",

      playlist: [
        {
          miMusica:
            "https://open.spotify.com/playlist/7t1ecZDT3rm7Pcp2KDNOuJ?si=998bd15226fa49c1",
        },
      ],
    },
    youtube: "https://youtube.com/@ibratt",
  },
} as const;

export type SiteConfig = typeof siteConfig;
