import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import columns from "@/components/tables/suggestions/columns";
import { fetchSuggestions } from "@/actions/suggestions/index";
import { SuggestionsComplaints } from "@/types/suggestions/suggestions-complaints";
import { getDictionary } from "../../messages";
import { SharedTable } from "@/components/shared/table/Shared-table";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params: {
    lang: "ar" | "en"
  }
};

export default async function page({ searchParams,params }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchSuggestions({
    page,
    limit,
    filters: search
  });
  const totalSuggestions = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalSuggestions / limit);
  const suggestions: SuggestionsComplaints[] = res?.data?.data || [];
  const { pages } = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: pages.messages.messages, link: "/dashboard/messages" }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`${pages.messages.messages} (${totalSuggestions})`} />
        </div>
        <Separator />

        <SharedTable
          searchKey="messages"
          pageNo={page}
          columns={columns}
          totalitems={totalSuggestions}
          data={suggestions as unknown as SuggestionsComplaints[]}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
