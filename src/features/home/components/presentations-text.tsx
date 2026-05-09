import { siteConfig } from "@/config/site";
export function PresentationsText() {
  const { name } = siteConfig;
  return (
    <div className="dark flex flex-col items-center mx-20 mt-10 space-y-4">
      <h1 className="text-5xl text-foreground font-bold text-center sm:text-left">
        Welcome to {name.toUpperCase()}'s Website
      </h1>
      <p className="text-foreground mt-4 text-2xl text-center sm:text-left">
        Explore the latest beats and music from IBRATT, your go-to music
        producer.
      </p>
    </div>
  );
}
