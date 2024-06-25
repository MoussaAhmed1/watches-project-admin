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
const breadcrumbItems = [{ title: "Pharmacies", link: "/dashboard/pharmacies" }];

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
  const res = await fetchPharmacies({
    page,
    limit,
    filters: search,
    otherfilters: ["is_verified=1"]
  });
  const totalPharmacies = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalPharmacies / limit);
  const pharmacies: IPharmacy[] = res?.data?.data || [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Pharmacies (${totalPharmacies})`}
          />
          <Link
            href={"/dashboard/pharmacy/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
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
        />
      </div>
    </>
  );
}
