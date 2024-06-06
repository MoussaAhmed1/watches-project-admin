"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IFaqs } from "@/types/faqs";
import { getCustomNameKeyLang } from "@/utils/helperFunctions";

export const FaqsColumns: ColumnDef<IFaqs>[] = [

  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="stars flex">
        {getCustomNameKeyLang(row?.original?.title_en, row?.original?.title_ar)}

      </div>
    ),
  },
  {
    accessorKey: "descrption",
    header: "Descrption",
    cell: ({ row }) => (
      <div className="stars flex">
        {getCustomNameKeyLang(row?.original?.descrption_en, row?.original?.descrption_ar)}
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
