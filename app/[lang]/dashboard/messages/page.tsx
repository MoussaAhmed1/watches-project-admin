import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import columns from "@/components/tables/settings/columns";
import { fetchSuggestions } from "@/actions/suggestions";
import { SuggestionsComplaints } from "@/types/suggestions-complaints";

const breadcrumbItems = [{ title: "Messages", link: "/dashboard/messages" }];

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
  const res = await fetchSuggestions({
    page,
    limit,
    filters:search
  });
  const totalSuggestions = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalSuggestions / limit);
  const suggestions: SuggestionsComplaints[] = res?.data?.data || [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Messages (${totalSuggestions})`} />
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
