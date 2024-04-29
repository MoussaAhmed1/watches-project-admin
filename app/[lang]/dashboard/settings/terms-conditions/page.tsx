import { fetchTermsConditions } from "@/actions/terms-conditions";
import TermsConditionsView from "@/sections/static-pages/terrms-conditions/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions page",
};

export default async function page() {
  const description_ar = await fetchTermsConditions({ lang: "ar" });
  const description_en = await fetchTermsConditions({ lang: "en" });

  return (
    <TermsConditionsView
      description={{
        description_ar: description_ar.content,
        description_en: description_en.content,
      }}
    />
  );
}
