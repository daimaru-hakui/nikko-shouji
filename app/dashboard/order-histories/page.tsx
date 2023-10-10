import React from "react";
import OrderHistoryTable from "./components/order-history-table";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/schema";
import { NextPage } from "next";

const OrderHistories: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const getOrders = async () => {
    const { data, error } = await supabase
      .from("order_histories")
      .select(`*,order_details(*),shipping_addresses(*)`)
      .order("id", { ascending: false });
    if (error) {
      alert(error.message);
    }
    if (!data) return;
    return data;
  };

  const getUserId = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.user.id;
  };

  const orders = await getOrders();
  const userId = await getUserId();

  if (!orders) return;
  if(!userId) return;

  return (
    <div className="w-full max-w-[calc(1300px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">発注履歴</h1>
      <OrderHistoryTable orders={orders} userId={userId} />
    </div>
  );
};

export default OrderHistories;
