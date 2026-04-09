import Image from "next/image";

import HeroSection from "@/components/home/hero-section";
import Spotify from "@/components/home/spotify-section";
import BeatsLanding from "@/components/beats/beats-landing";
import AudioPlayer from "@/components/layout/audio-player";
import Navbar from "@/components/layout/nav-bar";
import {
  MOCK_BEATS,
  MOCK_SOCIAL_MEDIA,
  MOCK_YOUTUBE_VIDEOS,
  MOCK_SPOTIFY_TRACK,
} from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="font-sans flex flex-col flex-1 items-center justify-center bg-linear-to-b from-foreground via-foreground to-background">
      <Navbar />

      <main className="w-full md:max-w-[80vw] xl:max-w-[60vw] mx-auto flex-col items-center justify-between dark:bg-black sm:items-start shadow-background shadow-2xl rounded-lg">
        <div className="sticky top-0 w-full h-screen">
          <Image
            className="object-cover"
            src="/assets/hero.jpg"
            alt="Hero"
            fill
            priority
          />
          <div className="absolute inset-0 w-full flex flex-col items-center justify-start bg-linear-to-b from-transparent via-transparent/30 to-background text-primary-foreground">
            <HeroSection
              socialMedia={MOCK_SOCIAL_MEDIA}
              youtubeVideos={MOCK_YOUTUBE_VIDEOS}
            />
            <Spotify spotifyUrl={MOCK_SPOTIFY_TRACK} />
            <BeatsLanding beats={MOCK_BEATS} />
          </div>
        </div>
      </main>
      <AudioPlayer beat={MOCK_BEATS[0]} />
    </div>
  );
}
