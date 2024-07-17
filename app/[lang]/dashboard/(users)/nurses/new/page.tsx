import BreadCrumb from "@/components/breadcrumb";
import { NurseForm } from "@/components/forms/users-forms/nurse-form/add-edit-nurse";
import React from "react";

export default async function Page() {
  const breadcrumbItems = [
    { title: "Nurses", link: "/dashboard/nurses" },
    { title: "Create", link: "/dashboard/nurse/new" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <NurseForm  />
    </div>
  );
}
