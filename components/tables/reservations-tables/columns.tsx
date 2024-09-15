"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatCreatedAtDateAsDateTime } from "@/utils/helperFunctions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CircleSlash, CheckCircle, Minus } from "lucide-react";
import { IReservation } from "@/types/reservations";

export const ReservationsColumns: ColumnDef<IReservation>[] = [
  {
    accessorKey: "number",
    header: "orderNumber",
  },
  {
    accessorKey: "reservationType",
    header: "reservationType",
  },
  {
    accessorKey: "specialization",
    header: "specialization",
    cell: ({ row }) => row?.original?.specialization?.name
  },
  {
    accessorKey: "client",
    header: "client",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.client_info?.avatar ?? ""}
          alt={row?.original?.client_info?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.client_info?.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <span> {row?.original?.client_info?.name}</span>
        <span> {row?.original?.client_info?.phone}</span>
      </div>
    </div>
  },
  {
    accessorKey: "doctor",
    header: "doctor",
    cell: ({ row }) => {
      if (row?.original?.doctor) {
        return (<div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={row?.original?.doctor?.avatar ?? ""}
              alt={row?.original?.doctor?.name ?? ""}
            />
            <AvatarFallback>{row?.original?.doctor?.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span> {row?.original?.doctor?.name}</span>
            <span> {row?.original?.doctor?.phone}</span>
          </div>
        </div>)
      }
      else {
        return <Minus />
      }
    }
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => <div className="flex items-center justify-center">
      <p
        className="w-full"
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
    accessorKey: "isUrgent",
    header: "isUrgent",
    cell: ({ row }) => <div className="flex">

      {row?.original?.is_urgent ? <CheckCircle stroke="#39a845" size={18} /> : <CircleSlash style={{ color: '#8C0101' }} size={18} />}

    </div>
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
    cell: ({ row }) => <div className="flex gap-3">
      <p className="w-full">
        {formatCreatedAtDateAsDateTime(row?.original?.created_at)}
      </p>
    </div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
