"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { CartItem } from "./cart-item";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/utils/network";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";

const shippingSchema = z.object({
  shipping_name: z.string().min(1, "Name is required"),
  shipping_country: z.string().min(1, "Country is required"),
  shipping_state: z.string().min(1, "State is required"),
  shipping_lga: z.string().min(1, "LGA is required"),
  shipping_address: z.string().min(1, "Address is required"),
  shipping_phone: z.string().min(1, "Phone is required"),
  shipping_postal: z.string().min(1, "Postal code is required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

function CartDrawerContent() {
  const { items, clearCart } = useCartStore();
  const searchParams = useSearchParams();
  const userUuid = searchParams.get("uuid");
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      shipping_name: "",
      shipping_country: "",
      shipping_state: "",
      shipping_lga: "",
      shipping_address: "",
      shipping_phone: "",
      shipping_postal: "",
    },
  });

  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: async (data: ShippingFormData) => {
      if (!userUuid) throw new Error("User UUID is required");
      return request({
        url: `orders/create/${userUuid}`,
        method: "POST",
        data: {
          items: items.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
          ...data,
        },
      });
    },
    onSuccess: () => {
      clearCart();
      setIsOpen(false);
      form.reset();
    },
  });

  const onSubmit = (data: ShippingFormData) => {
    createOrder(data);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {items.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="shipping_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your country"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_lga"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LGA</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your LGA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping_postal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your postal code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Placing Order..." : "Place Order"}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function CartDrawer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartDrawerContent />
    </Suspense>
  );
}
