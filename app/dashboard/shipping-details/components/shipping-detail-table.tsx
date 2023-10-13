import React, { FC } from "react";
import ShippingHistoryTableRow from "./shipping-detail-table-row";
import { Database } from "@/schema";

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
interface ShippingHistoryAddress extends ShippingHistory {
  shipping_addresses: ShippingAddress | null;
}

interface ShippingDetailHistory extends ShippingDetail {
  shipping_histories: ShippingHistoryAddress | null;
  order_details: OrderDetailHistory | null;
}

interface Props {
  shippingDetails: ShippingDetailHistory[];
}

const ShippingDetailTable: FC<Props> = ({ shippingDetails }) => {
  const StyleTableTh = "py-0.5 px-1 text-left border-b";

  return (
    <div className="mt-12 w-full overflow-auto">
      <table className="w-full max-w-[calc(1200px)] min-w-[calc(1200px)]">
        <thead>
          <tr>
            <th className={`${StyleTableTh}`}>受付番号</th>
            <th className={`${StyleTableTh}`}>発注NO.</th>
            <th className={`${StyleTableTh}`}>発注日時</th>
            <th className={`${StyleTableTh}`}>出荷日</th>
            <th className={`${StyleTableTh}`}>品番</th>
            <th className={`${StyleTableTh}`}>品名</th>
            <th className={`${StyleTableTh}`}>カラー</th>
            <th className={`${StyleTableTh} text-center`}>サイズ</th>
            <th className={`${StyleTableTh} text-center`}>数量</th>
            <th className={`${StyleTableTh}`}>区分</th>
            <th className={`${StyleTableTh}`}>送り先</th>
            <th className={`${StyleTableTh}`}>コメント</th>
          </tr>
        </thead>
        <tbody>
          {shippingDetails.map((shippingDetail) => (
            <ShippingHistoryTableRow
              key={shippingDetail.id}
              shippingDetail={shippingDetail}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingDetailTable;
