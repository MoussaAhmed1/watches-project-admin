import { fetchClientAddtionalInfo } from "@/actions/patients";
import { FamilyMemberForm } from "@/components/forms/users-forms/patient-form/add-edit-family-member";
import { PatientAddtionalInfoForm } from "@/components/forms/users-forms/patient-form/patient-addtional-info";
import { Separator } from "@/components/ui/separator";
import { ClientAddtionalInfo } from "@/types/patients";

export default async function SettingsProfilePage({ params, searchParams }: {
  params: { id: string }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {

  //----------------------------------------------------------------
  const res = await fetchClientAddtionalInfo({ userId: params.id });
  const user: ClientAddtionalInfo = res?.data?.data;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Family Members</h3>
      </div>
      <Separator />
      <FamilyMemberForm
        id={params.id}
      />
    </div>
  )
}
