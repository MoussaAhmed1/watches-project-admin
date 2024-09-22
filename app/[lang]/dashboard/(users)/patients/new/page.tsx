import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/users-forms/patient-form/add-edit-users";
import React from "react";
import { getDictionary } from "@/app/[lang]/messages";
import type { Locale } from "@/i18n.config";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{lang:Locale}
};

export default async function page({ params }: paramsProps) {
  const {navigation,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: navigation.patients, link: "/dashboard/patients" },
    { title: shared.create, link: "/dashboard/patients/new" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <UserForm _role={"CLIENT"} />
    </div>
  );
}
