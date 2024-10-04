import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import columns from "@/components/tables/pharmacy/categories/columns";
import { fetchPharmacyCategories } from "@/actions/pharmacy-categories";
import { PharmacyCategories } from "@/types/pharmacy-categories";
import PharmacyCategoryForm from "@/components/forms/pharmacy-category/PharmacyCategoryForm";
import { getDictionary } from "@/app/[lang]/messages";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params: { lang:"ar"|"en" }
};

export default async function page({ searchParams,params }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchPharmacyCategories({
    page,
    limit,
    filters: search,
  });
  // const totalPharmacies = res?.data?.meta?.total || 0; //1000
  // const pageCount = Math.ceil(totalPharmacies / limit);
  const PharmacyCategories: PharmacyCategories[] = res?.data?.data || [];
  const totalPharmacies =PharmacyCategories?.length || 0; //1000
  const pageCount = 1;
  const {pages} = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: pages.general_settings.pharmacyCategories, link: "/dashboard/pharmacy-categories" }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`${pages.general_settings.pharmacyCategories}(${totalPharmacies})`} />
          <PharmacyCategoryForm/>
        </div>
        <Separator />

        <SharedTable
          searchKey="Pharmacy Categories"
          pageNo={page}
          columns={columns}
          totalitems={totalPharmacies}
          data={PharmacyCategories}
          pageCount={pageCount}
          withPagination={false}
          withSearch={false}
        />
      </div>
    </>
  );
}
