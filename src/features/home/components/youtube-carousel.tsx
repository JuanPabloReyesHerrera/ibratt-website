import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";

type YoutubeCarouselProps = {
  videos: string[];
};

export function YoutubeCarousel({ videos }: YoutubeCarouselProps) {
  if (!videos.length) return <LoadingSkeleton />;
  return (
    <div className="w-full h-fit flex items-center justify-center animate-in fade-in slide-in-from-bottom-5 duration-2000">
      <Carousel className="w-2/3 h-full">
        <CarouselContent>
          {videos.map((video, index) => (
            <CarouselItem key={index}>
              <div className="flex items-center justify-center w-full h-56 md:h-[315px]">
                <iframe
                  width="100%"
                  height="100%"
                  src={video}
                  title={`YouTube video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-foreground" />
        <CarouselNext className="text-foreground" />
      </Carousel>
    </div>
  );
}
