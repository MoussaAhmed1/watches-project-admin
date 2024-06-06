import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchPackages } from "@/actions/packages";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { PackagesColumns } from "@/components/tables/packages-table/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { IPackage } from "@/types/packages";

const breadcrumbItems = [{ title: "Packages", link: "/dashboard/packages" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{
    lang: string 
  }
};

export default async function page({ searchParams ,params}: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchPackages({
    page,
    limit,
    filters: search,
  });
  const totalPackages = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalPackages / limit);
  const packages: IPackage[] = res?.data?.data || [] ;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Packages (${totalPackages})`}
          />

          <Link
            href={"/dashboard/packages/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="packages"
          pageNo={page}
          columns={PackagesColumns}
          totalitems={totalPackages}
          data={packages as unknown as IPackage[] }
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
