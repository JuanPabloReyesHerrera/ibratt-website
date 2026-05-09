import {
  BeatCatalog,
  BeatsFilter,
  BeatPlaying,
} from "@/features/beats/components";

export default function BeatsPage() {
  return (
    <div className="w-dvw h-screen flex flex-col items-center justify-center bg-black">
      <BeatPlaying />
      <BeatsFilter />
      <section className="h-[50dvh] w-full md:w-[85dvw] flex flex-col items-center justify-center">
        <BeatCatalog />
      </section>
    </div>
  );
}
