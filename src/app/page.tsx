import Image from "next/image";

import HeroSection from "@/components/home/hero-section";
import SpotifySection from "@/components/home/spotify-section";
import BeatsLanding from "@/components/beats/beats-landing";

import {
  MOCK_BEATS,
  MOCK_SOCIAL_MEDIA,
  MOCK_YOUTUBE_VIDEOS,
  MOCK_SPOTIFY_TRACK,
} from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="w-full h-fit font-sans flex flex-col items-center justify-center bg-linear-to-b from-foreground via-foreground to-background">
      <section className="relative inset-0 h-[220vh] w-full md:max-w-[80vw] xl:max-w-[60vw]">
        {/* imagen sticky */}
        <div className="sticky top-0 h-screen w-full">
          <div className="relative w-full h-full">
            <Image
              className="object-cover"
              src="/assets/hero.jpg"
              alt="Hero"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
              fill
              priority
            />
          </div>
        </div>
        {/* contenido encima de la imagen */}
        <div className="w-full h-full -mt-[100vh] md:max-w-[80vw] xl:max-w-[60vw] shadow-background shadow-2xl ">
          <div className="w-fit h-fit [clip-path:polygon(-50%_-50%,_150%_-50%,_150%_100%,_-50%_100%)]">
            <HeroSection
              socialsMedias={MOCK_SOCIAL_MEDIA}
              youtubeVideos={MOCK_YOUTUBE_VIDEOS}
            />
            <SpotifySection spotifyUrl={MOCK_SPOTIFY_TRACK} />
          </div>
          <div className="w-full h-[150vh] [clip-path:polygon(-50%_0%,_150%_0%,_150%_150%,_-50%_150%)]">
            <BeatsLanding beats={MOCK_BEATS} />
          </div>
        </div>
      </section>
    </div>
  );
}
