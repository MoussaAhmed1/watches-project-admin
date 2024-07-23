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
        <h3 className="text-lg font-medium">Add family member</h3>
        <p className="text-sm text-muted-foreground">
          Add a new Family member.
        </p>
      </div>
      <Separator />
      <FamilyMemberForm
        id={params.id}
      />
    </div>
  )
}
