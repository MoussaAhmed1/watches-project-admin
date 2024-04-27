"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IDoctor } from "@/types/doctors";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export const columns: ColumnDef<IDoctor>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.avatar ?? ""}
          alt={row?.original?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.name[0]}</AvatarFallback>
      </Avatar>
      <p className="hidden text-black dark:text-white sm:block">
        {row?.original?.name}
      </p>
    </div>
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => <div className="stars flex">
      {Array.from({ length: Math.ceil(row?.original?.rating) }, (ele, index) => (
        <Star key={index} fill="#f7d722" strokeWidth={0} size={20} />
      ))}
      {Array.from({ length: Math.floor(5 - row?.original?.rating) }, (ele, index) => (
        <Star key={index} fill="#111" strokeWidth={1} stroke="#fff" size={20} />
      ))}

    </div>
  },
  {
    accessorKey: "specialization",
    header: "specialization",
    cell: ({ row }) => row?.original?.specialization?.name
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
