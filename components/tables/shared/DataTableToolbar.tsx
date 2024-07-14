import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  children
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between max-lg:justify-start gap-4 flex-wrap">
      <div
        className="flex flex-1 items-center gap-2 gap-y-4 flex-wrap justify-start"
      >
        {children}
      </div>
      <div className="flex gap-2 gap-y-4 flex-wrap">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
