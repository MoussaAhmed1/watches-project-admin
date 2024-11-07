"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IFaqs } from "@/types/settings/faqs";
import { getCustomNameKeyLang } from "@/utils/helperFunctions";

export const FaqsColumns: ColumnDef<IFaqs>[] = [

  {
    accessorKey: "title",
    header: "title",
    cell: ({ row }) => (
      <div className="stars flex">
        {getCustomNameKeyLang(row?.original?.title_en, row?.original?.title_ar)}

      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "description",
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
