import { fetchAdditionalSpecializations } from "@/actions/additional-info-specializations";
import { fetchDoctorAdditionalInfo } from "@/actions/doctors";
import { DoctorAddtionalInfoForm } from "@/components/forms/users-forms/doctor-form/doctor-addtional-info";
import { Separator } from "@/components/ui/separator";
import { ISpecializations } from "@/types/additional-info-specializations";
import { DoctorAdditionalInfo } from "@/types/doctors";

export default async function SettingsProfilePage({ params, searchParams }: {
  params: { doctorId: string, userid: string }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {

  //----------------------------------------------------------------
  const res = await fetchDoctorAdditionalInfo({ userId: params.userid });
  const doctor: DoctorAdditionalInfo = res?.data?.data;
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
        id={doctor?.user_id}
        specializations={specializations}
        initialData={{
          "video_consultation_price": +doctor?.video_consultation_price,
          "voice_consultation_price": +doctor?.voice_consultation_price,
          "home_consultation_price": +doctor?.home_consultation_price,
          "clinic_consultation_price": +doctor?.clinic_consultation_price,
          "specialization_id": doctor?.specialization_id,
          "summery": doctor?.summery,
          "year_of_experience": doctor?.year_of_experience,
          "is_urgent": doctor?.is_urgent_doctor ?? false, // missing from Backend
          "latitude": doctor?.latitude,
          "longitude": doctor?.longitude,
          "license_images": doctor?.licenses ? doctor?.licenses.map(lic=>lic.image) : undefined,
          "avaliablity": doctor?.avaliablity,
          "clinic": doctor?.clinic ? {...doctor?.clinic,is_active: doctor?.clinic?.is_active===true ? true : false} : doctor?.clinic,
        }}
        initialLicensesImages={doctor?.licenses}
        coverImage={doctor?.cover_image}
      />
    </div>
  )
}
