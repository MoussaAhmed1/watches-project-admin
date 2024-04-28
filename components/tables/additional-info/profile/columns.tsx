"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { AdditionalInfoProfile } from "@/types/additional-info-profile";

const columns: ColumnDef<AdditionalInfoProfile>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={row?.original?.avatar ?? ""}
            alt={row?.original?.first_name ?? ""}
          />
          <AvatarFallback>{row?.original?.first_name}</AvatarFallback>
        </Avatar>
        <p className="hidden text-black dark:text-white sm:block">
          {row?.original?.first_name}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => (
      <div className="stars flex">{row?.original?.first_name}</div>
    ),
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="stars flex">{row?.original?.last_name}</div>
    ),
  },

  {
    accessorKey: "account",
    header: "Account",
    cell: ({ row }) => (
      <div className="stars flex">{row?.original?.account}</div>
    ),
  },
  {
    accessorKey: "birth_date",
    header: "Birth date",
    cell: ({ row }) => (
      <div className="stars flex">{row?.original?.birth_date}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="stars flex">{row?.original?.email}</div>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div className="stars flex">{row?.original?.gender}</div>
    ),
  },
  {
    accessorKey: "language",
    header: "Language",
    cell: ({ row }) => (
      <div className="stars flex">{row?.original?.language}</div>
    ),
  },

  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div className="stars flex">{row?.original?.phone}</div>,
  },
  {
    accessorKey: "phone_verified_at",
    header: "Phone verified at",
    cell: ({ row }) => (
      <div className="stars flex">{row?.original?.phone_verified_at}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
export default columns;
