import BreadCrumb from "@/components/breadcrumb";
import { PharmacyPackageForm } from "@/components/forms/package-form/add-edit-pharmacy-package";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Pharmacy Packages", link: "/dashboard/packages/pharmacy-packages" },
    { title: "Create", link: "/dashboard/packages/create" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <PharmacyPackageForm  />
    </div>
  );
}
