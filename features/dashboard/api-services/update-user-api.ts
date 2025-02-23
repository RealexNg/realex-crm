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
    method: "PATCH",
    data: imageData,
  });
};

export const updateUserAccount = async (
  id: string, // Add id parameter
  userProfile: UserProfile
): Promise<UserProfileResponse> => {
  return request({
    url: `users/agent/user/${id}`,
    method: "PATCH",
    data: userProfile,
  });
};

export const useUpdateUserAccount = () => {
  const mutation = useMutation({
    mutationFn: (params: { id: string; userProfile: UserProfile }) =>
      updateUserAccount(params.id, params.userProfile),
  });

  return mutation;
};
