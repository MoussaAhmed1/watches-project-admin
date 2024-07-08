"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IDoctor } from "@/types/doctors";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { PharmacyOrder } from "@/types/pharmacy-order";

 const columns: ColumnDef<PharmacyOrder>[] = [

  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={row?.original?.user?.avatar ?? ""}
          alt={row?.original?.user?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.user?.name}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.user?.name}
      </p>
    </div>
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="stars flex">
       {row?.original?.user?.name}
       
      </div>
    ),
  },
  {
    accessorKey: "created_time",
    header: "Created time",
    cell: ({ row }) => (
      <div className="stars flex">
       {row?.original?.created_at}
       
      </div>
    ),
  },
  
  {
    accessorKey: "number",
    header: "Number",
    cell: ({ row }) => (
      <div className="stars flex">
       {row?.original?.number}
       
      </div>
    ),
  },
  {
    accessorKey: "has_replied",
    header: "Has replied",
    cell: ({ row }) => (
      <div className="stars flex">
       {row?.original?.has_replied ? "Yes" : "No"}
       
      </div>
    ),
  },

 
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
export default columns