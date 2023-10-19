import React from "react";
import OrderForm from "./components/order-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/schema";

const OrderOage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const getProducts = async () => {
    const { data, error } = await supabase.rpc("get_products");
    if (error) console.log(error.message);
    return data;
  };

  const getSuppliers = async () => {
    const { data, error } = await supabase.rpc("get_suppliers");
    if (error) console.log(error.message);
    return data;
  };

  const products = await getProducts();
  const suppliers = await getSuppliers();
  if (!products) return;
  if (!suppliers) return;

  return (
    <div className="w-full max-w-[calc(1500px)]">
      <h1 className="mt-6 text-3xl font-bold">Order</h1>
      <OrderForm products={products} suppliers={suppliers} />
    </div>
  );
};

export default OrderOage;
