import { fetchCities, fetchSingleUser } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/users-forms/create-users/add-edit-user";
import {  ICity, IUser } from "@/types/users";

  
  
export default async function SettingsProfilePage({ params, searchParams }: {
  params:  { id: string, lang: "ar" | "en" }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {
  //----------------------------------------------------------------
  const res_user = await fetchSingleUser(params.id);
  const user: IUser = res_user?.data?.data;
 const cities = await fetchCities();
  //-------------------------------------------------------------
  const { navigation, shared } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: navigation.schools, link: `dashboard/users/schools` },
    { title: shared.edit, link: `dashboard/edit/schools/${params.id}` },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <UserForm _role={"schools"} initialData={{
          ...user,
          city_id: user?.school?.city_id,
          avatarFile: user?.avatar
        } as any} id={params.id} cities={cities} />
    </div>
  );
}
