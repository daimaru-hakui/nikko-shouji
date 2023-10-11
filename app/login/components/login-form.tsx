"use client";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { DefaultSpinner } from "@/app/components/default-spinner";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const setIsLoading = useStore((state) => state.setIsLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await handleSignIn(data);
  };

  const handleSignIn = async (data: Inputs) => {
    setIsLoading(true);
    const res = await fetch("/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 404) {
      console.log(res.status);
    }
    if (res.ok) {
      console.log(res.status);
    }
    router.push("/dashboard");
    setIsLoading(false);
  };

  return (
    <>
      <DefaultSpinner />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mt-6 w-full">
          <Input
            crossOrigin={undefined}
            label="email"
            type="text"
            className="min-w-0"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <div className="text-red-500">emailを入力してください</div>
          )}
        </div>
        <div className="mt-6">
          <Input
            crossOrigin={undefined}
            label="password"
            type="password"
            className="w-full"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div className="text-red-500">passwordを入力してください</div>
          )}
        </div>
        <Button type="submit" color="blue" className="mt-6" fullWidth>
          ログイン
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
