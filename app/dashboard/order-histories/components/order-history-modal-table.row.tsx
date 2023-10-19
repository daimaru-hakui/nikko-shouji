import { Database } from "@/schema";
import React, { FC } from "react";

type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];
type ShippingDetail = Database["public"]["Tables"]["shipping_details"]["Row"];

interface OrderDetailSupllier extends OrderDetail {
  suppliers: Supplier | null;
  shipping_details: ShippingDetail[];
}

interface Props {
  detail: OrderDetailSupllier;
}

const OrderHistoryModalTableRow: FC<Props> = ({ detail }) => {
  const reduceSum = (detail: OrderDetailSupllier) => {
    const array = detail.shipping_details.map((detail) => detail.quantity);
    const sum = array.reduce((prev, current) => prev + current, 0);
    return sum;
  };

  const StyleTableTd = "px-2 py-2 text-left text-black border-b";
  return (
    <tr key={detail.id}>
      <td className={`${StyleTableTd}`}>{detail.suppliers?.name}</td>
      <td className={`${StyleTableTd}`}>{detail.product_number}</td>
      <td className={`${StyleTableTd}`}>{detail.product_name}</td>
      <td className={`${StyleTableTd}`}>{detail.color}</td>
      <td className={`${StyleTableTd} text-center`}>{detail.size}</td>
      <td className={`${StyleTableTd} text-center`}>{detail.order_quantity}</td>
      <td className={`${StyleTableTd} text-center`}>{detail.quantity}</td>
      <td className={`${StyleTableTd} text-center`}>{reduceSum(detail)}</td>
      <td className={`${StyleTableTd} text-center`}>{detail.processing && "あり"}</td>
      <td className={`${StyleTableTd}`}>{detail.comment}</td>
    </tr>
  );
};

export default OrderHistoryModalTableRow;
