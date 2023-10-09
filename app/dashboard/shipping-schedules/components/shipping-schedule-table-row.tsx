import { Database } from '@/schema';
import { useStore } from '@/store';
import { Checkbox } from '@material-tailwind/react';
import { format } from 'date-fns';
import React, { FC, useEffect, useState } from 'react';

type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type ShippingAddress = Database["public"]["Tables"]["shipping_addresses"]["Row"];

interface OrderRow extends Order {
  shipping_addresses: ShippingAddress | null;
};

interface ShippingSchedule extends OrderDetail {
  orders: OrderRow | null;
};

interface Props {
  shippingSchedule: ShippingSchedule;
  isCheckedHandler: (id: number) => boolean;
}

const ShippingScheduleTableRow: FC<Props> = ({ shippingSchedule, isCheckedHandler }) => {
  const setCheckedOrders = useStore((state) => state.setCheckedOrders);
  const removeCheckedOrders = useStore((state) => state.removeCheckedOrders);
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedOrders([shippingSchedule]);
    } else {
      removeCheckedOrders(shippingSchedule);
    }
  };

  useEffect(() => {
    const result = isCheckedHandler(shippingSchedule.id);
    setIsChecked(result);
  }, [shippingSchedule.id, isCheckedHandler]);

  const StyleTableTd = "py-0.5 px-1 text-left border-b";
  return (
    <tr key={shippingSchedule.id}>
      <td className={`${StyleTableTd}`}>
        <Checkbox
          checked={isChecked}
          onChange={handleChecked}
          crossOrigin={undefined}
        />
      </td>
      <td className={`${StyleTableTd}`}>{shippingSchedule.id}</td>
      <td className={`${StyleTableTd}`}>{shippingSchedule.orders?.order_number}</td>
      <td className={`${StyleTableTd}`}>
        {format(new Date(shippingSchedule.created_at), "yyyy年MM月dd日")}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingSchedule?.orders?.desired_delivery_on && (
          format(
            new Date(shippingSchedule?.orders?.desired_delivery_on.toString()),
            "yyyy年MM月dd日"))
        }
      </td>
      <td className={`${StyleTableTd}`}>{shippingSchedule.maker}</td>
      <td className={`${StyleTableTd}`}>{shippingSchedule.product_number}</td>
      <td className={`${StyleTableTd}`}>{shippingSchedule?.product_name}</td>
      <td className={`${StyleTableTd}`}>{shippingSchedule?.color}</td>
      <td className={`${StyleTableTd} text-center`}>{shippingSchedule?.size}</td>
      <td className={`${StyleTableTd} text-center`}>{shippingSchedule?.quantity}</td>
      <td className={`${StyleTableTd}`}>{shippingSchedule.orders?.shipping_addresses?.customer}</td>
      <td className={`${StyleTableTd}`}>
        {shippingSchedule?.orders?.sample ? "サンプル" : "通常発注"}</td>
      <td className={`${StyleTableTd}`}>{shippingSchedule?.comment}</td>
    </tr>
  );
};

export default ShippingScheduleTableRow;