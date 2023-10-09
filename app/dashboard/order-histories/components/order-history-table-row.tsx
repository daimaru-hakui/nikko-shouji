"use client";
import { Database } from '@/schema';
import { Button } from '@material-tailwind/react';
import React, { FC } from 'react';
import { format } from "date-fns";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import OrderHistoryModal from './order-history-modal';

type OrderHistory = Database["public"]["Tables"]["order_histories"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type ShippingAddress = Database["public"]["Tables"]["shipping_addresses"]["Row"];

interface Order extends OrderHistory {
  order_details: OrderDetail[] | null;
  shipping_addresses: ShippingAddress | null;
};

interface Props {
  order: Order;
}

const OrderHistoryTableRow: FC<Props> = ({ order }) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleChangeStatus = async (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
    const { data } = await supabase
      .from("order_histories")
      .select("*")
      .eq("id", id)
      .single();
    if (data?.order_status === "CANCEL") {
      alert("処理が失敗しました。");
      router.refresh();
      return;
    }
    const { error } = await supabase
      .from("order_histories")
      .update({
        order_status: e.target.value
      })
      .eq("id", id);
    if (error) {
      alert(error.message);
    }
    router.refresh();
  };

  const handleClickCancel = async (id: number) => {
    const { data } = await supabase
      .from("order_histories")
      .select("*")
      .eq("id", id)
      .single();
    if (data?.order_status !== "UNREAD") {
      alert("キャンセル処理が失敗しました。");
      router.refresh();
      return;
    }
    const result = confirm("キャンセルして宜しいでしょうか");
    if (!result) return;

    const { error } = await supabase
      .from("order_histories")
      .update({
        deleted_at: new Date().toISOString(),
        order_status: "CANCEL"
      }).eq("id", id);
    if (error) {
      alert(error.message);
      console.log(error);
    }
    router.refresh();
  };

  const getStatus = (status: string) => {
    switch (status) {
      case "UNREAD":
        return "処理中";
      case "READ":
        return "受付済み";
      case "ARRANGE":
        return "準備中";
      case "CANCEL":
        return "キャンセル済";
      case "SHIPPING":
        return "完了";
      default:
        return "-";
    }
  };

  const StyleTableTd = "py-2 px-1 text-left border-b";

  const inputStyle =
    "m-0.5 !border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500";

  return (
    <tr
      key={order.id}
      style={{ backgroundColor: order.order_status === "CANCEL" ? "#ddd" : "" }}
    >
      <td className={`${StyleTableTd} pl-2`}>
        <OrderHistoryModal order={order} />
      </td>
      <td className={`${StyleTableTd}`}>{order.id}</td>
      <td className={`${StyleTableTd}`}>{order.order_number}</td>
      <td className={`${StyleTableTd}`}>
        {format(new Date(order.created_at), "yyyy年MM月dd日 HH時MM分")}
      </td>
      <td className={`${StyleTableTd}`}>{order?.shipping_addresses?.customer}</td>
      <td className={`${StyleTableTd}`}>{getStatus(order.order_status)}</td>
      <td className={`${StyleTableTd}`}>
        {order.order_status === "UNREAD" && (
          <Button
            className='py-2 px-4'
            size="sm"
            onClick={() => handleClickCancel(order.id)}
          >
            キャンセル
          </Button>
        )}
      </td>
      <td className={`${StyleTableTd}`}>
        <select
          style={{ padding: "0.5rem" }}
          className={`${inputStyle} `}
          defaultValue={order.order_status}
          disabled={order.order_status === "CANCEL" ? true : false}
          onChange={(e) => handleChangeStatus(e, order.id)}
        >
          <option value="UNREAD">未読</option>
          <option value="READ">既読</option>
          <option value="ARRANGE">手配済み</option>
          <option value="SHIPPING">出荷</option>
        </select>
      </td>
    </tr>
  );
};

export default OrderHistoryTableRow;