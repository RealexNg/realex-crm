"use client";

import { ColumnDef } from "@tanstack/react-table";

import { AllUserProfileResponse } from "@/entities/create-account";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

import { Edit2Icon, EyeIcon } from "lucide-react";
import SendSMS from "./send-sms";
export const allFactoryDistributors: ColumnDef<AllUserProfileResponse>[] = [
  {
    id: "full_name",
    // accessorKey: "account_name",
    header: " Distributor name",
    cell: ({ row }) => (
      <div className="font-medium flex items-center space-x-2">
        <Link href={`/crm/${row.original.id}`}>
          <Edit2Icon className="text-gray-500 hover:text-gray-700" size={15} />
        </Link>
        <Link href={`/crm/distributor/${row.original.id}`}>
          <EyeIcon className="text-gray-500 hover:text-gray-700" size={15} />
        </Link>
        <p>{row.original?.full_name}</p>
      </div>
    ),
  },
  {
    id: "advert",
    // accessorKey: "email",
    header: "Advert",
    cell: ({ row }) => (
      <div>
        <Link
          className={buttonVariants({ variant: "default", size: "sm" })}
          href={`/crm/add-advert?uuid=${row.original.id}`}
        >
          Order Product
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
        <SendSMS userUuid={row.original.id} />
        <Button size={"sm"} variant={"outline"}>
          {row.original?.phone}
        </Button>
      </div>
    ),
  },
];
