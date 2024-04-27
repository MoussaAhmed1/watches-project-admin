"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { IUser } from "@/types/users";

export const UsersColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "account",
    header: "Account",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="flex items-center justify-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={row?.original?.avatar ?? ""}
            alt={row?.original?.first_name + row?.original?.last_name ?? ""}
            />
          <AvatarFallback>{row?.original?.first_name[0]}</AvatarFallback>
        </Avatar>
        <p className="hidden text-black dark:text-white sm:block">
          {row?.original?.first_name + " " +row?.original?.last_name}
        </p>
    </div>
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
