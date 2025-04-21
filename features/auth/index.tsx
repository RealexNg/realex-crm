"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Login } from "@/entities/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookie from "js-cookie";
import { LockIcon, User2, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "./zod-validation/login";
import { useLoginCrm } from "./api-services/login";
import { storage } from "@/utils/storage";
import { ErrorList } from "@/components/ui/error-list";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

function LoginPageComponent() {
  const { mutateAsync, isPending } = useLoginCrm();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "onChange",
  });

  const identifier = watch("identifier");
  const password = watch("password");
  const isFormValid = isValid && isDirty && identifier && password;

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
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error as ApiError)?.response?.data?.message ||
            "An error occurred during login";
      toast.error(errorMessage, {
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center flex-col">
      <form className="w-96 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input
            prefix={<User2 className="size-4" />}
            className="w-full rounded-lg"
            placeholder="eg. kfkkg@gmail.com"
            autoComplete="email"
            type="email"
            {...register("identifier")}
          />
          {errors?.identifier && (
            <ErrorList errors={[errors?.identifier?.message || ""]} />
          )}
        </div>

        <div className="space-y-1">
          <Label>Password</Label>
          <div className="relative">
            <Input
              prefix={<LockIcon className="size-4" />}
              placeholder="eg. yourpassword"
              autoComplete="current-password"
              className="border-[--gray-a7] bg-transparent selection:bg-[--accent-a5] [&.is-focus]:border-[--accent-8] pr-10"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors?.password && (
            <ErrorList errors={[errors?.password?.message || ""]} />
          )}
        </div>

        <div>
          <Button
            className="mt-3 w-full"
            type="submit"
            size="lg"
            variant="default"
            isLoading={isPending}
            disabled={!isFormValid || isPending}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPageComponent;
