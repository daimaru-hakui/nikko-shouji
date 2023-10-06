"use client";
import React from "react";
import OrderTableRow from "./order-table-row";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Button } from "@material-tailwind/react";

const OrderForm = () => {
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

  const { control, handleSubmit } = methods;
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
  };

  const removeContentHandler = (idx: number) => {
    remove(idx);
  };

  const onSubmit: SubmitHandler<OrderInputs> = (data) => console.log(data);

  return (
    <>
      <form className="w-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-auto p-3">
          <table className="w-auto">
            <thead>
              <tr className="text-left">
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
    </>
  );
};

export default OrderForm;
