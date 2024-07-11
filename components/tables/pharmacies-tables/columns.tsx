"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IPharmacy } from "@/types/pharmacy";
import { formatCreatedAtDate, shortenText } from "@/utils/helperFunctions";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export const PharmaciesColumns: ColumnDef<IPharmacy>[] = [
  {
    accessorKey: "ph_name",
    header: "Pharmacy Name"
  },
  {
    accessorKey: "address",
    header: "Address",
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
    accessorKey: "Open Time",
    header: "Open Time",
    cell: ({ row }) => <div className="flex items-center">
      <p className="text-center w-[70%]">
        {row?.original?.open_time}
      </p>
    </div>
  },
  {
    accessorKey: "Close Time",
    header: "Close Time",
    cell: ({ row }) => <div className="flex items-center">
      <p className="text-center w-[70%]">
        {row?.original?.close_time}
      </p>
    </div>
  },
  {
    accessorKey: "Owner Name",
    header: "Owner Name",
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
    accessorKey: "Phone",
    header: "Phone",
    cell: ({ row }) => <div className="flex items-center">
      <p className="text-center w-[50%]">
        {row?.original?.user?.phone}
      </p>
    </div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
