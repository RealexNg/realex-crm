import { useQuery } from "@tanstack/react-query";

import { request } from "@/utils/network";
// import { DataResObj } from "@/dto/dto";
import { AllUserProfileResponse } from "@/entities/create-account";

export const getAllUsers = async (): Promise<AllUserProfileResponse[]> => {
  return request({
    url: `users/companies/all`,
    method: "GET",
  });
};

export const useGetAllUsers = () => {
  const query = useQuery({
    queryFn: getAllUsers,
    queryKey: ["GET_ALL_USERS"],
    refetchOnWindowFocus: false,
    // refetchInterval: false,
    // refetchOnMount: false,
  });

  return query;
};
