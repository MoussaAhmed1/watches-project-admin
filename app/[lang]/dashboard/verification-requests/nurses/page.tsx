import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchNurses } from "@/actions/nurses";
import BreadCrumb from "@/components/breadcrumb";
import { NursesColumns } from "@/components/tables/nurses-tables/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { INurse } from "@/types/nurse";
import { Plus } from "lucide-react";
import Link from "next/link";

const breadcrumbItems = [{ title: "Nurses Requests", link: "/dashboard/nurses" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchNurses({
    page,
    limit,
    filters: search,
    otherfilters:["is_verified=0"]
  });
  const totalNurses = res?.data?.meta?.total ||0; //1000
  const pageCount = Math.ceil(totalNurses / limit);
  const nurses: INurse[] = res?.data?.data || [] ;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Nurses Requests (${totalNurses})`}
          />
        </div>
        <Separator />

        <SharedTable
          searchKey="nurses"
          pageNo={page}
          columns={NursesColumns}
          totalitems={totalNurses}
          data={nurses as unknown as INurse[] }
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
