"use client";
import { Database } from "@/schema";
import { Checkbox } from "@material-tailwind/react";
import React, { FC, useCallback, useEffect } from "react";
import ShippingScheduleTableRow from "./shipping-schedule-table-row";
import { useStore } from "@/store";
import useAuth from "@/hooks/useAuth";

type OrderHistory = Database["public"]["Tables"]["order_histories"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];
type ShippingAddress =
  Database["public"]["Tables"]["shipping_addresses"]["Row"];

interface Order extends OrderHistory {
  shipping_addresses: ShippingAddress | null;
}

interface ShippingSchedule extends OrderDetail {
  order_histories: Order | null;
  suppliers:Supplier | null;
}

interface Props {
  shippingSchedules: ShippingSchedule[];
  userId: string;
}

const ShippingScheduleTable: FC<Props> = ({ shippingSchedules, userId }) => {
  const checkedOrders = useStore((state) => state.checkedOrders);
  const resetCheckedOrders = useStore((state) => state.resetCheckedOrders);
  const setCheckedOrders = useStore((state) => state.setCheckedOrders);
  const { currentUser } = useAuth(userId);

  useEffect(() => {
    resetCheckedOrders();
  }, [resetCheckedOrders]);

  const isCheckedHandler = useCallback(
    (id: number) => {
      const array = checkedOrders.map((checkedOrder) => checkedOrder.id);
      return array.includes(id);
    },
    [checkedOrders]
  );

  const onAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedOrders(shippingSchedules);
    } else {
      resetCheckedOrders();
    }
  };

  const StyleTableTh = "py-0.5 px-1 text-left border-b";
  return (
    <div className="w-full overflow-auto">
      <table className="w-full max-w-[calc(1500px)] min-w-[calc(1500px)]">
        <thead>
          <tr>
            {currentUser?.role === "admin" && (
              <th className={`${StyleTableTh}`}>
                <Checkbox
                  name="sample"
                  onChange={onAllChecked}
                  crossOrigin={undefined}
                />
              </th>
            )}
            <th className={`${StyleTableTh}`}>受付番号</th>
            <th className={`${StyleTableTh}`}>発注NO.</th>
            <th className={`${StyleTableTh}`}>発注日時</th>
            <th className={`${StyleTableTh}`}>希望納期</th>
            <th className={`${StyleTableTh}`}>メーカー</th>
            <th className={`${StyleTableTh}`}>品番</th>
            <th className={`${StyleTableTh}`}>品名</th>
            <th className={`${StyleTableTh}`}>カラー</th>
            <th className={`${StyleTableTh} text-center`}>サイズ</th>
            <th className={`${StyleTableTh} text-center`}>数量</th>
            <th className={`${StyleTableTh}`}>送り先</th>
            <th className={`${StyleTableTh}`}>区分</th>
            <th className={`${StyleTableTh}`}>コメント</th>
          </tr>
        </thead>
        <tbody>
          {shippingSchedules.map((shippingSchedule) => (
            <ShippingScheduleTableRow
              key={shippingSchedule.id}
              shippingSchedule={shippingSchedule}
              isCheckedHandler={isCheckedHandler}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingScheduleTable;
