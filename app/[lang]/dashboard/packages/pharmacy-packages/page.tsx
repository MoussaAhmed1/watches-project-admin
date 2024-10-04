import {  fetchPharmacyPackages } from "@/actions/packages";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import {  PackagesPharmacyColumns } from "@/components/tables/packages-table/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { IClientPackage, IPharmacyPackage } from "@/types/packages";
import { getDictionary } from "@/app/[lang]/messages";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{
    lang: "ar" | "en";
  }
};

export default async function page({ searchParams,params }: paramsProps) {
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchPharmacyPackages({
    page:0,
    limit:100,
    filters: search,
  });
  const { pages, shared } = await getDictionary(params?.lang)
const breadcrumbItems = [{ title: pages.packages.pharmacyPackages, link: "/dashboard/packages" }];
  const packages: IClientPackage[] = res?.data?.data || [] ;
  const totalPackages = packages?.length ; //1000
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${pages.packages.pharmacyPackages} (${totalPackages})`}
          />

          <Link
            href={"/dashboard/packages/pharmacy-packages/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="ltr:mx-1 rtl:ml-2 h-4 w-4" />{shared.add_new}
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="packages"
          pageNo={1}
          columns={PackagesPharmacyColumns}
          totalitems={totalPackages}
          data={packages as unknown as IPharmacyPackage[] }
          pageCount={1}
          withPagination={false}
          withSearch={false}
        />
      </div>
    </>
  );
}
