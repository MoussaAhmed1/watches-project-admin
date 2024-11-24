import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/users-forms/create-users/add-edit-user";
import React from "react";


export default async function Page({ params, searchParams }: {
  params: { lang: "ar" | "en" }, searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {

  //-------------------------------
  const { navigation, shared } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: navigation["parents"], link: `dashboard/users/${"parents"}` },
    { title: shared.create, link: `dashboard/create-user/${"parents"}` },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <UserForm _role={"parents"} />
    </div>
  );
}