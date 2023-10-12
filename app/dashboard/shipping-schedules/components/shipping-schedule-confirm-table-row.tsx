import React, { FC } from "react";
import { CheckedOrder, useStore } from "@/store";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import { Database } from "@/schema";

type ShippingAddress =
  Database["public"]["Tables"]["shipping_addresses"]["Row"];

interface Props {
  methods: UseFormReturn<ShippingScheduleInputs, any, undefined>;
  checkedOrder: CheckedOrder;
  shippingAddresses: ShippingAddress[];
  idx: number;
}

const ShippingScheduleConfirmTableRow: FC<Props> = ({
  methods,
  checkedOrder,
  shippingAddresses,
  idx,
}) => {
  const { register, watch, setValue, control } = methods;
  const removeCheckedOrders = useStore((state) => state.removeCheckedOrders);
  const { remove } = useFieldArray({
    control,
    name: "contents",
  });

  const orderDetailId = checkedOrder.id;
  setValue(`contents.${idx}.order_detail_id`, orderDetailId);

  const quantity =
    checkedOrder.quantity - watch(`contents.${idx}.quantity`) >= 0
      ? checkedOrder.quantity - watch(`contents.${idx}.quantity`)
      : 0;
  setValue(`contents.${idx}.remainingQuantity`, quantity);

  const handleRemoveCheckedOrder = () => {
    removeCheckedOrders(checkedOrder);
    remove(idx);
  };

  const StyleTableTd = "px-2 py-1 text-left text-black border-b";
  const inputStyle =
    "!border !border-gray-300 bg-white text-gray-900 shadow-md shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10";

  return (
    <tr key={checkedOrder.id}>
      <td className={`${StyleTableTd}`}>{checkedOrder.order_history_id}</td>
      <td className={`${StyleTableTd}`}>
        {checkedOrder.order_histories?.order_number}
      </td>
      <td className={`${StyleTableTd}`}>{checkedOrder.suppliers?.name}</td>
      <td className={`${StyleTableTd}`}>{checkedOrder.product_number}</td>
      <td className={`${StyleTableTd}`}>{checkedOrder.product_name}</td>
      <td className={`${StyleTableTd}`}>{checkedOrder.color}</td>
      <td className={`${StyleTableTd} text-center`}>{checkedOrder.size}</td>
      <td className={`${StyleTableTd} text-center`}>{checkedOrder.quantity}</td>
      <td className={`${StyleTableTd} text-center`}>
        <input
          type="number"
          defaultValue={checkedOrder.quantity}
          className={`${inputStyle} py-1 px-2 w-full max-w-[calc(80px)]`}
          {...register(`contents.${idx}.quantity`)}
        />
      </td>
      <td className={`${StyleTableTd}`}>
        <input
          type="number"
          className={`${inputStyle} py-1 px-2 w-full max-w-[calc(80px)]`}
          {...register(`contents.${idx}.remainingQuantity`)}
        />
      </td>
      <td className={`${StyleTableTd} text-left`}>
        <select
          className={`${inputStyle} h-10 py-1 px-2 w-full max-w-[calc(200px)]`}
          defaultValue={checkedOrder?.order_histories?.shipping_addresses?.id}
          {...register(`contents.${idx}.shippingAddress`)}
        >
          {shippingAddresses.map((address) => (
            <option key={address.id} value={address.id}>{address.name}</option>
          ))}
        </select>
      </td>
      <td className={`${StyleTableTd}`}>
        <div className="flex justify-center cursor-pointer">
          <BsTrash onClick={handleRemoveCheckedOrder} />
        </div>
      </td>
    </tr>
  );
};

export default ShippingScheduleConfirmTableRow;
