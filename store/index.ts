import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { Database } from "@/schema";

type User = Database["public"]["Tables"]["users"]["Row"];
type OrderHistory = Database["public"]["Tables"]["order_histories"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type ShippingAddress =
  Database["public"]["Tables"]["shipping_addresses"]["Row"];

interface Order extends OrderHistory {
  shipping_addresses: ShippingAddress | null;
}

interface CheckedOrder extends OrderDetail {
  order_histories: Order | null;
}

type Store = {
  currentUser: User | null;
  setCurrentUser: (currentUser: User) => void;
  session: Session | null;
  setSession: (session: Session) => void;
  isSidebar: boolean;
  toggleSidebar: () => void;
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
  carts: Carts;
  setCartContents: (orderInputs: OrderInputs) => void;
  setCartOthers: (other: {
    name: string;
    value: boolean | string | number;
  }) => void;
  resetCarts: () => void;
  checkedOrders: CheckedOrder[];
  setCheckedOrders: (checkedOrders: CheckedOrder[]) => void;
  removeCheckedOrders: (checkedOrder: CheckedOrder) => void;
  resetCheckedOrders: () => void;
  productNumbers: string[];
  productNames: string[];
  productColors: string[];
  setProducts: (products: OrderDetail[]) => void;
};

export const useStore = create<Store>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
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
    contents: [],
  },
  setCartContents: (orderInputs) =>
    set((state) => {
      const array = { ...state.carts, ...orderInputs };
      return { carts: array };
    }),
  setCartOthers: (other) =>
    set((state) => {
      const array = { ...state.carts, [other.name]: other.value };
      return { carts: array };
    }),
  resetCarts: () =>
    set({
      carts: {
        shippingAddress: 0,
        sample: false,
        orderNumber: "",
        topicName: "",
        desiredDeliveryOn: "",
        contents: [],
      },
    }),
  checkedOrders: [],
  setCheckedOrders: (checkedOrders) =>
    set((state) => {
      const array = [...state.checkedOrders, ...checkedOrders];
      return {
        checkedOrders: array,
      };
    }),

  removeCheckedOrders: (checkedOrder) =>
    set((state) => {
      const array = state.checkedOrders.filter(
        (order) => order.id !== checkedOrder.id
      );
      return {
        checkedOrders: array,
      };
    }),
  resetCheckedOrders: () => set({ checkedOrders: [] }),
  productNumbers: [],
  productNames: [],
  productColors: [],
  setProducts: (products) =>
    set(() => {
      const productNumbers = products.map((product) => product.product_number);
      const setProductNumbers = new Set(productNumbers);
      const newProductNumbers = Array.from(setProductNumbers).sort();
      const productNames = products.map((product) => product.product_name);
      const setProducNames = new Set(productNames);
      const newProducNames = Array.from(setProducNames).sort();
      const productColors = products.map((product) => product.color);
      const setProductColors = new Set(productColors);
      const newProductColors = Array.from(setProductColors).sort();
      return {
        productNumbers: newProductNumbers,
        productNames: newProducNames,
        productColors: newProductColors,
      };
    }),
}));
