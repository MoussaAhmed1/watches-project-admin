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
  const user: AccountProfile = res?.data?.data;
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <Heading
            title={`Update Admin`}
            description={user.first_name + " " + user.last_name}
          />
      <UserProfileForm
        id={params.id}
        initialData={{
          first_name: user?.first_name,
          last_name: user?.last_name,
          birth_date: user?.birth_date,
          gender: user?.gender,
          phone: user?.phone,
          avatarFile: user?.avatar,
        }}
        revalidatequery="/dashboard/admins"
      />
    </div>
  );
}
