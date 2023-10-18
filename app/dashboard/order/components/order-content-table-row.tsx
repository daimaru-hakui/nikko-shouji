import { useStore } from "@/store";
import { Switch } from "@material-tailwind/react";
import React, { FC, useEffect } from "react";
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
  const productNumbers = useStore((state) => state.productNumbers);
  const productNames = useStore((state) => state.productNames);
  const productColors = useStore((state) => state.productColors);
  const suppliers = useStore((state) => state.suppliers);
  const supplierId = watch(`contents.${idx}.supplierId`);
  const supplier = suppliers.find((supplier) => supplier.id === +supplierId);

  useEffect(() => {
    if (supplier) {
      setValue(`contents.${idx}.supplierName`, supplier?.name);
    }
  }, [idx, setValue, supplier]);

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
          style={{ padding: "0.92rem" }}
          className={`${inputStyle} `}
          defaultValue=""
          {...register(`contents.${idx}.supplierId`)}
        >
          <option value="99">選択してください</option>
          {suppliers.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <input
          className="hidden"
          {...register(`contents.${idx}.supplierName`)}
        />
      </td>
      <td>
        <input
          autoComplete="off"
          list="productNumbers"
          className={`${inputStyle} p-3 min-w-36`}
          {...register(`contents.${idx}.productNumber`, { maxLength: 20 })}
        />
        <datalist id="productNumbers">
          {productNumbers.map((value) => (
            <option key={value} value={value}></option>
          ))}
        </datalist>
      </td>
      <td>
        <input
          autoComplete="off"
          list="productNames"
          className={`${inputStyle} p-3`}
          {...register(`contents.${idx}.productName`, { maxLength: 20 })}
        />
        <datalist id="productNames">
          {productNames.map((value) => (
            <option key={value} value={value}></option>
          ))}
        </datalist>
      </td>
      <td>
        <input
          autoComplete="off"
          list="productColors"
          className={`${inputStyle} p-3`}
          {...register(`contents.${idx}.color`, { maxLength: 20 })}
        />
        <datalist id="productColors">
          {productColors.map((value) => (
            <option key={value} value={value}></option>
          ))}
        </datalist>
      </td>
      <td>
        <input
          className={`${inputStyle} p-3 w-24 text-center`}
          {...register(`contents.${idx}.size`, { maxLength: 20 })}
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
          className={`${inputStyle} p-3 w-[calc(150px)]`}
          {...register(`contents.${idx}.comment`, { maxLength: 50 })}
        />
      </td>
      <td>
        <div className="flex justify-center w-[calc(100px)]">
          <Switch crossOrigin={undefined}
            {...register(`contents.${idx}.processing`)} />
        </div>
      </td>
      <td className="p-3">
        {idx !== 0 && (
          <AiOutlineDelete
            className="cursor-pointer text-xl"
            onClick={removeRowHandler}
          />
        )}
      </td>
    </tr>
  );
};

export default OrderContentTableRow;
