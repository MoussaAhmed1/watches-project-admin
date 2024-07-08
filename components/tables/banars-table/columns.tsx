"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { formatCreatedAtDate, shortenText } from "@/utils/helperFunctions";
import { IBanner } from "@/types/banars";
import TabledTogglerView from "@/components/toggler/table-toggler";
import { ToggleBanner } from "@/actions/banars";

export const BanarsColumns: ColumnDef<IBanner>[] = [
  {
    accessorKey: "banar",
    header: "Banar",
    cell: ({ row }) => <Avatar className="w-10 h-10">
      <AvatarImage
        src={row?.original?.banar ?? ""}
        alt={row?.original?.id ?? ""}
      />
      <AvatarFallback>{"B"}</AvatarFallback>
    </Avatar>
  },
  {
    accessorKey: "Start Date",
    header: "Start Date",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p >
        {formatCreatedAtDate(row?.original?.started_at)}
      </p>
    </div>
  },
  {
    accessorKey: "End Date",
    header: "End Date",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p >
        {formatCreatedAtDate(row?.original?.ended_at)}
      </p>
    </div>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="flex items-center gap-3" key={row?.original?.id}>
      {/* <p
      >
        {row?.original?.is_active ? <CheckCircle stroke="#39a845" size={18} /> : <CircleSlash style={{ color: '#8C0101' }} size={18} />}
      </p> */}
      <TabledTogglerView id={row?.original?.id} action={ToggleBanner} is_active={row?.original?.is_active} />
    </div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
