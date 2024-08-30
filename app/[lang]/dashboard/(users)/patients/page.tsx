import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchUsers } from "@/actions/patients";
import BreadCrumb from "@/components/breadcrumb";
import { PatientsColumns } from "@/components/tables/users-tables/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/patients";
import { Plus } from "lucide-react";
import Link from "next/link";

const breadcrumbItems = [{ title: "Patients", link: "/dashboard/patients" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{lang:string}
};

export default async function page({ searchParams,params }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchUsers({
    page,
    limit,
    filters: search,
    role:"client"
  });
  const totalPatients = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalPatients / limit);
  const patients: IUser[] = res?.data?.data || [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Patients (${totalPatients})`}
          />
          <Link
            href={`/${params?.lang}/dashboard/patients/new`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="ltr:mr-2 rtl:ml-2 h-4 w-4" />Add New
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="patients"
          pageNo={page}
          columns={PatientsColumns}
          totalitems={totalPatients}
          data={patients as unknown as IUser[]}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
