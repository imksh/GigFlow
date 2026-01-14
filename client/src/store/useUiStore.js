import { create } from "zustand";

const useUiStore = create((set) => ({
  gigsPosted: 0,
  bidsMade: 0,
  hired: 0,
  activeGigs: 0,
  activeBids: 0,
  showHeader: false,
  setShowHeader: (val) => {
    set({ showHeader: val });
  },

  setGigsPosted: (val) => {
    set({ gigsPosted: val });
  },
  setBidsMade: (val) => {
    set({ bidsMade: val });
  },
  setHired: (val) => {
    set({ hired: val });
  },
  setActiveGigs: (val) => {
    set({ activeGigs: val });
  },
  setActiveBids: (val) => {
    set({ activeBids: val });
  },
}));

export default useUiStore;
