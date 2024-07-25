"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { PharmacyOrder } from "@/types/pharmacy-order";
import {  formatCreatedAtDateAsDateTime, shortenText } from "@/utils/helperFunctions";
import Link from "next/link";

const columns: ColumnDef<PharmacyOrder>[] = [
  {
    accessorKey: "number",
    header: "Number",
    cell: ({ row }) => (
      <div className="stars flex">
        {row?.original?.number}

      </div>
    ),
  },

  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={row?.original?.user?.avatar ?? ""}
          alt={row?.original?.user?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.user?.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p>{row?.original?.user?.name}</p>
        <p>{row?.original?.user?.phone}</p>
      </div>
    </div>
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p >
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${row?.original?.address?.latitude},${row?.original?.address?.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#3A72EC' }}
        >
          {shortenText(row?.original?.address?.address,75)}
        </Link>
      </p>
    </div>
  },
  {
    accessorKey: "created_time",
    header: "Created time",
    cell: ({ row }) => (
      <div className="stars flex">
        {formatCreatedAtDateAsDateTime(row?.original?.created_at)}
      </div>
    ),
  },


  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
export default columns