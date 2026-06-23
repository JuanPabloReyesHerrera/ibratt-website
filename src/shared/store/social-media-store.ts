// store/social-media.store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  SocialMediaState,
  SocialMediaActions,
  SocialMediaPage,
} from "@/types";

const initialState: SocialMediaState = {
  socialMedia: {
    instagram: { link: "" },
    facebook: { link: "" },
    youtube: { link: "" },
    tiktok: { link: "" },
    beatstars: { link: "" },
    x: { link: "" },
    threads: { link: "" },
    whatsapp: { link: "" },
  },
};

export const useSocialMediaStore = create<
  SocialMediaState & SocialMediaActions
>()(
  devtools(
    (set) => ({
      ...initialState,

      updateEntry: (page, entry) =>
        set(
          (state) => ({
            socialMedia: {
              ...state.socialMedia,
              [page]: { ...state.socialMedia[page], ...entry },
            },
          }),
          false,
          "socialMedia/update",
        ),

      resetEntry: (page) =>
        set(
          (state) => ({
            socialMedia: {
              ...state.socialMedia,
              [page]: { link: "" },
            },
          }),
          false,
          "socialMedia/reset",
        ),
    }),
    { name: "SocialMediaStore" },
  ),
);
