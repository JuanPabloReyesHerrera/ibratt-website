import { UsagePolicies } from "./usage-policies";
import { BeatCatalog } from "./beats-catalog";
import { BackGroundImage } from "../shared";
import Link from "next/link";
import { BeatsFilter } from "./beats-filter";

export default function BeatsLanding() {
  return (
    <div className="h-full w-full md:max-w-[80dvw] xl:max-w-[60dvw] flex flex-col items-center justify-center font-sans shadow-2xl shadow-foreground">
      <BackGroundImage imageSrc="/assets/beat-section.jpg" alt="Beats" />

      <div className="w-full h-full -mt-[100dvh] flex flex-col items-center justify-start space-y-10 z-10 bg-linear-to-b from-primary via-foreground/10 to-transparent">
        <Link
          href="/beats"
          className="dark text-5xl font-bold text-background my-15 underline underline-offset-6 hover:text-gray-300 hover:scale-105 active:scale-90 transition-transform"
        >
          Beats Catalog
        </Link>
        <BeatsFilter />

        <BeatCatalog />

        <UsagePolicies />
      </div>
    </div>
  );
}
