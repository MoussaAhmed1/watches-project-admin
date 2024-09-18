import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Drug } from "@/types/pharmacy";
import { fetchPharmacyProducts } from "@/actions/pharmacies";
import PharmacyDrugsForm from "@/components/forms/pharmacy-drugs/PharmacyDrugsForm";
import { fetchPharmacyCategories } from "@/actions/pharmacy-categories";
import DrugsView from "@/components/views/DrugsView";
import { getDictionary } from "@/app/[lang]/messages";

const breadcrumbItems = [{ title: "Pharmacy Products", link: "/dashboard/pharmacy/drugs" }];

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
  const categoriesRes = await fetchPharmacyCategories({
    page: 1,
    limit: 10,

  });
  const res = await fetchPharmacyProducts({
    page,
    limit,
    filters: search,
  });
  const totalProducts = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalProducts / limit);
  const Pharmacy_products: Drug[] = res?.data?.data || [];
  const {pages,shared} = await getDictionary(params?.lang)
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Pharmacy Products (${totalProducts})`} />
          <PharmacyDrugsForm categories={categoriesRes?.data?.data} />
        </div>
        <Separator />

        <DrugsView
          categories={categoriesRes?.data?.data}
          page={page}
          totalProducts={totalProducts}
          Pharmacy_products={Pharmacy_products as unknown as Drug[]}
          pageCount={pageCount} />
      </div>
    </>
  );
}
