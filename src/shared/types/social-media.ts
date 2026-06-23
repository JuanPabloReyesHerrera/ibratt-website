// types/social-media.types.ts
export type SocialMediaPage =
  | "instagram"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "beatstars"
  | "x"
  | "threads"
  | "whatsapp";

export type SocialMediaEntry = {
  link: string;
  userId?: string;
};

export type SocialMediaState = {
  socialMedia: Record<SocialMediaPage, SocialMediaEntry>;
};

export type SocialMediaActions = {
  updateEntry: (
    page: SocialMediaPage,
    entry: Partial<SocialMediaEntry>,
  ) => void;
  resetEntry: (page: SocialMediaPage) => void;
};
