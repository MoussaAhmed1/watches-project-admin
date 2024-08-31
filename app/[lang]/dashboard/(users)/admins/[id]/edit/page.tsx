import { fetchProfileInfo } from "@/actions/patients";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { authOptions } from "@/app/api/auth/_options";
import BreadCrumb from "@/components/breadcrumb";
import { UserProfileForm } from "@/components/forms/users-forms/profileForm/ProfileForm";
import { Heading } from "@/components/ui/heading";
import { AccountProfile, IUser } from "@/types/patients";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Page({ params }:{params: { id: string,lang:"ar"|"en" }}) {
  const {pages,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: pages.users.Admins, link: "/dashboard/admins" },
    { title: shared.update, link: "/dashboard/admins/edit" },
  ];
  //----------------------------------------------------------------
  const res = await fetchProfileInfo({ userId: params.id });
  const admin: AccountProfile = res?.data?.data;
  const session: { user: IUser } | null = await getServerSession(authOptions) as any;
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <Heading
            title={pages.users.updateAdmin}
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
        isAllowToModifyPermissions={session?.user?.premessions?.includes("Admins")||false}
      />
    </div>
  );
}
