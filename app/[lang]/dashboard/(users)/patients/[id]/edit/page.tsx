import { fetchProfileInfo } from "@/actions/patients";
import { getDictionary } from "@/app/[lang]/messages";
import { UserProfileForm } from "@/components/forms/users-forms/profileForm/ProfileForm";
import { Separator } from "@/components/ui/separator";
import { AccountProfile } from "@/types/patients";

export default async function SettingsProfilePage({ params, searchParams }: {
  params: { id: string, lang: "ar" | "en" }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {

  //----------------------------------------------------------------
  const res = await fetchProfileInfo({ userId: params.id });
  const patient: AccountProfile = res?.data?.data;
  const {  pages } = await getDictionary(params?.lang)
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{pages.users.profile}</h3>
        <p className="text-sm text-muted-foreground">
         {pages.users.profileViewDescription}
        </p>
      </div>
      <Separator />
      <UserProfileForm
        id={params.id}
        initialData={{
          first_name: patient?.first_name,
          last_name: patient?.last_name,
          birth_date: patient?.birth_date,
          gender: patient?.gender,
          phone: patient?.phone,
          avatarFile: patient?.avatar,
        }}
        revalidatequery="/dashboard/patients"
      />
    </div>
  )
}
