import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { arrFromQuery, serializeFormQuery } from "@/utils/helperFunctions";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  children
}: DataTableToolbarProps<TData>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isFiltered, setIsFiltered] = useState(searchParams.get("isFiltered") === "true");

  //   const [createdBySearchTerm, setCreatedBySearchTerm] = useState<number[]>(
  //     arrFromQuery(searchParams.get("created_by"))
  //   );
  //   const [postedBySearchTerm, setPostedBySearchTerm] = useState<number[]>(
  //     arrFromQuery(searchParams.get("posted_by"))
  //   );
  //   const [updatedBySearchTerm, setUpdatedBySearchTerm] = useState<number[]>(
  //     arrFromQuery(searchParams.get("updated_by"))
  //   );
  // const handleSearch = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const params = {
  //     search: searchTerm,
  //     created_by: createdBySearchTerm,
  //     posted_by: postedBySearchTerm,
  //     updated_by: updatedBySearchTerm,
  //   };

  //   const serializedParams = serializeFormQuery(params);
  //   if (serializedParams === "") {
  //     clearFilters();
  //     return;
  //   }
  //   router.push(`?${serializedParams}`);
  //   setIsFiltered(true);
  // };

  const clearFilters = () => {
    setIsFiltered(false);
    router.push("?isfliter=false");
  };
  return (
    <div className="flex items-center justify-between max-lg:justify-start gap-4 flex-wrap">
      <div
        className="flex flex-1 items-center gap-2 gap-y-4 flex-wrap justify-between"
      >
        {children}
        <div className="flex gap-2 items-center flex-wrap">
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-8 px-2 lg:px-3"
            >
              {("resetFilters")}
              <Cross2Icon className="ms-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex gap-2 gap-y-4 flex-wrap">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
