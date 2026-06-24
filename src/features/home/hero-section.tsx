import {
  HeroSocialMedia,
  PresentationsText,
  YoutubeCarousel,
  Skills,
} from "./components";
import { Overlay } from "@/shared/components";

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
//bg-linear-to-b from-transparent via-transparent to-background to-90%
export function HeroSection({ youtubeVideos }: HeroSectionProps) {
  return (
    <div className="absolute w-full h-full -mt-[100dvh] shadow-background shadow-2xl flex flex-col items-center justify-around gap-1 overflow-hidden">
      <Overlay
        to="t"
        from="from-background"
        via="via-transparent"
        toColor="to-transparent"
      />

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
