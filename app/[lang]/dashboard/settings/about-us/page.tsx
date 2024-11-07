import { fetchAboutUs } from "@/actions/settings/about-us";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { AboutUsForm } from "@/components/forms/settings/about-us";
import { Heading } from "@/components/ui/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us page",
};

export default async function page({params}:{params:{lang:"ar"|"en"}}) {
  const aboutUsData = await fetchAboutUs();
  const { pages } = await getDictionary(params?.lang)

  const breadcrumbItems = [
    { title: pages.general_settings.aboutUs, link: "/dashboard/settings/about-us" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={pages.general_settings.aboutUs}
      />

      <AboutUsForm description_ar={aboutUsData?.content_ar} description_en={aboutUsData?.content_en} />
    </div>
  );
}
