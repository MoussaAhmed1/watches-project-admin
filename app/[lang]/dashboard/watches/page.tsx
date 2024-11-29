import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchWatches } from "@/actions/watches/watches-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import WatchForm from "@/components/forms/watches-forms/watchesForm";
import { SharedTable } from "@/components/shared/table/Shared-table";
import { columns } from "@/components/tables/watches/columns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ImportExelBtn from "@/components/watches/import-exel";
import { IWatch } from "@/types/watches";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params: { lang: "ar" | "en" }
};


export default async function page({ searchParams, params }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchWatches({
    page,
    limit,
    filters: search,
  });
  const totalWatches = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalWatches / limit);
  const watches: IWatch[] = res?.data?.data || [];
  const { navigation } = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: navigation.watches, link: `/dashboard/watches` }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation.watches} (${totalWatches})`}
          />
          <div className="flex gap-2 flex-xs-col flex-md-row">
            <ImportExelBtn />
            <WatchForm />
          </div>
        </div>
        <Separator />

        <SharedTable
          searchKey={"watches"}
          pageNo={page}
          columns={columns}
          totalitems={totalWatches}
          data={watches as unknown as IWatch[]}
          pageCount={pageCount}
        >
        </SharedTable>
      </div>
    </>
  );
}
