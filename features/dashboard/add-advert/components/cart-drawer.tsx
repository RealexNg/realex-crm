"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { useCartStore, CartItem } from "../store/cart-store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ErrorList } from "@/components/ui/error-list";
import { request } from "@/utils/network";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const shippingSchema = z.object({
  shipping_name: z.string().min(1, "Name is required"),
  shipping_country: z.string().min(1, "Country is required"),
  shipping_state: z.string().min(1, "State is required"),
  shipping_address: z.string().min(1, "Address is required"),
  shipping_phone: z.string().min(1, "Phone is required"),
  shipping_lga: z.string().min(1, "LGA is required"),
  shipping_postal: z.string().min(1, "Postal code is required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [step, setStep] = useState<"cart" | "shipping">("cart");
  const searchParams = useSearchParams();
  const userUuid = searchParams.get("uuid");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: ShippingFormData) => {
      if (!userUuid) {
        throw new Error("User UUID not found in URL");
      }

      return request({
        url: `orders/create/${userUuid}`,
        method: "POST",
        data: {
          products: items.map((item: CartItem) => ({
            id: item.id,
            quantity: item.quantity,
          })),
          shipping_details: data,
        },
      });
    },
    onSuccess: () => {
      toast.success("Order created successfully");
      clearCart();
      setStep("cart");
      onClose();
    },
  });

  const onSubmit = async (data: ShippingFormData) => {
    try {
      await createOrderMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-1/3 bg-white z-50 shadow-lg"
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {step === "cart" ? "Your Cart" : "Shipping Details"}
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {step === "cart" ? (
                <div className="flex-1 overflow-y-auto">
                  {items.length === 0 ? (
                    <p className="text-center text-gray-500">
                      Your cart is empty
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item: CartItem) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">
                              ₦ {item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(0, item.quantity - 1)
                                )
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  Math.max(0, parseInt(e.target.value))
                                )
                              }
                              className="w-16 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex-1 overflow-y-auto space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input {...register("shipping_name")} />
                    {errors.shipping_name?.message && (
                      <ErrorList errors={[errors.shipping_name.message]} />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Country</label>
                    <Input {...register("shipping_country")} />
                    {errors.shipping_country?.message && (
                      <ErrorList errors={[errors.shipping_country.message]} />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Input {...register("shipping_state")} />
                    {errors.shipping_state?.message && (
                      <ErrorList errors={[errors.shipping_state.message]} />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input {...register("shipping_address")} />
                    {errors.shipping_address?.message && (
                      <ErrorList errors={[errors.shipping_address.message]} />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input {...register("shipping_phone")} />
                    {errors.shipping_phone?.message && (
                      <ErrorList errors={[errors.shipping_phone.message]} />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">LGA</label>
                    <Input {...register("shipping_lga")} />
                    {errors.shipping_lga?.message && (
                      <ErrorList errors={[errors.shipping_lga.message]} />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Postal Code</label>
                    <Input {...register("shipping_postal")} />
                    {errors.shipping_postal?.message && (
                      <ErrorList errors={[errors.shipping_postal.message]} />
                    )}
                  </div>
                </form>
              )}

              <div className="mt-4 flex gap-2">
                {step === "cart" ? (
                  <Button
                    className="flex-1"
                    onClick={() => setStep("shipping")}
                    disabled={items.length === 0}
                  >
                    Next
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep("cart")}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      onClick={handleSubmit(onSubmit)}
                      disabled={createOrderMutation.isPending}
                    >
                      {createOrderMutation.isPending
                        ? "Placing Order..."
                        : "Place Order"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
