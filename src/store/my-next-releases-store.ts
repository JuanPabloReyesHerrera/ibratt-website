import { create } from "zustand";
import type { MyNextRelease } from "@/types";

type MyNextReleasesState = {
  release: MyNextRelease | null;
  isApprovalDialogOpen: boolean;

  setRelease: (release: MyNextRelease) => void;
  openApprovalDialog: () => void;
  closeApprovalDialog: () => void;
  approveRelease: (approvedBy: string) => void;
  getRemainingModifications: () => number;
  hasReachedModificationLimit: () => boolean;
};

export const useMyNextReleasesStore = create<MyNextReleasesState>(
  (set, get) => ({
    release: null,
    isApprovalDialogOpen: false,

    setRelease: (release) => set({ release }),

    openApprovalDialog: () => set({ isApprovalDialogOpen: true }),
    closeApprovalDialog: () => set({ isApprovalDialogOpen: false }),

    approveRelease: (approvedBy) => {
      const { release } = get();
      if (!release) return;

      set({
        release: {
          ...release,
          isFullyApproved: true,
          approvedAt: new Date().toISOString(),
          approvedBy,
        },
        isApprovalDialogOpen: false,
      });
    },

    getRemainingModifications: () => {
      const { release } = get();
      if (!release) return 0;
      // Cada versión después de la primera cuenta como una modificación

      const used = Math.max(0, release.versions!.length - 1); // Luego vuelvo a revisar esto
      return Math.max(0, release.maxModifications - used);
    },

    hasReachedModificationLimit: () => {
      const { getRemainingModifications } = get();
      return getRemainingModifications() === 0;
    },
  }),
);
