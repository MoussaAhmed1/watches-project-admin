import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { UserProfileForm } from "@/components/forms/users-forms/profileForm/ProfileForm";
import { IUser } from "@/types/patients";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
export default async function ProfilePage() {
  const session: { user: IUser } | null = await getServerSession(authOptions) as any
  console.log("*/*/*session",session)
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={`Update Profile`}
      />
      <UserProfileForm
        id={""}
        initialData={session?.user ? {
          first_name: session?.user?.first_name,
          last_name: session?.user?.last_name,
          birth_date: session?.user?.birth_date,
          gender: session?.user?.gender as "male" | "female",
          phone: session?.user?.phone,
          avatarFile: session.user?.avatar,
        } : undefined}
        revalidatequery="/dashboard/admins"
      />
    </div>
  );
}



