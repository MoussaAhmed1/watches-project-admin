import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchFaqs } from "@/actions/faq";
import BreadCrumb from "@/components/breadcrumb";
import { FaqsColumns } from "@/components/tables/faqs/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { IFaqs } from "@/types/faqs";
import FAQForm from "@/components/forms/FAQ/FAQForm";
import { getDictionary } from "@/app/[lang]/messages";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{lang:"ar"|"en"}
};

export default async function page({ searchParams,params }: paramsProps) {
  const {pages} = await getDictionary(params.lang);
  const breadcrumbItems = [{ title: pages.general_settings.faqs, link: "/dashboard/faq" }];
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchFaqs({
    page,
    limit,
    filters: search,
  });
  const faqs: IFaqs[] = res?.data?.data || [];
  const totalFaqs = faqs?.length || 0; //1000
  const pageCount = 1;
  // const totalFaqs = res?.data?.meta?.total || 0; //1000
  // const pageCount = Math.ceil(totalFaqs / limit);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${pages.general_settings.faqs} (${totalFaqs})`}
          />
          <FAQForm/>
        </div>
        <Separator />

        <SharedTable
          searchKey="Faqs"
          pageNo={page}
          columns={FaqsColumns}
          totalitems={totalFaqs}
          data={faqs as unknown as IFaqs[]}
          pageCount={pageCount}
          withPagination={false}
          withSearch={false}
        />
      </div>
    </>
  );
}
