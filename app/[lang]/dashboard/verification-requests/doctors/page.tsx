import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchDoctors } from "@/actions/doctors";
import BreadCrumb from "@/components/breadcrumb";
import { columns, verificationRequestsColumns } from "@/components/tables/doctors-tables/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { cn } from "@/lib/utils";
import { IDoctor } from "@/types/doctors";
import { Plus } from "lucide-react";
import Link from "next/link";

const breadcrumbItems = [{ title: "Doctors Requests", link: "/dashboard/doctors" }];

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
  const res = await fetchDoctors({
    page,
    limit,
    filters: search,
    otherfilters:["is_verified=0"]
  });
  const totalDoctors = res?.data?.meta?.total ||0; //1000
  const pageCount = Math.ceil(totalDoctors / limit);
  const doctors: Employee[] = res?.data?.data || [] ;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Doctors Requests (${totalDoctors})`}
          />
        </div>
        <Separator />

        <SharedTable
          searchKey="doctors"
          pageNo={page}
          columns={verificationRequestsColumns}
          totalitems={totalDoctors}
          data={doctors as unknown as IDoctor[] }
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
