import { fetchProfileInfo } from "@/actions/patients";
import { UserProfileForm } from "@/components/forms/users-forms/profileForm/ProfileForm";
import { Separator } from "@/components/ui/separator";
import { AccountProfile } from "@/types/patients";

export default async function SettingsProfilePage({ params, searchParams }: {
  params: { doctorId: string, userid: string }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {

  //----------------------------------------------------------------
  const res = await fetchProfileInfo({ userId: params.userid });
  const doctor: AccountProfile = res?.data?.data;
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
        id={params.userid}
        initialData={{
          first_name: doctor?.first_name,
          last_name: doctor?.last_name,
          birth_date: doctor?.birth_date,
          gender: doctor?.gender,
          phone: doctor?.phone,
          avatarFile: doctor?.avatar,
        }}
        revalidatequery="/dashboard/doctors"
      />
    </div>
  )
}
