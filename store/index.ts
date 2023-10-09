import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { Database } from "@/schema";

type OrderHistory = Database["public"]["Tables"]["order_histories"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type ShippingAddress = Database["public"]["Tables"]["shipping_addresses"]["Row"];

interface Order extends OrderHistory {
  shipping_addresses: ShippingAddress | null;
};

interface CheckedOrder extends OrderDetail {
  order_histories: Order | null;
};


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
  checkedOrders: CheckedOrder[];
  setCheckedOrders: (checkedOrders: CheckedOrder[]) => void;
  removeCheckedOrders: (checkedOrder: CheckedOrder) => void;
  resetCheckedOrders: () => void;
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
  }),
  checkedOrders: [],
  setCheckedOrders: (checkedOrders) => set((state) => {
    const array = [...state.checkedOrders, ...checkedOrders];
    return {
      checkedOrders: array
    };
  }),

  removeCheckedOrders: (checkedOrder) => set((state) => {
    const array = state.checkedOrders.filter((order) => order.id !== checkedOrder.id);
    return {
      checkedOrders: array
    };
  }),
  resetCheckedOrders: () => set({ checkedOrders: [] })
}));