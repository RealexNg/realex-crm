"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { storage } from "@/utils/storage";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { H5, Span } from "./ui/typography";
import { useCartStore } from "@/features/dashboard/add-advert/store/cart-store";
import CartDrawer from "@/features/dashboard/add-advert/components/cart-drawer";
import { LogOut, ShoppingCart, Bell } from "lucide-react";

function DashboardTopNav() {
  const router = useRouter();
  const { items } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const logout = () => {
    storage.cookieStorage.remove("__session");
    storage.sessionStorage.remove("__session");
    storage.sessionStorage.remove("user");
    storage.localStorage.remove("user-data");
    storage.localStorage.remove("userInfo");

    router.push("/login");
  };
  return (
    <>
      <div className="w-full h-[5.3rem]  flex items-center justify-between p-5">
        <H5>CRM DashBoard</H5>
        <div className="flex items-center gap-4">
          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={24} className="text-primary cursor-pointer" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </div>
          <Bell size={24} className="text-primary cursor-pointer" />

          <Popover>
            <PopoverTrigger>
              <div className="h-8 w-8 rounded-lg flex items-center justify-center border border-primary">
                P
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div
                className="flex items-center justify-start gap-2 hover:bg-herobackground/10 cursor-pointer p-2 rounded-lg"
                onClick={() => logout()}
              >
                <LogOut size={24} className="text-primary" />
                <Span className="text-primary">Logout</Span>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default DashboardTopNav;
