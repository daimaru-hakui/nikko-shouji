import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

type Store = {
  session: Session | null;
  setSession: (session: Session) => void;
  isSidebar: boolean;
  toggleSidebar: () => void;
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  session: null,
  setSession: (session) => set(() => ({ session: session })),
  isLoading: false,
  setIsLoading: (bool) => set({ isLoading: bool }),
  isSidebar: true,
  toggleSidebar: () => set((state) => ({ isSidebar: !state.isSidebar })),
}));