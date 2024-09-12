import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import columns from "@/components/tables/pharmacy/order/columns";
import { fetchPharmacyOrder } from "@/actions/pharmacy-order";
import { PharmacyOrder } from "@/types/pharmacy-order";

const breadcrumbItems = [{ title: "Pharmacy Order", link: "/dashboard/pharmacy/order" }];

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
  const res = await fetchPharmacyOrder({
    page,
    limit,
    filters: search,
  });
  const totalPharmacyOrder = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalPharmacyOrder / limit);
  const pharmacyOrder: PharmacyOrder[] = res?.data?.data || [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Pharmacy Order (${totalPharmacyOrder})`} />

          <Link
            href={"/dashboard/pharmacy-order/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="ltr:mx-1 rtl:ml-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="Pharmacy Order"
          pageNo={page}
          columns={columns}
          totalitems={totalPharmacyOrder}
          data={pharmacyOrder as unknown as PharmacyOrder[]}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
