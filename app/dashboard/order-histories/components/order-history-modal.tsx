"use client";
import React, { FC } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
import { Database } from "@/schema";
import { format } from "date-fns";
import OrderHistoryModalTableRow from "./order-history-modal-table.row";

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
  order: Order;
}

const OrderHistoryModal: FC<Props> = ({ order }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const StyleTableTh =
    "border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-1 text-left text-black";

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        className="py-2 px-4"
        size="sm"
      >
        詳細
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader className="flex justify-between">
          発注詳細
          <button>
            <AiOutlineClose onClick={() => setOpen(false)} />
          </button>
        </DialogHeader>
        <DialogBody className="pt-0 ">
          <div className="flex gap-6 text-black">
            <div>
              <div className="text-sm">受付番号</div>
              <div>{order.id}</div>
            </div>
            <div>
              <div className="text-sm">発注日時</div>
              <div>
                {format(new Date(order.created_at), "yyyy年MM月dd日 HH時mm分")}
              </div>
            </div>
            <div>
              <div className="text-sm">送り先</div>
              <div>{order.shipping_addresses?.name}</div>
            </div>
          </div>
          <div className="mt-6 h-[calc(100%)] overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={`${StyleTableTh}`}>メーカー</th>
                  <th className={`${StyleTableTh}`}>品番</th>
                  <th className={`${StyleTableTh}`}>品名</th>
                  <th className={`${StyleTableTh}`}>カラー</th>
                  <th className={`${StyleTableTh}`}>サイズ</th>
                  <th className={`${StyleTableTh}`}>受注数</th>
                  <th className={`${StyleTableTh}`}>未出荷数</th>
                  <th className={`${StyleTableTh}`}>出荷数</th>
                  <th className={`${StyleTableTh}`}>コメント</th>
                </tr>
              </thead>
              <tbody>
                {order.order_details?.map((detail) => (
                  <OrderHistoryModalTableRow key={detail.id} detail={detail}/>
                  // <tr key={detail.id}>
                  //   <td className={`${StyleTableTd}`}>
                  //     {detail.suppliers?.name}
                  //   </td>
                  //   <td className={`${StyleTableTd}`}>
                  //     {detail.product_number}
                  //   </td>
                  //   <td className={`${StyleTableTd}`}>{detail.product_name}</td>
                  //   <td className={`${StyleTableTd}`}>{detail.color}</td>
                  //   <td className={`${StyleTableTd}`}>{detail.size}</td>
                  //   <td className={`${StyleTableTd}`}>
                  //     {detail.order_quantity}
                  //   </td>
                  //   <td className={`${StyleTableTd}`}>
                  //     {detail.quantity}
                  //   </td>
                  //   <td className={`${StyleTableTd}`}>
                  
                  //   </td>
                  //   <td className={`${StyleTableTd}`}>{detail.comment}</td>
                  // </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-1">
            <span>閉じる</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default OrderHistoryModal;
