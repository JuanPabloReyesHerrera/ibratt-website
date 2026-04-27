import { useSocialMediaStore } from "@/store";
import type { Master, MyNextRelease, ReleaseVersion } from "@/types";

function converSpotifyLinks(shortLinks: string[]) {
  const embedLinks: string[] = [];
  for (const link of shortLinks) {
    const r = link
      .replace("spotify.com", "spotify.com/embed")
      .replace("?", "?utm_source=generator");

    const index = r.indexOf("?utm_source=generator");

    embedLinks.push(r.slice(0, index + r.length));
  }
  return embedLinks;
}

export const MOCK_SPOTIFY_TRACK: string[] = converSpotifyLinks([
  "https://open.spotify.com/track/3VNUOCdkgs2ktqQaXg1Qjw?si=682b1c71262449b9",
  "https://open.spotify.com/track/1cE2KAnTmwUCixgiKvdeqS?si=e6ff2366a4ab4c83",
  "https://open.spotify.com/track/7fc2nAxRA2OLrr78Ec2mWE?si=a77089ac94a8420d",
  "https://open.spotify.com/track/39wBSKzyH3yGreBY802nMW?si=4167f5bc94ea465f",
  "https://open.spotify.com/track/7AsXqXjFkCaAZ8LjJpUlxl?si=2ab698883aea45ad",
  "https://open.spotify.com/track/6toMTzz5BBaQ2jw2gu2dfk?si=c21434847a5040e6",
  "https://open.spotify.com/track/4jnVUKXVDc2U9PlGH10E2p?si=15fa0b1d9c414153",
  "https://open.spotify.com/track/0Z8com7oCyq9useiLPNAAt?si=88d38b9bb9db4ae5",
  "https://open.spotify.com/track/6DY0L6kKmzTyKbH12iIwmX?si=f185b085d6034bb4",
  "https://open.spotify.com/track/20GI5Xc8cVx2rRTBzmPBcv?si=dac40f8327534c19",
  "https://open.spotify.com/track/5X1KYIrLnbP9yYRNoAeiAJ?si=42ccbe3fb83e4e8c",
  "https://open.spotify.com/track/3EEnCUUUcZFxL94wAu7PeP?si=b678914b6cca4273",
  "https://open.spotify.com/track/0aNlit2bPhKT3cVtdgU8vJ?si=08e65748ae3a45c9",
  "https://open.spotify.com/track/3KPQ0b00eMJG1iLtaI0pLN?si=faabdff652a441b9",
  "https://open.spotify.com/track/5bfQn14e4P9NGGBll3azGG?si=c019d02d8bf0456c",
  "https://open.spotify.com/track/0jQT1RAsmD3vFigGPQOvCM?si=b23f3594a7e147da",
  "https://open.spotify.com/track/6epf0LJEvRERDfLX7tJxZl?si=7cf89b6f95c84e15",
  "https://open.spotify.com/track/2GWihNBh9zI2LB0gestHXj?si=3f6918a79e694c59",
  "https://open.spotify.com/track/3sHS7zlUlafZYYRV8lJI7U?si=2de571267a534bd8",
  "https://open.spotify.com/track/7ykwMKWMHNC9qXBRZwRc4T?si=b9d7ee66f1b64031",
  "https://open.spotify.com/track/7zCH0eu1CxJgObN7xZafRI?si=f9479e8b768b4bc8",
  "https://open.spotify.com/track/6Wxlv5XHcSIAa64Y1zSf6v?si=471582482a3d43f9",
  "https://open.spotify.com/track/4WtuLygupXL5wUfcjLIBUI?si=8670d128765b49cf",
  "https://open.spotify.com/track/0zSvudlzZulZ8XujtusYTF?si=379c9b8f523d4176",
  "https://open.spotify.com/track/6O7sljPxJqMKsQkx57ZEPR?si=416513db6ecd4f7d",
]);

export const MOCK_SOCIAL_MEDIA = [
  {
    id: "1",
    page: "instagram",
    link: "instagram",
    userId: "ibratt.wav",
    className: "bg-gradient-to-bl from-purple-600 via-pink-500 to-yellow-400",
  },
  { id: "2", page: "youtube", link: "youtube", className: "bg-white" },
  {
    id: "3",
    page: "github",
    link: "github",
    userId: "ibratt.wav",
    className: "bg-gray-800",
  },
  {
    id: "4",
    page: "x",
    link: "x",
    userId: "ibratt.wav",
    className: "bg-black",
  },
];
export const MOCK_YOUTUBE_VIDEOS = [
  "https://www.youtube.com/embed/PrJ44s1KDRc?si=U3nfhr3isj_DpX2W",
  "https://www.youtube.com/embed/F2ZgxyBY8HQ?si=U_HI9SZBD-n5X2t8",
];

export const MOCK_MY_MASTERS: Master[] = [
  {
    name: "Punto Aparte",
    isPay: true,
    released: "24/02/2026",
    key: "Fm",
    bpm: "90",
    wav: "PuntoAparte",
    mp3: "PuntoAparte",
    beat: "PuntoAparte",
    show: "PuntoAparte",
  },
  {
    name: "Brillo",
    isPay: true,
    released: "24/02/2026",
    key: "Fm",
    bpm: "90",
    wav: "brillo",
    mp3: "brillo",
    beat: "brillo",
    show: "brillo",
  },
];

export const MOCK_MY_Next_Releases: MyNextRelease = {
  id: "release-001",
  name: "Midnight Feelings",
  maxModifications: 3,
  isFullyApproved: false,
  versions: [
    {
      audioUrl: "/audio/midnight-v3.mp3",
      version: 3,
      isApproved: false,
      createdAt: "2025-04-20",
      notes: "Ajuste de bajos y reverb en los coros",
    },
    {
      audioUrl: "/audio/midnight-v2.mp3",
      version: 2,
      isApproved: false,
      createdAt: "2025-04-15",
      notes: "Primera mezcla con voces",
    },
    {
      audioUrl: "/audio/midnight-v1.mp3",
      version: 1,
      isApproved: false,
      createdAt: "2025-04-10",
    },
  ],
};
