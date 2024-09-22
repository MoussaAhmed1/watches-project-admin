import { fetchProfileInfo } from "@/actions/patients";
import { getDictionary } from "@/app/[lang]/messages";
import { UserProfileForm } from "@/components/forms/users-forms/profileForm/ProfileForm";
import { Separator } from "@/components/ui/separator";
import { AccountProfile } from "@/types/patients";

export default async function SettingsProfilePage({ params, searchParams }: {
  params: { nurseId: string, userid: string , lang: "ar" | "en" }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {
  const {  pages } = await getDictionary(params?.lang)

  //----------------------------------------------------------------
  const res = await fetchProfileInfo({ userId: params.userid });
  const doctor: AccountProfile = res?.data?.data;
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
        id={params.userid}
        initialData={{
          first_name: doctor?.first_name,
          last_name: doctor?.last_name,
          birth_date: doctor?.birth_date,
          gender: doctor?.gender,
          phone: doctor?.phone,
          avatarFile: doctor?.avatar,
        }}
        revalidatequery="/dashboard/pharmacies"
      />
    </div>
  )
}
