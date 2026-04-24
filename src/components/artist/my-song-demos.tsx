"use client";
import React from "react";
import { PlayButton, DownloadButton, Separator, ScrollArea } from "../ui";
import type { SongDemo } from "@/types";

type MySongDemosProps = {
  songDemos: SongDemo[];
};

export function MySongDemos({ songDemos }: MySongDemosProps) {
  function handleDownload() {
    return;
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-3xl font-bold">Mis Maquetas</h1>
      <ScrollArea className="w-[70%] rounded-md border h-80 shadow-sm shadow-foreground/20">
        {songDemos.map(({ audioUrl }) => (
          <React.Fragment key={audioUrl}>
            <div className="grid grid-cols-4 p-2 w-full">
              <div className="flex items-center justify-start">
                <PlayButton size={8} className="" />
              </div>

              <div className="col-span-2 flex items-center justify-center min-w-0">
                <p className="truncate w-full text-sm text-foreground">
                  {audioUrl}
                </p>
              </div>
              <div className="flex items-center justify-end">
                <DownloadButton onClick={() => handleDownload()} />
              </div>
            </div>
            <Separator />
          </React.Fragment>
        ))}
      </ScrollArea>
    </div>
  );
}
