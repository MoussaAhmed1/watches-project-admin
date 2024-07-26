import { fetchProfileInfo } from "@/actions/patients";
import BreadCrumb from "@/components/breadcrumb";
import { UserProfileForm } from "@/components/forms/users-forms/profileForm/ProfileForm";
import { Heading } from "@/components/ui/heading";
import { AccountProfile } from "@/types/patients";
import React from "react";

export default async function Page({ params }:{params: { id: string }}) {
  const breadcrumbItems = [
    { title: "Admins", link: "/dashboard/admins" },
    { title: "Update", link: "/dashboard/admins/edit" },
  ];
  //----------------------------------------------------------------
  const res = await fetchProfileInfo({ userId: params.id });
  const admin: AccountProfile = res?.data?.data;
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <Heading
            title={`Update Admin`}
            description={admin.first_name + " " + admin.last_name}
          />
      <UserProfileForm
        id={params.id}
        initialData={{
          first_name: admin?.first_name,
          last_name: admin?.last_name,
          birth_date: admin?.birth_date,
          gender: admin?.gender,
          phone: admin?.phone,
          avatarFile: admin?.avatar,
          premessions:admin?.premessions
        }}
        revalidatequery="/dashboard/admins"
      />
    </div>
  );
}
