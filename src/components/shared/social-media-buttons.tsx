import { SocialMedia } from "@/types";
import { Icon } from "../ui";

type SocialMediaButtonsProps = {
  socialMedia: SocialMedia[];
  size: number;
};

export default function SocialMediaButtons({
  socialMedia,
  size,
}: SocialMediaButtonsProps) {
  return (
    <div className="dark">
      <div className={`w-full flex space-x-${Math.ceil((2 / 3) * size)}`}>
        {socialMedia.map(({ page, link, className }) => (
          <a
            key={page}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full text-white hover:scale-125 transition-transform ${className}`}
          >
            <Icon name={page} size={size} />
          </a>
        ))}
      </div>
    </div>
  );
}
