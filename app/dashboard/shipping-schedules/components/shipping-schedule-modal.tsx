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

type Inputs = {
  example: string;
  exampleRequired: string;
};

const ShippingScheduleModal = () => {
  const checkedOrders = useStore((state) => state.checkedOrders);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const methods = useForm<Inputs>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const StyleTableTh =
    "border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-1 text-left";
  const StyleTableTd = "px-2 py-1 text-left text-black border-b";
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
      <Dialog open={open} handler={handleOpen} size="xl">
        <DialogHeader className="flex justify-between">
          出荷処理
          <button>
            <AiOutlineClose
              onClick={() => setOpen(false)}
            />
          </button>
        </DialogHeader>
        <DialogBody className="pt-0 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-3">
              <div className="flex flex-col">
                <label className="mb-1 text-xs">お届け先</label>
                <select
                  // style={{ padding: "0.8rem" }}
                  className={`${inputStyle} h-10 py-1 px-2 w-full max-w-[calc(200px)]`}
                  defaultValue={
                    checkedOrders[0]?.order_histories?.shipping_addresses
                      ?.customer
                  }
                  // {...register(`contents.${idx}.maker`)}
                >
                  <option>来店</option>
                  <option>日紅商事株式会社</option>
                </select>
              </div>
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
                  <tr>
                    <th className={`${StyleTableTh}`}>受付番号</th>
                    <th className={`${StyleTableTh}`}>発注NO.</th>
                    <th className={`${StyleTableTh}`}>メーカー</th>
                    <th className={`${StyleTableTh}`}>品番</th>
                    <th className={`${StyleTableTh}`}>品名</th>
                    <th className={`${StyleTableTh}`}>カラー</th>
                    <th className={`${StyleTableTh}`}>サイズ</th>
                    <th className={`${StyleTableTh}`}>出荷予定</th>
                    <th className={`${StyleTableTh}`}>出荷数量</th>
                    <th className={`${StyleTableTh}`}>残数量</th>
                    <th className={`${StyleTableTh}`}>お届け先</th>
                  </tr>
                </thead>
                <tbody>
                  {checkedOrders.map((checkedOrder) => (
                    <tr key={checkedOrder.id}>
                      <td className={`${StyleTableTd}`}>{checkedOrder.id}</td>
                      <td className={`${StyleTableTd}`}>
                        {checkedOrder.order_histories?.order_number}
                      </td>
                      <td className={`${StyleTableTd}`}>
                        {checkedOrder.maker}
                      </td>
                      <td className={`${StyleTableTd}`}>
                        {checkedOrder.product_number}
                      </td>
                      <td className={`${StyleTableTd}`}>
                        {checkedOrder.product_name}
                      </td>
                      <td className={`${StyleTableTd}`}>
                        {checkedOrder.color}
                      </td>
                      <td className={`${StyleTableTd} text-center`}>
                        {checkedOrder.size}
                      </td>
                      <td className={`${StyleTableTd} text-center`}>
                        {checkedOrder.quantity}
                      </td>
                      <td className={`${StyleTableTd}`}>
                        <input
                          type="number"
                          className={`${inputStyle} py-1 px-2 w-full max-w-[calc(80px)]`}
                        />
                      </td>
                      <td className={`${StyleTableTd}`}>
                        <input
                          type="number"
                          className={`${inputStyle} py-1 px-2 w-full max-w-[calc(80px)]`}
                        />
                      </td>
                      <td className={`${StyleTableTd} text-left`}>
                        {
                          checkedOrder.order_histories?.shipping_addresses
                            ?.customer
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-1">
            <span>閉じる</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ShippingScheduleModal;
