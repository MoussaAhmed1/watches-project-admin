import { fetchSinglePackage } from "@/actions/packages";
import BreadCrumb from "@/components/breadcrumb";
import { PackageForm, PackageFormValues } from "@/components/forms/package-form/add-edit-package";
import React from "react";

export default async function Page({ params }: { params: { id: string,lang: Locale } }) {
  // TODO: need to retrieve package data (single package) with ar and en
  const res = await fetchSinglePackage(params.id);
  const _package: PackageFormValues = res?.data?.data;
  const breadcrumbItems = [
    { title: "Client packages", link: "/dashboard/packages/client-packages" },
    { title: "Edit", link: "/dashboard/packages/client-packages/create" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <PackageForm id={params.id} initialData={_package as unknown as PackageFormValues}  />
    </div>
  );
}
