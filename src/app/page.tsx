import { BackGroundImage } from "@/components/shared";
import { BeatsLanding, SpotifySection, HeroSection } from "@/features/home";
import { MOCK_YOUTUBE_VIDEOS, MOCK_SPOTIFY_TRACK } from "@/lib/mock-data";
import { AddSocialMedia } from "@/features/producer/add-social-media";

export default function Home() {
  return (
    <div className="w-full font-sans flex flex-col items-center justify-center bg-linear-to-b from-foreground via-foreground to-background">
      {/** ARREGLAR ESTE PARCHE */}
      <AddSocialMedia />
      <section
        id="home"
        className="relative h-[130dvh] w-full md:max-w-[80dvw] xl:max-w-[60dvw]"
      >
        <BackGroundImage imageSrc="/assets/hero.jpg" alt="Hero" />
        <HeroSection youtubeVideos={MOCK_YOUTUBE_VIDEOS} />
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
        className="w-full h-[150dvh] flex justify-center md:max-w-[80dvw] xl:max-w-[60dvw]"
      >
        <BeatsLanding />
      </section>
    </div>
  );
}
