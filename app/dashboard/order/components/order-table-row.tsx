import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDragIndicator } from "react-icons/md";

interface Props {
  methods: UseFormReturn<OrderInputs, any, undefined>;
  idx: number;
  removeContentHandler: any;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

const OrderTableRow: FC<Props> = ({
  methods,
  idx,
  removeContentHandler,
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDragEnd,
}) => {
  const { register } = methods;


  const inputStyle =
    "!border !border-gray-300 bg-white text-gray-900 shadow-md shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10";

  return (
    <tr className="mt-6"
      draggable={true}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
    >
      <td className="text-center">
        <div className="">
          <MdDragIndicator
            style={{ fontSize: "32px" }}
            className="cursor-pointer" />
        </div>
      </td>
      <td className="text-center">
        <div className="">{idx + 1}</div>
      </td>
      <td>
        <select
          className={`${inputStyle} p-3.5`}
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
          className={`${inputStyle} p-3 w-36`}
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
          {...register(`contents.${idx}.quantity`)}
        />
      </td>
      <td>
        <input
          className={`${inputStyle} p-3 w-36`}
          {...register(`contents.${idx}.comment`)}
        />
      </td>
      <td className="p-3">
        <AiOutlineDelete
          className="cursor-pointer"
          onClick={removeContentHandler}
        />
      </td>
    </tr>
  );
};

export default OrderTableRow;