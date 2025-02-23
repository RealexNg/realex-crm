import { useQuery } from "@tanstack/react-query";

import { request } from "@/utils/network";
// import { DataResObj } from "@/dto/dto";
import { AllUserProfileResponse } from "@/entities/create-account";

export const getAUsers = async (
  id: string
): Promise<AllUserProfileResponse> => {
  return request({
    url: `users/agent/user/${id}`,
    method: "GET",
  });
};

export const useAUsers = (id: string) => {
  const query = useQuery({
    queryFn: () => getAUsers(id),
    queryKey: ["GET_A_USERS"],
    refetchOnWindowFocus: false,
    // refetchInterval: false,
    // refetchOnMount: false,
  });

  return query;
};
