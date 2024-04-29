"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IFaqs } from "@/types/faqs";

export const FaqsColumns: ColumnDef<IFaqs>[] = [
 
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="stars flex">
       {row?.original?.title}
       
      </div>
    ),
  },
  {
    accessorKey: "descrption",
    header: "Descrption",
    cell: ({ row }) => (
      <div className="stars flex">
       {row?.original?.descrption}
       
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
