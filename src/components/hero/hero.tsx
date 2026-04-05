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
import { Spotify } from "./spotify";
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
};

const producerSkills = [
  "Mixing & Mastering",
  "Beatmaking",
  "Sound Design",
  "Music Production",
  "Audio Engineering",
];
const youtubeVideos = [
  "https://www.youtube.com/embed/PrJ44s1KDRc?si=U3nfhr3isj_DpX2W",
  "https://www.youtube.com/embed/F2ZgxyBY8HQ?si=U_HI9SZBD-n5X2t8",
];
const spotifyTracks = [
  "https://open.spotify.com/embed/track/3VNUOCdkgs2ktqQaXg1Qjw?utm_source=generator",
  "https://open.spotify.com/embed/track/1cE2KAnTmwUCixgiKvdeqS?utm_source=generator",
  "https://open.spotify.com/embed/track/7fc2nAxRA2OLrr78Ec2mWE?utm_source=generator",
  "https://open.spotify.com/embed/track/7AsXqXjFkCaAZ8LjJpUlxl?utm_source=generator",
];
export default function HeroSection({ socialMedia }: HeroSectionProps) {
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

      {/* SPOTIFY */}
      <Spotify spotifyUrl={spotifyTracks} />
    </div>
  );
}
