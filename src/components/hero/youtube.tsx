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
              <div className="flex items-center justify-center w-full h-full">
                <iframe
                  width="560"
                  height="315"
                  src={video}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
