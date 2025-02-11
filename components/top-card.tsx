import { H4, P } from "@/components/ui/typography";
import { ShoppingCart, UserTick } from "iconsax-react";

import React from "react";
import { Card, CardContent } from "./ui/card";

export function TopCards() {
  return (
    <Card className="w-[22.25rem] p-4 bg-herobackground/10">
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white">
            <UserTick size={24} color="currentColor" className="text-primary" />
          </div>
          <H4>21</H4>
        </div>
        <P className="text-secondary-foreground text-sm font-light">
          Total number of distributor
        </P>
      </CardContent>
    </Card>
  );
}

export function TopCards2() {
  return (
    <Card className="w-[22.25rem] p-4 bg-[#FDFBF5]">
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white">
            <ShoppingCart
              size={24}
              color="currentColor"
              className="text-[#F3BA2F]"
            />
          </div>
          <H4>56,921</H4>
        </div>
        <P className="text-secondary-foreground text-sm font-light">
          Total Orders
        </P>
      </CardContent>
    </Card>
  );
}
