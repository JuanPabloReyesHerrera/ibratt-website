import { LoadingSkeleton } from "@/shared/components";
import { siteConfig } from "@/config/site";
export function PresentationsText() {
  const { title, description } = siteConfig;
  if (!title || !description) return <LoadingSkeleton />;
  return (
    <div className="dark flex flex-col items-center mx-20 mt-10 space-y-4">
      {title && (
        <h1 className="h-fit text-5xl text-foreground font-bold text-center sm:text-left animate-in fade-in slide-in-from-right-40 duration-1000">
          {title.toUpperCase()}
        </h1>
      )}
      {description && (
        <p className="text-foreground m-1 text-2xl text-center sm:text-left animate-in fade-in slide-in-from-left-40 duration-1000">
          {description}
        </p>
      )}
    </div>
  );
}
