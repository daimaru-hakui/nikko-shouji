import React from "react";
import OrderForm from "./components/order-form";

const OrderOage = () => {
  return (
    <div className="w-full max-w-[calc(1500px)]">
      <h1 className="mt-6 text-3xl font-bold">Order</h1>
      <OrderForm />
    </div>
  );
};

export default OrderOage;
