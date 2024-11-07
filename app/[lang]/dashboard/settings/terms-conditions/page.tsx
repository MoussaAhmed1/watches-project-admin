import { fetchTermsConditions } from "@/actions/settings/terms-conditions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { TermsConditionsForm } from "@/components/forms/settings/terms-conditions";
import { Heading } from "@/components/ui/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions page",
};

export default async function page({params}:{params:{lang:"ar"|"en"}}) {
  const TermsConditionsdata = await fetchTermsConditions();
  const { pages } = await getDictionary(params?.lang);
  const breadcrumbItems = [
    {
      title: pages.general_settings.termsAndConditions,
      link: "/dashboard/settings/terms-conditions",
    },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={pages.general_settings.termsAndConditions}
        description={pages.general_settings.termsAndConditionsDescription}
      />

      <TermsConditionsForm
        description_ar={TermsConditionsdata?.content_ar}
        description_en={TermsConditionsdata?.content_en}
      />
    </div>
  );
}
