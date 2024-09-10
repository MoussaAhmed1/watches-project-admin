"use client";
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SearchInput from "./SearchInput";
import { DataTableToolbar } from "./DataTableToolbar";
import { useTranslations } from "next-intl";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  pageNo: number;
  totalitems: number;
  pageSizeOptions?: number[];
  pageCount: number;
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
  children?: React.ReactNode;
  withSearch?: boolean
  withPagination?: boolean
}
const MaxCenteredColumn = 8;
export function SharedTable<TData, TValue>({
  columns,
  data,
  pageNo,
  searchKey,
  totalitems,
  pageCount,
  pageSizeOptions = [10, 20, 30, 40, 50],
  children,
  withSearch = true,
  withPagination = true
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [currentLang] = useState(pathname?.includes("/ar") ? "ar" : "en");
  //translations 
  const t = useTranslations("tableColumns");
  // Search params
  const page = searchParams?.get("page") ?? "1";
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const per_page = searchParams?.get("limit") ?? "10";
  const perPageAsNumber = Number(per_page);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

  const [sorting, setSorting] = useState<SortingState>([]);


  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage,
    });

  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        limit: pageSize,
      })}`,
      {
        scroll: false,
      },
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: { pageIndex, pageSize },
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    manualFiltering: true,
  });

  // const searchValue = table.getColumn(searchKey)?.getFilterValue() as string;
  // React.useEffect(() => {
  //   if (searchValue?.length > 0) {
  //     router.push(
  //       `${pathname}?${createQueryString({
  //         page: null,
  //         limit: null,
  //         search: searchValue,
  //       })}`,
  //       {
  //         scroll: false,
  //       },
  //     );
  //   }
  //   if (searchValue?.length === 0 || searchValue === undefined) {
  //     router.push(
  //       `${pathname}?${createQueryString({
  //         page: null,
  //         limit: null,
  //         search: null,
  //       })}`,
  //       {
  //         scroll: false,
  //       },
  //     );
  //   }

  //   setPagination((prev) => ({ ...prev, pageIndex: 0 }));

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchValue]);


return (
  <>
    {withSearch && <DataTableToolbar table={table} >
      <SearchInput searchKey={searchKey} />
      {children}
    </DataTableToolbar>}
    <ScrollArea className="border h-[calc(73.8dvh)]  rounded-md">
      <Table className="relative p-1" style={{ direction: pathname?.split("/")?.includes("ar") ? "rtl" : "ltr" }}>
        <TableHeader className="bg-[#F1F5F9] dark:bg-[#1E293B]" style={{ fontWeight: "700 !important", lineHeight: '1.5rem !important', }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="dark:text-white p-3" style={{ whiteSpace: "nowrap", textAlign: columns?.length < MaxCenteredColumn ? "start" : "start", margin: "0 5px" }} >
                    {header.isPlaceholder || typeof (flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )) !== "string"
                      ? null
                      : t(flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      ))}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel()?.rows?.length ? (
            table?.getRowModel()?.rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ whiteSpace: "nowrap", textAlign: columns?.length < MaxCenteredColumn ? "start" : "start", }}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    ) || " - "}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-[calc(66.3dvh)] text-center"
              >
                {t("noResults")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>

    {withPagination && <div dir={"ltr"} className="flex flex-row gap-2 sm:flex-row items-center justify-end space-x-2 py-4" style={{flex:currentLang === "ar" ? "row" : "row-reverse"}}>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2 gap-2" dir={currentLang === "ar" ? "rtl" : "ltr"}>
            <p className="whitespace-nowrap text-sm font-medium">
              {t("rowsPerPage")}
            </p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-2 w-full" >
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {t("page")} {table.getState().pagination.pageIndex + 1} {t("of")}{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>}
  </>
);
}
