import { SocialMedia } from "@/types";
import { Icon } from "../ui";

type SocialsMediasButtonsProps = {
  socialsMedias: SocialMedia[];
  size: number;
};

export function SocialsMediasButtons({
  socialsMedias,
  size,
}: SocialsMediasButtonsProps) {
  return (
    <div
      className={`w-full flex items-center justify-center`}
      style={{ gap: `${Math.ceil((2 / 3) * size) * 4}px` }}
    >
      {socialsMedias.map(({ page, link, className }) => (
        <a
          key={page}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 flex justify-center items-center rounded-full shadow-md shadow-background/30 hover:scale-125 hover:shadow-background active:scale-90 transition-transform ${className}`}
        >
          <Icon name={page} size={size} />
        </a>
      ))}
    </div>
  );
}
