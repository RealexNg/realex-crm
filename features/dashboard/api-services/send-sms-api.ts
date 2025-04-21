import { request } from "@/utils/network";
import { useMutation } from "@tanstack/react-query";

interface SendSMSResponse {
  status: number;
  message: string;
}

export const sendSMS = async (userUuid: string): Promise<SendSMSResponse> => {
  const response = await request<SendSMSResponse>({
    url: `users/sms/dispatch/${userUuid}`,
    method: "POST",
  });
  console.log(response, "response");
  return response;
};

export const useSendSMS = () => {
  const mutation = useMutation({
    mutationFn: sendSMS,
  });

  return mutation;
};
