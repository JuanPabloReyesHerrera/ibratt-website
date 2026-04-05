import Image from "next/image";
import HeroSection from "../components/hero/hero";

import BeatsLanding from "@/components/beats/beats-landing";

export default function Home() {
  const socialMedia = [
    {
      page: "instagram",
      link: "instagram",
      className: "bg-gradient-to-bl from-purple-600 via-pink-500 to-yellow-400",
    },
    { page: "youtube", link: "youtube", className: "bg-white" },
    {
      page: "github",
      link: "github",
      className: "bg-gray-800",
    },
    {
      page: "x",
      link: "x",
      className: "bg-black",
    },
  ];
  return (
    <div className="font-sans flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-foreground via-foreground/100 to-background">
      <main className="w-full md:max-w-[80vw] xl:max-w-[60vw] mx-auto flex-col items-center justify-between dark:bg-black sm:items-start shadow-background shadow-2xl rounded-lg">
        <div className="relative w-full h-screen">
          <Image
            className="sticky inset-0 object-cover"
            src="/assets/hero.jpg"
            alt="Hero"
            fill
            priority
          />
          <div className="absolute inset-0 w-full flex flex-col items-center justify-start bg-gradient-to-b from-transparent via-transparent/30 to-background text-primary-foreground">
            <HeroSection socialMedia={socialMedia} />
            <BeatsLanding />
          </div>
        </div>
      </main>
    </div>
  );
}
