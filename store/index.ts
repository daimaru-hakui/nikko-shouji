import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

type Store = {
  session: Session | null;
  setSession: (session: Session) => void;
  isSidebar: boolean;
  toggleSidebar: () => void;
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
  carts: Carts;
  setCartContents: (orderInputs: OrderInputs) => void;
  setCartOthers: (other: { name: string, value: boolean | string | number; }) => void;
  resetCarts: () => void;
};

export const useStore = create<Store>((set) => ({
  session: null,
  setSession: (session) => set(() => ({ session: session })),
  isLoading: false,
  setIsLoading: (bool) => set({ isLoading: bool }),
  isSidebar: true,
  toggleSidebar: () => set((state) => ({ isSidebar: !state.isSidebar })),
  carts: {
    shippingAddress: 0,
    sample: false,
    orderNumber: "",
    topicName: "",
    desiredDeliveryOn: "",
    contents: []
  },
  setCartContents: (orderInputs) => set((state) => {
    const array = { ...state.carts, ...orderInputs };
    return { carts: array };
  }),
  setCartOthers: (other) => set((state) => {
    const array = { ...state.carts, [other.name]: other.value };
    return { carts: array };
  }),
  resetCarts: () => set({
    carts: {
      shippingAddress: 0,
      sample: false,
      orderNumber: "",
      topicName: "",
      desiredDeliveryOn: "",
      contents: []
    },
  })
}));