import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchUsers } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/shared/table/Shared-table";
import { SchoolColumns } from "@/components/tables/users-tables/parents/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {  IUser, Role } from "@/types/users";
import { Plus } from "lucide-react";
import Link from "next/link";
type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{ lang:"ar"|"en"}
};


export default async function page({ searchParams,params }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchUsers({
    page,
    limit,
    role: Role["schools"],
    filters: search,
  });
  const totalUsers = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalUsers / limit);
  let users: IUser[] = res?.data?.data || [];
  const {navigation,shared} = await getDictionary(params?.lang);
  users = users.map((user) => {
    if(user?.school){
    return {...user,school:{...user?.school,academic_stage:navigation[user?.school?.academic_stage as keyof typeof navigation]}} as IUser
    }
    else return user
  });
  const breadcrumbItems = [{ title: navigation["schools"], link: `/dashboard/users/schools` }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation["schools"]} (${totalUsers})`}
          />
        </div>
        <Separator />

        <SharedTable
          searchKey={"schools"}
          pageNo={page}
          columns={SchoolColumns}
          totalitems={totalUsers}
          data={users as unknown as IUser[]}
          pageCount={pageCount}
        >
        </SharedTable>
      </div>
    </>
  );
}
