"use client";
import { Database } from "@/schema";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

type OrderHistory = Database["public"]["Tables"]["order_histories"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];
type ShippingAddress =
  Database["public"]["Tables"]["shipping_addresses"]["Row"];
type ShippingDetail = Database["public"]["Tables"]["shipping_details"]["Row"];

interface OrderDetailSupllier extends OrderDetail {
  suppliers: Supplier | null;
  shipping_details: ShippingDetail[];
}

interface Order extends OrderHistory {
  order_details: OrderDetailSupllier[] | null;
  shipping_addresses: ShippingAddress | null;
}

interface Props {
  orders: Order;
  userId: string;
}

const OrderProcessTable = () => {
  const [order, setOrder] = useState<Props>();
  const { id } = useParams();

  useEffect(() => {
    const getOrders = async () => {
      const url = `/api/order-histories/${id}`;
      const response = await fetch(url);
      const order:Props = await response.json();
      setOrder(order);
    };
    getOrders()
  }, [id]);

  const StyleTableTh =
    "border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-1 text-left text-black";

  return (
    <div className="mt-12 w-full overflow-auto">
      <table className="w-full max-w-[calc(1500px)] min-w-[calc(1200px)]">
        <thead>
          <tr>
            <th className={`${StyleTableTh}`}>詳細</th>
            <th className={`${StyleTableTh}`}>受付番号</th>
            <th className={`${StyleTableTh}`}>発注NO.</th>
            <th className={`${StyleTableTh}`}>発注日時</th>
            <th className={`${StyleTableTh}`}>お届け先</th>
            <th className={`${StyleTableTh}`}>状況</th>
            <th className={`${StyleTableTh}`}>キャンセル</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default OrderProcessTable;
