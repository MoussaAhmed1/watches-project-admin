"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IWatch } from "@/types/watches";

export const columns: ColumnDef<IWatch>[] = [
  {
    accessorKey: "id",
    header:"id",
    enableHiding: false,
  },
  {
    accessorKey: "IMEI",
    header: "IMEI",
    cell: ({ row }) => (<p className="flex items-center gap-3">{row.original.IMEI}</p>),
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

