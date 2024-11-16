import { fetchSingleUser } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/users-forms/create-users/add-edit-user";
import { IUser } from "@/types/users";

  

export default async function SettingsProfilePage({ params, searchParams }: {
  params: { id: string, lang: "ar" | "en" }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {

  const res_user = await fetchSingleUser(params.id);
  const user: IUser = res_user?.data?.data;
  //-------------------------------------------------------------

  const { navigation, shared } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: navigation.security, link: `dashboard/users/security` },
    { title: shared.details, link: `dashboard/users/security/${params.id}` },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <UserForm _role={"security"} initialData={{
          ...user,
          avatarFile: user?.avatar
        } as any} id={params.id} readOnly={true}  />
    </div>
  );
}
