import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchNurseOrder } from "@/actions/nurse-orders";
import BreadCrumb from "@/components/breadcrumb";
import NurseOrdersFilters from "@/components/filters/orders/nurse_ordersFilters";
import { NurseOrderColumns } from "@/components/tables/nurse-orders-tables/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { INurseOrder } from "@/types/nurse-order";

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
  const status =
    typeof searchParams?.status === "string" ? searchParams?.status : "";
  const res = await fetchNurseOrder({
    page,
    limit,
    status,
    filters: search,
  });
  const totalNurseOrder = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalNurseOrder / limit);
  const nurse_orders: INurseOrder[] = res?.data?.data || [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Nurse Orders (${totalNurseOrder})`}
          />

          {/* <Link
            href={"/dashboard/nurse-orders/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        </div>
        <Separator />

        <SharedTable
          searchKey="nurse-orders"
          pageNo={page}
          columns={NurseOrderColumns}
          totalitems={totalNurseOrder}
          data={nurse_orders as unknown as INurseOrder[]}
          pageCount={pageCount}
        >
          <NurseOrdersFilters />
        </SharedTable>
      </div>
    </>
  );
}
