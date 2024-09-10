"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IPharmacy } from "@/types/pharmacy";
import { shortenText } from "@/utils/helperFunctions";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export const PharmaciesColumns: ColumnDef<IPharmacy>[] = [
  {
    accessorKey: "pharmacyName",
    header: "pharmacyName",
    cell: ({ row }) => row?.original?.ph_name
  },
  {
    accessorKey: "address",
    header: "address",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p >
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${row?.original?.latitude},${row?.original?.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#3A72EC' }}
        >
          {shortenText(row?.original?.address)}
        </Link>
      </p>
    </div>
  },
  {
    accessorKey: "openTime",
    header: "openTime",
    cell: ({ row }) => <div className="flex items-center">
      <p className="text-center w-[70%]">
        {row?.original?.open_time}
      </p>
    </div>
  },
  {
    accessorKey: "closeTime",
    header: "closeTime",
    cell: ({ row }) => <div className="flex items-center">
      <p className="text-center w-[70%]">
        {row?.original?.close_time}
      </p>
    </div>
  },
  {
    accessorKey: "ownerName",
    header: "ownerName",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.user?.avatar ?? ""}
          alt={row?.original?.user?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.user?.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.user?.name}
      </p>
    </div>
  },
  {
    accessorKey: "phone",
    header: "phone",
    cell: ({ row }) => <p className="rtl:text-right text-left" dir="ltr">{row?.original?.user?.phone}</p>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
