"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IPackage } from "@/types/packages";
import { getCustomNameKeyLang, shortenText } from "@/utils/helperFunctions";

export const PackagesColumns: ColumnDef<IPackage>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => getCustomNameKeyLang(row?.original?.name_en, row?.original?.name_ar)
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "expiration_days",
    header: "Expiration Days",
    cell: ({ row }) => row?.original?.expiration_days + " days"
  },
  {
    accessorKey: "number_of_pharmacy_order",
    header: "Number Of Pharmacy Order",
    cell: ({ row }) => row?.original?.number_of_pharmacy_order + " Orders"
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => shortenText(getCustomNameKeyLang(row?.original?.description_en, row?.original?.description_ar))
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
