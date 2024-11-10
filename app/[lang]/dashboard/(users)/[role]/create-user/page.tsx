import { fetchUsers } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/users-forms/create-users/add-edit-user";
import { IUser } from "@/types/users";
import { notFound } from "next/navigation";
import React from "react";

const roles = ["parents", "drivers", "schools", "security"];
export async function generateStaticParams() {

  return roles.map((role) => ({
    role,
  }))
}
export default async function Page({ params, searchParams }: {
  params: { role: "parents" | "drivers" | "schools" | "security", lang: "ar" | "en" }, searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  if(!roles.includes(params?.role)){
    notFound()
  } 
  //-------------------------------
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
    { title: shared.create, link: `dashboard/create-user/${params.role}` },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <UserForm _role={params.role} schools={schools}/>
    </div>
  );
}
