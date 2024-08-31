import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchPharmacies } from "@/actions/pharmacies";
import BreadCrumb from "@/components/breadcrumb";
import { PharmaciesColumns } from "@/components/tables/pharmacies-tables/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { IPharmacy } from "@/types/pharmacy";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { fetchPharmacyCategories } from "@/actions/pharmacy-categories";
import PharmaciesFilters from "@/components/filters/users/pharmaciesFilters";
import { getDictionary } from "@/app/[lang]/dictionaries";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{lang:"ar"|"en"}
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
    otherfilters: ["is_verified=1",`categories#${category_id}`]
  });
  const totalPharmacies = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalPharmacies / limit);
  const pharmacies: IPharmacy[] = res?.data?.data || [];
  const categoriesRes = await fetchPharmacyCategories({
    page: 1,
    limit: 10,
    
  });
  const {navigation,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: navigation.pharmacies, link: "/dashboard/pharmacies" }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation.pharmacies} (${totalPharmacies})`}
          />
          <Link
            href={`/${params?.lang}/dashboard/pharmacies/new`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {shared.add_new}
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="pharmacies"
          pageNo={page}
          columns={PharmaciesColumns}
          totalitems={totalPharmacies}
          data={pharmacies as unknown as IPharmacy[]}
          pageCount={pageCount}
          >
          <PharmaciesFilters categories={categoriesRes?.data?.data} lang={params.lang} />
        </SharedTable>
      </div>
    </>
  );
}
