"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CheckCircle, CircleSlash, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { IPharmacy } from "@/types/pharmacy";
import { formatCreatedAtDate, shortenText } from "@/utils/helperFunctions";
import Link from "next/link";

export const PharmaciesColumns: ColumnDef<IPharmacy>[] = [
  {
    accessorKey: "ph_name",
    header: "Name"
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p className="hidden text-black dark:text-white sm:block">
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${row?.original?.latitude},${row?.original?.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'blue' }}
        >
          {shortenText(row?.original?.address)}
        </Link>
      </p>
    </div>
  },
  {
    accessorKey: "open_time",
    header: "Open Time"
  },
  {
    accessorKey: "close_time",
    header: "Close Time"
  },
  {
    accessorKey: "is_verified",
    header: "Is Verified",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p
      >
        {row?.original?.is_verified ? <CheckCircle stroke="#39a845" size={18} /> : <CircleSlash style={{ color: '#8C0101' }} size={18} />}
      </p>
    </div>
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p className="hidden text-black dark:text-white sm:block">
        {formatCreatedAtDate(row?.original?.created_at)}
      </p>
    </div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
