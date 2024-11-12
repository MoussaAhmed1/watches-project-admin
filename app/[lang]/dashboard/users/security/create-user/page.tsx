import { fetchUsers } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/users-forms/create-users/add-edit-user";
import { IUser } from "@/types/users";
import React from "react";


export default async function Page({ params, searchParams }: {
  params: { lang: "ar" | "en" }, searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {

  //-------------------------------
    const search =
      typeof searchParams?.search === "string" ? searchParams?.search : "";
   const res = await fetchUsers({
      page: 1,
      limit: 100,
      role: "SCHOOL",
      filters: search,
    });

  const schools: IUser[] = res?.data?.data || []
  const { navigation, shared } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: navigation["security"], link: `dashboard/${"security"}` },
    { title: shared.create, link: `dashboard/create-user/${"security"}` },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <UserForm _role={"security"} schools={schools} />
    </div>
  );
}