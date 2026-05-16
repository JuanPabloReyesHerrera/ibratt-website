"use client";

import { Separator } from "@/components/ui/separator";
import { DownloadButton } from "@/components/ui/dowload-button";
import { Button } from "@/components/ui/button";
import { MessageSquareMore } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlayButton } from "@/components/shared/control-buttons";
import type { ReleaseVersion } from "@/types";
import React from "react";

type ReleaseVersionItemProps = ReleaseVersion & {
  onDownload: () => void;
  isLatest?: boolean;
  onFeedback?: () => void;
};

export function ReleaseVersionItem({
  audioUrl,
  version,
  isApproved,
  createdAt,
  notes,
  onDownload,
  isLatest = false,
  onFeedback,
}: ReleaseVersionItemProps) {
  return (
    <React.Fragment>
      <div
        className={cn(
          "grid grid-cols-4 items-center p-2 w-full gap-2",
          isLatest && "bg-muted/30 rounded-lg",
        )}
      >
        {/* Play */}
        <div className="flex items-center justify-start">
          <PlayButton size={8} />
        </div>

        {/* Info */}
        <div className="col-span-2 flex flex-col min-w-0">
          <p className="text-sm text-foreground font-medium">
            Versión {version}
            {isLatest && (
              <span className="ml-2 text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                actual
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">{createdAt}</p>
          {notes && (
            <p className="text-xs text-muted-foreground/70 truncate">{notes}</p>
          )}
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-end gap-1">
          {isLatest && onFeedback && (
            <Button
              variant="outline"
              size="icon"
              className="size-8 touch-manipulation"
              onClick={onFeedback}
              title="Dejar feedback"
            >
              <MessageSquareMore className="size-4" />
            </Button>
          )}
          <DownloadButton onClick={onDownload} />
        </div>
      </div>
      {!isLatest && <Separator />}
    </React.Fragment>
  );
}
