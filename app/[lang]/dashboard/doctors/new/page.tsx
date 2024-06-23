import { fetchAdditionalSpecializations } from "@/actions/additional-info-specializations";
import BreadCrumb from "@/components/breadcrumb";
import { DoctorForm } from "@/components/forms/users-forms/doctor-form/add-edit-doctor";
import { ISpecializations } from "@/types/additional-info-specializations";
import React from "react";

export default async function Page() {
  const breadcrumbItems = [
    { title: "Doctors", link: "/dashboard/doctors" },
    { title: "Create", link: "/dashboard/doctors/new" },
  ];
  const res = await fetchAdditionalSpecializations({
    page:1,
    limit:100,

  });
  const specializations: ISpecializations[] = res?.data?.data || [];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <DoctorForm specializations={specializations} />
    </div>
  );
}
