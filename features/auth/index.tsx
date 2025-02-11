"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Login } from "@/entities/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookie from "js-cookie";

import { LockIcon, User2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "./zod-validation/login";
import { useLoginCrm } from "./api-services/login";
import { storage } from "@/utils/storage";
import { ErrorList } from "@/components/ui/error-list";
import { useRouter } from "next/navigation";
// import { ApiError } from "next/dist/server/api-utils";

function LoginPageComponent() {
  const { mutateAsync, isPending } = useLoginCrm();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const onSubmit = async (data: Login) => {
    try {
      const response = await mutateAsync(data);
      if (response.token) {
        storage.sessionStorage.set("__session", response.token);
        storage.cookieStorage.set("__session", response.token);
        Cookie.set("__session", response?.token);

        router.push("/crm");
      }
    } catch (error: unknown) {
      console.log("Error:", error);
    }
  };
  return (
    <div className="flex w-full h-full items-center justify-center flex-col ">
      <form className=" w-96 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input
            prefix={<User2 className="size-4" />}
            className="w-full  rounded-lg"
            placeholder="eg. kfkkg@gmail.com"
            autoComplete="email"
            type="email"
            {...register("identifier")}
          />
        </div>
        {errors?.identifier && (
          <ErrorList errors={[errors?.identifier?.message || ""]} />
        )}
        <div className="space-y-1">
          <Label>Password</Label>

          <Input
            prefix={<LockIcon className="size-4" />}
            placeholder="eg. yourpassword"
            autoComplete="current-password"
            className="border-[--gray-a7] bg-transparent selection:bg-[--accent-a5] [&.is-focus]:border-[--accent-8]"
            type="password"
            {...register("password")}
          />
          {errors?.password && (
            <ErrorList errors={[errors?.password?.message || ""]} />
          )}
        </div>
        <div>
          <Button
            className="mt-3 w-full"
            type="submit"
            size="lg"
            // variant="primary"
            variant={"default"}
            isLoading={isPending}
            // isLoading={navigation.state == "submitting"}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPageComponent;
