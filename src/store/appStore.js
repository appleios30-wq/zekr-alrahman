// ============================================================================
//  App Store (Zustand) - مخزن الحالة
// ============================================================================

import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  // Theme
  currentTheme: 'MORNING',
  setTheme: (theme) => set({ currentTheme: theme }),

  // Adhkar
  adhkar: [],
  setAdhkar: (adhkar) => set({ adhkar }),
  addZikr: (zikr) => set((state) => ({ adhkar: [zikr, ...state.adhkar] })),
  updateZikr: (updatedZikr) =>
    set((state) => ({
      adhkar: state.adhkar.map((z) => (z.id === updatedZikr.id ? updatedZikr : z)),
    })),
  removeZikr: (id) =>
    set((state) => ({
      adhkar: state.adhkar.filter((z) => z.id !== id),
    })),
  incrementZikrCount: (id) =>
    set((state) => ({
      adhkar: state.adhkar.map((z) =>
        z.id === id && z.currentCount < z.targetCount
          ? { ...z, currentCount: z.currentCount + 1 }
          : z
      ),
    })),

  // Sirr fi Bir
  notes: [],
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  updateNote: (updatedNote) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)),
    })),
  removeNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    })),

  // Security
  isAuthenticated: false,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  pinHash: null,
  setPinHash: (hash) => set({ pinHash: hash }),

  // UI
  selectedNameId: null,
  setSelectedNameId: (id) => set({ selectedNameId: id }),
}));
