// import { DataResObj } from "@/dto/dto";
import { Login, LoginResponse } from "@/entities/login";

import { request } from "@/utils/network";
import { useMutation } from "@tanstack/react-query";

export const loginCrm = async (category: Login): Promise<LoginResponse> => {
  return request({
    url: `auth/login/agent`,
    method: "POST",
    data: category,
  });
};

export const useLoginCrm = () => {
  const mutation = useMutation({
    mutationFn: loginCrm,
  });

  return mutation;
};
