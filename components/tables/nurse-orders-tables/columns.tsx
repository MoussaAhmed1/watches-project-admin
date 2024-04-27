"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { INurseOrder } from "@/types/nurse-order";
import { formatCreatedAtDate, shortenText } from "@/utils/helperFunctions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { CircleSlash, CheckCircle, Minus } from "lucide-react";

export const NurseOrderColumns: ColumnDef<INurseOrder>[] = [
  {
    accessorKey: "number",
    header: "Order Number",
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.user?.avatar ?? ""}
          alt={row?.original?.user?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.user?.name[0]}</AvatarFallback>
      </Avatar>
      <p className="hidden text-black dark:text-white sm:block">
        {row?.original?.user?.name}
      </p>
    </div>
  },
  {
    accessorKey: "nurse",
    header: "Nurse",
    cell: ({ row }) => {
      if (row?.original?.nurse) {
        return (<div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={row?.original?.nurse?.avatar ?? ""}
              alt={row?.original?.nurse?.name ?? ""}
            />
            <AvatarFallback>{row?.original?.nurse?.name[0]}</AvatarFallback>
          </Avatar>
          <p className="hidden text-black dark:text-white sm:block">
            {row?.original?.nurse?.name}
          </p>
        </div>)
      }
      else {
        return <Minus />
      }
    }
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p className="hidden text-black dark:text-white sm:block">
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${row?.original?.address?.latitude},${row?.original?.address?.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'blue' }}
        >
          {shortenText(row?.original?.address?.address)}
        </Link>
      </p>
    </div>
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p
        style={{
          color: row?.original?.status === "STARTED"
            ? "#1976d2"
            : row?.original?.status === "CANCELLED"
              ? "#8C0101"
              : "unset"
        }}
      >
        {row?.original?.status}
      </p>
    </div>
  },
  {
    accessorKey: "sent_offer",
    header: "Sent Offer",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p
      >
        {row?.original?.sent_offer ? <CheckCircle stroke="#39a845" size={18} /> : <CircleSlash style={{ color: '#8C0101' }} size={18} />}
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
