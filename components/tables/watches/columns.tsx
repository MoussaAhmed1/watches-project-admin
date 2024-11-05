"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IWatch } from "@/types/watches";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
export const columns: ColumnDef<IWatch>[] = [
  {
    accessorKey: "IMEI",
    header: "IMEI",
    cell: ({ row }) => (<p className="flex items-center gap-3">{row.original.IMEI}</p>),
    enableHiding: false,
  },
  {
    accessorKey: "connectedUser",
    header:"connectedUser",
    cell: ({ row }) => (
      row?.original?.watch_user?
    <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.watch_user.avatar ?? ""}
          alt={row?.original?.watch_user.name ?? ""}
        />
        <AvatarFallback>{row?.original?.watch_user.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.watch_user.name}
      </p>
    </div>
    :
     <p className="rtl:text-right text-left" dir="ltr">-</p>
    ),
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

