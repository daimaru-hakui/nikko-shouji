"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
import { useStore } from "@/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { format } from "date-fns";
import ShippingScheduleConfirmTableHead from "./shipping-schedule-confirm-table-head";
import ShippingScheduleConfirmTableRow from "./shipping-schedule-confirm-table-row";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";


const ShippingScheduleConfirmModal = () => {
  const router = useRouter();
  const checkedOrders = useStore((state) => state.checkedOrders);
  const resetCheckedOrders = useStore((state) => state.resetCheckedOrders);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const supabase = createClientComponentClient();

  const methods = useForm<ShippingScheduleInputs>();
  const { handleSubmit, reset } = methods;

  const inputReset = () => {
    setOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<ShippingScheduleInputs> = async (data) => {
    // await createShippingHistory(data);
    await updateShippingSchedule(data);
    inputReset();
    router.refresh();
  };

  const createShippingHistory = async (data: ShippingScheduleInputs) => {
    const newContents = data.contents.map((content) => (
      {
        shipping_date: data.shippingDate,
        shippingAddress: content.shippingAddress,
        order_detail_id: content.order_detail_id,
        quantity: content.quantity,
        comment: content.comment
      }
    ));
    const { error } = await supabase
      .from("order_details")
      .insert({ ...newContents })
      .select("*");
  };

  const updateShippingSchedule = async (data: ShippingScheduleInputs) => {
    if (!data) return;
    data.contents?.forEach(async (content) => {
      const { error } = await supabase
        .from("order_details")
        .update({ quantity: content.remainingQuantity })
        .eq("id", content.order_detail_id)
        .select("*");
      console.log(error?.message);
    });
    resetCheckedOrders();
  };

  const inputStyle =
    "!border !border-gray-300 bg-white text-gray-900 shadow-md shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10";

  return (
    <>
      <div className="mt-3 flex items-center h-[calc(60px)]">
        {checkedOrders.length > 0 && (
          <Button onClick={handleOpen} variant="gradient">
            出荷処理
          </Button>
        )}
      </div>
      <Dialog open={open} handler={inputReset} size="xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="flex justify-between">
            出荷処理
            <button>
              <AiOutlineClose onClick={inputReset} />
            </button>
          </DialogHeader>
          <DialogBody className="pt-0 ">
            <div className="flex gap-3">
              <div className="flex flex-col">
                <label className="mb-1 text-xs">出荷日</label>
                <input
                  type="date"
                  defaultValue={format(new Date(), "yyyy-MM-dd")}
                  className={`${inputStyle} h-10  py-1 px-2 w-full max-w-[calc(150px)]`}
                />
              </div>
            </div>
            <div className="mt-6 h-[calc(60vh)] overflow-auto">
              <table className="w-full min-w-[calc(1100px)]">
                <thead className="sticky top-0">
                  <ShippingScheduleConfirmTableHead />
                </thead>
                <tbody>
                  {checkedOrders.map((checkedOrder, idx) => (
                    <ShippingScheduleConfirmTableRow
                      key={checkedOrder.id}
                      checkedOrder={checkedOrder}
                      methods={methods}
                      idx={idx}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </DialogBody>
          <DialogFooter className="flex gap-3">
            <Button variant="text" onClick={inputReset} className="mr-1">
              <span>閉じる</span>
            </Button>
            <Button type="submit" className="mr-1">
              <span>登録</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default ShippingScheduleConfirmModal;
