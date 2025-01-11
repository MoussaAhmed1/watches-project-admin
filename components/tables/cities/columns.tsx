"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { City } from "@/types/map";
export const columns: ColumnDef<City>[] = [
  {
    accessorKey: "name_ar",
    header: "name_ar",
  },
  {
    accessorKey: "name_en",
    header: "name_en",
  },
  {
    accessorKey: "code",
    header: "code",
  },
  {
    accessorKey: "order_by",
    header: "order_by",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

