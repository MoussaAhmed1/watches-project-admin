import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { IReservation } from "@/types/reservations";
import { ReservationsColumns } from "@/components/tables/reservations-tables/columns";
import { fetchReservations } from "@/actions/reservations";

const breadcrumbItems = [{ title: "Reservation Cancel Requests", link: "/dashboard/reservations" }];

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
  const res = await fetchReservations({
    page,
    limit,
    filters: search,
    status:"",
    otherfilters:["cancel_request=1,status=CREATED","cancel_request=1,status=STARTED","cancel_request=1,status=SCHEDULED"]
  });
  const totalReservations = res?.data?.meta?.total ||0; //1000
  const pageCount = Math.ceil(totalReservations / limit);
  const reservations: IReservation[] = res?.data?.data || [] ;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Reservation Cancel Requests  (${totalReservations})`}
            description="Reservations need to be cancelled"
          />

        </div>
        <Separator />

        <SharedTable
          searchKey="reservations"
          pageNo={page}
          columns={ReservationsColumns}
          totalitems={totalReservations}
          data={reservations as unknown as IReservation[] }
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
