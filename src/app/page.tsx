import Image from "next/image";

import HeroSection from "@/components/hero/hero";
import Spotify from "@/components/hero/spotify";
import BeatsLanding from "@/components/beats/beats-landing";
import AudioPlayer from "@/components/layout/audio-player";

import { Beat, Beatlist } from "@/types";

export default function Home() {
  const spotifyTracks = [
    "https://open.spotify.com/embed/track/3VNUOCdkgs2ktqQaXg1Qjw?utm_source=generator",
    "https://open.spotify.com/embed/track/1cE2KAnTmwUCixgiKvdeqS?utm_source=generator",
    "https://open.spotify.com/embed/track/7fc2nAxRA2OLrr78Ec2mWE?utm_source=generator",
    "https://open.spotify.com/embed/track/7AsXqXjFkCaAZ8LjJpUlxl?utm_source=generator",
    "https://open.spotify.com/embed/track/39wBSKzyH3yGreBY802nMW?utm_source=generator",
    "https://open.spotify.com/embed/track/6DY0L6kKmzTyKbH12iIwmX?utm_source=generator",
  ];
  const beats: Beat[] = [
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Chill Vibes",
      genre: "Lo-fi",
      bpm: "90",
      key: "Gm",
      price: "$20",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Trap Banger",
      genre: "Trap",
      bpm: "90",
      key: "Am",
      price: "$30",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Gritty Boom Bap",
      genre: "Boom Bap",
      bpm: "90",
      key: "Em",
      price: "$25",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Chill Vibes",
      genre: "Lo-fi",
      bpm: "90",
      key: "Gm",
      price: "$20",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Trap Banger",
      genre: "Trap",
      bpm: "90",
      key: "Am",
      price: "$30",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Gritty Boom Bap",
      genre: "Boom Bap",
      bpm: "90",
      key: "Em",
      price: "$25",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Chill Vibes",
      genre: "Lo-fi",
      bpm: "90",
      key: "Gm",
      price: "$20",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Trap Banger",
      genre: "Trap",
      bpm: "90",
      key: "Am",
      price: "$30",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Gritty Boom Bap",
      genre: "Boom Bap",
      bpm: "90",
      key: "Em",
      price: "$25",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Chill Vibes",
      genre: "Lo-fi",
      bpm: "90",
      key: "Gm",
      price: "$20",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Trap Banger",
      genre: "Trap",
      bpm: "90",
      key: "Am",
      price: "$30",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Gritty Boom Bap",
      genre: "Boom Bap",
      bpm: "90",
      key: "Em",
      price: "$25",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Chill Vibes",
      genre: "Lo-fi",
      bpm: "90",
      key: "Gm",
      price: "$20",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Trap Banger",
      genre: "Trap",
      bpm: "90",
      key: "Am",
      price: "$30",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Gritty Boom Bap",
      genre: "Boom Bap",
      bpm: "90",
      key: "Em",
      price: "$25",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Chill Vibes",
      genre: "Lo-fi",
      bpm: "90",
      key: "Gm",
      price: "$20",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Trap Banger",
      genre: "Trap",
      bpm: "90",
      key: "Am",
      price: "$30",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Gritty Boom Bap",
      genre: "Boom Bap",
      bpm: "90",
      key: "Em",
      price: "$25",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Chill Vibes",
      genre: "Lo-fi",
      bpm: "90",
      key: "Gm",
      price: "$20",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Trap Banger",
      genre: "Trap",
      bpm: "90",
      key: "Am",
      price: "$30",
    },
    {
      portada: "/assets/portada-beat-1.jpg",
      name: "Gritty Boom Bap",
      genre: "Boom Bap",
      bpm: "90",
      key: "Em",
      price: "$25",
    },
  ];
  const socialMedia = [
    {
      page: "instagram",
      link: "instagram",
      className: "bg-gradient-to-bl from-purple-600 via-pink-500 to-yellow-400",
    },
    { page: "youtube", link: "youtube", className: "bg-white" },
    {
      page: "github",
      link: "github",
      className: "bg-gray-800",
    },
    {
      page: "x",
      link: "x",
      className: "bg-black",
    },
  ];
  const youtubeVideos = [
    "https://www.youtube.com/embed/PrJ44s1KDRc?si=U3nfhr3isj_DpX2W",
    "https://www.youtube.com/embed/F2ZgxyBY8HQ?si=U_HI9SZBD-n5X2t8",
  ];
  return (
    <div className="font-sans flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-foreground via-foreground/100 to-background">
      <main className="w-full md:max-w-[80vw] xl:max-w-[60vw] mx-auto flex-col items-center justify-between dark:bg-black sm:items-start shadow-background shadow-2xl rounded-lg">
        <div className="relative w-full h-screen">
          <Image
            className="sticky inset-0 object-cover"
            src="/assets/hero.jpg"
            alt="Hero"
            fill
            priority
          />
          <div className="absolute inset-0 w-full flex flex-col items-center justify-start bg-gradient-to-b from-transparent via-transparent/30 to-background text-primary-foreground">
            <HeroSection
              socialMedia={socialMedia}
              youtubeVideos={youtubeVideos}
            />
            <Spotify spotifyUrl={spotifyTracks} />
            <BeatsLanding beats={beats} />
          </div>
        </div>
      </main>

      <AudioPlayer beat={beats[0]} />
    </div>
  );
}
