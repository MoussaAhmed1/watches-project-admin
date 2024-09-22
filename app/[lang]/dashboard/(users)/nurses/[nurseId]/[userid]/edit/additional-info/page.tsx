import { fetchNurseAdditionalInfo } from "@/actions/nurses";
import { getDictionary } from "@/app/[lang]/messages";
import { NurseAddtionalInfoForm } from "@/components/forms/users-forms/nurse-form/nurse-addtional-info";
import { Separator } from "@/components/ui/separator";
import { NurseAdditionalInfo } from "@/types/nurses";

export default async function SettingsProfilePage({ params, searchParams }: {
  params: { lang: "ar" | "en",nurseId: string, userid: string }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {
        const { pages } = await getDictionary(params?.lang)

  //----------------------------------------------------------------
  const res = await fetchNurseAdditionalInfo({ userId: params.userid });
  const nurse: NurseAdditionalInfo = res?.data?.data;
  return (
    <div className="space-y-6">
      <div>
      <h3 className="text-lg font-medium">{pages.users.additionalInfo}</h3>
      </div>
      <Separator />
      <NurseAddtionalInfoForm
        id={nurse?.user_id}
        initialData={{
          experience: nurse?.experience,
          summary: nurse?.summary,
          license_images: nurse?.license_images ? nurse?.license_images.map(lic => lic.image) : undefined,
        }}
        initialLicensesImages={nurse?.license_images}
      />
    </div>
  )
}
