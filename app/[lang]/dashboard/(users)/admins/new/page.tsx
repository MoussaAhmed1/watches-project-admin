import BreadCrumb from "@/components/breadcrumb";
import { AdminForm } from "@/components/forms/users-forms/admin-form/add-edit-admin";
import React from "react";

export default async function Page() {
  const breadcrumbItems = [
    { title: "Admins", link: "/dashboard/admins" },
    { title: "Create", link: "/dashboard/admins/new" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <AdminForm _role={"ADMIN"} />
    </div>
  );
}
