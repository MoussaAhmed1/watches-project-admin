import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/users-forms/create-users/add-edit-user";
import { Role } from "@/types/users";
import React from "react";

export async function generateStaticParams() {
  const roles = ["parents", "drivers", "schools", "security"];
 
  return roles.map((role) => ({
    role,
  }))
}
export default async function Page({ params }:{params: { role: "parents" | "drivers" | "schools" |"security",lang:"ar"|"en" }}) {
  const {navigation,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: navigation[params.role], link: `dashboard/${params.role}` },
    { title: shared.create, link: `dashboard/create-user/${params.role}` },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <UserForm _role={params.role}/>
    </div>
  );
}
