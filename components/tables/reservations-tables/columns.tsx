"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatCreatedAtDate, shortenText } from "@/utils/helperFunctions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { CircleSlash, CheckCircle, Minus } from "lucide-react";
import { IReservation } from "@/types/reservations";

export const ReservationsColumns: ColumnDef<IReservation>[] = [
  {
    accessorKey: "number",
    header: "Order Number",
  },
  {
    accessorKey: "reservationType",
    header: "Reservation Type",
  },
  {
    accessorKey: "specialization",
    header: "Specialization",
    cell: ({ row }) => row?.original?.specialization?.name
  },
  {
    accessorKey: "client_info",
    header: "Client",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={row?.original?.client_info?.avatar ?? ""}
          alt={row?.original?.client_info?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.client_info?.name[0]}</AvatarFallback>
      </Avatar>
      <p className="hidden text-black dark:text-white sm:block">
        {row?.original?.client_info?.name}
      </p>
    </div>
  },
  {
    accessorKey: "Doctor",
    header: "Doctor",
    cell: ({ row }) => {
      if (row?.original?.doctor) {
        return (<div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={row?.original?.doctor?.avatar ?? ""}
              alt={row?.original?.doctor?.name ?? ""}
            />
            <AvatarFallback>{row?.original?.doctor?.name[0]}</AvatarFallback>
          </Avatar>
          <p className="hidden text-black dark:text-white sm:block">
            {row?.original?.doctor?.name}
          </p>
        </div>)
      }
      else {
        return <Minus />
      }
    }
  },
  {
    accessorKey: "Clinic",
    header: "Clinic",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p className="text-black dark:text-white sm:block">
        {row?.original?.doctor?.clinic?.name}
      </p>
    </div>
  },
  {
    accessorKey: "address",
    header: "Clinic Address",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p>
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${row?.original?.doctor?.clinic?.latitude},${row?.original?.doctor?.clinic?.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1976d2' }}
        >
          {shortenText(row?.original?.doctor?.clinic?.address)}
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
            : row?.original?.status === "CANCELLED" ? "#8C0101"
              : row?.original?.status === "COMPLETED" ? "#28a745"
                : "unset"
        }}
      >
        {row?.original?.status}
      </p>
    </div>
  },
  {
    accessorKey: "is_urgent",
    header: "Is Urgent",
    cell: ({ row }) => <div className="flex justify-center">

      {row?.original?.is_urgent ? <CheckCircle stroke="#39a845" size={18} /> : <CircleSlash style={{ color: '#8C0101' }} size={18} />}

    </div>
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p className="text-black dark:text-white">
        {formatCreatedAtDate(row?.original?.created_at)}
      </p>
    </div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
