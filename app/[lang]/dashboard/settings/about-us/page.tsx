import { fetchAboutUs } from "@/actions/about-us";
import BreadCrumb from "@/components/breadcrumb";
import { AboutUsForm } from "@/components/forms/about-us";
import { Heading } from "@/components/ui/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us page",
};

export default async function page() {
  const aboutUsData = await fetchAboutUs();
  const breadcrumbItems = [
    { title: "About Us", link: "/dashboard/settings/about-us" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title="About Us"
        description="Get to know us and our commitment to you."
      />

      <AboutUsForm description_ar={aboutUsData?.content_ar} description_en={aboutUsData?.content_en} />
    </div>
  );
}
