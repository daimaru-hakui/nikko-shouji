"use client";
import { Database } from "@/schema";
import React, { FC } from "react";
import OrderHistoryTableRow from "./order-history-table-row";
import useAuth from "@/hooks/useAuth";

type OrderHistory = Database["public"]["Tables"]["order_histories"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type ShippingAddress =
  Database["public"]["Tables"]["shipping_addresses"]["Row"];

interface Order extends OrderHistory {
  order_details: OrderDetail[] | null;
  shipping_addresses: ShippingAddress | null;
}

interface Props {
  orders: Order[];
  userId: string;
}

const OrderHistoryTable: FC<Props> = ({ orders, userId }) => {
  const {currentUser} = useAuth(userId)

  const StyleTableTh = "py-2 px-1 text-left border-b";

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
            {currentUser?.role === "admin" && (
              <th className={`${StyleTableTh}`}>処理</th>
            )}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderHistoryTableRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
