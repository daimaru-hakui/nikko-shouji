import React from "react";
import OrderForm from "./components/order-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/schema";

const OrderOage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const getProducts = async () => {
    const { data, error } = await supabase
      .from("order_details")
      .select("*")
      .limit(1000);
    if (error) {
      console.log(error.message);
    }
    if (!data) return;
    return data;
  };

  const products = await getProducts()
  if(!products) return

  return (
    <div className="w-full max-w-[calc(1500px)]">
      <h1 className="mt-6 text-3xl font-bold">Order</h1>
      <OrderForm products={products} />
    </div>
  );
};

export default OrderOage;
