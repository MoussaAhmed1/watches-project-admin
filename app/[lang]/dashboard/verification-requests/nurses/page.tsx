import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchNurses } from "@/actions/nurses";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import {  VerificationRequestsNursesColumns } from "@/components/tables/nurses-tables/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { INurse } from "@/types/nurses";
import type { Locale } from "@/i18n.config";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{lang:Locale}
};

export default async function page({ searchParams,params }: paramsProps) {
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
  const {navigation} = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: navigation.nursesRequests, link: "/dashboard/doctors" }];
  
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation.nursesRequests} (${totalNurses})`}
          />
        </div>
        <Separator />

        <SharedTable
          searchKey="nurses"
          pageNo={page}
          columns={VerificationRequestsNursesColumns}
          totalitems={totalNurses}
          data={nurses as unknown as INurse[] }
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
