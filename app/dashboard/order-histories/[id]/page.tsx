import React from "react";
import OrderProcessTable from "./components/order-process-table";
import OrderProcessHeader from "./components/order-process-header";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/schema";

const OrderHistoryId = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const getOrders = async () => {
    const {data} = await supabase.rpc("get_orders");
    return data
  };
  console.log(await getOrders())
  return (
    <div className="w-full max-w-[calc(1300px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">伝票処理</h1>
      <OrderProcessHeader />
      <OrderProcessTable />
    </div>
  );
};

export default OrderHistoryId;
