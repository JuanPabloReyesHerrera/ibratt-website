"use client";
import { useSocialMediaStore } from "@/store";
import { useEffect } from "react";

export function AddSocialMedia() {
  const { updateEntry } = useSocialMediaStore();
  useEffect(() => {
    updateEntry("instagram", {
      link: "https://instagram.com/ibratt",
      userId: "@ibratt.wav",
    });
    updateEntry("youtube", {
      link: "https://instagram.com/ibratt",
      userId: "@ibratt.wav",
    });
    updateEntry("facebook", {
      link: "https://instagram.com/ibratt",
      userId: "@ibratt.wav",
    });
    updateEntry("tiktok", {
      link: "https://instagram.com/ibratt",
      userId: "@ibratt.wav",
    });
  }, []);

  return <></>;
}
