import { fetchPharmacySinglePackage } from "@/actions/packages";
import BreadCrumb from "@/components/breadcrumb";
import { PharmacyPackageForm, PharmacyPackageFormValues } from "@/components/forms/package-form/add-edit-pharmacy-package";
import React from "react";

export default async function Page({ params }: { params: { id: string,lang: Locale } }) {
  // TODO: need to retrieve package data (single package) with ar and en
  const res = await fetchPharmacySinglePackage(params.id);
  const _package: PharmacyPackageFormValues = res?.data?.data;
  const breadcrumbItems = [
    { title: "Pharmacy Packages", link: "/dashboard/packages/pharmacy-packages" },
    { title: "Edit", link: "/dashboard/packages/create" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <PharmacyPackageForm id={params.id} initialData={_package as unknown as PharmacyPackageFormValues}  />
    </div>
  );
}
