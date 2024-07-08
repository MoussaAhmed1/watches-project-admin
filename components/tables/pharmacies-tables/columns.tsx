"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CheckCircle, CircleSlash, Star } from "lucide-react";
import { IPharmacy } from "@/types/pharmacy";
import { formatCreatedAtDate, shortenText } from "@/utils/helperFunctions";
import Link from "next/link";

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
    accessorKey: "open_time",
    header: "Open Time",
    cell: ({ row }) => <div className="flex items-center">
      <p className="text-center w-[50%]">
        {row?.original?.open_time}
      </p>
    </div>
  },
  {
    accessorKey: "close_time",
    header: "Close Time",
    cell: ({ row }) => <div className="flex items-center">
      <p className="text-center w-[50%]">
        {row?.original?.close_time}
      </p>
    </div>
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p className="text-center w-[50%]">
        {formatCreatedAtDate(row?.original?.created_at)}
      </p>
    </div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
