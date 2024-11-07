"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { PharmacyCategories } from "@/types/pharmacy-categories";

 const columns: ColumnDef<PharmacyCategories>[] = [
  
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => (
      <div className="stars flex">
       {row?.original?.name}
       
      </div>
    ),
  },
  
  
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
export default columns