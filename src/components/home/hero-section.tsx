import SocialMediaButtons from "../shared/social-media-buttons";
import PresentationsText from "./presentations-text";
import YoutubeCarousel from "./youtube-section";
import Skills from "../shared/skills";

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

      {/* TITLE */}
      <h1 className="p-2 text-2xl text-foreground font-extrabold mb-4 flex items-center justify-center  gap-2 border-3 border-foreground rounded-full px-4 hover:scale-115 transition-transform cursor-pointer shadow shadow-amber-500/30 bg-background/50">
        @ibratt.wav
        <svg
          viewBox="0 0 24 24"
          className="size-5 fill-sky-500"
          aria-label="Verificado"
        >
          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.47 0-.914.087-1.325.244C14.79 2.545 13.48 1.5 12 1.5s-2.79 1.045-3.447 2.254c-.41-.157-.856-.244-1.325-.244-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.47 0 .914-.087 1.325-.244C9.21 21.455 10.52 22.5 12 22.5s2.79-1.045 3.447-2.254c.41.157.856.244 1.325.244 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.445 4.5L6.5 13.11l1.442-1.53 2.113 2.112 5.003-5.267 1.442 1.53-6.445 6.55z"></path>
        </svg>
      </h1>

      {/* SOCIAL MEDIA */}
      <SocialMediaButtons socialMedia={socialMedia} size={6} />

      {/* SKILL */}
      <Skills skills={producerSkills} />
    </div>
  );
}
