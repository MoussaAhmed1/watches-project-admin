import { fetchAdditionalSpecializations } from "@/actions/additional-info-specializations";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { DoctorForm } from "@/components/forms/users-forms/doctor-form/add-doctor";
import { ISpecializations } from "@/types/additional-info-specializations";
import React from "react";

export default async function Page({params}:{params:{lang:"ar"|"en"}}) {
  const {pages,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: pages.users.doctors, link: "/dashboard/doctors" },
    { title: shared.create, link: "/dashboard/doctors/new" },
  ];
  const res = await fetchAdditionalSpecializations({
    page:1,
    limit:200,

  });
  const specializations: ISpecializations[] = res?.data?.data || [];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <DoctorForm specializations={specializations} />
    </div>
  );
}
