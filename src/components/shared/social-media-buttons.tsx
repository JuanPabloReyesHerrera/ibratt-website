// components/SocialsMediasButtons.tsx
import { useSocialMediaStore } from "@/store";
import { SOCIAL_MEDIA_CONFIG } from "@/config/social-media.config";
import { Icon } from "../ui";

type SocialsMediasButtonsProps = {
  size: number;
};

export function SocialsMediasButtons({ size }: SocialsMediasButtonsProps) {
  const { socialMedia } = useSocialMediaStore();

  const buttons = SOCIAL_MEDIA_CONFIG.map(({ page, className }) => ({
    page,
    className,
    ...socialMedia[page], // agrega link y userId
  })).filter(({ link }) => link !== ""); // solo muestra las que tienen link

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ gap: `${Math.ceil((1 / 4) * size) * 4}px` }}
    >
      {buttons.map(({ page, link, className }) => (
        <a
          key={page}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2  flex justify-center items-center rounded-full shadow-sm shadow-foreground/30 hover:scale-110 active:scale-90 transition-transform ${className}`}
        >
          <Icon name={page} size={size} className="" />
        </a>
      ))}
    </div>
  );
}
