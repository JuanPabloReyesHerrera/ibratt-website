import * as si from "simple-icons";

const ICON_MAP: Record<string, si.SimpleIcon> = {
  instagram: si.siInstagram,
  facebook: si.siFacebook,
  youtube: si.siYoutube,
  tiktok: si.siTiktok,
  beatstars: si.siBeatstars, // existe en simple-icons
  x: si.siX,
  threads: si.siThreads,
  whatsapp: si.siWhatsapp,
};

interface iconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon = ({ name, size, className = "" }: iconProps) => {
  const icon = ICON_MAP[name];
  if (!icon) return null;
  return (
    <svg
      // aria-hidden="true"
      // focusable="false"
      // className={`inline-block fill-current ${className} size-${size || 5}`}
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`fill-current inline-block ${className}`}
      fill="currentColor"
    >
      <path d={icon.path} />

      {/* <use href={`/assets/sprite.svg#${name}`} /> */}
    </svg>
  );
};
