"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { DownloadButton } from "../ui/dowload-button";
import type { Master } from "@/types";

type MyMasterItemProps = {
  master: Master;
};

type MyMastersProps = {
  masters: Master[];
};

function MyMasterItem({ master }: MyMasterItemProps) {
  const { name, isPay, released, wav, mp3, key, bpm } = master;

  function handleDownload() {
    return null;
  }
  return (
    <Card key={wav} className="shadow-md shadow-foreground/10">
      <CardHeader>
        <CardTitle className="flex items-end gap-2">
          <img
            src={"/assets/portada-beat-1.jpg"}
            alt={name}
            className="size-12 rounded-lg object-cover"
          />
          {name}
        </CardTitle>
        <CardDescription className="">
          <span>Released:</span>
          <span>{released}</span>
        </CardDescription>
        <CardAction>
          <DownloadButton onClick={() => handleDownload()} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between ">
        <div className="flex gap-1">
          <p className="text-muted-foreground font-bold">Status:</p>
          <p
            className={cn(
              "flex gap-1 items-center",
              isPay ? "text-green-500" : "text-red-500",
            )}
          >
            {isPay ? "Pago" : "Pendiente"}
            <span
              className={cn(
                "animate-ping inline-flex h-1 w-1 rounded-full",
                isPay ? "bg-green-400" : "bg-red-400",
              )}
            />
          </p>
        </div>

        <p className="text-muted-foreground truncate">
          Wav, mp3, stems, performace, beat
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-1">
          <p className="text-muted-foreground font-bold">Key:</p>
          <p className="font-light">{key}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-muted-foreground font-bold"> Bpm:</p>
          <p className="font-light">{bpm}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

export function MyMasters({ masters }: MyMastersProps) {
  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <h1 className="text-3xl font-bold">My Master</h1>

      <div className="w-[80dvw] md:w-[50dvw] xl:w-[30dvw] overflow-x-auto flex gap-4 px-4 py-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {masters.map((master) => (
          <div
            className="shrink-0 snap-center w-[70dvw] md:w-[40dvw]"
            key={master.wav}
          >
            <MyMasterItem master={master} />
          </div>
        ))}
      </div>
    </div>
  );
}
