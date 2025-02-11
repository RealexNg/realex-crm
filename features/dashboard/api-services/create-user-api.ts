import {
  FileMetadata,
  UserProfile,
  UserProfileResponse,
} from "@/entities/create-account";
import { request } from "@/utils/network";
import { useMutation } from "@tanstack/react-query";

export const uploadImage = async (data: File): Promise<FileMetadata> => {
  const imageData = new FormData();
  imageData.append("asset", data);

  return request({
    url: `products/product-icon`,
    method: "POST",
    data: imageData,
  });
};

export const createUserAccount = async (
  userProfile: UserProfile
): Promise<UserProfileResponse> => {
  return request({
    url: `users/companies/add`,
    method: "POST",
    data: userProfile,
  });
};

export const useCreateUserAccount = () => {
  const mutation = useMutation({
    mutationFn: createUserAccount,
  });

  return mutation;
};
