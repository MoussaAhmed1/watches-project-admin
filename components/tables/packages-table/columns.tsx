"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IClientPackage, IPharmacyPackage } from "@/types/packages";
import { getCustomNameKeyLang, shortenText } from "@/utils/helperFunctions";

export const PackagesColumns: ColumnDef<IClientPackage>[] = [
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => getCustomNameKeyLang(row?.original?.name_en, row?.original?.name_ar)
  },
  {
    accessorKey: "price",
    header: "price",
  },
  {
    accessorKey: "expirationDays",
    header: "expirationDays",
    cell: ({ row }) => row?.original?.expiration_days + " days"
  },
  {
    accessorKey: "numberOfPharmacyOrder",
    header: "numberOfPharmacyOrder",
    cell: ({ row }) => row?.original?.number_of_pharmacy_order + " Orders"
  },
  {
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => shortenText(getCustomNameKeyLang(row?.original?.description_en, row?.original?.description_ar))
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export const PackagesPharmacyColumns: ColumnDef<IPharmacyPackage>[] = [
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => <p className="text-start">{getCustomNameKeyLang(row?.original?.name_en, row?.original?.name_ar)}</p>
  },
  {
    accessorKey: "price",
    header: "price",
  },
  {
    accessorKey: "expirationDays",
    header: "expirationDays",
    cell: ({ row }) => <p className="text-center w-[50%]">{row?.original?.expiration_days + " days"}</p>
  },
  {
    accessorKey: "advantageMinutes",
    header: "advantageMinutes",
    cell: ({ row }) => <p className="text-center w-[50%]">{row?.original?.advantage_mins + " minutes"}</p>
  },
  {
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => <p className="text-start">{shortenText(getCustomNameKeyLang(row?.original?.description_en, row?.original?.description_ar))}</p>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} packageType={"pharmacy-packages"} />,
  },
];
