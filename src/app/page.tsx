import { BackGroundImage } from "@/components/shared";

import HeroSection from "@/components/home/hero-section";
import SpotifySection from "@/components/home/spotify-section";
import BeatsLanding from "@/components/beats/beats-landing";

import {
  MOCK_SOCIAL_MEDIA,
  MOCK_YOUTUBE_VIDEOS,
  MOCK_SPOTIFY_TRACK,
} from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="w-full font-sans flex flex-col items-center justify-center bg-linear-to-b from-foreground via-foreground to-background">
      <section
        id="home"
        className="relative h-[130dvh] w-full md:max-w-[80dvw] xl:max-w-[60dvw]"
      >
        <BackGroundImage imageSrc="/assets/hero.jpg" alt="Hero" />
        <HeroSection
          socialsMedias={MOCK_SOCIAL_MEDIA}
          youtubeVideos={MOCK_YOUTUBE_VIDEOS}
        />
      </section>

      <section
        id="Spotify"
        className="relative h-[120dvh] w-full md:max-w-[80dvw] xl:max-w-[60dvw]"
      >
        <BackGroundImage imageSrc="/assets/spotify-section.jpg" alt="spotify" />
        <SpotifySection spotifyUrl={MOCK_SPOTIFY_TRACK} />
      </section>
      <section
        id="beats"
        className="w-full h-[150dvh] flex justify-center [clip-path:polygon(-50%_0%,_150%_0%,_150%_150%,_-50%_150%)]"
      >
        <BeatsLanding />
      </section>
    </div>
  );
}
