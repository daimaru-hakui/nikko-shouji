"use client";
import React, { FC, useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { AiOutlinePlus } from "react-icons/ai";
import StepperWithContent from "./stepper-with-content";
import OrderContentTable from "./order-content-table";
import OrderShipping from "./order-shipping";
import OrderConfirm from "./order-confirm";
import { useStore } from "@/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import OrderCompletion from "./order-completion";
import { useRouter } from "next/navigation";
import { Database } from "@/schema";

type Product = Database["public"]["Tables"]["order_details"]["Row"];

interface Props {
  products: Product[];
}

const OrderForm: FC<Props> = ({ products }) => {
  const setProducts = useStore((state) => state.setProducts);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const carts = useStore((state) => state.carts);
  const resetCarts = useStore((state) => state.resetCarts);
  const setCartContents = useStore((state) => state.setCartContents);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
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

  const { control, handleSubmit, setValue, reset } = methods;
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

  const onClearContent = () => {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;
    reset();
    resetCarts();
  };

  const onSubmit: SubmitHandler<OrderInputs> = (data) => {
    setCartContents(data);
    handleNext();
    window.scrollTo(0, 0);
  };

  const createOrder = async (carts: Carts) => {
    const { data: order, error } = await supabase
      .from("order_histories")
      .insert({
        shipping_address_id: Number(carts.shippingAddress),
        desired_delivery_on: carts.desiredDeliveryOn,
        order_number: carts.orderNumber.trim().slice(0, 30),
        sample: carts.sample,
        topic_name: carts.topicName.trim().slice(0, 30),
      })
      .select("id")
      .single();
    if (error) {
      alert(error.message);
      console.log(error);
    }
    if (!order) return;

    console.log(order);
    return order.id;
  };

  const createDetails = async (carts: Carts, id: number) => {
    const array = carts.contents.map((content) => ({
      order_history_id: id,
      maker: content.maker,
      product_number: content.productNumber.trim(),
      product_name: content.productName.trim(),
      color: content.color.trim(),
      size: content.size.trim() || "",
      quantity: Number(content.quantity),
      order_quantity: Number(content.quantity),
      comment: content.comment.trim() || "",
    }));
    const { error } = await supabase.from("order_details").insert([...array]);
    if (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const onClickRegisterHandler = async (carts: Carts) => {
    const id = await createOrder(carts);
    await createDetails(carts, id);
    handleNext();
    resetCarts();
    reset();
    router.refresh();
  };

  const onClickReturnButton = () => {
    switch (activeStep) {
      case 0:
        onClearContent();
        return;
      case 1:
        handlePrev();
        return;
      case 2:
        handlePrev();
        return;
      case 3:
        setActiveStep(0);
        return;
    }
  };

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  return (
    <>
      <StepperWithContent
        activeStep={activeStep}
        setIsLastStep={setIsLastStep}
        setIsFirstStep={setIsFirstStep}
      />
      <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <div className="overflow-auto max-h-[calc(100vh-220px)] p-3">
            <OrderContentTable
              methods={methods}
              fields={fields}
              remove={remove}
            />
          </div>
        )}
        {activeStep === 1 && <OrderShipping />}
        {activeStep === 2 && <OrderConfirm />}
        {activeStep === 3 && <OrderCompletion />}

        {activeStep === 0 && (
          <div className="w-full mt-3 flex justify-center gap-3">
            <Button className="flex items-center gap-3" onClick={addTableRow}>
              <AiOutlinePlus />
              追加
            </Button>
          </div>
        )}

        <div className="w-full mt-20 pb-12 flex justify-center gap-3">
          <Button
            type="button"
            variant="outlined"
            className="w-full max-w-xs"
            onClick={onClickReturnButton}
          >
            {activeStep === 0
              ? "クリア"
              : activeStep === 1 || activeStep === 2
              ? "戻る"
              : "発注画面"}
          </Button>

          {activeStep === 0 && (
            <Button type="submit" className="w-full max-w-xs">
              次へ進む
            </Button>
          )}

          {activeStep === 1 && (
            <Button
              type="button"
              className="w-full max-w-xs"
              onClick={() => {
                handleNext();
                window.scrollTo(0, 0);
              }}
            >
              次へ進む
            </Button>
          )}

          {activeStep === 2 && (
            <Button
              type="button"
              className="w-full max-w-xs"
              onClick={() => onClickRegisterHandler(carts)}
            >
              登録
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default OrderForm;
