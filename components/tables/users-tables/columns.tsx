"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { IUser } from "@/types/patients";
import { formatCreatedAtDate } from "@/utils/helperFunctions";

export const PatientsColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.avatar ?? ""}
          alt={row?.original?.first_name + row?.original?.last_name ?? ""}
        />
        <AvatarFallback>{row?.original?.first_name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.first_name + " " + row?.original?.last_name}
      </p>
    </div>
  },
  {
    accessorKey: "username",
    header: "username",
  },
  {
    accessorKey: "phone",
    header: "phone",
  },
  {
    accessorKey: "gender",
    header: "gender",
  },
  {
    accessorKey: "birth_date",
    header: "birth_date",
    cell: ({ row }) => (
      <div className="stars flex">{formatCreatedAtDate(row?.original?.birth_date)}</div>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <CellAction data={row.original} role={"patients"}  />,
  },
];

export const AdminColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.avatar ?? ""}
          alt={row?.original?.first_name + row?.original?.last_name ?? ""}
        />
        <AvatarFallback>{row?.original?.first_name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.first_name + " " + row?.original?.last_name}
      </p>
    </div>
  },
  {
    accessorKey: "username",
    header: "username",
  },
  {
    accessorKey: "phone",
    header: "phone",
  },
  {
    accessorKey: "gender",
    header: "gender",
  },
  {
    accessorKey: "birth_date",
    header: "birth_date",
    cell: ({ row }) => (
      <div className="stars flex">{formatCreatedAtDate(row?.original?.birth_date)}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} role={"admins"}  />,
  },
];
