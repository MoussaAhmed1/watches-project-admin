"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { PharmacyData } from "@/types/pharmacy-order";
import { formatCreatedAtDateAsDateTime, shortenText } from "@/utils/helperFunctions";
import { CheckCircle, XCircle } from 'lucide-react';
const OrderRepliescolumns: ColumnDef<PharmacyData>[] = [
  {
    accessorKey: "pharmacy",
    header: "pharmacy",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={row?.original?.pharmacy?.logo[0] ?? ""}
          alt={row?.original?.pharmacy?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.pharmacy?.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p>{row?.original?.pharmacy?.name}</p>
        <p>{row?.original?.phone}</p>
      </div>
    </div>
  },
  {
    accessorKey: "availability",
    header: "availability",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p
        className={`text-sm font-medium flex items-center lowercase ${row?.original?.availability === 'AVAILIABLE'
          ? 'text-green-500'
          : 'text-blue-500'
          }`}
      >
        {row?.original?.availability === 'AVAILIABLE' ? (
          <CheckCircle className="mx-1" />
        ) : (
          <XCircle className="mx-1" />
        )}
        {row?.original?.availability}
      </p>
    </div>
  },
  {
    accessorKey: "price",
    header: "price"
  },
  {
    accessorKey: "address",
    header: "address",
    cell: ({ row }) => (
      <div className="stars flex">
        {shortenText(row?.original?.address ?? undefined) || " - "}
      </div>

    )
  },
  {
    accessorKey: "note",
    header: "note",
    cell: ({ row }) => (
      <div className="stars flex">
        {shortenText(row?.original?.note ?? undefined) || " - "}
      </div>

    )
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
    cell: ({ row }) => (
      <div className="stars flex">
        {formatCreatedAtDateAsDateTime(row?.original?.created_at)}
      </div>
    ),
  },

];
export default OrderRepliescolumns