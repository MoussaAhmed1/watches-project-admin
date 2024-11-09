import { fetchStaticPages } from "@/actions/settings/static-pages";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { PrivacyPolicyForm } from "@/components/forms/settings/privacy-policy";
import { Heading } from "@/components/ui/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy page",
};

export default async function page({params}:{params:{lang:"ar"|"en"}}) {
  const privacyPolicyData = await fetchStaticPages("PRIVACY_POLICY");
  const { pages } = await getDictionary(params?.lang)

  const breadcrumbItems = [
    { title: pages.general_settings.privacyPolicy, link: "/dashboard/settings/privacy-policy" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={pages.general_settings.privacyPolicy}
      />

      <PrivacyPolicyForm description_ar={privacyPolicyData?.content_ar} description_en={privacyPolicyData?.content_en} />
    </div>
  );
}
