import { FamilyMemberForm } from "@/components/forms/users-forms/patient-form/add-edit-family-member";
import { Separator } from "@/components/ui/separator";

export default async function SettingsProfilePage({ params, searchParams }: {
  params: { id: string }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Add Family Member</h3>
      </div>
      <Separator />
      <FamilyMemberForm
        id={params.id}
      />
    </div>
  )
}
