import { BackGroundImage, Overlay } from "@/shared/components";
import { BeatsSection, SpotifySection, HeroSection } from "@/features/home";
import { MOCK_YOUTUBE_VIDEOS, MOCK_SPOTIFY_TRACK } from "@/lib/mock-data";
import { AddSocialMedia } from "@/features/producer/add-social-media";
import { UsagePolicies } from "@/features/beats/components";

export default function Home() {
  return (
    <div className="w-full font-sans flex flex-col items-center justify-center bg-linear-to-b from-foreground via-foreground to-background">
      <BackGroundImage imageSrc="/assets/background.jpg" alt="background" />
      <div
        className={`fixed top-navbar w-full h-svh bg-linear-to-t from-black from-20% to-transparent `}
      />
      {/** ARREGLAR ESTE PARCHE */}
      <AddSocialMedia />
      <div className="relative w-full md:max-w-[80dvw] xl:max-w-[60dvw] shadow-xl shadow-amber-50/50 -mt-main-content">
        {/* -mt-[calc(100svh-var(--spacing-navbar)-var(--spacing-audioplayer))] */}
        <section id="hero" className="relative h-fit">
          <BackGroundImage imageSrc="/assets/hero.jpg" alt="Hero" />
          <HeroSection youtubeVideos={MOCK_YOUTUBE_VIDEOS} />
          <SpotifySection spotifyUrl={MOCK_SPOTIFY_TRACK} />
        </section>

        {/* <section id="Spotify" className="relative h-main-content w-full">
          <BackGroundImage
            imageSrc="/assets/spotify-section.jpg"
            alt="spotify"
          />
        </section> */}
        <section id="beats" className="w-full h-fit">
          <BackGroundImage imageSrc="/assets/beat-section.jpg" alt="Beats" />
          <BeatsSection />
          <UsagePolicies />
        </section>
      </div>
    </div>
  );
}
