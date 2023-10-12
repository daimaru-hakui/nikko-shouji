import { Database } from '@/schema';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react'
import { cookies } from "next/headers";
import { NextPage } from 'next';
import ShippingHistoryTable from './components/shipping-history-table';

const ShippingHistory:NextPage = async() => {
    const supabase = createServerComponentClient<Database>({ cookies });

    const getShippingHistories = async () => {
      const { data, error } = await supabase
        .from("shipping_histories")
        .select(
          "*,shipping_details(*,shipping_addresses(*),order_details(*,order_histories(*)))"
        )
        .order("created_at", { ascending: false });
      if (error) {
        console.log(error.message);
      }
      return data;
    };
    const shippingHistories = await getShippingHistories();
    if (!shippingHistories) return;

    return (
      <div className="w-full max-w-[calc(800px)] mx-auto">
        <h1 className="mt-6 text-3xl font-bold">出荷伝票</h1>
        <ShippingHistoryTable shippingHistories={shippingHistories} />
      </div>
    );
  };

export default ShippingHistory