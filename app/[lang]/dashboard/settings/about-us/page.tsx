import { fetchAboutUs } from "@/actions/about-us";
import AboutUsView from "@/sections/static-pages/about-us/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions page",
};

export default async function page() {
  const description_ar = await fetchAboutUs({ lang: "ar" });
  const description_en = await fetchAboutUs({ lang: "en" });

  return (
    <AboutUsView
      description={{
        description_ar: description_ar.content,
        description_en: description_en.content,
      }}
    />
  );
}
