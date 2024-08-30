import { fetchClientPackages } from "@/actions/packages";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { PackagesColumns } from "@/components/tables/packages-table/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { IClientPackage } from "@/types/packages";

const breadcrumbItems = [{ title: "Client Packages", link: "/dashboard/packages/client-packages" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{
    lang: string 
  }
};

export default async function page({ searchParams ,params}: paramsProps) {
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchClientPackages({
    page:1,
    limit:10,
    filters: search,
  });
  const packages: IClientPackage[] = res?.data?.data || [];
  const totalPackages = packages?.length || 0; //1000
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Client Packages (${totalPackages})`}
          />

          <Link
            href={"/dashboard/packages/client-packages/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="packages"
          pageNo={1}
          columns={PackagesColumns}
          totalitems={totalPackages}
          data={packages as unknown as IClientPackage[] }
          pageCount={1}
          withPagination={false}
          withSearch={false}
        />
      </div>
    </>
  );
}
