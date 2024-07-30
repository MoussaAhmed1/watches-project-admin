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
    header: "Pharmacy",
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
    header: "Availability",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p
        className={`text-sm font-medium flex items-center lowercase ${row?.original?.availability === 'AVAILIABLE'
          ? 'text-green-500'
          : 'text-blue-500'
          }`}
      >
        {row?.original?.availability === 'AVAILIABLE' ? (
          <CheckCircle className="mr-2" />
        ) : (
          <XCircle className="mr-2" />
        )}
        {row?.original?.availability}
      </p>
    </div>
  },
  {
    accessorKey: "price",
    header: "Price"
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="stars flex">
        {shortenText(row?.original?.address ?? undefined) || " - "}
      </div>

    )
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => (
      <div className="stars flex">
        {shortenText(row?.original?.note ?? undefined) || " - "}
      </div>

    )
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

];
export default OrderRepliescolumns