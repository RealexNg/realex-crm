"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { Eye } from "iconsax-react";

import { AllUserProfileResponse } from "@/entities/create-account";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

import { Edit2Icon } from "lucide-react";

export const allFactoryDistributors: ColumnDef<AllUserProfileResponse>[] = [
  {
    id: "full_name",
    // accessorKey: "account_name",
    header: " Distributor name",
    cell: ({ row }) => (
      <div className="font-medium flex items-center space-x-2">
        <div className="cursor-pointer">
          <Edit2Icon className="" size={15} />
        </div>
        <p>{row.original?.full_name}</p>
      </div>
    ),
  },
  {
    id: "advert",
    // accessorKey: "email",
    header: "Advert",
    cell: () => (
      <div>
        <Link
          className={buttonVariants({ variant: "default", size: "sm" })}
          href="/crm/add-advert"
        >
          Add Advert
        </Link>
      </div>
    ),
  },
  {
    id: "phone",
    // accessorKey: "phone",
    // accessorFn: (row) => formatDate(row.updated_at, "dd-MM-yyyy"),
    header: "Resend SMS",
    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <Button size={"sm"}>Resend SMS</Button>
        <Button size={"sm"} variant={"outline"}>
          {row.original?.phone}
        </Button>
      </div>
    ),
  },
];
