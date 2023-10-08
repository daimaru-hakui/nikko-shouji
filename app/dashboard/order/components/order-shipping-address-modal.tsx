import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import OrderShippingAddressTableRow from "./order-shipping-address-table-row";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AiOutlineClose } from "react-icons/ai";
import { Database } from "@/schema";

type ShippingAdress = Database["public"]["Tables"]["shipping_addresses"]["Row"];

const OrderShippingAddressModal = () => {
  const supabase = createClientComponentClient<Database>();
  const [addresses, setAddresses] = useState<ShippingAdress[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const StyleTableTh = "border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-left";

  useEffect(() => {
    const getShippingAddress = async () => {
      const { data, error } = await supabase.from("shipping_addresses").select("*");
      if (!data) return;
      setAddresses(data);
    };
    getShippingAddress();
  }, [supabase]);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        選択
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader className="flex justify-between">お届け先を選択
          <Button variant="text">
            <AiOutlineClose onClick={handleOpen} className="cursor-pointer" />
          </Button>
        </DialogHeader>
        <DialogBody className="h-[30rem] overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className={`${StyleTableTh}`}></th>
                <th className={`${StyleTableTh}`}>お届け先</th>
                <th className={`${StyleTableTh}`}>住所</th>
                <th className={`${StyleTableTh}`}>電話番号</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) => (
                <OrderShippingAddressTableRow
                  key={address.id}
                  address={address}
                  handleOpen={handleOpen}
                />
              ))}
            </tbody>
          </table>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>閉じる</span>
          </Button>
        </DialogFooter >
      </Dialog >
    </>
  );
};

export default OrderShippingAddressModal;