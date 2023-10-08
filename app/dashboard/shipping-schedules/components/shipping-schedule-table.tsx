"use client";
import { Database } from '@/schema';
import { Checkbox } from '@material-tailwind/react';
import { format } from 'date-fns';
import React, { FC } from 'react';

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
  shippingSchedules: ShippingSchedule[];
}

const ShippingScheduleTable: FC<Props> = ({ shippingSchedules }) => {
  const StyleTableTh = "py-0.5 px-1 text-left border-b";
  const StyleTableTd = "py-0.5 px-1 text-left border-b";
  return (
    <div className='mt-12 w-full overflow-auto'>
      <table className='w-full max-w-[calc(1500px)] min-w-[calc(800px)]'>
        <thead>
          <tr>
            <th className={`${StyleTableTh}`}>
              <Checkbox
                name="sample"
                // checked={carts.sample}
                // onChange={handleCheck}
                crossOrigin={undefined}
              />
            </th>
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
            <th className={`${StyleTableTh}`}>区分</th>
            <th className={`${StyleTableTh}`}>コメント</th>
          </tr>
        </thead>
        <tbody>
          {shippingSchedules.map((schedule) => (
            <tr key={schedule.id}>
              <td className={`${StyleTableTd}`}>
                <Checkbox
                  className=''
                  name="sample"
                  // checked={carts.sample}
                  // onChange={handleCheck}
                  crossOrigin={undefined}
                />
              </td>
              <td className={`${StyleTableTd}`}>{schedule.id}</td>
              <td className={`${StyleTableTd}`}>{schedule.orders?.order_number}</td>
              <td className={`${StyleTableTd}`}>
                {format(new Date(schedule.created_at), "yyyy年MM月dd日")}
              </td>
              <td className={`${StyleTableTd}`}>
                {schedule?.orders?.desired_delivery_on && (
                  format(
                    new Date(schedule?.orders?.desired_delivery_on.toString()),
                    "yyyy年MM月dd日"))
                }
              </td>
              <td className={`${StyleTableTd}`}>{schedule.maker}</td>
              <td className={`${StyleTableTd}`}>{schedule.product_number}</td>
              <td className={`${StyleTableTd}`}>{schedule?.product_name}</td>
              <td className={`${StyleTableTd}`}>{schedule?.color}</td>
              <td className={`${StyleTableTd} text-center`}>{schedule?.size}</td>
              <td className={`${StyleTableTd} text-center`}>{schedule?.quantity}</td>
              <td className={`${StyleTableTd}`}>{schedule?.orders?.sample ? "サンプル" : "通常発注"}</td>
              <td className={`${StyleTableTd}`}>{schedule?.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingScheduleTable;