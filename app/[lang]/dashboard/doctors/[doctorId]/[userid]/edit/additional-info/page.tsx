import { fetchSingleDoctor } from "@/actions/doctors";
import { DoctorProfileForm } from "@/components/forms/users-forms/doctor-form/DoctorProfileForm";
import { Separator } from "@/components/ui/separator";
import { ISingleDoctor } from "@/types/doctors";

export default async function SettingsProfilePage({ params, searchParams }: {
  params: { doctorId: string }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {
  
  //----------------------------------------------------------------
  const res = await fetchSingleDoctor(params.doctorId);
  const doctor: ISingleDoctor = res?.data?.data;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Additional Information</h3>
      </div>
      <Separator />
      <DoctorProfileForm  
      id={doctor?.id}  
      initialData={{
        first_name: doctor?.first_name,
        last_name: doctor?.last_name,
        birth_date: new Date(),
        gender: "male",
        phone: "+20100888845",
        avatarFile: doctor?.avatar,
      }}
      />
    </div>
  )
}
