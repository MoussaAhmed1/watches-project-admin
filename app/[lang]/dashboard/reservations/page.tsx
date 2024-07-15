import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { IReservation } from "@/types/reservations";
import { ReservationsColumns } from "@/components/tables/reservations-tables/columns";
import { fetchReservations } from "@/actions/reservations";
import ReservationsFilters from "@/components/filters/orders/ReservationsFilters";

const breadcrumbItems = [{ title: "Reservations", link: "/dashboard/reservations" }];

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
  const res = await fetchReservations({
    page,
    limit,
    filters: search,
    status,
    otherfilters:[]
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
            title={`Reservations (${totalReservations})`}
          />

          <Link
            href={"/dashboard/reservations/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="With phone"
          pageNo={page}
          columns={ReservationsColumns}
          totalitems={totalReservations}
          data={reservations as unknown as IReservation[] }
          pageCount={pageCount}
        >
          <ReservationsFilters/>
        </SharedTable>
      </div>
    </>
  );
}
