"use client";
import { Button } from "@/components/ui/button";
import { ErrorList } from "@/components/ui/error-list";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { UserProfile, userProfileSchema } from "../zod/user-profile";
import { useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "../api-services/create-user-api";
import { toast } from "sonner";
import { useUpdateUserAccount } from "../api-services/update-user-api";
import { useAUsers } from "../api-services/get-a-user";
import Image from "next/image";

function EditUserAccount({ id }: { id: string }) {
  const [Loading, setLoading] = React.useState(false);
  const { data, isLoading } = useAUsers(id);

  const { mutateAsync } = useUpdateUserAccount();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserProfile>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      full_name: data?.full_name,
      contact_name: data?.contact_name,
      phone: data?.phone,
      sms_phone: data?.sms_phone,
      email: data?.email,
      region: data?.region,
      // address: data?.address,

      id_document: data?.id_document,
      profile_picture: data?.profile_picture,
    },
  });

  React.useEffect(() => {
    if (data) {
      setValue("full_name", data.full_name);
      setValue("contact_name", data.contact_name);
      setValue("phone", data.phone);
      setValue("sms_phone", data.sms_phone);
      setValue("email", data.email);
      setValue("region", data.region);
      // setValue("address", data.address);
      setValue("id_document", data.id_document);
      setValue("profile_picture", data.profile_picture);
    }
  }, [data, setValue]);

  const onSubmit = async (data: UserProfile) => {
    try {
      if (data.profile_picture instanceof File) {
        setLoading(true);
        const url = await uploadImage(data.profile_picture);
        const response = await mutateAsync({
          id: id,
          userProfile: {
            full_name: data.full_name,
            contact_name: data.contact_name,
            phone: data.phone,
            sms_phone: data.sms_phone,
            email: data.email,
            region: data.region,
            address: data.address,
            id_document: data.id_document,
            profile_picture: url.url,
          },
        });
        console.log(response, "response");
        if (response.id) {
          setLoading(false);
          reset();
          toast.success("Account created successfully");
          queryClient.invalidateQueries({
            queryKey: ["GET_A_USERS"],
          });
        }
      } else {
        toast.error("Profile picture is not a valid file");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

      let errorMessage = "Failed to update profile";
      if (error && typeof error === "object" && "message" in error) {
        errorMessage = (error as { message: string }).message;
      }

      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
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
            {data?.profile_picture && (
              <Image
                src={data?.profile_picture}
                alt="profile picture"
                className="w-20 h-20 rounded-full"
                width={80}
                height={80}
              />
            )}

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
        <Button isLoading={Loading}>Create Account</Button>
      </form>
    </div>
  );
}

export default EditUserAccount;
