"use client";
import React, { useState } from "react";
import OrderTableRow from "./order-table-row";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Button } from "@material-tailwind/react";


const OrderForm = () => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragArray, setDragArray] = useState<any>([]);
  const methods = useForm<OrderInputs>({
    defaultValues: {
      contents: [
        {
          maker: "",
          productNumber: "",
          productName: "",
          color: "",
          size: "",
          quantity: "",
          comment: "",
        },
      ],
    },
  });

  const { control, handleSubmit, setValue, watch } = methods;
  const { append, fields, remove } = useFieldArray({
    control,
    name: "contents",
  });

  const addTableRow = () => {
    append({
      maker: "",
      productNumber: "",
      productName: "",
      color: "",
      size: "",
      quantity: "",
      comment: "",
    });
    setDragArray(watch("contents"));
  };

  const removeContentHandler = (idx: number) => {
    remove(idx);
  };

  const onSubmit: SubmitHandler<OrderInputs> = (data) => console.log(data);


  const onDragStart = (idx: number) => {
    setDragIndex(idx);
  };

  const onDragEnter = (idx: number) => {
    if (dragIndex === idx) return;
    if (dragIndex === null) return;
    const array = watch("contents");
    const deleteIndex = array.splice(dragIndex, 1)[0];
    array.splice(idx, 0, deleteIndex);
    setDragArray(array);
    setDragIndex(idx);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragEnd = () => {
    setValue("contents", dragArray);
    setDragIndex(null);
  };

  return (

    <form className="mt-6 w-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-auto p-3">
        <table className="w-auto">
          <thead>
            <tr className="text-left">
              <th className="px-2"></th>
              <th className="px-2">No.</th>
              <th className="px-2">メーカー</th>
              <th className="px-2">品番</th>
              <th className="px-2">品名</th>
              <th className="px-2">カラー</th>
              <th className="px-2">サイズ</th>
              <th className="px-2">数量</th>
              <th className="px-2">備考</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, idx) => (
              <OrderTableRow
                key={field.id}
                methods={methods}
                removeContentHandler={removeContentHandler.bind(null, idx)}
                onDragStart={onDragStart.bind(null, idx)}
                onDragEnter={onDragEnter.bind(null, idx)}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDragEnd={onDragEnd}
                idx={idx}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full mt-6 flex justify-center gap-3">
        <Button onClick={addTableRow}>追加</Button>
        <Button type="submit">登録</Button>
      </div>
    </form>
  );
};

export default OrderForm;
