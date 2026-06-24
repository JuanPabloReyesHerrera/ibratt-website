import { BackGroundImage, Overlay } from "@/shared/components";
import { BeatsLanding, SpotifySection, HeroSection } from "@/features/home";
import { MOCK_YOUTUBE_VIDEOS, MOCK_SPOTIFY_TRACK } from "@/lib/mock-data";
import { AddSocialMedia } from "@/features/producer/add-social-media";

export default function Home() {
  return (
    <div className="w-full font-sans flex flex-col items-center justify-center bg-linear-to-b from-foreground via-foreground to-background">
      <BackGroundImage imageSrc="/assets/background.jpg" alt="background" />
      <div
        className={`fixed top-navbar w-full h-svh bg-linear-to-t from-black from-20% to-transparent `}
      />
      {/** ARREGLAR ESTE PARCHE */}
      <AddSocialMedia />
      <div className="relative w-full md:max-w-[80dvw] xl:max-w-[60dvw] h-fit shadow-xl shadow-amber-50/50  -mt-[100svh]">
        <section id="home" className="relative h-[130dvh]">
          <BackGroundImage imageSrc="/assets/hero.jpg" alt="Hero" />
          <HeroSection youtubeVideos={MOCK_YOUTUBE_VIDEOS} />
        </section>

        <section id="Spotify" className="relative h-[120dvh] w-full">
          <BackGroundImage
            imageSrc="/assets/spotify-section.jpg"
            alt="spotify"
          />
          <SpotifySection spotifyUrl={MOCK_SPOTIFY_TRACK} />
        </section>
        <section id="beats" className="w-full h-[150dvh] flex justify-center">
          <BeatsLanding />
        </section>
      </div>
    </div>
  );
}
