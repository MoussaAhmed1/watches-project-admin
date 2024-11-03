"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IUser } from "@/types/users";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header:"name",
    cell: ({ row }) => (<div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.avatar ?? ""}
          alt={row?.original?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.name}
      </p>
    </div>),
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

