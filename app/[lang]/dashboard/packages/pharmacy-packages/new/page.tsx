import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { PharmacyPackageForm } from "@/components/forms/package-form/add-edit-pharmacy-package";
import React from "react";

export default async function Page({params}:{params:{lang:"ar"|"en"}}) {
  const { pages, shared } = await getDictionary(params?.lang)

  const breadcrumbItems = [
    { title: pages.packages.pharmacyPackages, link: "/dashboard/packages/pharmacy-packages" },
    { title: shared.create, link: "/dashboard/packages/create" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <PharmacyPackageForm  />
    </div>
  );
}
