import { fetchClientAddtionalInfo } from "@/actions/patients";
import { DoctorAddtionalInfoForm } from "@/components/forms/users-forms/doctor-form/doctor-addtional-info";
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
        <h3 className="text-lg font-medium">Additional Information</h3>
      </div>
      <Separator />
      <PatientAddtionalInfoForm
        id={params.id}
        initialData={{
          height: (typeof user?.height === "string") ? +user?.height : 0,
          weight: (typeof user?.weight === "string") ? +user?.weight : 0,
          allergic_reactions: user?.allergic_reactions,
          notes: user?.notes,
        }}
      />
    </div>
  )
}
