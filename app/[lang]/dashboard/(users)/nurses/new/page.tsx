import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { NurseForm } from "@/components/forms/users-forms/nurse-form/add-edit-nurse";
import React from "react";

export default async function Page({params}:{params:{lang:"ar"|"en"}}) {
  const {pages,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: pages.users.nurses, link: "/dashboard/nurses" },
    { title: shared.create, link: "/dashboard/nurse/new" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <NurseForm  />
    </div>
  );
}
