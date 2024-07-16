"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Notification } from "@/types/notifications";
import { formatCreatedAtDateAsDateTime, shortenText } from "@/utils/helperFunctions";


export const NotificationsColumns: ColumnDef<Notification>[] = [
  {
    accessorKey: "title_ar",
    header: "Arabic Title",
  },
  {
    accessorKey: "title_en",
    header: "English Title",
  },
  {
    accessorKey: "text_ar",
    header: "Arabic Text",
    cell: ({ row }) => shortenText((row?.original?.text_ar),40)
  },
  {
    accessorKey: "text_en",
    header: "English Text",
    cell: ({ row }) => shortenText((row?.original?.text_en),40)
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p>
        {row?.original?.role ?? " - "}
      </p>
    </div>
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
    cell: ({ row }) => <CellAction data={row.original}   />,
  },
];
