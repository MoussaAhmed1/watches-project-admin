import { fetchProfileInfo } from "@/actions/patients";
import { UserProfileForm } from "@/components/forms/users-forms/profileForm/ProfileForm";
import { Separator } from "@/components/ui/separator";
import { AccountProfile } from "@/types/patients";

export default async function SettingsProfilePage({ params, searchParams }: {
  params: {  id: string }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {

  //----------------------------------------------------------------
  const res = await fetchProfileInfo({ userId: params.id });
  const patient: AccountProfile = res?.data?.data;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others see this profile on the application.
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
