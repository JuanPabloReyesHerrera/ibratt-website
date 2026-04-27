import { PresentationsText, YoutubeCarousel, Skills } from "../hero";
import type { SocialMediaEntry } from "@/types";
import { HeroSocialMedia } from "../hero/hero-social-media";

type HeroSectionProps = {
  youtubeVideos: string[];
};

const producerSkills = [
  "Mixing & Mastering",
  "Beatmaking",
  "Sound Design",
  "Music Production",
  "Audio Engineering",
];

export function HeroSection({ youtubeVideos }: HeroSectionProps) {
  return (
    <div className="absolute w-full h-full -mt-[100dvh] shadow-background shadow-2xl flex flex-col items-center justify-around gap-1 bg-linear-to-b from-transparent via-transparent to-background to-90% overflow-hidden">
      {/* PRESENTATION */}
      <PresentationsText />

      {/* YOUTUBE */}
      <YoutubeCarousel videos={youtubeVideos} />

      {/* SOCIAL MEDIA */}
      <HeroSocialMedia />

      {/* SKILL */}
      <Skills skills={producerSkills} />
    </div>
  );
}
