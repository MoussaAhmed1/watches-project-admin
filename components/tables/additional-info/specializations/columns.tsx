"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { PharmacyCategories } from "@/types/pharmacy-categories";
import { getCustomNameKeyLang } from "@/utils/helperFunctions";

const columns: ColumnDef<PharmacyCategories>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="stars flex">{getCustomNameKeyLang(row?.original?.name_en, row?.original?.name_ar)}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
export default columns;
