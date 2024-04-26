import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchNurseOrder } from "@/actions/nurse-orders";
import BreadCrumb from "@/components/breadcrumb";
import { NurseOrderColumns } from "@/components/tables/nurse-orders-tables/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { INurseOrder } from "@/types/nurse-order";
import { Plus } from "lucide-react";
import Link from "next/link";

const breadcrumbItems = [{ title: "Nurse Orders", link: "/dashboard/nurse-orders" }];

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
  const res = await fetchNurseOrder({
    page,
    limit,
    filters: search,
  });
  const totalNurseOrder = res?.data?.meta?.total ||0; //1000
  const pageCount = Math.ceil(totalNurseOrder / limit);
  const nurse_orders: INurseOrder[] = res?.data?.data || [] ;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Nurse Orders (${totalNurseOrder})`}
          />

          <Link
            href={"/dashboard/nurse-orders/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="nurse-orders"
          pageNo={page}
          columns={NurseOrderColumns}
          totalUsers={totalNurseOrder}
          data={nurse_orders as unknown as INurseOrder[] }
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
