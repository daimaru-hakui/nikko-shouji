import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { CgCopy } from "react-icons/cg";

interface Props {
  methods: UseFormReturn<OrderInputs, any, undefined>;
  idx: number;
  removeRowHandler: () => void;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

const OrderContentTableRow: FC<Props> = ({
  methods,
  idx,
  removeRowHandler,
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDragEnd,
}) => {
  const { register, watch, setValue, getValues } = methods;

  const copyRow = (idx: number) => {
    const contetns = getValues("contents");
    const obj = contetns[idx];
    contetns.splice(idx, 0, obj);
    setValue("contents", contetns);
  };

  const inputStyle =
    "m-0.5 !border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500";

  return (
    <tr
      draggable={watch("contents").length === 1 ? false : true}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
    >
      <td className="text-center">
        <div className="">
          <CgCopy
            style={{ fontSize: "32px" }}
            className="cursor-pointer"
            onClick={() => copyRow(idx)}
          />
        </div>
      </td>
      <td className="text-center">
        <div className="">{idx + 1}</div>
      </td>
      <td>
        <select
          style={{ padding: "0.8rem" }}
          className={`${inputStyle} `}
          defaultValue=""
          {...register(`contents.${idx}.maker`)}
        >
          <option>ナガイレーベン</option>
          <option>自重堂</option>
          <option>大丸白衣</option>
          <option>カゼン</option>
        </select>
      </td>
      <td>
        <input
          className={`${inputStyle} p-3 min-w-36`}
          {...register(`contents.${idx}.productNumber`)}
        />
      </td>
      <td>
        <input
          className={`${inputStyle} p-3`}
          {...register(`contents.${idx}.productName`)}
        />
      </td>
      <td>
        <input
          className={`${inputStyle} p-3`}
          {...register(`contents.${idx}.color`)}
        />
      </td>
      <td>
        <input
          className={`${inputStyle} p-3 w-24 text-center`}
          {...register(`contents.${idx}.size`)}
        />
      </td>
      <td>
        <input
          type="number"
          className={`${inputStyle} p-3 w-24 text-center`}
          {...register(`contents.${idx}.quantity`, { required: true, min: 0 })}
        />
      </td>
      <td>
        <input
          className={`${inputStyle} p-3 w-full`}
          {...register(`contents.${idx}.comment`)}
        />
      </td>
      <td className="p-3">
        {idx !== 0 && (
          <AiOutlineDelete
            className="cursor-pointer"
            onClick={removeRowHandler}
          />
        )}
      </td>
    </tr>
  );
};

export default OrderContentTableRow;
