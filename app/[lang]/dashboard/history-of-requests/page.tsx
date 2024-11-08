import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchRequests } from "@/actions/requests/requests-history-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/shared/table/Shared-table";
import { columns } from "@/components/tables/history-request/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {  HistoryOfRequests } from "@/types/watches/requests";
import { Plus } from "lucide-react";
import Link from "next/link";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{ lang:"ar"|"en"}
};


export default async function page({ searchParams,params }: paramsProps) {

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchRequests({
    page,
    limit,
    filters: search,
  });
  const totalRequests = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalRequests / limit);
  const requests: HistoryOfRequests[] = res?.data?.data || [];
  const {navigation,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: navigation.historyOfRequests, link: `/dashboard/history-of-requests` }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation.historyOfRequests} (${totalRequests})`}
          />
        </div>
        <Separator />

        <SharedTable
          searchKey={'history-of-requests'}
          pageNo={page}
          columns={columns}
          totalitems={totalRequests}
          data={requests as unknown as HistoryOfRequests[]}
          pageCount={pageCount}
        >
        </SharedTable>
      </div>
    </>
  );
}
