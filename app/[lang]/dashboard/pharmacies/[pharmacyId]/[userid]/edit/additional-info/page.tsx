import { fetchAdditionalSpecializations } from "@/actions/additional-info-specializations";
import { fetchPharmacyAdditionalInfo } from "@/actions/pharmacy";
import { fetchPharmacyCategories } from "@/actions/pharmacy-categories";
import { PharmacyAddtionalInfoForm } from "@/components/forms/users-forms/pharmacy-form/pharmacy-addtional-info";
import { Separator } from "@/components/ui/separator";
import { ISpecializations } from "@/types/additional-info-specializations";
import { PharmacyAddtionalInfo } from "@/types/pharmacy";

export default async function SettingsProfilePage({ params, searchParams }: {
  params: { pharmacyId: string, userid: string }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {

  //----------------------------------------------------------------
  const res = await fetchPharmacyAdditionalInfo({ userId: params.userid });
  const pharmacy: PharmacyAddtionalInfo = res?.data?.data;
  console.log(pharmacy)
  const categoriesRes = await fetchPharmacyCategories({
    page: 1,
    limit: 10,

  });
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Additional Information</h3>
      </div>
      <Separator />
      <PharmacyAddtionalInfoForm
        id={params.userid}
        categories={categoriesRes?.data?.data}
        initialData={
          {
            ph_name: pharmacy?.ph_name,
            address: pharmacy?.address,
            latitude: pharmacy?.latitude,
            longitude: pharmacy?.longitude,
            open_time: pharmacy?.open_time,
            close_time: pharmacy?.close_time,
            summery: pharmacy?.summery,
            expierence: pharmacy?.expierence,
            license_images: pharmacy?.license ? pharmacy?.license.map(lic=>lic.mage) : undefined,
            logo_images: pharmacy?.logo ? pharmacy?.logo.map(lic=>lic.image)[0] : undefined,
            categories: pharmacy?.categories.map(cat=>cat.id),
          }
        }
        initialLicensesImages={pharmacy?.license}
        LogoImage={pharmacy?.logo}
      />
    </div>
  )
}
