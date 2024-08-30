import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/patients";
import { Plus } from "lucide-react";
import Link from "next/link"; 
import { fetchUsers } from "@/actions/patients";
import { AdminColumns} from "@/components/tables/users-tables/columns";


const breadcrumbItems = [{ title: "Admins", link: "/dashboard/admins" }];

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
    role: "admin"
  });
  const totalAdmins = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalAdmins / limit);
  const admins: IUser[] = res?.data?.data || [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Admins (${totalAdmins})`}
          />
          <Link
            href={`/${params?.lang}/dashboard/admins/new`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="ltr:mr-2 rtl:ml-2 h-4 w-4" />Add New
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="admins"
          pageNo={page}
          columns={AdminColumns}
          totalitems={totalAdmins}
          data={admins as unknown as IUser[]}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
