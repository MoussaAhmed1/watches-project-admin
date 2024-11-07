import { fetchContactUs } from "@/actions/settings/contact-us";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { ContactUsForm } from "@/components/forms/settings/contact-us";
import NewSocialLink from "@/components/forms/settings/contact-us/add-edit-social-link-dialog";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { ISocialLink } from "@/types/settings/social-links";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Us page",
};

export default async function page({ params }: { params: { lang: "ar" | "en" } }) {
  const socialLinks: ISocialLink[] = await fetchContactUs({ lang: params?.lang });
  const {pages} = await getDictionary(params?.lang);
  const breadcrumbItems = [
    { title: pages.general_settings.contactUs, link: "/dashboard/settings/contact-us" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading
          title={pages.general_settings.contactUs}
        />
        <NewSocialLink />
      </div>
      <Card
        className="p-10 mx-0 border-0"
        style={{
          boxShadow:
            "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        }}>
        <div className="md:grid md:grid-cols-1 gap-8">
          {socialLinks?.length && socialLinks?.map(socialLink => <ContactUsForm key={socialLink?.id} socialLink={socialLink} />)}
        </div>
      </Card>

    </div>
  );
}
