import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfile } from "@/entities/create-account";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { userProfileSchema } from "../zod/user-profile";
import { ErrorList } from "@/components/ui/error-list";
import { useQueryClient } from "@tanstack/react-query";

import {
  uploadImage,
  useCreateUserAccount,
} from "../api-services/create-user-api";
import { toast } from "sonner";

function CreateAccount() {
  const { mutateAsync, isPending } = useCreateUserAccount();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserProfile>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: UserProfile) => {
    try {
      if (data.profile_picture instanceof File) {
        const url = await uploadImage(data.profile_picture);
        const response = await mutateAsync({
          ...data,
          profile_picture: url.url,
        });

        if (response.id) {
          reset();
          toast.success("Account created successfully");
          queryClient.invalidateQueries({
            queryKey: ["GET_SINGLE_STORE_PRODUCTS"],
          });
        }
      } else {
        console.log("Profile picture is not a valid file");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-200 p-4 rounded-lg"
      >
        <div className="grid grid-cols-2 gap-4 my-4 ">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input {...register("full_name")} />
            {errors?.full_name && (
              <ErrorList errors={[errors?.full_name?.message || ""]} />
            )}
          </div>
          <div className="space-y-1">
            <Label>Contact person&apos;s name</Label>
            <Input {...register("contact_name")} />
            {errors?.contact_name && (
              <ErrorList errors={[errors?.contact_name?.message || ""]} />
            )}
          </div>
          <div className="space-y-1">
            <Label>Phone</Label>
            <Input type="phone" {...register("phone")} />
            {errors?.phone && (
              <ErrorList errors={[errors?.phone?.message || ""]} />
            )}
          </div>
          <div className="space-y-1">
            <Label>Phone (for SMS only) </Label>
            <Input type="phone" {...register("sms_phone")} />
            {errors?.sms_phone && (
              <ErrorList errors={[errors?.sms_phone?.message || ""]} />
            )}
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input type="email" {...register("email")} />
            {errors?.email && (
              <ErrorList errors={[errors?.email?.message || ""]} />
            )}
          </div>
          <div className="space-y-1">
            <Label>Region</Label>
            <Input type="text" {...register("region")} />
            {errors?.region && (
              <ErrorList errors={[errors?.region?.message || ""]} />
            )}
          </div>
          <div className="space-y-1">
            <Label>Address</Label>
            <Input type="address" {...register("address")} />
            {errors?.address && (
              <ErrorList errors={[errors?.address?.message || ""]} />
            )}
          </div>
          <div className="space-y-1">
            <Label>National Id *</Label>
            <Input type="text" {...register("id_document")} />
            {errors?.id_document && (
              <ErrorList errors={[errors?.id_document?.message || ""]} />
            )}
          </div>
          <div className="space-y-1">
            <Label>Image</Label>

            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("profile_picture", file);
                }
              }}
            />
            {errors?.profile_picture && (
              <ErrorList errors={[errors?.profile_picture?.message || ""]} />
            )}
          </div>
        </div>
        <Button isLoading={isPending}>Create Account</Button>
      </form>
    </>
  );
}

export default CreateAccount;
