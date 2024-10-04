import { fetchPharmacySinglePackage } from "@/actions/packages";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { PharmacyPackageForm, PharmacyPackageFormValues } from "@/components/forms/package-form/add-edit-pharmacy-package";
import React from "react";

export default async function Page({ params }: { params: { id: string,lang: "ar" | "en" } }) {
  // TODO: need to retrieve package data (single package) with ar and en
  const res = await fetchPharmacySinglePackage(params.id);
  const _package: PharmacyPackageFormValues = res?.data?.data;
  const { pages, shared } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: pages.packages.pharmacyPackages, link: "/dashboard/packages/pharmacy-packages" },
    { title: shared.edit, link: "/dashboard/packages/edit" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <PharmacyPackageForm id={params.id} initialData={_package as unknown as PharmacyPackageFormValues}  />
    </div>
  );
}
