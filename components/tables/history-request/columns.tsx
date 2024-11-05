"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { HistoryOfRequests } from "@/types/watches/requests";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { formatCreatedAtDateAsDateTime, getCustomNameKeyLang } from "@/utils/helperFunctions";

export const columns: ColumnDef<HistoryOfRequests>[] = [
  {
    accessorKey: "code",
    header:"code",
  },
  {
    accessorKey: "user",
    header:"user",
    cell: ({ row }) => (<div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.user?.avatar ?? ""}
          alt={row?.original?.user?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.user?.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p >
          {row?.original?.user?.name ?? ""}
        </p>
        <p >
          {row?.original?.is_parent ? `(${getCustomNameKeyLang("Parent","والد")})`:`(${getCustomNameKeyLang("Driver","سائق")})`}
        </p>
      </div>
    </div>),
    enableHiding: true,
  },
  {
    accessorKey: "student",
    header:"student",
    cell: ({ row }) => (<div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.watch_user?.avatar ?? ""}
          alt={row?.original?.watch_user?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.watch_user?.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.watch_user?.name}
      </p>
    </div>),
    enableHiding: true,
  },
  {
    accessorKey: "school",
    header:"school",
    cell: ({ row }) => (<div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.watch_user?.school?.avatar ?? ""}
          alt={row?.original?.watch_user?.school?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.watch_user?.school?.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.watch_user?.school?.name}
      </p>
    </div>),
    enableHiding: true,
  },
  // {
  //   accessorKey: "parent",
  //   header:"parent",
  //   cell: ({ row }) => (<div className="flex items-center gap-3">
  //     <Avatar className="w-10 h-10">
  //       <AvatarImage
  //         src={row?.original?.parent?.avatar ?? ""}
  //         alt={row?.original?.parent?.name ?? ""}
  //       />
  //       <AvatarFallback>{row?.original?.parent?.name[0]}</AvatarFallback>
  //     </Avatar>
  //     <p >
  //       {row?.original?.parent?.name}
  //     </p>
  //   </div>),
  //   enableHiding: true,
  // },
  {
    accessorKey: "status",
    header:"status",
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p>
        {formatCreatedAtDateAsDateTime(row?.original?.created_at)}
      </p>
    </div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

