import { getRefFromPublicFolder } from "@/lib/get-from-public-folder";
import React from "react";

import {
  PlayerButton,
  DownloadButton,
  Separator,
  ScrollArea,
  ScrollBar,
} from "../ui";
export function MyRefs() {
  const refs = getRefFromPublicFolder();
  return (
    <>
      <ScrollArea className="w-[70%] rounded-md border">
        {refs.map((ref) => (
          <React.Fragment key={ref}>
            <div className="flex justify-between items-end">
              <PlayerButton></PlayerButton>

              {ref}
              <DownloadButton />
            </div>
            <Separator />
          </React.Fragment>
        ))}
      </ScrollArea>
    </>
  );
}
