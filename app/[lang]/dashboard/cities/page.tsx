import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchCities } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import CityForm from "@/components/forms/cities-forms/CitiesForm";
import WatchForm from "@/components/forms/watches-forms/watchesForm";
import { SharedTable } from "@/components/shared/table/Shared-table";
import { columns } from "@/components/tables/cities/columns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ImportExelBtn from "@/components/watches/import-exel";
import { City } from "@/types/map";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params: { lang: "ar" | "en" }
};


export default async function page({ searchParams, params }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
 const res = await fetchCities({page:1, limit:1000});
 const cities = res?.data;
  const totalCities = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalCities / limit);
  const { navigation } = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: navigation.cities, link: `/dashboard/watches` }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation.cities}`}
          />
          <div className="flex gap-2 flex-xs-col flex-md-row">
            <CityForm />
          </div>
        </div>
        <Separator />

        <SharedTable
          searchKey="cities"
          pageNo={page}
          columns={columns}
          totalitems={totalCities}
          data={cities as unknown as City[]}
          pageCount={pageCount}
          withSearch={false}
          withPagination={false}
        >
        </SharedTable>
      </div>
    </>
  );
}
