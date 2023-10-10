'use client';
import React, { FC, useState } from 'react';
import OrderContentTableRow from './order-content-table-row';
import { UseFormReturn, FieldArrayWithId, UseFieldArrayRemove } from 'react-hook-form';

interface Props {
  methods: UseFormReturn<OrderInputs, any, undefined>;
  fields: FieldArrayWithId<OrderInputs, "contents", "id">[];
  remove: UseFieldArrayRemove;
}

const OrderContentTable: FC<Props> = ({ methods, fields, remove }) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragArray, setDragArray] = useState<any>([]);
  const { watch, setValue } = methods;

  const removeRowHandler = (idx: number) => {
    remove(idx);
  };

  const onDragStart = (idx: number) => {
    setDragIndex(idx);
  };

  const onDragEnter = (idx: number) => {
    if (dragIndex === idx) return;
    if (dragIndex === null) return;
    const array = watch("contents");
    const deleteIndex = array.splice(dragIndex, 1)[0];
    array.splice(idx, 0, deleteIndex);
    setValue("contents", array);
    setDragIndex(idx);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragEnd = () => {
    setDragIndex(null);
  };

  return (
    <table className="w-full max-w-[calc(1500px)] min-w-[calc(1400px)] ">
      <thead>
        <tr className="text-left">
          <th className="px-2"></th>
          <th className="px-2">No.</th>
          <th className="px-2">メーカー</th>
          <th className="px-2">品番</th>
          <th className="px-2">品名</th>
          <th className="px-2">カラー</th>
          <th className="px-2">サイズ</th>
          <th className="px-2">数量<span className='text-red-500'>*</span></th>
          <th className="px-2">備考</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field, idx) => (
          <OrderContentTableRow
            key={field.id}
            methods={methods}
            removeRowHandler={removeRowHandler.bind(null, idx)}
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
  );
};

export default OrderContentTable;