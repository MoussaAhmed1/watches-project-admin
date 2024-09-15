"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SuggestionsComplaints } from "@/types/suggestions-complaints";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CellAction } from "./cell-action";
import { formatCreatedAtDateAsDateTime } from "@/utils/helperFunctions";

const columns: ColumnDef<SuggestionsComplaints>[] = [
  {
    accessorKey: "title",
    header: "title",
    cell: ({ row }) => <div className="stars flex">{row?.original?.title}</div>,
  },
  {
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => (
      <div className="stars flex">{row?.original?.description}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.user?.avatar ?? ""}
          alt={row?.original?.user?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.user?.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p >
          {row?.original?.user?.name ?? ""}
        </p>
        <p >
          {row?.original?.user?.phone ?? ""}
        </p>
      </div>
    </div>
  },
  {
    accessorKey: "email",
    header: "email",
    cell: ({ row }) => (
      <div className="stars flex">{row?.original?.email ?? " - "}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p>
        {formatCreatedAtDateAsDateTime(row?.original?.created_at)}
      </p>
    </div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
export default columns;
