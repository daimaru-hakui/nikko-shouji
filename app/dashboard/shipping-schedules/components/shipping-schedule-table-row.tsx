import { Database } from "@/schema";
import { useStore } from "@/store";
import { Button, Checkbox } from "@material-tailwind/react";
import { format } from "date-fns";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";

type OrderHistory = Database["public"]["Tables"]["order_histories"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];
type ShippingAddress =
  Database["public"]["Tables"]["shipping_addresses"]["Row"];

interface order extends OrderHistory {
  shipping_addresses: ShippingAddress | null;
}

interface ShippingSchedule extends OrderDetail {
  order_histories: order | null;
  suppliers: Supplier | null;
}

interface Props {
  shippingSchedule: ShippingSchedule;
  isCheckedHandler: (id: number) => boolean;
}

const ShippingScheduleTableRow: FC<Props> = ({
  shippingSchedule,
  isCheckedHandler,
}) => {
  // const currentUser = useStore((state) => state.currentUser);
  // const setCheckedOrders = useStore((state) => state.setCheckedOrders);
  // const removeCheckedOrders = useStore((state) => state.removeCheckedOrders);
  // const [isChecked, setIsChecked] = useState(false);

  // const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.checked) {
  //     setCheckedOrders([shippingSchedule]);
  //   } else {
  //     removeCheckedOrders(shippingSchedule);
  //   }
  // };

  // useEffect(() => {
  //   const result = isCheckedHandler(shippingSchedule.id);
  //   setIsChecked(result);
  // }, [shippingSchedule.id, isCheckedHandler]);

  const StyleTableTd = "py-0.5 px-1 text-left border-b";
  return (
    <tr
      key={shippingSchedule.id}
      style={{
        backgroundColor:
          shippingSchedule.order_histories?.order_status === "CANCEL"
            ? "#ccc"
            : "",
      }}
    >
      {/* {currentUser?.role === "admin" && (
        <td className={`${StyleTableTd}`}>
          <Checkbox
            checked={isChecked}
            onChange={handleChecked}
            crossOrigin={undefined}
          />
        </td>
      )} */}
      <td className={`${StyleTableTd}`}>
        <Link
          href={`/dashboard/shipping-schedules/${shippingSchedule.order_histories?.id}`}
        >
          <span className="underline text-blue-500">{shippingSchedule.order_histories?.id}</span>
        </Link>
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingSchedule.order_histories?.order_number}
      </td>
      <td className={`${StyleTableTd}`}>
        {format(new Date(shippingSchedule.created_at), "yyyy年MM月dd日")}
      </td>
      <td className={`${StyleTableTd}`}>{shippingSchedule.suppliers?.name}</td>
      <td className={`${StyleTableTd}`}>{shippingSchedule.product_number}</td>
      <td className={`${StyleTableTd}`}>{shippingSchedule?.product_name}</td>
      <td className={`${StyleTableTd}`}>{shippingSchedule?.color}</td>
      <td className={`${StyleTableTd} text-center`}>
        {shippingSchedule?.size}
      </td>
      <td className={`${StyleTableTd} text-center`}>
        {shippingSchedule?.quantity}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingSchedule.order_histories?.shipping_addresses?.name}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingSchedule?.order_histories?.processing ? "二次加工" : ""}
      </td>
      <td className={`${StyleTableTd}`}>{shippingSchedule?.comment}</td>
    </tr>
  );
};

export default ShippingScheduleTableRow;
