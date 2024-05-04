import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Drug } from "@/types/pharmacy";
import { fetchPharmacyProducts } from "@/actions/pharmacies";
import DrugColumns from "@/components/tables/pharmacy/drugs/columns";

const breadcrumbItems = [{ title: "Pharmacy Products", link: "/dashboard/pharmacy/drugs" }];

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
  const res = await fetchPharmacyProducts({
    page,
    limit,
    filters: search,
  });
  const totalProducts = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalProducts / limit);
  const Pharmacy_products: Drug[] = res?.data?.data || [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Pharmacy Products (${totalProducts})`} />
        </div>
        <Separator />

        <SharedTable
          searchKey="Pharmacy Products"
          pageNo={page}
          columns={DrugColumns}
          totalitems={totalProducts}
          data={Pharmacy_products as unknown as Drug[]}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
