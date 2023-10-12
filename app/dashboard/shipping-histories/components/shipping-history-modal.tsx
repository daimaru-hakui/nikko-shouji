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
  shippingHistory: ShippingHistoryAddress;
}

const ShippingHistoryModal: FC<Props> = ({ shippingHistory }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const StyleTableTh =
    "border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-1 text-left";
  const StyleTableTd = "px-2 py-1 text-left text-black border-b";

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
      <Dialog open={open} handler={handleOpen} size="xl">
        <DialogHeader className="flex justify-between">
          詳細
          <button>
            <AiOutlineClose onClick={() => setOpen(false)} />
          </button>
        </DialogHeader>
        <DialogBody className="pt-0 text-black">
          <div className="flex gap-3">
            <div>出荷番号</div>
            <div>{shippingHistory.id}</div>
          </div>
          <div className="flex gap-3">
            <div>出荷日</div>
            <div>
              {format(
                new Date(shippingHistory.shipping_date),
                "yyyy年MM月dd日"
              )}
            </div>
          </div>
          <div className="mt-6 h-[calc(100%)] overflow-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className={`${StyleTableTh}`}>発注NO.</th>
                  <th className={`${StyleTableTh}`}>品番</th>
                  <th className={`${StyleTableTh}`}>品名</th>
                  <th className={`${StyleTableTh}`}>カラー</th>
                  <th className={`${StyleTableTh}`}>サイズ</th>
                  <th className={`${StyleTableTh}`}>数量</th>
                  <th className={`${StyleTableTh}`}>出荷先</th>
                  <th className={`${StyleTableTh}`}>コメント</th>
                </tr>
              </thead>
              <tbody>
                {shippingHistory.shipping_details?.map((detail) => (
                  <tr key={detail.id}>
                    <td className={`${StyleTableTd}`}>
                      {detail.order_details?.order_histories?.order_number}
                    </td>
                    <td className={`${StyleTableTd}`}>
                      {detail.order_details?.product_number}
                    </td>
                    <td className={`${StyleTableTd}`}>
                      {detail.order_details?.product_name}
                    </td>
                    <td className={`${StyleTableTd}`}>
                      {detail.order_details?.color}
                    </td>
                    <td className={`${StyleTableTd}`}>
                      {detail.order_details?.size}
                    </td>
                    <td className={`${StyleTableTd}`}>
                      {detail.order_details?.quantity}
                    </td>
                    <td className={`${StyleTableTd}`}>
                      {detail.shipping_addresses?.name}
                    </td>
                    <td className={`${StyleTableTd}`}>
                      {detail.order_details?.comment}
                    </td>
                  </tr>
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

export default ShippingHistoryModal;
