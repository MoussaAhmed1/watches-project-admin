"use client";

import { ColumnDef } from "@tanstack/react-table";
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
