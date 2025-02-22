"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Notification } from "@/types/notifications";
import { convertUtcToLocal, shortenText } from "@/utils/helperFunctions";


export const NotificationsColumns: ColumnDef<Notification>[] = [
  {
    accessorKey: "title_ar",
    header: "arabicTitle",
  },
  {
    accessorKey: "title_en",
    header: "englishTitle",
  },
  {
    accessorKey: "text_ar",
    header: "arabicText",
    cell: ({ row }) => shortenText((row?.original?.text_ar),40)
  },
  {
    accessorKey: "text_en",
    header: "englishText",
    cell: ({ row }) => shortenText((row?.original?.text_en),40)
  },
  {
    accessorKey: "role",
    header: "role",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p>
        {row?.original?.role ?? " - "}
      </p>
    </div>
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p className="rtl:text-right text-left" dir="ltr">
        {convertUtcToLocal(row?.original?.created_at)}
      </p>
    </div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}   />,
  },
];
