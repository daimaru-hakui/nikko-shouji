"use client";
import { useStore } from "@/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const setIsLoading = useStore((state) => state.setIsLoading);
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await handleSignIn(data);
  };

  const handleSignIn = async (data: Inputs) => {
    setIsLoading(true);
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      alert("ログインに失敗しました");
      return;
    }
    if (user) {
      router.push("/dashboard");
    }
    setIsLoading(false);
  };

  return (
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
          {...register("password", { required: true })}        />
        {errors.password && (
          <div className="text-red-500">passwordを入力してください</div>
        )}
      </div>
      <Button type="submit" color="blue" className="mt-6" fullWidth>
        ログイン
      </Button>
    </form>
  );
};

export default LoginForm;