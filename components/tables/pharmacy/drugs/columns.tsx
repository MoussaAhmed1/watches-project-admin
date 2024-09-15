"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Category, Drug } from "@/types/pharmacy";



interface IProps{
  categories:Category[];
}

function DrugColumns({categories}:IProps) {
  const _DrugColumns: ColumnDef<Drug>[] = [
   {
     accessorKey: "name",
     header: "name",
   },
   {
     id: "actions",
     cell: ({ row }) => <CellAction data={row.original} categories={categories} />,
   },
  ];
  return (
    _DrugColumns
  )
}

export default DrugColumns