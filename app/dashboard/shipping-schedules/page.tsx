import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import { cookies } from "next/headers";
import { Database } from '@/schema';
import ShippingScheduleTable from './components/shipping-schedule-table';
import { NextPage } from 'next';
import ShippingScheduleModal from './components/shipping-schedule-modal';

const ShippingSchedules: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const getShippingSchedules = async () => {
    const { data, error } = await supabase
      .from("order_details")
      .select(`*,orders(*,shipping_addresses(*))`).order("id", { ascending: false });
    if (error) {
      alert(error.message);
    }
    if (!data) return;
    return data;
  };

  const shippingSchedules = await getShippingSchedules();

  if (!shippingSchedules) return;

  return (
    <div className="w-full max-w-[calc(1500px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">出荷予定（発注残）</h1>
      <ShippingScheduleModal />
      <ShippingScheduleTable shippingSchedules={shippingSchedules} />
    </div>
  );
};

export default ShippingSchedules;