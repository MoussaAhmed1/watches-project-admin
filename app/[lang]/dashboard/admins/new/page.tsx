import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/users-forms/patient-form/add-edit-users";
import React from "react";

export default async function Page() {
  const breadcrumbItems = [
    { title: "Admins", link: "/dashboard/admins" },
    { title: "Create", link: "/dashboard/admins/new" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <UserForm _role={"ADMIN"} />
    </div>
  );
}
