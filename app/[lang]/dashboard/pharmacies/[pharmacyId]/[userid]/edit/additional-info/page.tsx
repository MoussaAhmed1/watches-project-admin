import { fetchAdditionalSpecializations } from "@/actions/additional-info-specializations";
import { fetchDoctorAdditionalInfo } from "@/actions/doctors";
import { DoctorAddtionalInfoForm } from "@/components/forms/users-forms/doctor-form/doctor-addtional-info";
import { Separator } from "@/components/ui/separator";
import { ISpecializations } from "@/types/additional-info-specializations";
import { DoctorAdditionalInfo } from "@/types/doctors";

export default async function SettingsProfilePage({ params, searchParams }: {
  params: { nurseId: string, userid: string }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {

  //----------------------------------------------------------------
  const res = await fetchDoctorAdditionalInfo({ userId: params.userid });
  const nurse: DoctorAdditionalInfo = res?.data?.data;
  console.log(nurse)
  const res_specializations = await fetchAdditionalSpecializations({
    page: 1,
    limit: 100,

  });
  const specializations: ISpecializations[] = res_specializations?.data?.data || [];
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Additional Information</h3>
      </div>
      <Separator />
      <DoctorAddtionalInfoForm
        id={nurse?.user_id}
        specializations={specializations}
        initialData={{
          "video_consultation_price": +nurse?.video_consultation_price,
          "voice_consultation_price": +nurse?.voice_consultation_price,
          "home_consultation_price": +nurse?.home_consultation_price,
          "clinic_consultation_price": +nurse?.clinic_consultation_price,
          "specialization_id": nurse?.specialization_id,
          "summery": nurse?.summery,
          "year_of_experience": nurse?.year_of_experience,
          "is_urgent": nurse?.is_urgent_doctor ?? false, // missing from Backend
          "latitude": nurse?.latitude,
          "longitude": nurse?.longitude,
          "license_images": nurse?.licenses ? nurse?.licenses.map(lic=>lic.image) : undefined,
          "avaliablity": nurse?.avaliablity,
          "clinic": nurse?.clinic ? {...nurse?.clinic,is_active: nurse?.clinic?.is_active===true ? true : false} : nurse?.clinic,
        }}
        initialLicensesImages={nurse?.licenses}
        coverImage={nurse?.cover_image}
      />
    </div>
  )
}
