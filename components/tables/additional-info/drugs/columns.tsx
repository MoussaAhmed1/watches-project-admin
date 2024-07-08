"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import {  IPharmacy } from "@/types/pharmacy";

 const columns: ColumnDef<IPharmacy>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={row?.original?.logo[0].image ?? ""}
          alt={row?.original?.ph_name ?? ""}
        />
        <AvatarFallback>{row?.original?.ph_name}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.ph_name}
      </p>
    </div>
  },

  {
    accessorKey: "ph_name",
    header: "Name",
    cell: ({ row }) => (
      <div className="stars flex">
       {row?.original?.ph_name}
       
      </div>
    ),
  },
  {
    accessorKey: "open_time",
    header: "Open Time",
    cell: ({ row }) => (
      <div className="stars flex">
       {row?.original?.open_time}
       
      </div>
    ),
  },
  
  {
    accessorKey: "close_time",
    header: "Close Time",
    cell: ({ row }) => (
      <div className="stars flex">
       {row?.original?.close_time}
       
      </div>
    ),
  },
  {
    accessorKey: "is_verified",
    header: "Status",
    cell: ({ row }) => (
      <div className="stars flex">
       {row?.original?.is_verified ? "Verified" : "Not verified"}
       
      </div>
    ),
  },
  {
    accessorKey: "expierence",
    header: "Expierence",
    cell: ({ row }) => (
      <div className="stars flex">
       {row?.original?.expierence}
       Years
      </div>
    ),
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => (
      <div className="stars flex flex-col">
       {row?.original?.categories?.map((category)=>(
        <span key={category?.id}>{category?.name}</span>
       ))}
      
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
export default columns