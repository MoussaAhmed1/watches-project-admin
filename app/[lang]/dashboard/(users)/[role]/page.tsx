import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchUsers } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/shared/table/Shared-table";
import { columns } from "@/components/tables/users-tables/parents/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {  IUser, Role } from "@/types/users";
import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{ role: "parents" | "drivers" | "schools" |"security"| "admins",lang:"ar"|"en"}
};

const roles = ["parents", "drivers", "schools", "security", "admins"];
export function generateStaticParams() {
 
  return roles.map((role) => ({
    role,
  }))
}
export default async function page({ searchParams,params }: paramsProps) {
  if(!roles.includes(params?.role)){
    notFound()
  } 
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchUsers({
    page,
    limit,
    role: Role[params.role],
    filters: search,
  });
  const totalUsers = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalUsers / limit);
  const users: IUser[] = res?.data?.data || [];
  const {navigation,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: navigation[params.role], link: `/dashboard/${params.role}` }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation[params.role]} (${totalUsers})`}
          />
          <Link
            href={`/${params?.lang}/dashboard/${params.role}/create-user`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="ltr:mx-1 rtl:ml-2 h-4 w-4" />{shared.add_new}
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey={params.role}
          pageNo={page}
          columns={columns}
          totalitems={totalUsers}
          data={users as unknown as IUser[]}
          pageCount={pageCount}
        >
        </SharedTable>
      </div>
    </>
  );
}