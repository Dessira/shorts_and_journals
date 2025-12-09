import { create } from "zustand";
import { createJournal } from "../api/journal";
import type { Journal, JournalCreatePayload } from "../types";


interface JournalState {
    journals: Journal[];
    setJournals: (journals: Journal[]) => void;
    addJournal: (data: JournalCreatePayload) => Promise<void>;
  }
  
  export const useJournalStore = create<JournalState>((set) => ({
    journals: [],
    setJournals: (journals) => set({ journals }),
    addJournal: async (data) => {
      const newJournal = await createJournal(data);
      set((state) => ({
        journals: [...state.journals, newJournal],
      }));
    },
  }));
