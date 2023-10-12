import React, { FC } from "react";
import { Database } from "@/schema";
import { format } from "date-fns";

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

interface ShippingDetailHistory extends ShippingDetail {
  shipping_histories: ShippingHistory | null;
  shipping_addresses: ShippingAddress | null;
  order_details: OrderDetailHistory | null;
}

interface Props {
  shippingDetail: ShippingDetailHistory;
}

const ShippingDetailTableRow: FC<Props> = ({ shippingDetail }) => {
  const StyleTableTd = "py-2 px-1 text-left border-b";
  return (
    <tr>
      <td className={`${StyleTableTd}`}>
        {shippingDetail.order_details?.order_history_id}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingDetail.order_details?.order_histories?.order_number}
      </td>
      {}
      <td className={`${StyleTableTd}`}>
        {shippingDetail.order_details?.order_histories?.created_at &&
          format(
            new Date(shippingDetail.order_details?.order_histories?.created_at),
            "yyyy年MM月dd日"
          )}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingDetail.shipping_histories?.shipping_date &&
          format(
            new Date(shippingDetail.shipping_histories?.shipping_date),
            "yyyy年MM月dd日"
          )}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingDetail.order_details?.product_number}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingDetail.order_details?.product_name}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingDetail.order_details?.color}
      </td>
      <td className={`${StyleTableTd} text-center`}>
        {shippingDetail.order_details?.size}
      </td>
      <td className={`${StyleTableTd} text-center`}>
        {shippingDetail.quantity}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingDetail.order_details?.order_histories?.sample
          ? "サンプル"
          : "通常発注"}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingDetail.shipping_addresses?.name}
      </td>
      <td className={`${StyleTableTd}`}></td>
    </tr>
  );
};

export default ShippingDetailTableRow;
