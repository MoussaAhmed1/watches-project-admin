import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchFaqs } from "@/actions/faq";
import BreadCrumb from "@/components/breadcrumb";
import { FaqsColumns } from "@/components/tables/faqs/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { IFaqs } from "@/types/faqs";

const breadcrumbItems = [{ title: "Faq", link: "/dashboard/faq" }];

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
  const res = await fetchFaqs({
    page,
    limit,
    filters: search,
  });
  const totalFaqs = res?.data?.meta?.total ||0; //1000
  const pageCount = Math.ceil(totalFaqs / limit);
  const faqs: IFaqs[] = res?.data?.data || [] ;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Faqs (${totalFaqs})`}
          />
        </div>
        <Separator />

        <SharedTable
          searchKey="Faqs"
          pageNo={page}
          columns={FaqsColumns}
          totalitems={totalFaqs}
          data={faqs as unknown as IFaqs[] }
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
