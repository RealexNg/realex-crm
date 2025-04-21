import { useQuery } from "@tanstack/react-query";
import { request } from "@/utils/network";
import { Product } from "../store/cart-store";

export const getProducts = async (page: number = 0): Promise<Product[]> => {
  try {
    const response = await request<Product[]>({
      url: `products?page=${page}&size=5`,
      method: "GET",
    });
    return response ?? [];
  } catch {
    return [];
  }
};

export const useGetProducts = (page: number = 0) => {
  return useQuery({
    queryKey: ["GET_PRODUCTS", page],
    queryFn: () => getProducts(page),
  });
};
