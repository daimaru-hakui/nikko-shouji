import { Checkbox } from '@material-tailwind/react';
import React, { FC, useEffect, useState } from 'react';
import OrderShippingAddressModal from './order-shipping-address-modal';
import { useStore } from '@/store';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/schema';

type ShippingAdress = Database["public"]["Tables"]["shipping_addresses"]["Row"];

const OrderShipping: FC = () => {
  const supabase = createClientComponentClient<Database>();
  const carts = useStore((state) => state.carts);
  const setCartOthers = useStore((state) => state.setCartOthers);
  const [shippingAddress, setShippingAddress] = useState<ShippingAdress>();


  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setCartOthers({ name, value: e.target.value });
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.checked === true) {
      setCartOthers({ name, value: true });
    } else {
      setCartOthers({ name, value: false });
    };
  };

  useEffect(() => {
    const getShippingAddress = async () => {
      const { data, error } = await supabase
        .from("shipping_addresses")
        .select("*")
        .eq("id", carts.shippingAddress).single();
      if (error) {
        alert(error);
      }
      if (!data) return;
      setShippingAddress(data);
    };
    getShippingAddress();
  }, [supabase, carts.shippingAddress]);

  const inputStyle =
    "!border !border-gray-300 bg-white text-gray-900 shadow-md shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10";

  return (
    <div className="w-full max-w-[calc(1000px)] mx-auto">
      <div className='font-bold'>お届け先/お届け方法</div>
      <div className='w-full mt-3 p-3 flex flex-col md:flex-row justify-between border border-gray-900/10'>
        <div className=''>
          <div>{shippingAddress?.customer}</div>
          <div className='flex gap-3  w-full'>
            <div>{shippingAddress?.post_code}</div>
            <div>{shippingAddress?.address}</div>
          </div>
          <div className='flex gap-3 w-full'>
            <div>{shippingAddress?.tel && "TEL"}</div>
            <div>{shippingAddress?.tel}</div>
          </div>
        </div>
        <div className='mt-6'>
          <OrderShippingAddressModal />
        </div>
      </div>

      <div className='w-full mt-12'>
        <div className='font-bold'>希望納期</div>
        <input className={`${inputStyle} mt-3 p-3 w-full max-w-[calc(500px)]`}
          type="date"
          name="desiredDeliveryOn"
          value={carts.desiredDeliveryOn}
          onChange={handleChangeInput}
        />
      </div>

      <div className='w-full mt-12'>
        <div className='font-bold'>貴社注文番号</div>
        <input className={`${inputStyle} mt-3 p-3 w-full max-w-[calc(500px)]`}
          name="orderNumber"
          value={carts.orderNumber}
          onChange={handleChangeInput}
        />
      </div>

      <div className='w-full mt-12'>
        <div className='font-bold'>案件名</div>
        <input className={`${inputStyle} mt-3 p-3 w-full max-w-[calc(500px)]`}
          name="topicName"
          value={carts.topicName}
          onChange={handleChangeInput}
        />
      </div>

      <div className='mt-12'>
        <div className='font-bold'>サンプル</div>
        <div className='mt-1'>
          <Checkbox
            label="サンプル"
            name="sample"
            checked={carts.sample}
            onChange={handleCheck}
            crossOrigin={undefined}
          />
        </div>
      </div>
    </div >
  );
};

export default OrderShipping;