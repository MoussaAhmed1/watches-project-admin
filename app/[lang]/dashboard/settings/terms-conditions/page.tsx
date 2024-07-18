import { fetchTermsConditions } from "@/actions/terms-conditions";
import BreadCrumb from "@/components/breadcrumb";
import { TermsConditionsForm } from "@/components/forms/terms-conditions";
import { Heading } from "@/components/ui/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions page",
};

export default async function page() {
  const TermsConditionsdata = await fetchTermsConditions();
  const breadcrumbItems = [
    {
      title: "Terms and Conditions",
      link: "/dashboard/settings/terms-conditions",
    },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title="Terms and Conditions"
        description="Read our terms and conditions to understand our commitment to you."
      />

      <TermsConditionsForm
        description_ar={TermsConditionsdata?.content_ar}
        description_en={TermsConditionsdata?.content_en}
      />
    </div>
  );
}
