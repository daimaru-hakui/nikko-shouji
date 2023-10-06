import React from "react";
import OrderForm from "./components/order-form";

const OrderOage = () => {
  return (
    <div className="flex flex-col justify-start">
      <h1 className="text-3xl font-bold">Order</h1>
      <OrderForm />
    </div>
  );
};

export default OrderOage;
