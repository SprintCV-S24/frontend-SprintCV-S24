import { create } from "zustand";

// Define the state and actions for your store
interface ImageCacheState {
  cache: Record<string, string>;
}

interface ImageCacheActions {
  getItem: (id: string) => string | undefined;
  setItem: (id: string, dataUrl: string) => void;
  invalidateItem: (id: string) => void;
  clearCache: () => void;
}

type UseImageCacheStore = ImageCacheState & ImageCacheActions;

// Create the store with explicit types for state and actions
export const useImageCacheStore = create<UseImageCacheStore>((set, get) => ({
  cache: {}, // Initial state

  getItem: (key) => {
    return get().cache[key];
  },

  setItem: (key, dataUrl) => {
    set((state) => ({
      cache: {
        ...state.cache,
        [key]: dataUrl,
      },
    }));
  },

  invalidateItem: (key) => {
    set((state) => {
      const newCache = { ...state.cache };
      delete newCache[key];
      return { cache: newCache };
    });
  },

  clearCache: () => {
    set({ cache: {} });
  },
}));
