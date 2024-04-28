"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { IPackage } from "@/types/packages";
import { shortenText } from "@/utils/helperFunctions";

export const PackagesColumns: ColumnDef<IPackage>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    cell: ({ row }) => row?.original?.expiration_days + " Orders"
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => shortenText(row?.original?.description)
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
