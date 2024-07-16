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
    header: "Title",
    cell: ({ row }) => <div className="stars flex">{row?.original?.title}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="stars flex">{row?.original?.description}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "Email",
    header: "Email",
    cell: ({ row }) => (
      <div className="stars flex">{row?.original?.email ?? " - "}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
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
