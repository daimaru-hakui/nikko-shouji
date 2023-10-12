import React, { FC } from "react";
import { Database } from "@/schema";
import ShippingHistoryTableRow from "./shipping-history-table-row";

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
  shipping_addresses: ShippingAddress | null;
}

interface ShippingHistoryAddress extends ShippingHistory {
  shipping_details: Order[] | null;
}

interface Props {
  shippingHistories: ShippingHistoryAddress[];
}

const ShippingHistoryTable: FC<Props> = ({ shippingHistories }) => {
  const StyleTableTh = "py-0.5 px-1 text-left border-b";

  return (
    <div className="mt-12 w-full overflow-auto">
      <table className="w-full max-w-[calc(800px)] min-w-[calc(800px)]">
        <thead>
          <tr>
            <th className={`${StyleTableTh}`}>詳細</th>
            <th className={`${StyleTableTh}`}>出荷番号</th>
            <th className={`${StyleTableTh}`}>出荷日</th>
            <th className={`${StyleTableTh}`}>コメント</th>
          </tr>
        </thead>
        <tbody>
          {shippingHistories.map((shippingHistory) => (
            <ShippingHistoryTableRow
              key={shippingHistory.id}
              shippingHistory={shippingHistory}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingHistoryTable;
