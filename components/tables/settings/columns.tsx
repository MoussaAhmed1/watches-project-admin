"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IDoctor } from "@/types/doctors";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Pharmacy } from "@/types/pharmacy";
import { SuggestionsComplaints } from "@/types/suggestions-complaints";

const columns: ColumnDef<SuggestionsComplaints>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="stars flex">{row?.original?.title}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="stars flex">{row?.original?.description}</div>
    ),
  },

];
export default columns;
