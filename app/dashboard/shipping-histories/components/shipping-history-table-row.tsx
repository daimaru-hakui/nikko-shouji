"use client";
import React, { FC } from "react";
import { Database } from "@/schema";
import { format } from "date-fns";
import { Button } from "@material-tailwind/react";
import ShippingHistoryModal from "./shipping-history-modal";

type ShippingHistory =
  Database["public"]["Tables"]["shipping_histories"]["Row"];
type ShippingDetail = Database["public"]["Tables"]["shipping_details"]["Row"];
type ShippingAddress =
  Database["public"]["Tables"]["shipping_addresses"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type OrderHistory = Database["public"]["Tables"]["order_histories"]["Row"];

interface OrderDetailHistory extends OrderDetail {
  order_histories: OrderHistory | null;
}

interface Order extends ShippingDetail {
  order_details: OrderDetailHistory | null;
}

interface ShippingHistoryAddress extends ShippingHistory {
  shipping_addresses: ShippingAddress | null;
  shipping_details: Order[] | null;
}

interface Props {
  shippingHistory: ShippingHistoryAddress;
}

const ShippingHistoryTableRow: FC<Props> = ({ shippingHistory }) => {
  const StyleTableTd = "py-2 px-1 text-left border-b";
  return (
    <tr>
      <td>
        <ShippingHistoryModal shippingHistory={shippingHistory} />
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingHistory.id}
        {/* {shippingHistory.shipping_details &&
          shippingHistory.shipping_details[0]?.order_details?.order_histories
            ?.id} */}
      </td>
      <td className={`${StyleTableTd}`}>
        {format(new Date(shippingHistory.shipping_date), "yyyy年MM月dd日")}
      </td>
      <td className={`${StyleTableTd}`}></td>
    </tr>
  );
};

export default ShippingHistoryTableRow;
