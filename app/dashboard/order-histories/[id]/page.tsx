import React from 'react';
import OrderProcessTable from './components/order-process-table';
import OrderProcessHeader from './components/order-process-header';

const OrderHistoryId = () => {
  return (
    <div className="w-full max-w-[calc(1300px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">伝票処理</h1>
      <OrderProcessHeader />
      <OrderProcessTable />
    </div>
  );
};

export default OrderHistoryId;