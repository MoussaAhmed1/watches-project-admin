import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchNurseOrder } from "@/actions/nurse-orders";
import BreadCrumb from "@/components/breadcrumb";
import { NurseOrderColumns } from "@/components/tables/nurse-orders-tables/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { INurseOrder } from "@/types/nurse-order";
import { getTodayDateSimpleFormat } from "@/utils/helperFunctions";

const breadcrumbItems = [{ title: "Nurse Orders Cancel Requests", link: "/dashboard/cancel-requests/nurse-orders" }];

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
    otherfilters:[`cancel_request=1,status=STARTED,date_to>${getTodayDateSimpleFormat(new Date())}`]
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
            title={`Nurse Orders Cancel Requests (${totalNurseOrder})`}
          />

        </div>
        <Separator />

        <SharedTable
          searchKey="nurse-orders (Cancel Requests)"
          pageNo={page}
          columns={NurseOrderColumns}
          totalitems={totalNurseOrder}
          data={nurse_orders as unknown as INurseOrder[] }
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
