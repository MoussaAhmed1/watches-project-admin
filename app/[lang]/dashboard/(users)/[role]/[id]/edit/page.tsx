import { fetchSingleUser, fetchUsers } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/users-forms/create-users/add-edit-user";
import {  IUser } from "@/types/users";
import { notFound } from "next/navigation";

  
  const roles = ["parents", "drivers", "schools", "security", "admins"];

  export function generateStaticParams() {
   
    return roles.map((role) => ({
      role,
    }))
  }
export default async function SettingsProfilePage({ params, searchParams }: {
  params: { role: "parents" | "drivers" | "schools" |"security"| "admins", id: string, lang: "ar" | "en" }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {
    if(!roles.includes(params?.role)){
        notFound()
      } 
  //----------------------------------------------------------------
  const res_user = await fetchSingleUser(params.id);
  const user: IUser = res_user?.data?.data;
  //-------------------------------------------------------------
  let res;
  if (params.role == "security") {
    const search =
      typeof searchParams?.search === "string" ? searchParams?.search : "";
     res = await fetchUsers({
      page: 1,
      limit: 100,
      role: "SCHOOL",
      filters: search,
    });
  }
  const schools: IUser[] = res?.data?.data || []
  const { navigation, shared } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: navigation[params.role], link: `dashboard/${params.role}` },
    { title: shared.edit, link: `dashboard/edit/${params.role}/${params.id}` },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <UserForm _role={params.role as any} initialData={{
          ...user,
          avatarFile: user?.avatar
        } as any} id={params.id}  schools={schools} />
    </div>
  );
}
