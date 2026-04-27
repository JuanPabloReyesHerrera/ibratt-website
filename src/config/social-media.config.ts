// config/social-media.config.ts
import type { SocialMediaPage } from "@/types";

type SocialMediaConfig = {
  page: SocialMediaPage;
  className: string;
};

export const SOCIAL_MEDIA_CONFIG: SocialMediaConfig[] = [
  {
    page: "instagram",
    className:
      "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white",
  },
  { page: "facebook", className: "bg-blue-600 text-white" },
  { page: "youtube", className: "bg-red-600 text-white" },
  { page: "tiktok", className: "bg-black text-white" },
  { page: "beatstars", className: "bg-yellow-400 text-black" },
  { page: "x", className: "bg-black text-white" },
  { page: "threads", className: "bg-black text-white" },
  { page: "whatsapp", className: "bg-green-500 text-white" },
];
