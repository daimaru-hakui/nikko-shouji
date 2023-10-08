"use client";
import { Database } from '@/schema';
import { Button } from '@material-tailwind/react';
import React, { FC } from 'react';
import { format } from "date-fns";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type ShippingAddress = Database["public"]["Tables"]["shipping_addresses"]["Row"];

interface OrderHistory extends Order {
  order_details: OrderDetail[] | null;
  shipping_addresses: ShippingAddress | null;
};

interface Props {
  orders: OrderHistory[];
}

const OrderHistoryTable: FC<Props> = ({ orders }) => {
  const StyleTableTh = "py-2 px-1 text-left border-b";
  const StyleTableTd = "py-2 px-1 text-left border-b";
  return (
    <div className='mt-12 w-full overflow-auto'>
      <table className='w-full max-w-[calc(1500px)] min-w-[calc(800px)]'>
        <thead>
          <tr>
            <th className={`${StyleTableTh}`}>詳細</th>
            <th className={`${StyleTableTh}`}>受付番号</th>
            <th className={`${StyleTableTh}`}>発注NO.</th>
            <th className={`${StyleTableTh}`}>発注日時</th>
            <th className={`${StyleTableTh}`}>お届け先</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className={`${StyleTableTd}`}>
                <Button className='py-1 px-2' size="sm">
                  詳細
                </Button></td>
              <td className={`${StyleTableTd}`}>{order.id}</td>
              <td className={`${StyleTableTd}`}>{order.order_number}</td>
              <td className={`${StyleTableTd}`}>
                {format(new Date(order.created_at), "yyyy年MM月dd日")}
              </td>
              <td className={`${StyleTableTd}`}>{order?.shipping_addresses?.customer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;