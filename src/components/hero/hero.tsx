import { Icon } from "@/components/ui";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SocialMediaButtons from "./social-media-buttons";
import PresentationsText from "./presentations-text";
import YoutubeCarousel from "./youtube";
import Skills from "./skills";

type SocialMediaItem = {
  page: string;
  link: string;
  className: string;
};
type HeroSectionProps = {
  socialMedia: SocialMediaItem[];
  youtubeVideos: string[];
};

const producerSkills = [
  "Mixing & Mastering",
  "Beatmaking",
  "Sound Design",
  "Music Production",
  "Audio Engineering",
];

export default function HeroSection({
  socialMedia,
  youtubeVideos,
}: HeroSectionProps) {
  return (
    <div className="w-full flex flex-col items-center space-y-10 bg-gradient-to-b from-transparent via-transparent/30 to-foreground">
      {/* PRESENTATION */}
      <PresentationsText />

      {/* YOUTUBE */}
      <YoutubeCarousel videos={youtubeVideos} />

      {/* SOCIAL MEDIA */}
      <SocialMediaButtons socialMedia={socialMedia} />

      {/* SKILL */}
      <Skills skills={producerSkills} />
    </div>
  );
}
