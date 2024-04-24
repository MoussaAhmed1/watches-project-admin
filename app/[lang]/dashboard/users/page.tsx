import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchUsers } from "@/actions/users";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { UsersColumns } from "@/components/tables/users-tables/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/users";
import { Plus } from "lucide-react";
import Link from "next/link";

const breadcrumbItems = [{ title: "Users", link: "/dashboard/users" }];

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
  const res = await fetchUsers({
    page,
    limit,
    filters: search,
  });
  const totalUsers = res?.data?.meta?.total ||0; //1000
  const pageCount = Math.ceil(totalUsers / limit);
  const users: IUser[] = res?.data?.data || [] ;
  console.log("total users: ",totalUsers)
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Users (${totalUsers})`}
          />

          <Link
            href={"/dashboard/users/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="users"
          pageNo={page}
          columns={UsersColumns}
          totalUsers={totalUsers}
          data={users as unknown as IUser[] }
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
