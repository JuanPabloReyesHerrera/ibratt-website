import { Download } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type DownloadButtonProps = {
  variant?:
    | "ghost"
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | null
    | undefined;
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
    | null
    | undefined;
  className?: string;
  onClick: () => void;
};
export function DownloadButton({
  variant = "secondary",
  size = "icon-lg",
  onClick,
  className,
}: DownloadButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={cn("active:scale-90 hover:bg-primary!", className)}
    >
      <Download className="size-6" />
    </Button>
  );
}
