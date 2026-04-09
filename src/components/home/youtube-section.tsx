import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

type YoutubeCarouselProps = {
  videos: string[];
};

export default function YoutubeCarousel({ videos }: YoutubeCarouselProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
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
