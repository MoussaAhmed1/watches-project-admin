import { getDictionary } from "@/app/[lang]/dictionaries";
import BreadCrumb from "@/components/breadcrumb";
import { AdminForm } from "@/components/forms/users-forms/admin-form/add-edit-admin";
import React from "react";

export default async function Page({ params }:{params: { id: string,lang:"ar"|"en" }}) {
  const {pages,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: pages.users.Admins, link: `dashboard/admins` },
    { title: shared.create, link: `dashboard/admins/new` },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <AdminForm _role={"ADMIN"} />
    </div>
  );
}
