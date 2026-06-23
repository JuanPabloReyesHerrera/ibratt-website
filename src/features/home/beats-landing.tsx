import {
  UsagePolicies,
  BeatList,
  BeatsFilter,
} from "@/features/beats/components";
import { BackGroundImage } from "@/shared/components";
import { Button } from "@/components/ui";
import Link from "next/link";

export function BeatsLanding() {
  return (
    <div className="h-full w-full md:max-w-[80dvw] xl:max-w-[60dvw] flex flex-col items-center justify-center font-sans shadow-2xl shadow-foreground">
      <BackGroundImage imageSrc="/assets/beat-section.jpg" alt="Beats" />

      <div className="w-full h-full -mt-[100dvh] flex flex-col items-center justify-start z-10 bg-linear-to-b from-primary via-foreground/10 to-transparent">
        <Button variant="link" className="text-5xl my-15">
          <Link href={"/beats"}> Beats Catalog</Link>
        </Button>
        <BeatsFilter />

        <BeatList />

        <UsagePolicies />
      </div>
    </div>
  );
}
