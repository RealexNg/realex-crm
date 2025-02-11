import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookie from "js-cookie";
interface ApiResponse<T = unknown> {
  data: T;
}
interface ApiError {
  message?: string;
  code?: number;
}
// import { storage } from "./storage";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const client = axios.create({
  baseURL: BASE_URL,
});

export const request = async <T = unknown>(
  options: AxiosRequestConfig
): Promise<T> => {
  const session_id = Cookie.get("__session");
  client.defaults.headers.common.Authorization = `Bearer ${session_id}`;

  const onSuccess = (response: AxiosResponse<ApiResponse<T>>): T => {
    return response.data.data;
  };

  const onError = (error: AxiosError<ApiError>): Promise<never> => {
    return Promise.reject(error.response?.data);
  };

  return client(options).then(onSuccess).catch(onError);
};
