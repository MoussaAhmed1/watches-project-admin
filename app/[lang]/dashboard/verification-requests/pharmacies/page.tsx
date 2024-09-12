import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchPharmacies } from "@/actions/pharmacies";
import { fetchPharmacyCategories } from "@/actions/pharmacy-categories";
import BreadCrumb from "@/components/breadcrumb";
import PharmaciesFilters from "@/components/filters/users/pharmaciesFilters";
import { PharmaciesColumns } from "@/components/tables/pharmacies-tables/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { IPharmacy } from "@/types/pharmacy";
import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/app/[lang]/messages";


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
  const category_id =
  typeof searchParams?.category_id === "string" ? searchParams?.category_id : "";

  const res = await fetchPharmacies({
    page,
    limit,
    filters: search,
    otherfilters:["is_verified=0",`categories#${category_id}`]
  });
  const totalPharmacies = res?.data?.meta?.total ||0; //1000
  const pageCount = Math.ceil(totalPharmacies / limit);
  const pharmacies: IPharmacy[] = res?.data?.data || [] ;

  const categoriesRes = await fetchPharmacyCategories({
    page: 1,
    limit: 10,

  });
  const {navigation} = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: navigation.pharmaciesRequests, link: "/dashboard/doctors" }];
  
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation.pharmaciesRequests} (${totalPharmacies})`}
          />
        </div>
        <Separator />

        <SharedTable
          searchKey="pharmacies"
          pageNo={page}
          columns={PharmaciesColumns}
          totalitems={totalPharmacies}
          data={pharmacies as unknown as IPharmacy[] }
          pageCount={pageCount}
          >
          <PharmaciesFilters categories={categoriesRes?.data?.data} lang={params.lang} />
        </SharedTable>
      </div>
    </>
  );
}
