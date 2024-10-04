import { fetchCommission, fetchTermsConditions } from "@/actions/terms-conditions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { CommissionForm } from "@/components/forms/commission";
import { Heading } from "@/components/ui/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commission",
  description: "Commission page",
};

export default async function page({params}:{params: { lang:"ar"|"en" }}) {
  const commission = await fetchCommission();
  const {pages} = await getDictionary(params?.lang)
  const breadcrumbItems = [
    {
      title: pages.general_settings.commission,
      link: "/dashboard/data-management/commission",
    },
  ]; 
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={pages.general_settings.commission}
        description={pages.general_settings.commissionDescription}
      />

      <CommissionForm commission={commission}  />
    </div>
  );
}
